import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import nextI18NextConfig from "../next-i18next.config.js";

const Custom500: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Head>
        <title>{t("general.brandname")}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <NavigationBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-4xl font-bold uppercase">
          {t("errors.500.title")}
        </h1>
        <p className="max-w-xl text-base md:text-lg">
          {t("errors.500.description")}
        </p>
        <Link
          className="rounded border border-white px-4 py-2 uppercase transition hover:bg-white hover:text-black"
          href="/"
        >
          {t("errors.500.cta")}
        </Link>
      </main>
      <Footer />
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

export default Custom500;
