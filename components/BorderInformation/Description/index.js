import { useState } from "react";
import { Box, Grow, Link, Paper } from "@material-ui/core";
import styles from "./description.module.scss";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import { useDispatch } from "react-redux";
import { swapSelectedBorder } from "../../../store/border/actions";

const Description = ({ border }) => {
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(0);
  const [grow, setGrow] = useState(true);

  const handleBorderSwap = (border) => {
    setGrow(false);
    setRotate(1);
    const [departure, arrival] = border.name.split("-");
    const swappedBorderName = `${arrival.trimLeft()} - ${departure.trimRight()}`;
    dispatch(swapSelectedBorder(swappedBorderName));
  };

  const handleAnimationEnd = () => {
    setGrow(true);
    setRotate(0);
  };

  const formatBorderName = (border) => {
    const [departure, arrival] = border.name.split("-");

    return (
      <div className={styles.borderName}>
        <Grow in={grow} {...{ timeout: 50 }}>
          <span>{departure}</span>
        </Grow>
        <SwapHorizRoundedIcon
          className={styles.icon}
          rotate={rotate}
          onAnimationEnd={handleAnimationEnd}
          onClick={() => handleBorderSwap(border)}
          color="primary"
        />
        <Grow in={grow} {...{ timeout: 50 }}>
          <span>{arrival}</span>
        </Grow>
      </div>
    );
  };

  return (
    <Paper elevation={1}>
      <div className={styles.borderDescription}>
        <div>
          <Box color="text.secondary">Határ:</Box>
          {formatBorderName(border)}
        </div>
        <div>
          <Box color="text.secondary">Nyitvatartás:</Box>
          {border?.openingHours}h
        </div>
        <div>
          <Box color="text.secondary">Hivatalos infó:</Box>
          <Link
            href="http://www.police.hu/hu/hirek-es-informaciok/hatarinfo?field_hat_rszakasz_value=szerb+hat%C3%A1rszakasz"
            target="_blank"
            rel="noopener noreferrer">
            Weboldal
          </Link>
        </div>
      </div>
    </Paper>
  );
};

export default Description;
