"use client";

import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import ConfirmReservationContent from "../../../components/ConfirmReservationContent";
import Footer from "../../../components/Footer";
import NavigationBar from "../../../components/NavigationBar";

const ConfirmReservation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="overflow-y-auto h-screen">
      <Head>
        <title>BÜFFEL &amp; KOI</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col  w-full text-white m-auto" id="main">
        <NavigationBar />
        <ConfirmReservationContent />
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
    paths: [], // No paths known at build time
    fallback: "blocking", // On first request, build the page and cache it
  };
};
export default ConfirmReservation;
