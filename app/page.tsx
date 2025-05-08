"use client";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import About from "../components/About";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import MainWrapper from "../components/MainWrapper";
import Menu from "../components/Menu";
import NavigationBar from "../components/NavigationBar";
import { imageStyles } from "../utils/variables";
import StartImage1 from "./../public/assets/images/start_1.jpg";
import StartImage2 from "./../public/assets/images/start_2.jpg";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <MainWrapper>
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
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default Home;
