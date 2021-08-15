import { sendFeedbackFullField, SEND_FEEDBACK } from "./actions";
import { setDocument } from "../../utils/firestore";
import { catchError, map, switchMap } from "rxjs";
import { ofType } from "redux-observable";

export const sendFeedbackEpic = (action$) =>
  action$.pipe(
    ofType(SEND_FEEDBACK),
    switchMap((action) => {
      return setDocument(`feedbacks`, action.payload).pipe(
        map(() => sendFeedbackFullField()),
        catchError((error) => {
          // TODO
        })
      );
    })
  );
