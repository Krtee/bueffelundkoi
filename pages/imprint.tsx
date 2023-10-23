import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

const Imprint: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <Head>
        <title>BÜFFEL &amp; KOI</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <NavigationBar />
        <div className={"flex-1 p-10"}>
          <p className="rig-shaded">{t("contact.address.name")}</p>
          <p>{t("contact.address.street")}</p>
          <p>{t("contact.address.city")}</p>
          <br />
          <p>{t("contact.phone")}</p>
          <p>{t("contact.email")}</p>
          <p>{t("contact.businessOwner")}</p>
          <br />
          {/* {          <p>{t("imprint.register")}</p>
          <p>{t("imprint.taxId")}</p>
          <p>{t("imprint.businessId")}</p>}
          <br />
           */}
          <p>
            {t("imprint.fonts")}
            <a href="https://www.apache.org/licenses/LICENSE-2.0">
              Apache License, Version 2.0.
            </a>
          </p>
        </div>
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

export default Imprint;
