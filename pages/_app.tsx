import { createTheme, NextUIProvider } from "@nextui-org/react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/globals.scss";
import "./../styles/booking.scss";
import "./../styles/datetimepicker.scss";
import "./../styles/privacy.scss";

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "white",
      secondary: "black",
      link: "#5E1DAD",
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
export default appWithTranslation(MyApp);
