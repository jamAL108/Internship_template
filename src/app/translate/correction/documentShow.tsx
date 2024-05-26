'use client'
import { useCallback, useState , useEffect } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Skeleton from '../../../components/translateCorrection/skelFordocx'
import Error from '../../../components/translateCorrection/error'

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;


interface documentProps{
  document:Blob | null
}

const Sample:React.FC<documentProps> =(props) =>{
  const {document} = props
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [pageNumber , setpageNumber] = useState<number>(2)

  const [URL ,setURL] = useState<string>('')

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);


  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
 

  useEffect(()=>{
    if(document!==null){
      const url = window.URL.createObjectURL(document);
      setURL(url)
     }
  },[document])


  // 2xl:h-auto
  return (
    <div className="w-[100%] md:h-[40%] ">
        <div className="w-[100%] md:h-[90vh]  overflow-scroll overflow-x-hidden" ref={setContainerRef}>
          <Document  loading={Skeleton} error={Error} file={URL} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {/* <Page pageNumber={pageNumber} width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth} /> */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              />
            ))}
          </Document>
        </div>
      </div>
  );
}

export default Sample