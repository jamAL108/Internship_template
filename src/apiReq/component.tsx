// 'use client';
// import React, { useEffect, useState } from 'react'
// import Nav from '@/components/commonComponent/nav'
// import HighlightedParagraph from './HighlightedParagraph';
// import { Button } from '@/components/ui/button';
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { useRouter } from 'next/navigation';
// import { useToast } from "@/components/ui/use-toast";
// import { ColorRing } from 'react-loader-spinner'
// import { IndicTransliterate, Language } from "../../../@ai4bharat/indic-transliterate";
// import "../../../@ai4bharat/indic-transliterate/dist/index.css";
// import { X } from 'lucide-react';
// import DocumentComponent from './document'


// const Component = () => {
//     const router = useRouter();
//     const { toast } = useToast();
//     const [StorageData, setStorageData] = useState<any>(null);
//     const [pageWiseData, setPageWiseData] = useState<any>(null)
//     const [currentPage, setcurrentpage] = useState<number>(0);
//     const [pageList, setpageList] = useState<number[]>([]);
//     const [currentActiveWord, setcurrentActiveWord] = useState<string>("")
//     const [request, setrequest] = useState<boolean>(false)
//     const [sourceLanguage, setSourceLanguage] = useState<string>('')

//     useEffect(() => {
//         const localData = localStorage.getItem('votumTranslateEvaluateContent');
//         const parsingOfLocalData = localData ? JSON.parse(localData) : null;

//         const pageWiseContent = localStorage.getItem('votumTranslateEvaluatePageWise');
//         const parsingPageWiseContent = pageWiseContent ? JSON.parse(pageWiseContent) : null
//         if (parsingPageWiseContent) {
//             let tempArray: number[] = []
//             parsingPageWiseContent.forEach((element: any, index: number) => {
//                 if (element.length !== 0) {
//                     tempArray.push(index + 1);
//                 }
//             });
//             // console.log(tempArray)
//             setcurrentpage(tempArray[0])
//             setpageList(tempArray)
//         }
//         // console.log(parsingPageWiseContent)
//         setPageWiseData(parsingPageWiseContent)
//         setStorageData(parsingOfLocalData)

//         const FormFromLocal = localStorage.getItem('votumTranslateFormData');
//         const parseFormFromLocal = FormFromLocal ? JSON.parse(FormFromLocal) : null;
//         setSourceLanguage(parseFormFromLocal?.src_lang)
//     }, [])

//     const extractNumberFromString = (inputString: string): number => {
//         const pattern = /block_1_(\d+)/;

//         // Use RegExp.exec to search for the pattern in the string
//         const match = pattern.exec(inputString);

//         // Check if the pattern is found
//         if (match) {
//             // Extract the number from the matched group
//             const number = parseInt(match[1], 10);
//             return number;
//         } else {
//             return 0;
//         }
//     };


//     const API = async () => {
//         setrequest(true);
//         const formData = new FormData();
//         const FormFromLocal = localStorage.getItem('votumTranslateFormData');
//         const parseFormFromLocal = FormFromLocal ? JSON.parse(FormFromLocal) : null;
//         const documentFile = retrieveBlobFromSessionStorage()
//         const evaluateChange = [...StorageData.evaluate]
//         for (var i = 0; i < evaluateChange.length; i++) {
//             let pageForEvaluateitem = evaluateChange[i].page
//             let currentPageTraverse = pageWiseData[pageForEvaluateitem]
//             let currentParagraphIDX = currentPageTraverse.findIndex((obj: any) => obj.parent_id === evaluateChange[i].parent_id);

//             let currentParagraph = currentPageTraverse[currentParagraphIDX]

//             let Wordindex = currentParagraph.childs.findIndex((element: any) => element.id === evaluateChange[i].id);

//             evaluateChange[i].correction = currentParagraph.child_content[Wordindex];
//         }

//         var pdfBlob: any = documentFile
//         var pdfFileName = 'document.pdf';

//         var pdfFile = new File([pdfBlob], pdfFileName, { type: pdfBlob.type });



//         const stringifyEvaluate = JSON.stringify(evaluateChange);
//         formData.append("document", pdfFile as Blob);
//         formData.append("src_lang", parseFormFromLocal.src_lang);
//         formData.append("tgt_lang", parseFormFromLocal.tgt_lang);
//         formData.append('evaluate', stringifyEvaluate);

//         let targetLangaugeToGO: string = '';
//         if (parseFormFromLocal.tgt_lang === 'hin_Deva') {
//             targetLangaugeToGO = 'hindi'
//         } else if (parseFormFromLocal.tgt_lang === 'eng_Latn') {
//             targetLangaugeToGO = 'english'
//         }

//         localStorage.setItem('votumtranslatetargetLang', targetLangaugeToGO)

//         const url = "https://translator.thevotum.com/translate";
//         try {
//             const res = await fetch(url, {
//                 method: "POST",
//                 body: formData
//             });
//             const msg = await res.json();
//             console.log(res);
//             console.log(msg);
//             if (res.status === 200) {
//                 // storeBlobInSessionStorage(parseFormFromLocal.document);
//                 let translated = [];
//                 let original = []
//                 /// translated 
//                 for (let i = 0; i < msg.translated_paragraphs.length; i++) {
//                     for (let j = 0; j < msg.translated_paragraphs[i].length; j++) {
//                         translated.push(msg.translated_paragraphs[i][j])
//                     }
//                 }
//                 for (let i = 0; i < msg.original_paragraphs.length; i++) {
//                     for (let j = 0; j < msg.original_paragraphs[i].length; j++) {
//                         original.push(msg.original_paragraphs[i][j])
//                     }
//                 }

//                 console.log(translated)
//                 console.log(original)

//                 let newtargetStore: any = []
//                 console.log(translated.length === original.length)
//                 console.log(translated)
//                 console.log(original)
//                 for (let i = 0; i < translated.length; i++) {
//                     let obj = {
//                         original: original[i],
//                         translated: translated[i],
//                         dummy: translated[i]
//                     }
//                     newtargetStore.push(obj)
//                     console.log(newtargetStore)
//                 }
//                 console.log(newtargetStore)
//                 const targetFIle = {
//                     filename: msg.filename,
//                     filetype: msg.filetype,
//                     message: msg.message,
//                     original_paragraphs: msg.original_paragraphs,
//                     translated_paragraphs: msg.translated_paragraphs,
//                 };
//                 console.log(newtargetStore)
//                 console.log(targetFIle);
//                 localStorage.setItem("TargetDoc", JSON.stringify(targetFIle));
//                 localStorage.setItem('newtargetStore', JSON.stringify(newtargetStore))
//                 router.push("/translate/correction");
//             } else {
//                 toast({
//                     variant: "destructive",
//                     title: "SERVER ERROR",
//                     description: "Please Try again !",
//                 });
//                 setrequest(false);
//             }
//         } catch (err: any) {
//             if (err.name === 'AbortError') {
//                 toast({
//                     variant: "warning",
//                     title: "Request Aborted",
//                     description: "Any Issue ?",
//                 });
//             } else {
//                 console.log(err);
//                 toast({
//                     variant: "destructive",
//                     title: "SERVER ERROR",
//                     description: "Please Try again !",
//                 });
//             }
//             setrequest(false);
//         }
//     };

//     const retrieveBlobFromSessionStorage = () => {
//         const base64String = localStorage.getItem("sourceDoc");
//         if (base64String) {
//             const byteCharacters = atob(base64String);
//             const byteNumbers = new Array(byteCharacters.length);

//             for (let i = 0; i < byteCharacters.length; i++) {
//                 byteNumbers[i] = byteCharacters.charCodeAt(i);
//             }

//             const byteArray = new Uint8Array(byteNumbers);
//             const blob = new Blob([byteArray], { type: 'application/pdf' });
//             console.log(blob)
//             return blob;
//         }
//         return null
//     };

//     // Example usage:
//     // const retrievedBlob = retrieveBlobFromSessionStorage();
//     // if (retrievedBlob) {
//     //   // Use the retrievedBlob as needed, for example, create a download link
//     //   const downloadLink = document.createElement('a');
//     //   downloadLink.href = URL.createObjectURL(retrievedBlob);
//     //   downloadLink.download = "restoredFile.txt";
//     //   document.body.appendChild(downloadLink);
//     //   downloadLink.click();
//     //   document.body.removeChild(downloadLink);
//     // }



//     const storeBlobInSessionStorage = (selectedFile: any) => {
//         if (selectedFile) {
//             const reader = new FileReader();
//             reader.onload = (event: ProgressEvent<FileReader>) => {
//                 if (event.target?.result) {
//                     const base64String = (event.target.result as string).split(",")[1];
//                     localStorage.setItem("sourceDoc", base64String);
//                 }
//             };
//             reader.readAsDataURL(selectedFile);
//         } else {
//             console.error("No Blob data available to store.");
//         }
//     };


//     return (
//         <div className="bg-[#FAFAFA] dark:bg-transparent min-h-[100vh] overflow-x-hidden flex items-center  flex-col md:w-[100%] base:w-[100%] text-pop">
//             <Nav />
//             <div className="md:w-[min(85vw,1100px)] base:w-[90vw] flex flex-col items-center justify-start mb-[40px]">
//                 <div className='w-full h-[100px] flex flex-col justify-center gap-2'>
//                     <h1 className='text-2xl font-[550]'>We Found some Low Confidence Words !</h1>
//                     <p className='text-muted-foreground text-[0.9rem] font-[500]' >Please Correct these below given words for smooth translation.</p>
//                 </div>
//                 <div className='w-full min-h-[80vh] flex flex-col gap-4 mb-[100px]'>
//                     {pageWiseData && pageWiseData[currentPage - 1].length !== 0 && pageWiseData[currentPage - 1].map((paragragh: any, index: number) => (
//                         <div key={index} className='w-full bg-[#E1E1FF] rounded-[20px] flex flex-col'>
//                             <div className='w-full h-[65px] flex ml-[30px] items-center'>
//                                 <div className='bg-[#7C3AED] flex justify-center items-center px-5 py-[0.28rem] rounded-[50px]'>
//                                     <h2 className='text-white text-[0.88rem] font-[580]'>Paragraph - {extractNumberFromString(paragragh.parent_id)}</h2>
//                                 </div>
//                             </div>
//                             <div className='w-full min-h-[100px] bg-[#E1E1FF] rounded-[20px] flex justify-center gap-[40px]'>
//                                 <div className='w-[50%] flex justify-center'>
//                                     <HighlightedParagraph
//                                         dynamicParagraph={paragragh.parent_text}
//                                         wordsToHighlight={paragragh.childs}
//                                         currentActiveWord={currentActiveWord}
//                                     />
//                                 </div>
//                                 <div className='w-[50%] mb-5 h-auto flex px-5 py-2items-center flex-col gap-2'>
//                                     {paragragh.child_content.length !== 0 && paragragh.child_content.map((word: any, idx: number) => {
//                                         if (sourceLanguage !== 'hin_Deva') {
//                                             return (
//                                                 <input onFocus={(e) => {
//                                                     setcurrentActiveWord(paragragh.childs[idx].id)
//                                                 }} key={idx} className='rounded-[8px] w-[60%] bg-transparent border-[1px]  pl-[20px] py-2  border-[#7C3AED]   ' type="text" value={word} onChange={(e) => {
//                                                     e.preventDefault()
//                                                     let arr = [...pageWiseData]
//                                                     let CurrentPage = arr[currentPage - 1]
//                                                     const indexOfParagraph = CurrentPage.findIndex((obj: any) => obj.parent_id === paragragh.parent_id);
//                                                     CurrentPage[indexOfParagraph].child_content[idx] = e.target.value;
//                                                     arr[currentPage - 1] = CurrentPage;
//                                                     setPageWiseData(arr);
//                                                     localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr))
//                                                 }} />
//                                             )
//                                         } else {
//                                             return (
//                                                 <IndicTransliterate
//                                                     key={idx}
//                                                     renderComponent={(props) => <input onFocus={(e) => {
//                                                         setcurrentActiveWord(paragragh.childs[idx].id)
//                                                     }} className='rounded-[8px] w-[60%] bg-transparent border-[1px]  pl-[20px] py-2  border-[#7C3AED]' {...props} />}
//                                                     value={word}
//                                                     onChangeText={(text) => {
//                                                         let arr = [...pageWiseData]
//                                                         let CurrentPage = arr[currentPage - 1]
//                                                         const indexOfParagraph = CurrentPage.findIndex((obj: any) => obj.parent_id === paragragh.parent_id);
//                                                         CurrentPage[indexOfParagraph].child_content[idx] = text;
//                                                         arr[currentPage - 1] = CurrentPage;
//                                                         setPageWiseData(arr);
//                                                         localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr))
//                                                     }}
//                                                     offsetX={10}
//                                                     maxOptions={3}
//                                                     lang='hi'
//                                                 />
//                                             )
//                                         }
//                                     })}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>



//                 <div className='w-full h-[3.6rem] bg-white fixed bottom-0 left-0 flex justify-center items-center shadow-[0_-5px_2px_rgba(0,0,0,0.05)]'>
//                     <div className='md:w-[min(85vw,1100px)] base:w-[90vw] flex justify-end items-center gap-5'>
//                         <AlertDialog>
//                             <AlertDialogTrigger asChild>
//                                 <Button variant='outline' className='!border-1 !border-[#7C3AED]'>View page</Button>
//                             </AlertDialogTrigger>
//                             <AlertDialogContent className='!w-[50vw] min-w-[50vw] border-none h-[100vh] bg-transparent shadow-none'>
//                                 <DocumentComponent pageNumber={currentPage}/>
//                                 <AlertDialogFooter className='bg-transparent absolute top-[4%] right-[-12%]'>
//                                     <AlertDialogCancel className='bg-transparent border-none hover:bg-transparent' ><X size={50} color='white'/></AlertDialogCancel>
//                                 </AlertDialogFooter>
//                             </AlertDialogContent>
//                         </AlertDialog>



//                         <Popover>
//                             <PopoverTrigger asChild>
//                                 <Button variant='outline' className='!border-1 !border-[#7C3AED]'>Change page</Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-80">
//                                 <div className='w-full h-full flex justify-center items-center flex-col gap-3'>
//                                     <div className='w-[95%] h-[80px] flex pl-[5px] flex-col gap-1'>
//                                         <h1 className='text-[1rem] tracking-wide font-[550]'>Select a Page to Work on</h1>
//                                         <p className='text-[0.77rem] tracking-wide text-muted-foreground'>A List of page Where we found Low confidence words.</p>
//                                     </div>
//                                     <div className='flex flex-wrap gap-3 px-2 min-h-[100px]'>
//                                         {pageList.length !== 0 && pageList.map((pageNumber, index) => (
//                                             <div key={index} onClick={(e) => {
//                                                 e.preventDefault();
//                                                 e.stopPropagation();
//                                                 if (currentPage !== pageNumber) {
//                                                     setcurrentpage(pageNumber)
//                                                 }
//                                             }} style={currentPage === pageNumber ? { backgroundColor: "#7C3AED", color: "white" } : { backgroundColor: "transparent", color: "black" }} className='w-[40px] h-[40px] flex justify-center items-center border-[1px] border-[#7C3AED] rounded-[5px] cursor-pointer'>
//                                                 {pageNumber}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </PopoverContent>
//                         </Popover>
//                         <Button className="gap-1 px-5" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => {
//                             e.preventDefault()
//                             API();
//                         }}> <ColorRing
//                                 visible={request}
//                                 height="30"
//                                 width="30"
//                                 ariaLabel="color-ring-loading"
//                                 wrapperStyle={{}}
//                                 wrapperClass="color-ring-wrapper"
//                                 colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
//                             />
//                             Translate</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Component
















// <Accordion id='step-2' type="single" collapsible className="w-full base:min-h-[100vh] md:min-h-[calc(600px_-_2.6rem)]  dark:mt-3 mt-4 md:h-[calc(600px_-_2.6rem)] overflow-y-auto overflow-x-hidden accordionCOMP">
// {pageWiseData && pageWiseData[currentPage - 1].length !== 0 && pageWiseData[currentPage - 1].map((paragragh: any, index: number) => (
// <AccordionItem key={index}
// className='bg-white dark:bg-inherit rounded-[5px] border-[1.4px] border-b-[5px] darK:border-b-[4px]  mb-[7px] dark:mb-[8px]'
// onClick={(e) => {
//   e.preventDefault()
//   e.stopPropagation()
//   changeitem(`item-${index + 1}`)

// }} value={`item-${index + 1}`}>
// <AccordionTrigger className='text-[0.79rem] text-left hover:no-underline pl-[7px] pr-[7px]'
//      <HighlightedParagraph
//            dynamicParagraph={paragragh.parent_text}
//             wordsToHighlight={paragragh.childs}
//             currentActiveWord={currentActiveWord}
//        />
// </AccordionTrigger>


// </AccordionItem>
// ))}
// </Accordion>



                                    // {paragragh.child_content.length !== 0 && paragragh.child_content.map((word: any, idx: number) => {
                                    //     if (sourceLanguage !== 'hin_Deva') {
                                    //         return (
                                    //             <input onFocus={(e) => {
                                    //                 setcurrentActiveWord(paragragh.childs[idx].id)
                                    //             }} key={idx} className='rounded-[8px] w-[60%] bg-transparent border-[1px]  pl-[20px] py-2  border-[#7C3AED]   ' type="text" value={word} onChange={(e) => {
                                    //                 e.preventDefault()
                                    //                 let arr = [...pageWiseData]
                                    //                 let CurrentPage = arr[currentPage - 1]
                                    //                 const indexOfParagraph = CurrentPage.findIndex((obj: any) => obj.parent_id === paragragh.parent_id);
                                    //                 CurrentPage[indexOfParagraph].child_content[idx] = e.target.value;
                                    //                 arr[currentPage - 1] = CurrentPage;
                                    //                 setPageWiseData(arr);
                                    //                 localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr))
                                    //             }} />
                                    //         )
                                    //     } else {
                                    //         return (
                                    //             <IndicTransliterate
                                    //                 key={idx}
                                    //                 renderComponent={(props) => <input onFocus={(e) => {
                                    //                     setcurrentActiveWord(paragragh.childs[idx].id)
                                    //                 }} className='rounded-[8px] w-[60%] bg-transparent border-[1px]  pl-[20px] py-2  border-[#7C3AED]' {...props} />}
                                    //                 value={word}
                                    //                 onChangeText={(text) => {
                                    //                     let arr = [...pageWiseData]
                                    //                     let CurrentPage = arr[currentPage - 1]
                                    //                     const indexOfParagraph = CurrentPage.findIndex((obj: any) => obj.parent_id === paragragh.parent_id);
                                    //                     CurrentPage[indexOfParagraph].child_content[idx] = text;
                                    //                     arr[currentPage - 1] = CurrentPage;
                                    //                     setPageWiseData(arr);
                                    //                     localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(arr))
                                    //                 }}
                                    //                 offsetX={10}
                                    //                 maxOptions={3}
                                    //                 lang='hi'
                                    //             />
                                    //         )
                                    //     }
                                    // })}