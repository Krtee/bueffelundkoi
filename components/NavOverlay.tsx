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
        } absolute nav-overlay h-screen w-screen bg transition-transform overflow-hidden max-h-screen	`}
      >
        <div className={"w-full h-full flex flex-col pop-up-content"}>
          <div className="absolute transform rotate-90 -left-1/4 right-1/4 top-48  -z-20">
            <Image
              src={gyozaImage}
              width={600}
              height={400}
              alt="Appetizer - Gyoza"
            />
          </div>
          <div
            className={
              "absolute transform  rotate-90  translate-y-20 -left-10 right-20 top-1/2 -z-10"
            }
          >
            <Image
              src={GalleryImage7}
              width={600}
              height={400}
              alt={"close-up of two different Bowls"}
            />
          </div>

          <div className={"w-full flex-1 flex flex-col justify-between my-20"}>
            <div className={"relative m-w-3/4 w-3/4 mx-auto"}>
              <Image src={logo} alt={t("nav.logo")} />
            </div>
            <nav
              className={
                "text-white flex flex-col w-full justify-end gap-6 text-xl font-bold my-4"
              }
              suppressHydrationWarning
            >
              <NavLink
                href="menu"
                locale={locale}
                onClick={() => onNavigate("menu")}
              >
                {t("nav.menu")}
              </NavLink>
              <NavLink href={"/booking/newreservation"} locale={locale}>
                {t("nav.booking")}
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
              </NavLink>
              <NavLink
                href="privacy"
                locale={locale}
                onClick={() => onNavigate("privacy")}
              >
                {t("nav.privacy")}
              </NavLink>
            </nav>
            <p
              className="w-max py-2 px-24 mx-auto text-white rig-shaded border-t border-b my-4"
              onClick={() => onClose()}
            >
              {t("general.back")}
            </p>
            <div className={"flex flex-row gap-2 text-white  my-4 "}>
              <p
                className="rig-shaded"
                onClick={() => {
                  setLocale("en");
                  router.push("/en" + router.pathname, undefined, {
                    locale: false,
                  });
                }}
              >
                {t("general.eng")}
              </p>
              <p className="rig-shaded">|</p>
              <p
                className="rig-shaded"
                onClick={() => {
                  setLocale("de");
                  router.push("/de" + router.pathname, undefined, {
                    locale: false,
                  });
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
