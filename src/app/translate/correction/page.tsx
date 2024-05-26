'use client';
import React, { useEffect, useState } from 'react'
import Nav from '../../../components/commonComponent/nav'
import Correction from './correction'
import Skeleton from './skeleton';

type FileState = Blob | null

interface TargetParaTypes {
  original: string,
  translated: string,
  dummy:string
}

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sourceFile, setsourcefile] = useState<FileState>(null)
  const [targetfile, settargetfile] = useState<TargetParaTypes[]>([])
  const [filename, setfilename] = useState<string>('')
  const [run, setrun] = useState<boolean>(false)
  const [targetBlob, settargetBlob] = useState<FileState>(null);


  const [documentload , setdocumentload] = useState<boolean>(false) 

  useEffect(() => {
    const storedBase64String = localStorage.getItem("sourceDoc");
    if (storedBase64String) {
      const byteCharacters = atob(storedBase64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const restoredBlob = new Blob([byteArray], { type: "text/plain" });
      setsourcefile(restoredBlob)
    }

    if (window.innerWidth < 789) {
      setrun(false)
    } else {
      // console.log("CHECKKKK")
      let CheckExpirtyforTour = localStorage.getItem('votumtranslateCorrectionTour')
      let parsedContent = CheckExpirtyforTour ? JSON.parse(CheckExpirtyforTour) : null
      // console.log(parsedContent)
      if (parsedContent!==null) {
        const currentTime = new Date().getTime();
        const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
        if ((currentTime - parsedContent.timestamp) > twoDaysInMilliseconds) {
          setrun(true)
          const currentTime: number = new Date().getTime();
          const tokenData = {
            timestamp: currentTime,
          };
          localStorage.setItem('votumtranslateCorrectionTour', JSON.stringify(tokenData))
        } else {
          setrun(false)
        }
      } else {
        setrun(true)
        const currentTime: number = new Date().getTime();
        const tokenData = {
          timestamp: currentTime,
        };
        localStorage.setItem('votumtranslateCorrectionTour', JSON.stringify(tokenData))
      }
    }
  }, []);

  useEffect(() => {
    API()
  }, [])













  const API = async () => {
    try{
    setdocumentload(true)
    // console.log("OCCUREDD")
    const Temp2 = localStorage.getItem('TargetDoc')
    const item2 = Temp2 ? JSON.parse(Temp2) : null

    // console.log(item2)

    const Temp3 = localStorage.getItem('newtargetStore')
    const item3 = Temp3 ? JSON.parse(Temp3) : null

    // console.log(item3)
    
    let sample=[]
    let reducedSampletranslated=[...item3]
    let k=0;

    // console.log(reducedSampletranslated)

    for(let i=0;i<item2.translated_paragraphs.length;i++){
       let pagewise =[]
      for(let j=0;j<item2.translated_paragraphs[i].length;j++){
         pagewise.push(reducedSampletranslated[k++].translated);
      }
      sample.push(pagewise)
    }


    // console.log(sample)


    const data = {
      // bboxes:item2.bboxes,
      filename:item2.filename,
      filetype:item2.filetype,
      message:item2.message,
      original_paragraphs:item2.original_paragraphs,
      translated_paragraphs:sample,
      downloadtype:'pdf'
    }
    const URL = "https://translator.thevotum.com/download_result"

      fetch('https://translator.thevotum.com/download_result', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          // console.log(response)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(function (blob) {
          // console.log(blob)
          setdocumentload(false)
          setIsLoading(false);
          settargetBlob(blob)
        })
        .catch(function (error) {
          setdocumentload(false)
          setIsLoading(false);
          // console.error('There has been a problem with your fetch operation:', error);
        });

      }catch(err){
        console.log(err)
      } 
     }

  return (
    <div className='!overflow-x-hidden flex items-center justify-center flex-col md:w-[100%] base:w-[100%]'>
      <Nav />
      {isLoading ? (
        <Skeleton />
      ) : (
        <Correction run={run} source={sourceFile} target={targetBlob} refreshfunction={API} documentload={documentload}/>
      )}
    </div>
  )
}

export default Page