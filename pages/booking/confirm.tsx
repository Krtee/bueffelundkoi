import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { confirmReservation } from "../../utils/booking/BookingUtils";
interface ConfirmationPage {
  confirmationResponse: number;
  test: string;
}
const ConfirmReservation: React.FC<ConfirmationPage> = ({
  confirmationResponse,
  test,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log(test);

    confirmReservation(test).then((response) => {
      console.log(response);
    });
  }, []);

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
        <title>Büffel &amp; Koi</title>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const confirmationId = context.query.confirmationId;

  const confirmationRes: number = await confirmReservation(
    confirmationId as string
  );

  if (confirmationRes === null) {
    const { res } = context;

    res.writeHead(307, { Location: "/404" });
    res.end();
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale!)),
      confirmationResponse: confirmationRes,
      test: confirmationId,
    },
  };
};
export default ConfirmReservation;
