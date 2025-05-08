import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FC } from "react";
import { imageStyles } from "../../utils/variables";
import AboutUs from "./../public/assets/images/ueber_uns.jpg";

const About: FC<{}> = () => {
  const { t } = useTranslation("common");

  return (
    <div className={"  md:flex md:flex-row "} id={"about"}>
      <div className={"m-10 flex-2 "}>
        <h1 className="text-2xl whitespace-nowrap md:text-7xl md:transform md:translate-x-36 md:text-right">
          {t("about.title").toUpperCase()}
        </h1>
        <p className="text-justify whitespace-pre-line leading-5	">
          {t("about.content")}
        </p>
      </div>

      <div className="w-full flex-3 md:-z-10">
        <Image
          placeholder="blur"
          src={AboutUs}
          style={imageStyles}
          alt="Anh Xuan Nguyen"
        />
      </div>
    </div>
  );
};

export default About;
