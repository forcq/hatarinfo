import { Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFeedback } from "../store/feedback/actions";
import styles from "../styles/feedback.module.scss";
import { selectFeedbackStatus } from "../store/selectors";
import { Alert } from "@material-ui/lab";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(selectFeedbackStatus);

  useEffect(() => {
    if (status === "sent") {
      setShowSnackbar(true);
      setSubject("");
      setMessage("");
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendFeedback({ subject, message }));
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Visszajelzés</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.subject}>
          <FormControl className={styles.fullWidth} variant="outlined">
            <InputLabel id="subject">Tárgy *</InputLabel>
            <Select labelId="subject" id="subject" label="Tárgy *" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <MenuItem value="bug">Hibát találtam</MenuItem>
              <MenuItem value="feature">Ötletem van</MenuItem>
              <MenuItem value="else">Egyéb</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={styles.message}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={16}
            label="Megjegyzés *"
            type="text"
            variant="outlined"
            className={styles.fullWidth}
          />
        </div>

        <div className={styles.button}>
          <Button disabled={status === "sending" || message.length < 3 || subject === ""} type="submit" variant="contained" color="primary">
            Küldés
          </Button>
        </div>
      </form>

      <Snackbar open={showSnackbar} autoHideDuration={3200} onClose={() => setShowSnackbar(false)}>
        <Alert severity="success">Sikeresen elküldve!</Alert>
      </Snackbar>
    </>
  );
};

export default Feedback;
