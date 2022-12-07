import * as React from "react";
import "../styles/globals.css";
//import "../styles/fonts.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { getSession,getProfile } from "@/store/slices/userSlice";

export default function App({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    store.dispatch(getProfile());
  }, []);
  return (
    <div   >
      <Provider store={store}>
        <ThemeProvider theme={theme} >
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}
