import { SET_SELECTED_BORDER, SWAP_SELECTED_BORDER } from "./actions";
import { borders } from "./borders";

export const selectedBorder = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_BORDER:
      return action.payload;

    case SWAP_SELECTED_BORDER:
      return borders.find((border) => border.name === action.payload);

    default:
      return state;
  }
};
