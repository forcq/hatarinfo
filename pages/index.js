import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountrySelector from "../components/CountrySelector";
import styles from "../styles/home.module.scss";
import BorderList from "../components/BorderList";
import { borders } from "../store/border/borders";
import { Dialog, Paper, Typography, useMediaQuery } from "@material-ui/core";
import BorderInformation from "../components/BorderInformation";
import SlideUpTransition from "../components/SlideUpTransition";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { nanoid } from "nanoid";
import { setDeviceID } from "../store/device/actions";
import { unsetInformation } from "../store/infos/actions";
import Head from "next/head";

export default function Home() {
  const state = useSelector((state) => state);
  const { selectedCountries, selectedBorder } = state;
  const countryBorderDirection = `${selectedCountries.from.code}-${selectedCountries.to.code}`;
  const filteredBorders = borders.filter((border) => border.id.includes(countryBorderDirection));
  const fullScreen = useMediaQuery("(max-width:600px)");

  const [openBorderInformation, setOpenBorderInformation] = useState(false);

  const [deviceID] = useLocalStorage("deviceID", nanoid());
  const dispatch = useDispatch();

  const handleCloseBorderInformation = () => {
    dispatch(unsetInformation());
    setOpenBorderInformation(false);
  };

  useEffect(() => {
    dispatch(setDeviceID(deviceID));
  }, [dispatch, deviceID]);

  return (
    <>
      <Head>
        <title>Határinfó</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.countrySelectorContainer}>
          <Typography variant="h4" style={{ color: "white" }}>
            Válasz országot
          </Typography>
          <CountrySelector countries={state.countries} from={selectedCountries.from} to={selectedCountries.to} />
        </div>
      </div>

      <div className={styles.borderContainer}>
        <Typography variant="h6">Válasz határt</Typography>
        <Paper elevation={1}>
          <div className={styles.borderList}>
            <BorderList borders={filteredBorders} openBorderInformation={() => setOpenBorderInformation(true)} />
          </div>
        </Paper>
      </div>

      {/* Using dialog cos of the transition animation */}
      <Dialog
        fullScreen={fullScreen}
        open={openBorderInformation}
        onClose={handleCloseBorderInformation}
        TransitionComponent={SlideUpTransition}
        scroll="body"
        disableScrollLock>
        <BorderInformation border={selectedBorder} close={handleCloseBorderInformation} />
      </Dialog>
    </>
  );
}
