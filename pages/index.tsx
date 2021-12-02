import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import NavigationBar from "../components/NavigationBar";
import StartImage1 from "./../public/assets/images/start_1.jpg";
import StartImage2 from "./../public/assets/images/start_2.jpg";

const Menu = dynamic(() => import("../components/Menu"));
const Gallery = dynamic(() => import("../components/Gallery"));
const About = dynamic(() => import("../components/About"));
const Footer = dynamic(() => import("../components/Footer"));

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  const mainRef = useRef<HTMLDivElement>(null);

  const appHeight = () => {
    if (mainRef.current) {
      mainRef.current.style.height = `${window.innerHeight}px`;
    }
  };

  useEffect(() => {
    appHeight();
    window.addEventListener("resize", appHeight);
    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Büffel und Koi</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={" main w-full text-white"} ref={mainRef}>
        <NavigationBar />

        <div
          className={
            "w-full sm:h-6/10 md:h-screen  lg:h-screen lg:mb-20 xl:mb-48 relative "
          }
        >
          <div className="relative w-7/12 md:mr-20  ml-auto banner__image--first ">
            <Image
              placeholder="blur"
              src={StartImage2}
              width={428}
              height={285}
              layout="responsive"
              priority
              alt="header image - Kokos Pocus Bowl"
            />
          </div>
          <div className="relative w-2/3 md:w-3/5 banner__image--second">
            <Image
              placeholder="blur"
              src={StartImage1}
              width={252}
              height={168}
              layout="responsive"
              priority
              alt="header image - Thun &amp; Lachsen"
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
        <About />
        <Menu />
        <Gallery />
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

export default Home;
