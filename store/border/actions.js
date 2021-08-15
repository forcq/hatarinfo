export const SET_SELECTED_BORDER = "borderList/setSelectedBorder";
export const SWAP_SELECTED_BORDER = "borderList/swapSelectedBorder";
export const setSelectedBorder = (value) => ({ type: SET_SELECTED_BORDER, payload: value });
export const swapSelectedBorder = (borderName) => ({ type: SWAP_SELECTED_BORDER, payload: borderName });
