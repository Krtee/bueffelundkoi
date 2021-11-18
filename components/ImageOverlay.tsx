import Image from "next/image";
import { FC } from "react";
import { useWindowDimensions } from "../utils/useWindowDimension";

export interface ImageOverlayProps {
  imageProps: ImageOverlayItem;
  visible: boolean;
  x: number;
  y: number;
}

export interface ImageOverlayItem {
  src: StaticImageData;
  height: number;
  width: number;
}
const ImageOverlay: FC<ImageOverlayProps> = ({ imageProps, visible, x, y }) => {
  const { width, height } = useWindowDimensions();

  return (
    <div
      className={`fixed pointer-events-none	w-3/4 z-50 top-0 left-0${
        visible ? "" : "hidden"
      }`}
      style={{
        transform: `translate(${x - width / 4}px, ${y - height / 4}px)`,
      }}
    >
      <Image
        src={imageProps.src}
        height={imageProps.height}
        width={imageProps.width}
      />
    </div>
  );
};

export default ImageOverlay;
