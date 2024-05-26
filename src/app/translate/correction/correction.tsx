'use client';
import React, { useState, useRef, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CorrectionProps } from '../../../interface/interface'
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes";

import DocumentShow from './documentShow'

import SkelForDocx from '@/components/translateCorrection/skelFordocx';

import Joyride, { Step } from "react-joyride";

import Image from 'next/image'

import englishToHindi from '../../../apiReq/englishtohindi'


import hindiToEnglish from '../../../apiReq/hindiToEnglish'

import { useRouter } from 'next/navigation';

import { ColorRing } from 'react-loader-spinner'

import ClipLoader from "react-spinners/ClipLoader";

import { IndicTransliterate, Language } from "../../../@ai4bharat/indic-transliterate";

interface TargetParaTypes {
  original: string,
  translated: string,
  dummy: string
}

interface TargetSTORAGE {
  bboxes: any[],
  filename: string,
  filetype: string,
  message: string,
  original_paragraphs: string[],
  translated_paragraphs: string[]
}

interface CorrectionProp {
  source: Blob | null,
  target: Blob | null,
  refreshfunction: () => void
  documentload: boolean,
  run:boolean
}

const Correction: React.FC<CorrectionProp> = (props) => {
  const { source, target, refreshfunction, documentload, run } = props
  const { toast } = useToast()

  const router = useRouter()
  const [steps, setsteps] = useState<Step[]>([
    {
      content: <h2 className='text-pop w-[full] text-[1rem] font-[550]'>Let&apos;s have a quick tour to our editorial</h2>,
      locale: { skip: <strong>SKIP</strong> },
      placement: "center",
      target: "body"
    },
    {
      content: <h2 className='text-pop  w-[full] text-[0.8rem] tracking-wide'>Here you will get the preview of source and result documents</h2>,
      placement: "right",
      target: "#step-1",
      title: "Document Preview"
    },
    {
      content: <h2 className='text-pop  w-[full] text-[0.8rem] tracking-wide'>Check all the translated Paragraph and make any changes if you need</h2>,
      placement: "left",
      target: "#step-2",
      title: "Editorial"
    },
    {
      content: <h2 className='text-pop  w-[full] text-[0.8rem] tracking-wide'>Try with new document and explore the translation function</h2>,
      placement: "bottom",
      target: "#step-3",
      title: "Try New Document"
    },
    {
      content: <div className='text-pop  w-full flex justify-center items-center flex-col gap-3'>
        <h2 className='w-[100%] text-[0.8rem] text-left'>After making changes , refresh the document to get the updated document in preview section.</h2>
      </div>,
      placement: "bottom",
      target: "#step-4",
      title: "Refresh the document"
    },
    {
      content: <div className='text-pop  w-full flex justify-center items-center flex-col gap-3'>
        <h2 className='w-[100%] text-[0.8rem] text-left'>Download the edited document in PDF/DOCX Format</h2>
        <img className='w-[100%] h-[90px]' src='/images/joyrideDownload.png' alt='efkn' />
      </div>,
      placement: "bottom",
      target: "#step-5",
      title: "Download in any format"
    },
    // {
    //   content: <h2>Here is fifth step!</h2>,
    //   placement: "bottom",
    //   target: "#step-5",
    //   title: "Fifth step"
    // },
    // {
    //   content: <h2>Here is six step!</h2>,
    //   placement: "bottom",
    //   target: "#step-6",
    //   title: "Six step"
    // },
  ]);

  const [targetfile, settargetfile] = useState<TargetSTORAGE | null>(null)


  const [targetArray, settargetArray] = useState<TargetParaTypes[] | []>([])

  const [currentitem, setcurrentitem] = useState<string>('')
  const [downloadFORMAT, setdownloadFORMAT] = useState<string>('.docx')
  const [downloadfilename, setdownloadfilename] = useState<string>('')
  const [inputWidth, setInputWidth] = useState<number | string>('100%'); // Initially set to full width
  const inputRef = useRef<HTMLInputElement>(null);
  const [flag, setflag] = useState<boolean>(false)

  const [targetLanguage, settargetlanguage] = useState<string>('')


  const { resolvedTheme } = useTheme();

  // useEffect(()=>{
  //   console.log(run)
  // },[run])

  useEffect(() => {
    const Temp2 = localStorage.getItem('TargetDoc')
    const item2 = Temp2 ? JSON.parse(Temp2) : null
    if (item2) {
      settargetfile(item2)
    }

    const Temp3 = localStorage.getItem('newtargetStore')
    const item3 = Temp3 ? JSON.parse(Temp3) : null
    if (item3) {
      settargetArray(item3)
    }


    const LanguageFind = localStorage.getItem('votumtranslatetargetLang')
    const actualLanguage = LanguageFind ? LanguageFind : ''
    if (actualLanguage) {
      settargetlanguage(actualLanguage)
    }
  }, [])


  const changeitem = (str: string) => {
    if (str === currentitem) {
      setcurrentitem('')
    } else {
      setcurrentitem(str)
    }
  }


  function truncatefunction(str: string, maxLength = 62) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + "...";
  }

  const resizeInput = (): void => {
    if (inputRef.current) {
      setdownloadfilename(inputRef.current.value)
      const valueLength = inputRef.current.value.length;
      const fontSize = parseFloat(window.getComputedStyle(inputRef.current).fontSize || '16'); // Default font size

      // Calculate the new width based on content and font size
      const newWidth = (valueLength * fontSize) + 20; // Add 20 for padding

      // Set width with max-width check
      if (newWidth <= 300) { // Assuming max-width is 300px
        setInputWidth(`${newWidth}px`);
      } else {
        setInputWidth('300px');
      }
    }
  };



  const API = async () => {
    const Temp2 = localStorage.getItem('TargetDoc')
    const item2 = Temp2 ? JSON.parse(Temp2) : null

    const Temp3 = localStorage.getItem('newtargetStore')
    const item3 = Temp3 ? JSON.parse(Temp3) : null

    let sample = []
    let reducedSampletranslated = [...item3]
    let k = 0;

    for (let i = 0; i < item2.translated_paragraphs.length; i++) {
      let pagewise = []
      for (let j = 0; j < item2.translated_paragraphs[i].length; j++) {
        pagewise.push(reducedSampletranslated[k++].translated);
      }
      sample.push(pagewise)
    }

    const data = {
      // bboxes:item2.bboxes,
      filename: item2.filename,
      filetype: item2.filetype,
      message: item2.message,
      original_paragraphs: item2.original_paragraphs,
      translated_paragraphs: sample,
      downloadtype: downloadFORMAT.substring(1, downloadFORMAT.length)
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
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadfilename.length !== 0 ? `${downloadfilename}${downloadFORMAT}` : `Translated_document${downloadFORMAT}`;
        a.click();
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: "Server Error Please Try again",
          description: "There has been a problem with your fetch operation"
        })
        // console.error('There has been a problem with your fetch operation:', error);
      });
  }

  ////2xl:h-[min(100vh-4rem)]
  return (
    <div className='w-[100vw] bg-[#FAFAFA] dark:bg-transparent !overflow-x-hidden flex justify-center items-center '>

      <Joyride
        continuous
        callback={() => { }}
        run={run}
        steps={steps}
        styles={{
          options: {
            primaryColor: '#7C3AED',
            width: 300,
            zIndex: 1000,
          },
          buttonNext: {
            fontSize: 13,
            padding: '10px'
          },
          buttonBack: {
            fontSize: 14,
            marginRight: "12px"
          },
          tooltipTitle: {
            fontSize: 16,
            fontWeight: 550,
            fontFamily: 'Poppins , sans-serif'
          }
        }}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
      />

      <div className='font-pop dark:text-[#d3d2d2] !overflow-x-hidden  w-[min(90vw,1900px)] base:h-auto  flex justify-start items-center flex-col'>
        {/* ////2xl:h-[min(100vh-4rem)] */}
        <div className='w-[100%] base:h-[3.2rem] md:h-[2.6rem] rounded-md mt-[10px] bg-[#F3F4F6] dark:bg-[#1F2937]'></div>

        <div className='w-[100%] base:min-h-[100vh]  md:h-auto flex items-center justify-between relative gap-[2%] '>
          <div id='step-1' className='w-[49%] base:hidden md:inline-block md:h-[90vh] absolute top-[-2.48rem] left-0 '>
            {/* 2xl:h-auto  */}
            <Tabs defaultValue="target" className="w-[100%]">
              <TabsList className='flex w-[100%] justify-center items-center'>
                <TabsTrigger className='min-w-[35%] text-[0.82rem]' value="source">Source Document</TabsTrigger>
                <TabsTrigger className='min-w-[35%] text-[0.82rem]' value="target">Result Document</TabsTrigger>
              </TabsList>

              <TabsContent value="source" className='w-[100%] md:h-[100%] flex justify-start items-center mt-[10px] '>
                {/* 2xl:h-auto  */}
                <DocumentShow document={source} />
              </TabsContent>

              <TabsContent value="target" className='w-[100%] md:h-[100%] border-solid border-2 flex justify-start items-center mt-[7px] relative'>
                {/* 2xl:h-auto  */}
                {documentload === true && (
                  <div className='w-[100%] !h-[90vh] absolute top-0 left-0 !z-50 bg-[#F3F4F6]'>
                    <div className='w-[100%] !h-[90vh]   flex justify-center items-center'>
                      <ClipLoader
                        color={"#5B0888"}
                        loading={true}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  </div>
                )}
                <DocumentShow document={target} />
              </TabsContent>
            </Tabs>
          </div>

          <div className='base:w-[100%] base:min-h-[100vh] md:min-h-[calc(600px_-_2.6rem)]   [max-width:500px]:w-[70%] md:w-[49%] md:h-[90vh]   absolute base:top-[-3.1rem] md:top-[-2.55rem] right-0  '>
            {/* 2xl:h-auto */}
            <div className='w-full base:h-[3.2rem] md:h-[2.6rem] base:pr-[10px] md:pr-[50px] bg-transparent flex justify-end items-center base:gap-6 md:gap-10'>
              <Button id='step-3' className='bg-background dark:text-[#d3d2d2] text-black h-[70%] hover:bg-background focus:bg-background active:bg-background text-[0.77rem] flex items-center justify-center px-5' onClick={async (e) => {
                e.preventDefault()
                localStorage.removeItem('TargetDoc')
                localStorage.removeItem('newtargetStore')
                localStorage.removeItem('votumtranslatetargetLang')
                localStorage.removeItem('sourceDoc')
                localStorage.removeItem('votumTranslateEvaluateContent')
                localStorage.removeItem('votumTranslateEvaluatePageWise')
                localStorage.removeItem('votumTranslateFormData')
                router.push('/translate')
                //// changes done herer
              }}>
                Try new doc
              </Button>
              <Button id='step-4' className='bg-background dark:text-[#d3d2d2] text-black h-[70%] hover:bg-background focus:bg-background active:bg-background text-[0.77rem] base:hidden md:flex items-center justify-center px-5' onClick={async (e) => {
                e.preventDefault()
                refreshfunction()   //// changes done herer
              }}>
                Refresh Document
              </Button>
              {/* <Button className='bg-background dark:text-[#d3d2d2]  text-black  h-[70%] hover:bg-background focus:bg-background active:bg-background text-[0.77rem] flex items-center justify-center px-7' 
            onClick={(e)=>{
               
            }}>
              Download
            </Button> */}



              <Drawer>
                <DrawerTrigger id='step-5' className='rounded-md bg-background dark:text-[#d3d2d2]  text-black  h-[70%] hover:bg-background focus:bg-background active:bg-background text-[0.77rem] flex items-center justify-center px-7'
                  onClick={(e) => {
                  }}>Download</DrawerTrigger>
                <DrawerContent className='base:h-[65%] md:h-[350px]'>
                  <DrawerHeader>
                    <DrawerTitle>Download The Document</DrawerTitle>
                    <DrawerDescription>Download in PDF/DOCX.</DrawerDescription>
                  </DrawerHeader>

                  <div className='w-[100%] flex base:items-center md:items-start md:justify-start md:flex-row base:flex-col base:gap-4 mymobile:gap-10 md:gap-auto  base:mt-[20px] mymobile:mt-[30px] md:mt-auto '>

                    <div className='base:w-[100%] md:w-[35%] flex base:justify-center md:justify-start md:pl-20 items-center p-5 base:gap-16 md:gap-10'>

                      <div
                        style={downloadFORMAT === '.docx' ? resolvedTheme === 'dark' ? { borderColor: "rgb(31,41,55)", backgroundColor: "rgba(31,41,55,0.5)" } : { borderColor: "#F3F4F6", backgroundColor: "rgba(31,41,55,0.3)" } : { borderStyle: "none", borderColor: "none", backgroundColor: "transparent" }}

                        className='base:w-[110px] base:h-[125px]  md:w-[140px] md:h-[150px] border-dashed rounded-sm border-2 flex justify-center items-center'>
                        <img className='base:w-[60px] base:h-[60px] mymobile:w-[70px] mymobile:h-[70px] md:w-[90px] md:h-[90px] m-auto cursor-pointer' onClick={(e) => {
                          setdownloadFORMAT('.docx')
                        }} src="/images/docxIMG.png" alt="vs" />
                      </div>

                      <div style={downloadFORMAT === '.pdf' ? resolvedTheme === 'dark' ? { borderColor: "rgb(31,41,55)", backgroundColor: "rgba(31,41,55,0.5)" } : { borderColor: "#F3F4F6", backgroundColor: "rgba(31,41,55,0.3)" } : { borderStyle: "none", borderColor: "none", backgroundColor: "transparent" }}

                        className='base:w-[110px] base:h-[125px]  md:w-[140px] md:h-[150px]  flex justify-center items-center border-dashed border-2 rounded-sm'>
                        <img className='base:w-[60px] base:h-[60px] mymobile:w-[70px] mymobile:h-[70px] md:w-[90px] md:h-[90px] cursor-pointer' onClick={(e) => {
                          setdownloadFORMAT('.pdf')
                        }} src="/images/pdfIMG.png" alt="vs" />
                      </div>
                    </div>

                    <div className='base:w[100%] md:w-[40%] flex p-5 justify-center gap-7  items-center flex-col '>

                      <div className='flex base:w-[95%] md:w-[85%] justify-end items-center gap-5 '>
                        <Button className='p-2 px-5' onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          API()
                        }}>Download</Button>
                        <DrawerClose asChild>
                          <Button className='p-2 px-5' variant="outline" onClick={(e) => {
                            setdownloadfilename('')
                            setInputWidth('100%')
                            setdownloadFORMAT('.docx')
                          }}>Cancel</Button>
                        </DrawerClose>
                      </div>
                    </div>

                  </div>
                  <DrawerFooter>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>


            </div>



            <Accordion id='step-2' type="single" collapsible className="w-full base:min-h-[100vh] md:min-h-[calc(600px_-_2.6rem)]  dark:mt-3 mt-4 md:h-[90vh] overflow-y-auto overflow-x-hidden accordionCOMP">
              {/* 2xl:h-auto */}
              {targetArray?.length !== 0 && targetArray?.map((item, key) => (
                <AccordionItem key={key}
                  className='bg-white dark:bg-inherit rounded-[5px] border-[1.4px] border-b-[5px] darK:border-b-[4px]  mb-[7px] dark:mb-[8px]'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    changeitem(`item-${key + 1}`)

                  }} value={`item-${key + 1}`}>
                  <AccordionTrigger className='text-[0.79rem] text-left hover:no-underline pl-[7px] pr-[7px]'>
                    {currentitem === `item-${key + 1}` ? item.original : truncatefunction(item.original)}
                  </AccordionTrigger>
                  <AccordionContent onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }} className='text-[0.79rem] p-1 bg-[#F3F4F6] dark:bg-[#1F2937] min-h-[100px] flex flex-col gap-2 '>
                    <h2 className='text-[0.80rem] p-[6px]'>{item.translated}</h2>
                    {targetLanguage === 'hindi' ? (
                       <IndicTransliterate
                       renderComponent={(props) => <Textarea className='border-2 border-primary ml-[6px] text-[0.94rem] focus:border-blue-500 focus:outline-none w-[80%] rounded-none p-3 min-h-[100px] h-auto' {...props} />}
                      value={item.dummy}
                       onChangeText={(text) => {
                        let arr = [...targetArray]
                        arr[key].dummy = text
                        settargetArray(arr)
                        console.log(arr)
                        localStorage.setItem('newtargetStore', JSON.stringify(arr))
                       }}
                       offsetX={10}
                       maxOptions={3}
                       lang='hi'
                   />
                    ) : (
                      <Textarea className='border-2 border-primary ml-[6px] text-[0.94rem] focus:border-blue-500 focus:outline-none w-[80%] rounded-none p-3 min-h-[100px] h-auto' value={item.dummy} onChange={(e) => {
                        let arr = [...targetArray]
                        arr[key].dummy = e.target.value
                        settargetArray(arr)
                        console.log(arr)
                        localStorage.setItem('newtargetStore', JSON.stringify(arr))
                      }} />
                    )}
                    <div className='p-[6px] flex gap-3 items-center '>
                      <Button style={currentitem === `item-${key + 1}` && flag === true ? { opacity: 0.6 } : { opacity: 1 }} className='h-[70%]  text-[0.77rem] flex items-center justify-center px-5'
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (item.dummy !== item.translated) {
                            let arr = [...targetArray]
                            const formdata = {
                              original: item.original,
                              translated: item.dummy
                            }
                            if (targetLanguage === 'hindi') {
                              console.log('englishToHindi')
                              await englishToHindi(formdata)
                            } else if (targetLanguage === 'english') {
                              console.log('hindiToEnglish')
                              await hindiToEnglish(formdata)
                            }
                            arr[key].translated = arr[key].dummy
                            settargetArray(arr)
                            localStorage.setItem('newtargetStore', JSON.stringify(arr))
                            setflag(true)
                            const timer = setTimeout(() => {
                              setflag(false);
                            }, 800);
                            return () => clearTimeout(timer);
                          }
                        }}
                      >
                        {currentitem === `item-${key + 1}` && flag === true && (
                          <ColorRing
                            visible={flag}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />
                        )}
                        Save Changes
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Correction