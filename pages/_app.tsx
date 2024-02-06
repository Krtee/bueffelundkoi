"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/globals.scss";
import "./../styles/booking.scss";
import "./../styles/datetimepicker.scss";
import "./../styles/preflight.css";
import "./../styles/privacy.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <SpeedInsights />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
export default appWithTranslation(MyApp);
