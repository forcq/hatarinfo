export const SEND_FEEDBACK = "feedback/sendFeedback";
export const SEND_FEEDBACK_FULLFIELD = "feedback/sendFeedbackFullField";

export const sendFeedback = ({ subject, message }) => ({ type: SEND_FEEDBACK, payload: { subject, message } });
export const sendFeedbackFullField = () => ({ type: SEND_FEEDBACK_FULLFIELD });
