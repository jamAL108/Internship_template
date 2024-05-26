'use client';
import React, { useEffect, useState } from 'react'
import Nav from '@/components/commonComponent/nav'
import HighlightedParagraph from './HighlightedParagraph';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { ColorRing } from 'react-loader-spinner'
import { IndicTransliterate, Language } from "../../../@ai4bharat/indic-transliterate";
import "../../../@ai4bharat/indic-transliterate/dist/index.css";
import { X } from 'lucide-react';
import DocumentComponent from './document'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { intialOcrCorrection, upsertOcrCorrection } from '@/apiReq/OCRcorrection'


const Component = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [StorageData, setStorageData] = useState<any>(null);
    const [pageWiseData, setPageWiseData] = useState<any>(null)
    const [currentPage, setcurrentpage] = useState<number>(0);
    const [pageList, setpageList] = useState<number[]>([]);
    const [currentActiveWord, setcurrentActiveWord] = useState<string>("")
    const [request, setrequest] = useState<boolean>(false)
    const [sourceLanguage, setSourceLanguage] = useState<string>('')
    const [currentitem, setcurrentitem] = useState<string>('')
    const [saveChangesLoader, setSaveChangesLoader] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);

    useEffect(() => {
        const localData = localStorage.getItem('votumTranslateEvaluateContent');
        const parsingOfLocalData = localData ? JSON.parse(localData) : null;

        const pageWiseContent = localStorage.getItem('votumTranslateEvaluatePageWise');
        const parsingPageWiseContent = pageWiseContent ? JSON.parse(pageWiseContent) : null
        if (parsingPageWiseContent) {
            let tempArray: number[] = []
            parsingPageWiseContent.forEach((element: any, index: number) => {
                if (element.length !== 0) {
                    tempArray.push(index + 1);
                }
            });
            // console.log(tempArray)
            setcurrentpage(tempArray[0])
            setpageList(tempArray)
        }
        // console.log(parsingPageWiseContent)
        setPageWiseData(parsingPageWiseContent)
        setStorageData(parsingOfLocalData)

        const FormFromLocal = localStorage.getItem('votumTranslateFormData');
        const parseFormFromLocal = FormFromLocal ? JSON.parse(FormFromLocal) : null;
        setSourceLanguage(parseFormFromLocal?.src_lang)
    }, [])

    const extractNumberFromString = (inputString: string): number => {
        const pattern = /block_1_(\d+)/;

        // Use RegExp.exec to search for the pattern in the string
        const match = pattern.exec(inputString);

        // Check if the pattern is found
        if (match) {
            // Extract the number from the matched group
            const number = parseInt(match[1], 10);
            return number;
        } else {
            return 0;
        }
    };


    const API = async () => {
        setrequest(true);
        const formData = new FormData();
        const FormFromLocal = localStorage.getItem('votumTranslateFormData');
        const parseFormFromLocal = FormFromLocal ? JSON.parse(FormFromLocal) : null;
        const documentFile = retrieveBlobFromSessionStorage()
        const evaluateChange = [...StorageData.evaluate]
        let OCRcorrectionArray = [];

        let sourceLangaugeToGO: string = '';
        if (parseFormFromLocal.src_lang === 'hin_Deva') {
            sourceLangaugeToGO = 'hindi'
        } else if (parseFormFromLocal.src_lang === 'eng_Latn') {
            sourceLangaugeToGO = 'english'
        }

        for (var i = 0; i < evaluateChange.length; i++) {
            let pageForEvaluateitem = evaluateChange[i].page
            let currentPageTraverse = pageWiseData[pageForEvaluateitem]
            let currentParagraphIDX = currentPageTraverse.findIndex((obj: any) => obj.parent_id === evaluateChange[i].parent_id);

            let currentParagraph = currentPageTraverse[currentParagraphIDX]

            let Wordindex = currentParagraph.childs.findIndex((element: any) => element.id === evaluateChange[i].id);

            evaluateChange[i].correction = currentParagraph.child_content[Wordindex];
        }


        var pdfBlob: any = documentFile
        var pdfFileName = 'document.pdf';

        var pdfFile = new File([pdfBlob], pdfFileName, { type: pdfBlob.type });



        const stringifyEvaluate = JSON.stringify(evaluateChange);
        formData.append("document", pdfFile as Blob);
        formData.append("src_lang", parseFormFromLocal.src_lang);
        formData.append("tgt_lang", parseFormFromLocal.tgt_lang);
        formData.append('evaluate', stringifyEvaluate);

        let targetLangaugeToGO: string = '';
        if (parseFormFromLocal.tgt_lang === 'hin_Deva') {
            targetLangaugeToGO = 'hindi'
        } else if (parseFormFromLocal.tgt_lang === 'eng_Latn') {
            targetLangaugeToGO = 'english'
        }

        localStorage.setItem('votumtranslatetargetLang', targetLangaugeToGO)

        const url = "https://translator.thevotum.com/translate";
        try {
            const res = await fetch(url, {
                method: "POST",
                body: formData
            });
            const msg = await res.json();
            // console.log(res);
            // console.log(msg);
            if (res.status === 200) {
                // storeBlobInSessionStorage(parseFormFromLocal.document);
                let translated = [];
                let original = []
                /// translated 
                for (let i = 0; i < msg.translated_paragraphs.length; i++) {
                    for (let j = 0; j < msg.translated_paragraphs[i].length; j++) {
                        translated.push(msg.translated_paragraphs[i][j])
                    }
                }
                for (let i = 0; i < msg.original_paragraphs.length; i++) {
                    for (let j = 0; j < msg.original_paragraphs[i].length; j++) {
                        original.push(msg.original_paragraphs[i][j])
                    }
                }

                // console.log(translated)
                // console.log(original)

                let newtargetStore: any = []
                // console.log(translated.length === original.length)
                // console.log(translated)
                // console.log(original)
                for (let i = 0; i < translated.length; i++) {
                    let obj = {
                        original: original[i],
                        translated: translated[i],
                        dummy: translated[i]
                    }
                    newtargetStore.push(obj)
                    // console.log(newtargetStore)
                }
                // console.log(newtargetStore)
                const targetFIle = {
                    filename: msg.filename,
                    filetype: msg.filetype,
                    message: msg.message,
                    original_paragraphs: msg.original_paragraphs,
                    translated_paragraphs: msg.translated_paragraphs,
                };
                // console.log(newtargetStore)
                // console.log(targetFIle);
                localStorage.setItem("TargetDoc", JSON.stringify(targetFIle));
                localStorage.setItem('newtargetStore', JSON.stringify(newtargetStore))
                router.push("/translate/correction");
            } else {
                toast({
                    variant: "destructive",
                    title: "SERVER ERROR",
                    description: "Please Try again !",
                });
                setrequest(false);
            }
        } catch (err: any) {
            if (err.name === 'AbortError') {
                toast({
                    variant: "warning",
                    title: "Request Aborted",
                    description: "Any Issue ?",
                });
            } else {
                console.log(err);
                toast({
                    variant: "destructive",
                    title: "SERVER ERROR",
                    description: "Please Try again !",
                });
            }
            setrequest(false);
        }
    };

    const retrieveBlobFromSessionStorage = () => {
        const base64String = localStorage.getItem("sourceDoc");
        if (base64String) {
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            // console.log(blob)
            return blob;
        }
        return null
    };


    const changeitem = (str: string) => {
        if (str === currentitem) {
            setcurrentitem('')
        } else {
            setcurrentitem(str)
        }
    }


    const storeBlobInSessionStorage = (selectedFile: any) => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    const base64String = (event.target.result as string).split(",")[1];
                    localStorage.setItem("sourceDoc", base64String);
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.error("No Blob data available to store.");
        }
    };


    const timery = debounce(() => {
        saveChangesFunction();
    }, 800);

    function debounce(func: () => void, delay: number): () => void {
        let timer: NodeJS.Timeout | null = null;

        return function (): void {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay);
        };
    }


    const saveChangesFunction = async () => {
        setSaveChangesLoader(true)
        const FormFromLocal = localStorage.getItem('votumTranslateFormData');
        const parseFormFromLocal = FormFromLocal ? JSON.parse(FormFromLocal) : null;
        const evaluateChange = [...StorageData.evaluate]
        let OCRcorrectionArray = [];

        let sourceLangaugeToGO: string = '';
        if (parseFormFromLocal.src_lang === 'hin_Deva') {
            sourceLangaugeToGO = 'hindi'
        } else if (parseFormFromLocal.src_lang === 'eng_Latn') {
            sourceLangaugeToGO = 'english'
        }

        for (var i = 0; i < evaluateChange.length; i++) {
            let pageForEvaluateitem = evaluateChange[i].page
            let currentPageTraverse = pageWiseData[pageForEvaluateitem]
            let currentParagraphIDX = currentPageTraverse.findIndex((obj: any) => obj.parent_id === evaluateChange[i].parent_id);

            let currentParagraph = currentPageTraverse[currentParagraphIDX]

            let Wordindex = currentParagraph.childs.findIndex((element: any) => element.id === evaluateChange[i].id);

            const childContent = currentParagraph.child_content[Wordindex];
            const dummyContent = currentParagraph.dummy_content[Wordindex];
            if (childContent !== dummyContent) {

                currentParagraph.dummy_content[Wordindex] = currentParagraph.child_content[Wordindex];
                currentPageTraverse[currentParagraphIDX] = currentParagraph;
                const arr = [...pageWiseData];
                arr[pageForEvaluateitem] = currentPageTraverse;
                setPageWiseData(arr);
                localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr));

                const OCRCorrectionObject = {
                    paragraph: evaluateChange[i].parent_text,
                    wrong_text: evaluateChange[i].text,
                    corrected_text: currentParagraph.child_content[Wordindex],
                    language: sourceLangaugeToGO
                }
                OCRcorrectionArray.push(OCRCorrectionObject)
                if (evaluateChange[i].supabaseID.length === 0) {
                    const data: any = await intialOcrCorrection(OCRCorrectionObject)
                    if (data) {
                        evaluateChange[i].supabaseID = data[0].id;
                    }
                } else {
                    const formdata = {
                        text: currentParagraph.child_content[Wordindex],
                        id: evaluateChange[i].supabaseID
                    }
                    const data = await upsertOcrCorrection(formdata)
                    console.log(data)
                }
            }
        }
        StorageData.evaluate = evaluateChange;
        localStorage.setItem("votumTranslateEvaluateContent", JSON.stringify(StorageData))
        console.log(OCRcorrectionArray)
        setSaveChangesLoader(false)
    }


    return (
        <div className="bg-[#FAFAFA] dark:bg-transparent min-h-[100vh] overflow-x-hidden flex items-center  flex-col md:w-[100%] base:w-[100%] text-pop">
            <Nav />
            <div className="md:w-[min(85vw,1900px)] base:w-[90vw] flex flex-col items-center justify-start mb-[0px]">
                <div className='w-full h-[100px] flex flex-col justify-center gap-2'>
                    <h1 className='text-2xl font-[550]'>We Found some Low Confidence Words !</h1>
                    <p className='text-muted-foreground text-[0.9rem] font-[500]' >Please Correct these below given words for smooth translation.</p>
                </div>

                <div className='md:w-[min(90vw,1900px)] base:w-[90vw] min-h-[90vh] flex gap-2'>
                    <div className='base:hidden md:flex w-[49%] h-[90vh] border-solid border-2 flex justify-start items-start mt-[7px] relative'>
                        <DocumentComponent pageNumber={currentPage} />
                    </div>

                    <div className='base:w-full base:mt-[50px] md:mt-auto md:w-[49%] h-auto overflow-y-hidden overflow-x-hidden flex flex-col gap-4  mb-[100px]'>
                        <Accordion type="single" collapsible className="w-full base:min-h-[100vh] md:h-[80vh] overflow-y-scroll mt-2 overflow-x-hidden file: accordionCOMP">
                            {pageWiseData && pageWiseData[currentPage - 1].length !== 0 && pageWiseData[currentPage - 1].map((paragragh: any, index: number) => (
                                <AccordionItem key={index}
                                    className='bg-white dark:bg-inherit rounded-[5px] border-[1.4px] border-b-[5px] darK:border-b-[4px] mb-[7px] dark:mb-[8px]'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        changeitem(`item-${index + 1}`)
                                    }} value={`item-${index + 1}`}>
                                    <AccordionTrigger className='text-[0.79rem] text-left hover:no-underline pl-[7px] pr-[7px] select-text'>
                                        <HighlightedParagraph
                                            dynamicParagraph={paragragh.parent_text}
                                            wordsToHighlight={paragragh.childs}
                                            currentActiveWord={currentActiveWord}
                                        />
                                    </AccordionTrigger>
                                    <AccordionContent className='bg-[#F3F4F6] dark:bg-[#1F2937] min-h-[100px] flex flex-col gap-2 p-4 '>
                                        {paragragh.child_content.length !== 0 && paragragh.child_content.map((word: any, idx: number) => {
                                            if (sourceLanguage !== 'hin_Deva') {
                                                return (
                                                    <input onFocus={(e) => {
                                                        setcurrentActiveWord(paragragh.childs[idx].id)
                                                    }} key={idx} className='z-10 rounded-[8px] w-[60%] bg-transparent border-[1px]  pl-[20px] py-2  border-[#7C3AED]   ' type="text" value={word} onChange={(e) => {
                                                        e.preventDefault()
                                                        let arr = [...pageWiseData]
                                                        let CurrentPage = arr[currentPage - 1]
                                                        const indexOfParagraph = CurrentPage.findIndex((obj: any) => obj.parent_id === paragragh.parent_id);
                                                        CurrentPage[indexOfParagraph].child_content[idx] = e.target.value;
                                                        arr[currentPage - 1] = CurrentPage;
                                                        setPageWiseData(arr);
                                                        localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr))
                                                    }} />
                                                )
                                            } else {
                                                return (
                                                    <IndicTransliterate
                                                        key={idx}

                                                        renderComponent={(props) => <input onFocus={(e) => {
                                                            setcurrentActiveWord(paragragh.childs[idx].id)
                                                        }} className='z-10 rounded-[8px] w-[60%] bg-transparent border-[1px] pl-[20px] overflow-visible py-2 border-[#7C3AED]' {...props} />}
                                                        value={word}
                                                        onChangeText={(text) => {
                                                            let arr = [...pageWiseData]
                                                            let CurrentPage = arr[currentPage - 1]
                                                            const indexOfParagraph = CurrentPage.findIndex((obj: any) => obj.parent_id === paragragh.parent_id);
                                                            CurrentPage[indexOfParagraph].child_content[idx] = text;
                                                            arr[currentPage - 1] = CurrentPage;
                                                            setPageWiseData(arr);
                                                            localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr))
                                                        }}
                                                        offsetX={10}
                                                        maxOptions={3}
                                                        lang='hi'
                                                    />
                                                )
                                            }
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            <div className='!z-[10] w-full h-[3.6rem] bg-background fixed bottom-0 left-0 flex justify-center items-center shadow-[0_-5px_2px_rgba(0,0,0,0.05)]'>
                <div className='md:w-[min(85vw,1900px)] base:w-[90vw] flex justify-end items-center gap-5'>
                    <Button variant='outline' className='!border-1 !border-[#7C3AED] gap-1 px-5' disabled={saveChangesLoader} style={saveChangesLoader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={timery}> <ColorRing
                        visible={saveChangesLoader}
                        height="30"
                        width="30"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#7C3AED', '#7C3AED', '#7C3AED', '#7C3AED', '#7C3AED']}
                    />
                        Save Changes</Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant='outline' className='!border-1 !border-[#7C3AED]'>Change page</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className='w-full h-full flex justify-center items-center flex-col gap-3'>
                                <div className='w-[95%] h-[80px] flex pl-[5px] flex-col gap-1'>
                                    <h1 className='text-[1rem] tracking-wide font-[550]'>Select a Page to Work on</h1>
                                    <p className='text-[0.77rem] tracking-wide text-muted-foreground'>A List of page Where we found Low confidence words.</p>
                                </div>
                                <div className='flex flex-wrap gap-3 px-2 min-h-[100px]'>
                                    {pageList.length !== 0 && pageList.map((pageNumber, index) => (
                                        <div key={index} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (currentPage !== pageNumber) {
                                                setcurrentpage(pageNumber)
                                            }
                                        }} style={currentPage === pageNumber ? { backgroundColor: "#7C3AED", color: "white" } : { backgroundColor: "transparent", color: "black" }} className='w-[40px] h-[40px] flex justify-center items-center border-[1px] border-[#7C3AED] rounded-[5px] cursor-pointer'>
                                            {pageNumber}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                        <AlertDialogTrigger asChild>
                            <Button className="gap-1 px-5" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e)=>setOpenConfirm(true)}>
                                <ColorRing
                                    visible={request}
                                    height="30"
                                    width="30"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                />
                                Translate</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Have you checked all the low-confidence words?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Make sure to confirm only after you have reviewed all the low-confidence words. Otherwise, issues may arise during the document translation process!
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogCancel className='bg-primary text-white hover:text-white hover:bg-primary/90' onClick={(e) => {
                                    e.preventDefault()
                                    setOpenConfirm(false)
                                    API();
                                }}>Translate
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

export default Component