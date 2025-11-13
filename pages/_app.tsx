import { HeroUIProvider } from "@heroui/react";

import "@fontsource-variable/josefin-sans";
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
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
export default appWithTranslation(MyApp);
