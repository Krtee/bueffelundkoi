import Image from "next/image";
import { FC, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Portal } from "react-portal";
import Slider from "react-slick";
import CloseIcon from "./../public/assets/close.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface PdfViewerProps {
  url: string;
  width?: number;
  height?: number;
}
const PdfViewer: FC<PdfViewerProps> = ({ url, width, height }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const renderPages = (): JSX.Element[] => {
    let pages: JSX.Element[] = [];
    for (let i = 1; i < numPages; i++) {
      pages.push(
        <Page
          pageNumber={i}
          width={width}
          height={height}
          key={i}
          onClick={() => setVisible(true)}
        />
      );
    }
    return pages;
  };

  return (
    <div>
      {visible && (
        <Portal>
          <div
            className={` fixed	w-screen h-screen z-50 inset-0 transform -translate-y-full`}
          >
            <div className={"bg-black w-full h-full	flex flex-col"}>
              <div className="flex flex-row justify-end p-2">
                <Image src={CloseIcon} onClick={() => setVisible(false)} />
              </div>
              <object
                className={"flex-1"}
                data={url}
                type="application/pdf"
              ></object>
            </div>
          </div>
        </Portal>
      )}
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Slider {...settings}>{renderPages()}</Slider>
      </Document>
    </div>
  );
};

export default PdfViewer;
