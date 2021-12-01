import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Footer from "../components/Footer";
import ImageWithOverlay from "../components/ImageWithOverlay";
import NavigationBar from "../components/NavigationBar";
import { useWindowDimensions } from "../utils/useWindowDimension";
import GalleryImage1 from "./../public/assets/images/bildergalerie_1.jpg";
import GalleryImage2 from "./../public/assets/images/bildergalerie_2.jpg";
import GalleryImage3 from "./../public/assets/images/bildergalerie_3.jpg";
import GalleryImage4 from "./../public/assets/images/bildergalerie_4.jpg";
import GalleryImage5 from "./../public/assets/images/bildergalerie_5.jpg";
import GalleryImage6 from "./../public/assets/images/bildergalerie_6.jpg";
import GalleryImage7 from "./../public/assets/images/bildergalerie_7.jpg";
import GalleryImage8 from "./../public/assets/images/bildergalerie_8.jpg";
import MenuImage1 from "./../public/assets/images/speisen_1.jpg";
import MenuImage2 from "./../public/assets/images/speisen_2.png";
import MenuImage3 from "./../public/assets/images/speisen_3.jpg";
import StartImage1 from "./../public/assets/images/start_1.jpg";
import StartImage2 from "./../public/assets/images/start_2.jpg";
import AboutUs from "./../public/assets/images/über_uns.jpg";

const PdfViewer = dynamic(() => import("../components/PdfViewer"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation("common");

  return (
    <div>
      <Head>
        <title>Büffel und Koi</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={" main w-full text-white"}>
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

        <div className={"  md:flex md:flex-row "} id={"about"}>
          <div className={"m-10 flex-2 "}>
            <h1 className="font-bold text-2xl whitespace-nowrap md:text-7xl md:transform md:translate-x-36 md:text-right">
              {t("about.title").toUpperCase()}
            </h1>
            <p className="">{t("about.content")}</p>
          </div>

          <div className="w-full flex-3 md:-z-10">
            <Image
              placeholder="blur"
              src={AboutUs}
              width={428}
              height={285}
              layout="responsive"
              alt="Anh Xuan Nguyen"
            />
          </div>
        </div>

        <div
          className={" pt-5 mt-20 md:flex md:flex-row md:gap-10"}
          id={"menu"}
        >
          <div className={"flex-1"}>
            <h1 className="font-bold text-2xl m-auto text-center mb-5 md:text-7xl menu__title">
              {t("menu.title").toUpperCase()}
            </h1>
            {width > 800 && (
              <>
                <div className={"menu__image--1"}>
                  <ImageWithOverlay
                    placeholder="blur"
                    src={MenuImage1}
                    width={600}
                    height={400}
                    layout="responsive"
                    alt="Appetizer - Gyoza"
                  />
                </div>
                <div className={"menu__image--2"}>
                  <ImageWithOverlay
                    placeholder="blur"
                    src={MenuImage2}
                    width={600}
                    height={400}
                    layout="responsive"
                    alt="Main Dish - Tokyo Drift Bowl with grilled Beef"
                  />
                </div>
                <div className={"menu__image--3"}>
                  <ImageWithOverlay
                    placeholder="blur"
                    src={MenuImage3}
                    width={600}
                    height={400}
                    layout="responsive"
                    alt="Main Dish - Chef´s Kiss"
                  />
                </div>
              </>
            )}
          </div>

          <div className={"relative pdf-viewer__wrapper md:mr-10"}>
            <PdfViewer
              url={"./menu.pdf"}
              width={width < 800 ? width - 50 : width / 2 - 50}
            />
            <div className=" border-t border-b pdf-viewer__download">
              <a href="./menu.pdf" download>
                <p className="mx-auto text-white text-center rig-shaded py-2 ">
                  {t("menu.download")}
                </p>
              </a>
            </div>
          </div>
        </div>

        <div className="image-gallery pt-5 mt-20 md:mt-44" id={"gallery"}>
          <h1 className="font-bold text-2xl px-10 mt-20 md:text-7xl ">
            {t("gallery.title")}
          </h1>
          <div className={" image-gallery__image--1"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage1}
              width={600}
              height={400}
              layout="responsive"
              alt={"outdoor area"}
            />
          </div>
          <div className={" image-gallery__image--2"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage2}
              width={587}
              height={391}
              layout="responsive"
              alt={"indoor area"}
            />
          </div>
          <div className={" image-gallery__image--3"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage3}
              width={558}
              height={372}
              layout="responsive"
              alt={"outdoor area - different angle"}
            />
          </div>
          <div className={" image-gallery__image--4"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage4}
              width={373}
              height={559}
              layout="responsive"
              alt="sushi plate - Fische für alle"
            />
          </div>
          <div className={" image-gallery__image--5"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage5}
              width={518}
              height={345}
              layout="responsive"
              alt="lampignons"
            />
          </div>
          <div className={" image-gallery__image--6"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage6}
              width={600}
              height={400}
              layout="responsive"
              alt={"Appetizer - Papaya Salad"}
            />
          </div>
          <div className={" image-gallery__image--7"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage7}
              width={600}
              height={400}
              layout="responsive"
              alt={"close-up of two different Bowls"}
            />
          </div>
          <div className={" image-gallery__image--8"}>
            <ImageWithOverlay
              placeholder="blur"
              src={GalleryImage8}
              width={559}
              height={373}
              layout="responsive"
              alt={"Homemade Drink - Wildberry Soda"}
            />
          </div>
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

export default Home;
