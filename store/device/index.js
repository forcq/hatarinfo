import { SET_DEVICE_ID } from "./actions";

const initialState = {
  id: null,
};

export const device = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE_ID:
      return { ...state, id: action.payload };

    default:
      return state;
  }
};
