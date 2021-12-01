import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useWindowDimensions } from "../utils/useWindowDimension";
import logo from "./../public/assets/logo.png";
import MenuIcon from "./../public/assets/menu.svg";
import { NavLink } from "./NavLink";
import NavOverlay from "./NavOverlay";

interface NavigationBarProps {}

const NavigationBar: FC<NavigationBarProps> = ({}) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useTranslation("common");
  const [showPopUp, setShowPopUp] = useState(false);
  const [activeLang, setActiveLang] = useState<string>("de");
  return (
    <div className={"navigation"}>
      <div className={"flex flex-row mx-5 my-7"}>
        <div className="flex-1 md:flex-initial flex justify-start">
          <div className={"relative m-w-32 w-32 md:w-60 md:m-w-60 m-auto "}>
            <Image
              src={logo}
              alt={t("nav.logo")}
              layout="responsive"
              width={19}
              height={7}
              onClick={() => router.push("/")}
            />
          </div>
        </div>
        {width > 800 ? (
          <nav
            className={
              "border-t border-b border-solid mx-5 my-5 flex-1 flex justify-between pl-32 pr-6 items-center font-bold"
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
                className={"rig-shaded "}
                onClick={() => {
                  setActiveLang("en");
                  router.push("/en", undefined, { locale: false });
                }}
              >
                {t("general.eng")}
              </p>
              <p className={"rig-shaded "}>|</p>
              <p
                className={"rig-shaded "}
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
          <>
            <Image
              src={MenuIcon}
              onClick={() => setShowPopUp(true)}
              alt="open menu"
            />
            <NavOverlay
              isOpen={showPopUp}
              onClose={() => setShowPopUp(false)}
              locale={activeLang}
              setLocale={setActiveLang}
              onNavigate={() => setShowPopUp(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
