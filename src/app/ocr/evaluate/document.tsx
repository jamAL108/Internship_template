'use client'
import { useCallback, useState , useEffect } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Skeleton from '../../../components/translateCorrection/skelFordocx'
import Error from '../../../components/translateCorrection/error'
import { ScrollArea } from '@/components/ui/scroll-area';

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
  pageNumber:number
}

const Sample:React.FC<documentProps> =(props) =>{
  const { pageNumber} = props
  const [document,setdocument] = useState<Blob | null>(null)
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

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
    const storedBase64String = localStorage.getItem("sourceDoc");
    // console.log(storedBase64String)
    if (storedBase64String) {
      const byteCharacters = atob(storedBase64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const restoredBlob = new Blob([byteArray], { type: "text/plain" });
      setdocument(restoredBlob)
      // console.log("SOURCE DONE")
    }
  },[])


  useEffect(()=>{
    if(document!==null){
      const url = window.URL.createObjectURL(document);
      setURL(url)
     }
  },[document])
  return (
    <div className="w-[100%] h-[90vh]">
        <ScrollArea className="w-[100%] md:h-[100vh]" ref={setContainerRef}>
          <Document  loading={Skeleton} error={Error} file={URL} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            <Page scale={1} pageNumber={pageNumber} width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth} />
          </Document>
        </ScrollArea>
      </div>
  );
}


export default Sample