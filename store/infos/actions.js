export const ADD_NEW_INFO = "borderInfromation/addNewInfo";
export const ADD_NEW_INFO_FULLFILED = "borderInfromation/addNewInfoFullfilled";
export const LOAD_INFORMATIONS = "borderInformation/loadInformations";
export const LOAD_INFORMATIONS_FULLFILLD = "borderInformation/loadInformationsFullFilled";
export const UNSET_INFORMATIONS = "borderInformation/unsetInformation";
export const DELETE_INFORMATION = "borderInfoEntry/deleteInfo";
export const DELETE_INFORMATION_FULLFILLED = "borderInfoEntry/deleteInfoFullFilled";
export const REPORT_INFORMATION = "borderInfoEntry/reportInformation";
export const REPORT_INFORMATION_FULLFILLED = "borderInfoEntry/reportInformationFullFilled";

export const addNewInfo = ({ borderID, data }) => ({ type: ADD_NEW_INFO, payload: { borderID, data } });
export const addNewInfoFullfilled = (info) => ({ type: ADD_NEW_INFO_FULLFILED, payload: info });
export const loadInformations = ({ borderID }) => ({ type: LOAD_INFORMATIONS, payload: { borderID } });
export const loadInformationsFullFilled = (entries) => ({ type: LOAD_INFORMATIONS_FULLFILLD, payload: entries });
export const unsetInformation = () => ({ type: UNSET_INFORMATIONS });
export const deleteInformation = ({ borderID, infoID }) => ({ type: DELETE_INFORMATION, payload: { borderID, infoID } });
export const deleteInformationFullFilled = (infoID) => ({ type: DELETE_INFORMATION_FULLFILLED, payload: infoID });
export const reportInformation = ({ borderID, info, deviceID }) => ({ type: REPORT_INFORMATION, payload: { borderID, info, deviceID } });
export const reportInformationFullFilled = (infoID) => ({ type: REPORT_INFORMATION_FULLFILLED, payload: infoID });
