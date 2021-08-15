import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewInfo } from "../../../store/infos/actions";
import { selectDeviceID, selectInfoLoading } from "../../../store/selectors";
import AutoCompleteInput from "../../AutoCompleteInput";
import styles from "./border-information-form.module.scss";

const Form = ({ closeDialog, borderID }) => {
  const [comment, setComment] = useState("");
  const [hours, setHours] = useState(hourOptions[0]);
  const [minutes, setMinutes] = useState(minuteOptions[29]);
  const deviceID = useSelector(selectDeviceID);
  const [submitted, setSubmitted] = useState(false);
  const loading = useSelector(selectInfoLoading);

  useEffect(() => {
    submitted & !loading ? closeDialog() : null;
  }, [submitted, loading, closeDialog]);

  const dispatch = useDispatch();
  const handeSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
    dispatch(
      addNewInfo({
        borderID,
        data: {
          deviceID,
          waitingTime: `${hours.value}:${minutes.value}`,
          comment,
          datetime: Date.now(),
          report: {
            counts: 0,
            reporters: [],
          },
          status: "active",
        },
      })
    );
  };

  const handleHoursSelection = (value) => setHours(value);
  const handleMinutesSelection = (value) => setMinutes(value);

  return (
    <form onSubmit={handeSubmit} className={styles.form} noValidate>
      <Typography variant="body1" color="textSecondary">
        Várakozási idő
      </Typography>
      <div className={styles.waitingTime}>
        <AutoCompleteInput value={hours} options={hourOptions} label="Óra" onSelect={handleHoursSelection} />
        <AutoCompleteInput value={minutes} options={minuteOptions} label="Perc" onSelect={handleMinutesSelection} />
      </div>

      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={3}
        label="Megjegyzés"
        type="text"
        variant="outlined"
        className={styles.fullWidth}
      />

      <div className={styles.buttons}>
        <Button onClick={closeDialog} color="secondary">
          Mégse
        </Button>

        <Button disabled={loading} type="submit" variant="contained" color="primary">
          Küldés
        </Button>
      </div>
    </form>
  );
};

export default Form;

const hourOptions = [
  { label: "0", value: "00" },
  { label: "1", value: "01" },
  { label: "2", value: "02" },
  { label: "3", value: "03" },
  { label: "4", value: "04" },
  { label: "5", value: "05" },
  { label: "6", value: "06" },
  { label: "7", value: "07" },
  { label: "8", value: "08" },
];

const minuteOptions = new Array(59).fill(1).map((element, index) => {
  const min = `${element + index}`;
  return min.length < 2 ? { label: min, value: `0${min}` } : { label: min, value: min };
});
