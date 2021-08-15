import { SEND_FEEDBACK, SEND_FEEDBACK_FULLFIELD } from "./actions";

const initialState = {
  status: "",
};

export const feedback = (state = initialState, action) => {
  switch (action.type) {
    case SEND_FEEDBACK:
      return { status: "sending" };

    case SEND_FEEDBACK_FULLFIELD:
      return { status: "sent" };

    default:
      return state;
  }
};
