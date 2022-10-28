import Image, { ImageProps, StaticImageData } from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { Portal } from "react-portal";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useWindowDimensions } from "../utils/useWindowDimension";
import CloseIcon from "./../public/assets/close.svg";
export interface ImageOverlayItem {
  src: StaticImageData;
  height: number;
  width: number;
}
const ImageWithOverlay: FC<ImageProps> = ({ ...imageProps }) => {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowDimensions();

  const setOverlayHeight = () => {
    if (overlayRef.current) {
      overlayRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    setOverlayHeight();
  }, [height, visible]);

  return (
    <>
      {visible && (
        <Portal>
          <div
            className={` fixed	w-screen  z-50 inset-0 transform -translate-y-full`}
            ref={overlayRef}
          >
            <div
              className={
                "bg-black w-full h-full	flex items-center justify-center"
              }
            >
              <div className="absolute right-1 top-1 p-2 z-10">
                <CloseIcon onClick={() => setVisible(false)} alt="close" />
              </div>
              <TransformWrapper>
                <TransformComponent>
                  <div className={`h-full flex items-center justify-center`}>
                    <Image
                      {...imageProps}
                      height={(imageProps!.height! as number) * 3}
                      width={(imageProps!.width! as number) * 3}
                      layout="intrinsic"
                    />
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
        </Portal>
      )}

      <Image onClick={() => setVisible(true)} {...imageProps} quality={50} />
    </>
  );
};

export default ImageWithOverlay;
