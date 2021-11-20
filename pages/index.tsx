import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import ImageWithOverlay, {
  ImageOverlayItem,
} from "../components/ImageWithOverlay";
import { NavLink } from "../components/NavLink";
import NavOverlay from "../components/NavOverlay";
import { useMouseCoords } from "../utils/useMouseCoords";
import { useWindowDimensions } from "../utils/useWindowDimension";
import facebook from "./../public/assets/facebook.svg";
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
import instagram from "./../public/assets/instagram.svg";
import logo from "./../public/assets/logo.png";
import MenuIcon from "./../public/assets/menu.svg";

const PdfViewer = dynamic(() => import("../components/PdfViewer"), {
  ssr: false,
});

const Home: NextPage = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useTranslation("common");
  const [showPopUp, setShowPopUp] = useState(false);
  const [activeLang, setActiveLang] = useState<string>("de");
  const { x, y } = useMouseCoords();
  const [overlayImageProps, setOverlayImageProps] =
    useState<ImageOverlayItem>();
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  return (
    <div>
      <Head>
        <title>Büffel und Koi</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={"main"}>
        <NavOverlay
          isOpen={showPopUp}
          onClose={() => setShowPopUp(false)}
          screenWidth={width}
          locale={activeLang}
          setLocale={setActiveLang}
          onNavigate={() => setShowPopUp(false)}
        />
        <main className={" main w-full text-white"}>
          <div className={"flex flex-row 	 mx-5 my-7"}>
            <div className="flex-1 md:flex-initial flex justify-start">
              <div className={"relative m-w-32 w-32 md:w-60 md:m-w-60 m-auto "}>
                <Image
                  src={logo}
                  alt={t("nav.logo")}
                  layout="responsive"
                  width={19}
                  height={7}
                />
              </div>
            </div>
            {width > 700 ? (
              <nav
                className={
                  "border-t border-b border-solid	 mx-5 my-5 flex-1 flex justify-between pl-32 pr-6 items-center font-bold"
                }
              >
                <NavLink href="menu" locale={activeLang}>
                  {t("nav.menu")}
                </NavLink>
                <NavLink href="about" locale={activeLang}>
                  {t("nav.about")}
                </NavLink>
                <NavLink href="gallery" locale={activeLang}>
                  {t("nav.gallery")}
                </NavLink>
                <NavLink href="contact" locale={activeLang}>
                  {t("nav.contact")}
                </NavLink>
                <div className={"flex gap-1"}>
                  <p
                    onClick={() => {
                      setActiveLang("en");
                      router.push("/en", undefined, { locale: false });
                    }}
                  >
                    {t("general.eng")}
                  </p>
                  <p>|</p>
                  <p
                    onClick={() => {
                      setActiveLang("de");
                      router.push("/de", undefined, { locale: false });
                    }}
                  >
                    {t("general.de")}
                  </p>
                </div>
              </nav>
            ) : (
              <Image src={MenuIcon} onClick={() => setShowPopUp(true)} />
            )}
          </div>

          <div
            className={
              "w-full h-80 md:h-8/10 xl:h-screen xl:mb-48 relative mb-20  "
            }
          >
            <div className="relative w-7/12 md:mr-20  ml-auto banner__image--first ">
              <Image
                placeholder="blur"
                src={StartImage2}
                width={428}
                height={285}
                layout="responsive"
              />
            </div>
            <div className="relative w-2/3 md:w-3/5 banner__image--second">
              <Image
                placeholder="blur"
                src={StartImage1}
                width={252}
                height={168}
                layout="responsive"
              />
            </div>
            <div className="absolute top-12 right-12 z-10">
              <h1 className="font-bold	text-2xl md:text-7xl">
                {t("main.secondTitle").toUpperCase()}
              </h1>
              <h1 className="font-bold	text-2xl  md:text-7xl ">
                {t("main.firstTitle").toUpperCase()}
              </h1>
            </div>
          </div>

          <div className={" mt-20 pt-5 md:flex md:flex-row "} id={"about"}>
            <div className={"m-10 flex-2 "}>
              <h1 className="font-bold text-2xl whitespace-nowrap md:text-7xl md:transform md:translate-x-36 md:text-right">
                {t("about.title").toUpperCase()}
              </h1>
              <p className="my-10">{t("about.content")}</p>
            </div>

            <div className="w-full flex-3 md:-z-10">
              <Image
                placeholder="blur"
                src={AboutUs}
                width={428}
                height={285}
                layout="responsive"
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
              {width > 700 && (
                <>
                  <div
                    className={"menu__image--1"}
                    onMouseOver={() => {
                      setOverlayImageProps({
                        src: MenuImage1,
                        height: 4000,
                        width: 6000,
                      });
                      setShowImageOverlay(true);
                    }}
                    onMouseOut={() => {
                      setOverlayImageProps(undefined);
                      setShowImageOverlay(false);
                    }}
                  >
                    <ImageWithOverlay
                      placeholder="blur"
                      src={MenuImage1}
                      width={6000}
                      height={4000}
                      layout="responsive"
                    />
                  </div>
                  <div className={"menu__image--2"}>
                    <ImageWithOverlay
                      placeholder="blur"
                      src={MenuImage2}
                      width={6000}
                      height={4000}
                      layout="responsive"
                    />
                  </div>
                  <div className={"menu__image--3"}>
                    <ImageWithOverlay
                      placeholder="blur"
                      src={MenuImage3}
                      width={6000}
                      height={4000}
                      layout="responsive"
                    />
                  </div>
                </>
              )}
            </div>

            <div className={"relative pdf-viewer__wrapper md:mr-10"}>
              <PdfViewer
                url={"./menu.pdf"}
                width={width < 700 ? width - 50 : width / 2 - 50}
              />
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
                width={6000}
                height={4000}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--2"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage2}
                width={5870}
                height={3913}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--3"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage3}
                width={5583}
                height={3722}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--4"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage4}
                width={3733}
                height={5599}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--5"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage5}
                width={5184}
                height={3456}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--6"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage6}
                width={6000}
                height={4000}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--7"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage7}
                width={6000}
                height={4000}
                layout="responsive"
              />
            </div>
            <div className={" image-gallery__image--8"}>
              <ImageWithOverlay
                placeholder="blur"
                src={GalleryImage8}
                width={5597}
                height={3731}
                layout="responsive"
              />
            </div>
          </div>
          <footer
            className={"mx-5 py-8  px-4 border-t border-white "}
            id="contact"
          >
            <div className="grid grid-cols-2 contact gap-10 ">
              <div className={"flex-1"}>
                <h2 className={"font-bold	"}>{t("contact.title")}</h2>
                <p>{t("contact.address.name")}</p>
                <p>{t("contact.address.street")}</p>
                <p>{t("contact.address.city")}</p>
                <p>{t("contact.phone")}</p>
                <p>{t("contact.email")}</p>
              </div>
              <div className={"flex-1"}>
                <h2 className={"font-bold	"}>{t("openingTime.title")}</h2>
                <p>{t("openingTime.content.normal.days")}</p>{" "}
                <p>{t("openingTime.content.normal.times")}</p>
                <p className="mt-4">{t("openingTime.content.weekend.days")}</p>
                <p>{t("openingTime.content.weekend.times")}</p>
              </div>
            </div>

            <div className="flex flex-row w-full justify-center mt-9 gap-10">
              <div className={"w-12 h-12"}>
                <Image src={facebook} />
              </div>
              <div className={"w-12 h-12"}>
                <Image src={instagram} />
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default Home;
