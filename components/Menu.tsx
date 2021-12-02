import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React, { FC } from "react";
import { useWindowDimensions } from "../utils/useWindowDimension";
import MenuImage1 from "./../public/assets/images/speisen_1.jpg";
import MenuImage2 from "./../public/assets/images/speisen_2.png";
import MenuImage3 from "./../public/assets/images/speisen_3.jpg";
import ImageWithOverlay from "./ImageWithOverlay";
const PdfViewer = dynamic(() => import("./PdfViewer"));

const Menu: FC<{}> = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation("common");

  return (
    <div className={" pt-5 mt-20 md:flex md:flex-row md:gap-10"} id={"menu"}>
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
        <div className=" border-t border-b pdf-viewer__download my-4">
          <a href="./menu.pdf" download>
            <p className="mx-auto text-white text-center rig-shaded py-2 ">
              {t("menu.download")}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
