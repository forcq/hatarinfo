import { Box, Grow, IconButton, Menu, MenuItem, useTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInformation, reportInformation } from "../../../store/infos/actions";
import { selectDeviceID } from "../../../store/selectors";
import ActionMenu from "./ActionMenu";
import styles from "./entry.module.scss";

const formatDatetime = (datetime) => {
  const date = new Date(datetime);
  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

const formatWaitingTime = (waitingTime) => {
  const [hours, minutes] = waitingTime.split(":");
  return hours === "0" ? `${minutes} perc` : `${hours} óra ${minutes} perc`;
};

const Entry = ({ info }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [growTransition, setGrowTransition] = useState(true);
  const open = !!anchorEl;
  const currentUserDeviceID = useSelector(selectDeviceID);
  const dispatch = useDispatch();

  const colorLeftBorderBasedOnWaitingTime = (waitingTime) => {
    const [hours, minutes] = waitingTime.split(":");
    const waitingTimeInMins = +hours * 60 + +minutes;

    let color = theme.palette.error.main;
    if (waitingTimeInMins <= 30) {
      color = theme.palette.success.main;
    } else if (waitingTimeInMins <= 90) {
      color = theme.palette.warning.main;
    }

    return { borderLeft: `3px solid ${color}` };
  };

  useEffect(() => {
    return () => setGrowTransition(false);
  }, []);

  return (
    <Grow in={growTransition}>
      <div className={styles.container} style={colorLeftBorderBasedOnWaitingTime(info.waitingTime)}>
        <div className={styles.avatar}>
          <AccountCircleIcon fontSize="large" color="disabled" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <span className={styles.userName}>{info.user ? info.user.name : "Anonymous"} </span>
              <Box color="text.secondary" component="span">
                {formatDatetime(info.datetime)}
              </Box>
            </div>

            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true">
              <MoreHorizIcon color="primary" />
            </IconButton>
            <ActionMenu
              author={currentUserDeviceID === info.deviceID}
              report={() => dispatch(reportInformation({ borderID: info.borderID, info: info, deviceID: currentUserDeviceID }))}
              deletion={() => dispatch(deleteInformation({ borderID: info.borderID, infoID: info.id }))}
              close={() => setAnchorEl(null)}
              open={open}
              anchorEl={anchorEl}
            />
          </div>

          <div className={styles.contentWatingTime}>
            <Box color="text.secondary" component="span">
              Várakozási idő:
            </Box>{" "}
            {formatWaitingTime(info.waitingTime)}
          </div>

          <div className={styles.contentMessage}>
            <Box color="text.secondary" component="span">
              Megjegyzés:
            </Box>{" "}
            {info.comment ? info.comment : "-"}
          </div>
        </div>
      </div>
    </Grow>
  );
};

export default Entry;
