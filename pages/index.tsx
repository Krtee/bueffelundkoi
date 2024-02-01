import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import NavigationBar from "../components/NavigationBar";
import { useWindowDimensions } from "../utils/useWindowDimension";
import { imageStyles } from "../utils/variables";
import StartImage1 from "./../public/assets/images/start_1.jpg";
import StartImage2 from "./../public/assets/images/start_2.jpg";

const Menu = dynamic(() => import("../components/Menu"));
const Gallery = dynamic(() => import("../components/Gallery"));
const About = dynamic(() => import("../components/About"));
const Footer = dynamic(() => import("../components/Footer"));

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const mainRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowDimensions();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const appHeight = () => {
    if (mainRef.current) {
      mainRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    appHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  return (
    <div>
      <Head>
        <title>BÜFFEL & KOI</title>
        <meta name="description" content="BÜFFEL & KOI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"main w-full"} ref={mainRef}>
        <div className={"  w-full text-white max-w-screen-2xl m-auto	"}>
          <NavigationBar />

          <div
            className={
              "w-full sm:h-6/10 md:h-screen lg:h-screen lg:min-h-700 lg:mb-20 xl:mb-48 relative"
            }
          >
            <div className="relative w-7/12 md:mr-20  ml-auto banner__image--first ">
              <Image
                placeholder="blur"
                src={StartImage2}
                priority
                alt="header image - Kokos Pocus Bowl"
                quality={70}
                style={imageStyles}
              />
            </div>
            <div className="relative w-2/3 md:w-3/5 banner__image--second">
              <Image
                placeholder="blur"
                src={StartImage1}
                style={imageStyles}
                priority
                alt="header image - Thun &amp; Lachsen"
                quality={70}
              />
            </div>
            <div className="absolute top-12 right-12 z-10">
              <h1 className="leading-5	text-2xl md:text-7xl">
                {t("main.secondTitle").toUpperCase()}
              </h1>
              <h1 className="leading-5	text-2xl  md:text-7xl ">
                {t("main.firstTitle").toUpperCase()}
              </h1>
            </div>
          </div>

          <div className={"mx-10  md:mt-20 mb-20"}>
            <h1 className="text-2xl md:text-7xl  mb-10">
              {t("openingTime.title")}
            </h1>
            <div className="times-grid my-1">
              <p className="rig-shaded  flex-1">
                {t("openingTime.content.normal.days")}
              </p>
              <p className="rig-shaded flex-1">
                {t("openingTime.content.normal.times")}
              </p>
            </div>
            <div className="times-grid  my-1">
              <p className="rig-shaded flex-1">
                {t("openingTime.content.weekend.days")}
              </p>
              <p className="rig-shaded flex-1">
                {t("openingTime.content.weekend.times")}
              </p>
            </div>
          </div>

          <About />
          <Menu />
          <Gallery />
          <Footer />
        </div>

        <Modal
          closeButton
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalHeader className="rig-shaded text-2xl mt-20">
            {t("news.title")}
          </ModalHeader>
          <ModalBody className="md:p-5 max-w-screen-2xl m-auto w-full">
            <p className="whitespace-pre-line josefin text-xl m-10">
              {t("news.content")}
            </p>
          </ModalBody>
          <ModalFooter className="p-10">
            <Button
              onPress={onClose}
              className={"rig-shaded text-black w-full md:w-1/2 m-auto "}
            >
              {t("general.buttons.close")}
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default Home;
