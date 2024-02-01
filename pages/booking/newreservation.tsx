"use client";

import de from "date-fns/locale/de";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { registerLocale } from "react-datepicker";
import ReservationForm from "../../components/ReservationForm";

registerLocale("de", de);

enum FormStep {
  CHOOSE_DATE,
  CHOOSE_TIME,
  CHOOSE_PERSON_COUNT,
  FILL_INFORMATION,
  RESERVATION_SAVED,
  RESERVATION_ERROR,
  LOADING,
}

const NewReservation: NextPage = () => {
  return (
    <div className="overflow-y-auto h-screen">
      <Head>
        <title>BÜFFEL &amp; KOI</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReservationForm />
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default NewReservation;
