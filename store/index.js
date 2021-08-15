import { createStore, applyMiddleware, combineReducers } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { countries, selectedCountries } from "./countries";
import { selectedBorder } from "./border";
import { infos } from "./infos";
import { device } from "./device";
import { feedback } from "./feedback";
import { addNewInfoEpic, deleteInfoEpic, loadInfosEpic, reportInfoEpic } from "./infos/epics";
import { sendFeedbackEpic } from "./feedback/epics";

const rootReducer = combineReducers({ countries, selectedCountries, selectedBorder, device, infos, feedback });
const rootEpic = combineEpics(addNewInfoEpic, loadInfosEpic, deleteInfoEpic, reportInfoEpic, sendFeedbackEpic);

const epicMiddleware = createEpicMiddleware();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
