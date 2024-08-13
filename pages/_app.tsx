"use client";
import { NextUIProvider } from "@nextui-org/system";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/globals.scss";
import "./../styles/booking.scss";
import "./../styles/preflight.css";
import "./../styles/privacy.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <SpeedInsights />
      <Analytics />
      <Suspense>
        <Component {...pageProps} />
      </Suspense>
    </NextUIProvider>
  );
}
export default appWithTranslation(MyApp);
