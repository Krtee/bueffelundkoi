import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { Portal } from "react-portal";
import GalleryImage7 from "./../public/assets/images/bildergalerie_7.jpg";
import gyozaImage from "./../public/assets/images/speisen_1.jpg";
import logo from "./../public/assets/logo.png";
import { NavLink } from "./NavLink";

interface NavOverlayProps {
  isOpen: boolean;
  onClose(): void;
  locale: string;
  setLocale(locale: string): void;
  onNavigate(id: string): void;
}

const NavOverlay: FC<NavOverlayProps> = ({
  isOpen,
  locale,
  setLocale,
  onClose,
  onNavigate,
}) => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  return (
    <Portal>
      <div
        className={`transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } absolute nav-overlay h-screen w-screen bg-primary transition-transform overflow-hidden	`}
      >
        <div className={"w-full h-full flex flex-col pop-up-content"}>
          <div className={"relative m-w-3/4 w-3/4 m-auto mt-20"}>
            <Image
              src={logo}
              alt={t("nav.logo")}
              layout="responsive"
              width={19}
              height={7}
            />
          </div>
          <div className="absolute transform rotate-90 -left-1/3 right-1/4 top-32 -z-20">
            <Image
              src={gyozaImage}
              width={6000}
              height={4000}
              layout="responsive"
            />
          </div>
          <div
            className={
              "absolute transform  rotate-90  translate-y-20 -left-10 right-10 top-1/2 -z-10"
            }
          >
            <Image
              src={GalleryImage7}
              width={6000}
              height={4000}
              layout="responsive"
            />
          </div>

          <div className={"w-full flex-1 flex flex-col"}>
            <nav
              className={
                "text-white flex flex-col w-full justify-end gap-6 text-xl font-bold	 py-16"
              }
            >
              <NavLink
                href="menu"
                locale={locale}
                onClick={() => onNavigate("menu")}
              >
                {t("nav.menu")}
              </NavLink>
              <NavLink
                href="about"
                locale={locale}
                onClick={() => onNavigate("about")}
              >
                {t("nav.about")}
              </NavLink>
              <NavLink
                href="gallery"
                locale={locale}
                onClick={() => onNavigate("gallery")}
              >
                {t("nav.gallery")}
              </NavLink>
              <NavLink
                href="contact"
                locale={locale}
                onClick={() => onNavigate("contact")}
              >
                {t("nav.contact")}
              </NavLink>
              <NavLink
                href="imprint"
                locale={locale}
                onClick={() => onNavigate("imprint")}
              >
                {t("nav.imprint")}
              </NavLink>{" "}
              <NavLink
                href="privacy"
                locale={locale}
                onClick={() => onNavigate("privacy")}
              >
                {t("nav.privacy")}
              </NavLink>
            </nav>
            <p
              className="w-max py-2 px-24 mt-10 mx-auto text-white text-xl rig-shaded border-t border-b"
              onClick={() => onClose()}
            >
              {t("general.back")}
            </p>
            <div
              className={"flex flex-row gap-2 text-white mt-20 text-xl mx-5 "}
            >
              <p
                className="rig-shaded"
                onClick={() => {
                  setLocale("en");
                  router.push("/en", undefined, { locale: false });
                }}
              >
                {t("general.eng")}
              </p>
              <p className="rig-shaded">|</p>
              <p
                className="rig-shaded"
                onClick={() => {
                  setLocale("de");
                  router.push("/de", undefined, { locale: false });
                }}
              >
                {t("general.de")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default NavOverlay;
