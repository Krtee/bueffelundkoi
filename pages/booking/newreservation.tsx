import { Spinner } from "@heroui/spinner";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Suspense } from "react";
import ReservationForm from "../../components/ReservationForm";

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
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <ReservationForm />
      </Suspense>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default NewReservation;
