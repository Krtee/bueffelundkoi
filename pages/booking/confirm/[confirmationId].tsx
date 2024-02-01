"use client";

import { Spinner } from "@nextui-org/react";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import NavigationBar from "../../../components/NavigationBar";
import { confirmReservation } from "../../../utils/booking/BookingUtils";

const ConfirmReservation: React.FC = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { confirmationId } = router.query;

  const [confirmationResponse, setConfirmationResponse] = useState(-1);
  useEffect(() => {
    confirmReservation(confirmationId as string).then(setConfirmationResponse);
  }, [router.query, confirmationId]);

  const renderCorrectContent = () => {
    switch (confirmationResponse) {
      case 200:
        return (
          <div
            className={"flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40	"}
          >
            <h1 className="text-2xl">{t("booking.accept.title")}</h1>
            <p className="josefin text-xl">{t("booking.accept.body")}</p>
          </div>
        );
      case 208:
        return (
          <div
            className={"flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40	"}
          >
            <h1 className="text-2xl">{t("booking.alreadyConfirmed.title")}</h1>
            <p className="josefin text-xl">
              {t("booking.alreadyConfirmed.body")}
            </p>
          </div>
        );
      case -1:
        return (
          <div
            className={"flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40	"}
          >
            <Spinner />
          </div>
        );
      default:
        return (
          <div
            className={"flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40	"}
          >
            <h1 className="text-2xl">{t("booking.failed.title")}</h1>
            <p className="josefin text-xl">{t("booking.failed.body")}</p>
          </div>
        );
    }
  };
  return (
    <div className="overflow-y-auto h-screen">
      <Head>
        <title>BÜFFEL &amp; KOI</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col  w-full text-white m-auto" id="main">
        <NavigationBar />
        {renderCorrectContent()}
        <Footer />
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
export default ConfirmReservation;
