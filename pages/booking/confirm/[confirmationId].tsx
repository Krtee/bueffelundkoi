import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import ConfirmReservationContent from "../../../components/ConfirmReservationContent";
import Footer from "../../../components/Footer";
import NavigationBar from "../../../components/NavigationBar";
import nextI18NextConfig from "../../../next-i18next.config.js";

const ConfirmReservation: React.FC = () => {
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
    ...(await serverSideTranslations(
      locale,
      ["common", "footer"],
      nextI18NextConfig
    )),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], // No paths known at build time
    fallback: "blocking", // On first request, build the page and cache it
  };
};
export default ConfirmReservation;
