import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { initializeFirebase } from "../firebase";
import AppHeader from "../components/AppHeader";

function BorderInfoApp({ Component, pageProps }) {
  initializeFirebase();

  return (
    <Provider store={store}>
      <AppHeader />
      <Component {...pageProps} />
    </Provider>
  );
}

export default BorderInfoApp;
