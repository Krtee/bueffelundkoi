"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://use.typekit.net/pqp0hmz.css"
            rel="stylesheet"
            key="font"
          />
        </Head>
        <body className={"dark"}>
          <SpeedInsights />

          <Analytics />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
