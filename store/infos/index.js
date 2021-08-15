import {
  ADD_NEW_INFO,
  ADD_NEW_INFO_FULLFILED,
  DELETE_INFORMATION,
  DELETE_INFORMATION_FULLFILLED,
  LOAD_INFORMATIONS,
  LOAD_INFORMATIONS_FULLFILLD,
  REPORT_INFORMATION,
  REPORT_INFORMATION_FULLFILLED,
  UNSET_INFORMATIONS,
} from "./actions";

const initialState = {
  entries: [],
  loading: false,
};

export const infos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_INFO:
      return { ...state, loading: true };

    case ADD_NEW_INFO_FULLFILED:
      return { entries: [...state.entries, action.payload], loading: false };

    case LOAD_INFORMATIONS:
      return { ...state, loading: true };

    case LOAD_INFORMATIONS_FULLFILLD:
      return { entries: [...action.payload], loading: false };

    case UNSET_INFORMATIONS: {
      return { ...state, entries: [] };
    }

    case DELETE_INFORMATION: {
      return { ...state, loading: true };
    }

    case DELETE_INFORMATION_FULLFILLED: {
      return { entries: state.entries.filter((entry) => entry.id !== action.payload), loading: false };
    }

    case REPORT_INFORMATION: {
      return { ...state, loading: true };
    }

    case REPORT_INFORMATION_FULLFILLED: {
      return { entries: state.entries.filter((entry) => entry.id !== action.payload), loading: false };
    }

    default:
      return state;
  }
};
