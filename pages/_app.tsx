"use client";
import { NextUIProvider } from "@nextui-org/system";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/globals.scss";
import "./../styles/booking.scss";
import "./../styles/preflight.css";
import "./../styles/privacy.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
export default appWithTranslation(MyApp);
