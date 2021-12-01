import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";
import { Portal } from "react-portal";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CloseIcon from "./../public/assets/close.svg";
export interface ImageOverlayItem {
  src: StaticImageData;
  height: number;
  width: number;
}
const ImageWithOverlay: FC<ImageProps> = ({ ...imageProps }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && (
        <Portal>
          <div
            className={` fixed	w-screen h-screen z-50 inset-0 transform -translate-y-full`}
          >
            <div className={"bg-black w-full h-full	"}>
              <div className="absolute right-1 top-1 p-2 z-10">
                <Image
                  src={CloseIcon}
                  onClick={() => setVisible(false)}
                  alt="close"
                />
              </div>
              <TransformWrapper>
                <TransformComponent>
                  <div className={` h-screen flex items-center justify-center`}>
                    <Image
                      {...imageProps}
                      height={(imageProps!.height! as number) * 2}
                      width={(imageProps!.width! as number) * 2}
                      layout="intrinsic"
                    />
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
        </Portal>
      )}

      <Image onClick={() => setVisible(true)} {...imageProps} />
    </>
  );
};

export default ImageWithOverlay;
