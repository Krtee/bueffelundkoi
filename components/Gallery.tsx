import { useTranslation } from "next-i18next";
import { FC } from "react";
import ImageWithOverlay from "../components/ImageWithOverlay";
import GalleryImage1 from "./../public/assets/images/bildergalerie_1.jpg";
import GalleryImage2 from "./../public/assets/images/bildergalerie_2.jpg";
import GalleryImage3 from "./../public/assets/images/bildergalerie_3.jpg";
import GalleryImage4 from "./../public/assets/images/bildergalerie_4.jpg";
import GalleryImage5 from "./../public/assets/images/bildergalerie_5.jpg";
import GalleryImage6 from "./../public/assets/images/bildergalerie_6.jpg";
import GalleryImage7 from "./../public/assets/images/bildergalerie_7.jpg";
import GalleryImage8 from "./../public/assets/images/bildergalerie_8.jpg";

interface GalleryProps {}

const Gallery: FC<GalleryProps> = () => {
  const { t } = useTranslation("common");

  return (
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
          alt={"outdoor area"}
        />
      </div>
      <div className={" image-gallery__image--2"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage2}
          width={587}
          height={391}
          alt={"indoor area"}
        />
      </div>
      <div className={" image-gallery__image--3"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage3}
          width={558}
          height={372}
          alt={"outdoor area - different angle"}
        />
      </div>
      <div className={" image-gallery__image--4"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage4}
          width={373}
          height={559}
          alt="sushi plate - Fische für alle"
        />
      </div>
      <div className={" image-gallery__image--5"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage5}
          width={518}
          height={345}
          alt="lampignons"
        />
      </div>
      <div className={" image-gallery__image--6"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage6}
          width={600}
          height={400}
          alt={"Appetizer - Papaya Salad"}
        />
      </div>
      <div className={" image-gallery__image--7"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage7}
          width={600}
          height={400}
          alt={"close-up of two different Bowls"}
        />
      </div>
      <div className={" image-gallery__image--8"}>
        <ImageWithOverlay
          placeholder="blur"
          src={GalleryImage8}
          width={559}
          height={373}
          alt={"Homemade Drink - Wildberry Soda"}
        />
      </div>
    </div>
  );
};

export default Gallery;
