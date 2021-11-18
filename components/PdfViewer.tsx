import { FC, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Slider from "react-slick";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface PdfViewerProps {
  url: string;
  width?: number;
  height?: number;
}
const PdfViewer: FC<PdfViewerProps> = ({ url, width, height }) => {
  const [numPages, setNumPages] = useState<number>(0);
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
      pages.push(<Page pageNumber={i} width={width} height={height} key={i} />);
    }
    return pages;
  };

  return (
    <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
      <Slider {...settings}>{renderPages()}</Slider>
    </Document>
  );
};

export default PdfViewer;
