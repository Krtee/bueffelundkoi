import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import React, { FC } from "react";
import facebook from "./../public/assets/facebook.svg";
import instagram from "./../public/assets/instagram.svg";

const Footer: FC<{}> = () => {
  const { t } = useTranslation("common");

  return (
    <footer className={"mx-5 py-8  px-4 border-t border-white "} id="contact">
      <div className="grid grid-cols-2 contact gap-10 ">
        <div className={"flex-1 flex flex-col"}>
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.address.name")}</p>
          <p>{t("contact.address.street")}</p>
          <p>{t("contact.address.city")}</p>
          <p>{t("contact.phone")}</p>
          <p>{t("contact.email")}</p>
          <br />
          <Link href="/imprint">{t("nav.imprint")}</Link>
          <Link href="/privacy">{t("nav.privacy")}</Link>
        </div>
        <div className={"flex-1"}>
          <h2>{t("openingTime.title")}</h2>
          <p>{t("openingTime.content.normal.days")}</p>{" "}
          <p>{t("openingTime.content.normal.times")}</p>
          <p className="mt-4">{t("openingTime.content.weekend.days")}</p>
          <p>{t("openingTime.content.weekend.times")}</p>
        </div>
      </div>

      <div className="flex flex-row w-full justify-center mt-9 gap-10">
        <div className={"w-12 h-12"}>
          <Image
            src={facebook}
            onClick={() =>
              router.push("https://www.facebook.com/bueffelundkoi")
            }
            alt={"facebook"}
          />
        </div>
        <div className={"w-12 h-12"}>
          <Image
            src={instagram}
            onClick={() =>
              router.push("https://www.instagram.com/bueffelundkoi/")
            }
            alt="instagram"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;