import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";
import { Portal } from "react-portal";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useMouseCoords } from "../utils/useMouseCoords";
import { useWindowDimensions } from "../utils/useWindowDimension";

export interface ImageOverlayItem {
  src: StaticImageData;
  height: number;
  width: number;
}
const ImageWithOverlay: FC<ImageProps> = ({ ...imageProps }) => {
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const { x, y } = useMouseCoords();

  return (
    <>
      {visible && (
        <Portal>
          <div
            className={` fixed	w-screen h-screen z-50 inset-0 transform -translate-y-full`}
          >
            <TransformWrapper>
              <TransformComponent>
                <div className={` h-screen`}>
                  <Image {...imageProps} layout="intrinsic" />
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>
          {/*<div
            className={`flat fixed	w-3/4 z-50 top-0 left-0 `}
            style={{
              transform: `translate(${x - width / 2}px, ${
                y - height * 1.5
              }px) `,
            }}
          >
            <Image {...imageProps} />
          </div>*/}
        </Portal>
      )}

      <Image onClick={() => setVisible(true)} {...imageProps} />
    </>
  );
};

export default ImageWithOverlay;
