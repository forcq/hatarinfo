import { ofType } from "redux-observable";
import { catchError, map, switchMap, tap } from "rxjs";
import {
  ADD_NEW_INFO,
  addNewInfoFullfilled,
  LOAD_INFORMATIONS,
  loadInformationsFullFilled,
  DELETE_INFORMATION,
  deleteInformationFullFilled,
  REPORT_INFORMATION,
  reportInformationFullFilled,
} from "./actions";
import { setDocument, getDocuments, updateDocument } from "../../utils/firestore";
import { where } from "firebase/firestore";

export const addNewInfoEpic = (action$) =>
  action$.pipe(
    ofType(ADD_NEW_INFO),
    switchMap((action) =>
      setDocument(`borders/${action.payload.borderID}/infos`, action.payload.data).pipe(
        map((docRef) => addNewInfoFullfilled({ ...action.payload.data, id: docRef.id })),
        catchError((error) => {
          // TODO
        })
      )
    )
  );

const eightHoursInMillisecs = 8 * 60 * 60 * 1000;
export const loadInfosEpic = (action$) =>
  action$.pipe(
    ofType(LOAD_INFORMATIONS),
    switchMap((action) => {
      const notOlderThanEightHours = where("datetime", ">=", Date.now() - eightHoursInMillisecs);
      const onlyWithActiveStatus = where("status", "==", "active");

      return getDocuments(`borders/${action.payload.borderID}/infos`, [notOlderThanEightHours, onlyWithActiveStatus]).pipe(
        map((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.ref.id }))),
        map((entries) => loadInformationsFullFilled(entries)),
        catchError((error) => {
          // TODO
        })
      );
    })
  );

export const deleteInfoEpic = (action$) =>
  action$.pipe(
    ofType(DELETE_INFORMATION),
    switchMap((action) => {
      return updateDocument(`borders/${action.payload.borderID}/infos`, action.payload.infoID, { status: "inactive" }).pipe(
        map(() => deleteInformationFullFilled(action.payload.infoID)),
        catchError((error) => {
          // TODO
        })
      );
    })
  );

export const reportInfoEpic = (action$) =>
  action$.pipe(
    ofType(REPORT_INFORMATION),
    switchMap((action) => {
      const updatedInfoFields = {
        report: {
          counts: action.payload.info.report.counts + 1,
          reporters: [...action.payload.info.report.reporters, action.payload.deviceID],
        },
        status: action.payload.info.report.counts >= 3 ? "inactive" : "active",
      };

      return updateDocument(`borders/${action.payload.borderID}/infos`, action.payload.info.id, updatedInfoFields).pipe(
        map(() => reportInformationFullFilled(action.payload.info.id)),
        catchError((error) => {
          // TODO
        })
      );
    })
  );
