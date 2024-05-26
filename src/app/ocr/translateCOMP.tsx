"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CardWithForm from "./card";
import checkUserAuthClient from '@/auth/tokencheckingClient'
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


type FileState = Blob | null;

interface DocumentFetchResult {
  documentContent?: Blob;
  filename?: string;
  isPrivate: boolean;
}

const Translate = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setopen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [filename, setfilename] = useState<string>("");
  const [filesize, setfilesize] = useState<string | number>("");

  const [sourcelang, setsourcelang] = useState<string>("");
  const [targetlang, settargetlang] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const { resolvedTheme } = useTheme();
  const [request, setrequest] = useState<boolean>(false);


  const [fileURL, setURL] = useState<string>('')


  useEffect(() => {
    const roundebox = document.querySelector(".roundebox") as HTMLElement;
    if (request === false) {
      roundebox.style.pointerEvents = "auto";
    } else if (request === true) {
      roundebox.style.pointerEvents = "none";
    }
  }, [request]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // const file = e.target.files ? e.target.files[0] : null;
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file && !isValidFile(file.name)) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Make sure that you're uploading a PDF file",
      });
    } else if (file) {
      setSelectedFile(file);
      setfilename(file.name);
      setfilesize(file.size);
    }
  };

  const isValidFile = (filePath: string) => {
    return filePath.endsWith(".pdf");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    const elem = document.querySelector(".uploadicon") as HTMLElement;
    if (elem) {
      elem.style.transform = "scale(1.1)";
    }
    const roundebox = document.querySelector(".roundebox") as HTMLElement;
    if (roundebox && resolvedTheme === "dark") {
      roundebox.style.borderColor = "rgba(252,252,252,0.6)";
    } else if (roundebox && resolvedTheme === "light") {
      roundebox.style.borderColor = "#0082C8";
    }
  };

  const handelDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    setTimeout(() => {
      const elem = document.querySelector(".uploadicon") as HTMLElement;
      if (elem) {
        elem.style.transform = "scale(1)";
      }
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    const roundebox = document.querySelector(".roundebox") as HTMLElement;
    if (roundebox && resolvedTheme === "dark") {
      roundebox.style.borderColor = "rgba(252,252,252,0.2)";
    } else if (roundebox && resolvedTheme === "light") {
      roundebox.style.borderColor = "#c9cbe5";
    } else {
      alert("mistakeee");
    }
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList): void => {
    const file = files[0];
    if (!isValidFile(file.name)) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Make sure that you're uploading a PDF file",
      });
    } else if (file) {
      setSelectedFile(file);
      setfilename(file.name);
      setfilesize(file.size);
    }
  };

  const changesourcelang = (str: string) => {
    setsourcelang(str);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setfilename("");
    setfilesize("");
  };

  const changetargetlang = (str: string) => {
    settargetlang(str);
  };

  const changedescription = (str: string) => {
    setdescription(str);
  };

  const timery = debounce(() => {
    API();
  }, 800);

  const handlesubmit = async () => {
    // console.log("HEEEEEEELOOO SUBMIT")
    const result = await checkUserAuthClient()
    // console.log(result)
    const { userExist } = result
    // console.log(userExist)
    if (userExist === false) {
      const elem = document.querySelector('.translateloginalertbox') as HTMLElement;
      if (elem) {
        elem.click();
      }
    } else if (userExist === true) {
      if (sourcelang === "") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Select Your Source Language !",
        });
      } else if (targetlang === "") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Select Your Target Language !",
        });
      } else if (sourcelang === targetlang) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Source and Target language are same !",
        });
      } else if (selectedFile === null) {
        toast({
          variant: "destructive",
          title: "Enter All details Properly",
          description: "Please Upload your document !",
        });
      } else {
        timery();
      }
    }
  };

  function debounce(func: () => void, delay: number): () => void {
    let timer: NodeJS.Timeout | null = null;

    return function (): void {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  }

  const API = async () => {
    setrequest(true);
    const formData = new FormData();
    formData.append("document", selectedFile as Blob);
    formData.append("src_lang", sourcelang);
    formData.append("tgt_lang", targetlang);

    if (filename.endsWith('.pdf')) {
      try {
        const URL = 'https://translator.thevotum.com/evaluate';
        const resp = await fetch(URL, {
          method: "POST",
          body: formData
        })
        const msg = await resp.json();
        // console.log(msg)
        const storageData = msg;
        const evaluateArray = [...storageData.evaluate]
        for (var i = 0; i < evaluateArray.length; i++) {
          evaluateArray[i].supabaseID = "";
        }
        storageData.evaluate = evaluateArray
        console.log(storageData)
        provideResourceFunction(msg);
        const Formdata = {
          src_lang: sourcelang,
          tgt_lang: targetlang
        }
        storeBlobInSessionStorage()
        if (msg.evaluate.length !== 0) {
          localStorage.setItem('votumTranslateFormData', JSON.stringify(Formdata));
          localStorage.setItem('votumTranslateEvaluateContent', JSON.stringify(storageData));
          router.push('/ocr/evaluate')
        } else {

          toast({
            title: "Almost done...",
            description: "Please wait for some seconds!",
          });

          const formDaata = new FormData();
          formDaata.append("document", selectedFile as Blob);
          formDaata.append("src_lang", sourcelang);
          formDaata.append("tgt_lang", targetlang);

          const url = "https://translator.thevotum.com/translate";
          try {
            const res = await fetch(url, {
              method: "POST",
              body: formDaata
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




        }
      } catch (err) {
        console.log(err)
        toast({
          variant: "destructive",
          title: "SERVER ERROR",
          description: "Please Try again !",
        });
        setrequest(false);
      }
    }
  }


  const provideResourceFunction = (parsingOfLocalData: any) => {
    if (parsingOfLocalData && parsingOfLocalData.evaluate.length !== 0) {
      let evaluate = parsingOfLocalData.evaluate;
      let pageWiseContent: any = [[]];
      let highestPagevalue = evaluate[evaluate.length - 1].page;
      // console.log(highestPagevalue)
      for (var i = 0; i < highestPagevalue; i++) {
        pageWiseContent.push([]);
      }
      for (var i = 0; i < evaluate.length; i++) {
        let currentPageTraverse = pageWiseContent[evaluate[i].page];
        let currentParagraphIDX = currentPageTraverse.findIndex((obj: any) => obj.parent_id === evaluate[i].parent_id);
        // console.log(currentParagraphIDX)
        if (currentPageTraverse[currentParagraphIDX]) {
          const newChild = {
            id: evaluate[i].id,
            text: evaluate[i].text
          }
          const currentParaContent = currentPageTraverse[currentParagraphIDX];
          // console.log(currentParaContent)
          let childs = [...currentParaContent.childs];
          childs.push(newChild);
          let child_content = [...currentParaContent.child_content];
          child_content.push(evaluate[i].text);
          let dummy_content = [...currentParaContent.dummy_content];
          dummy_content.push(evaluate[i].text)
          currentParaContent.childs = childs;
          currentParaContent.child_content = child_content;
          currentParaContent.dummy_content = dummy_content;
          currentPageTraverse[currentParagraphIDX] = currentParaContent;
          pageWiseContent[evaluate[i].page] = currentPageTraverse;
        } else {
          const newChild = {
            id: evaluate[i].id,
            text: evaluate[i].text
          }
          let childs = [newChild]
          let child_content = [evaluate[i].text];
          const newparagraphCreate = {
            parent_id: evaluate[i].parent_id,
            page: 0,
            parent_text: evaluate[i].parent_text,
            childs: childs,
            child_content: child_content,
            dummy_content: child_content
          }
          currentPageTraverse.push(newparagraphCreate);
          pageWiseContent[evaluate[i].page] = currentPageTraverse;
        }
      }
      // console.log(pageWiseContent)
      localStorage.setItem('votumTranslateEvaluatePageWise', JSON.stringify(pageWiseContent))
    }
  }

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


  function truncateString(str: string, maxLength = 19) {
    if (str.length > maxLength) {
      return (
        str.substring(0, maxLength - 7) +
        "..." +
        str.substring(str.length - 7, str.length)
      );
    }
    return str;
  }

  const storeBlobInSessionStorage = () => {
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



  return (
    <div className="w-[min(90vw,1100px)] h-auto min-h-[100px] flex flex-col justify-start items-center mb-[8rem] transDiv">
      <AlertDialog>
        <AlertDialogTrigger asChild className='w-0 h-0 opacity-0 appearance-none'>
          <div className='w-0 h-0 opacity-0 translateloginalertbox'>Show Dialog</div>
        </AlertDialogTrigger>
        <AlertDialogContent className='base:w-[92%] md:auto'>
          <AlertDialogHeader>
            <AlertDialogTitle>Not logged in ?</AlertDialogTitle>
            <AlertDialogDescription>
              Log in for added features and make your Votum experience extraordinary
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='px-5' onClick={(e) => {
              e.preventDefault()
              router.push('/auth/signin')
            }}>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="font-pop w-[80%] mt-8 flex justify-center items-center flex-col gap-4">
        <h1 className="text-[1.37rem] font-[500]">Upload document</h1>
        <p className="text-[0.8rem] text-center text-muted-foreground">
          We recommend using files that are DOCX and PPTX format as your
          translated file will have format similiar to the original document{" "}
          <br /> Translating using other file format might gave you formatting
          issues.
        </p>
      </div>

      <div
        className="w-full h-auto flex items-center justify-center base:flex-col md:flex-row 
      base:gap-20 md:gap-30 mt-20"
      >
        <div className="bg-[#F5F5F8]  dark:bg-[transparent] border-dashed border-[2px] border-[ #c9cbe5] flex items-center rounded-md justify-start flex-col dark:border-[rgba(252,252,252,0.2)]  max-w-[380px] min-w-[320px] h-[280px] roundebox">
          <input
            type="file"
            hidden
            accept=".docx,.pdf"
            onChange={handleFileChange}
            className="fileinput"
          />
          <div
            onDragOver={handleDragOver}
            onDragLeave={handelDragLeave}
            onDrop={handleDrop}
            className="w-full h-full flex justify-center items-center flex-col "
            onClick={(e) => {
              e.preventDefault();
              const elem = document.querySelector(".fileinput") as HTMLElement;
              if (elem) {
                elem.click();
              }
            }}
          >
            <h1 className="z-1 py-5 w-[85%] text-center text-[#0082C8] font-[640] text-[0.82rem] tracking-wider leading-6">
              Drop and Drop file PDF (recommended) <br /> or <br />
              Enter the{" "}
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="text-black  underline cursor-pointer font-[400] tracking-[1px]"
              >
                <Dialog open={open} onOpenChange={setopen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="underline bg-inherit dark:bg-inherit border-none hover:bg-inherit focus:bg-inherit p-0 m-0 text-black dark:text-white mt-[-7px] text-[0.8rem] tracking-[0.4px]"
                    >
                      URL
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="base:max-w-[90%] sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Enter the URL</DialogTitle>
                      <DialogDescription>
                        Make sure to upload a file which is public.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          URL
                        </Label>
                        <Input
                          id="name"
                          className="col-span-3"
                          autoComplete="off"
                          value={fileURL}
                          onChange={(e) => {
                            e.preventDefault()
                            setURL(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="px-4"
                      // onClick={async (e) => {
                      //   e.preventDefault();
                      //   setopen(false)
                      //   if (fileURL.length === 0) {
                      //     alert("Enter The Document URL Properly..!")
                      //   } else {
                      //     const response = await checkUrlAndFetchDocument(fileURL)
                      //     if (response && response.isPrivate === true) {
                      //       toast({
                      //         variant: "destructive",
                      //         title: "The URL is private",
                      //         description: "Try uploading the document from different Way..!",
                      //       });
                      //     }else if(response && response.isPrivate===false){
                      //       console.log(response)
                      //       toast({
                      //         title: "sucess",
                      //         description: "sucess",
                      //       });
                      //     }
                      //   }
                      // }}
                      >
                        Upload
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </span>
            </h1>

            {selectedFile === null && (
              <Image
                className="uploadicon"
                style={{ transition: "0.5s ease-in-out" }}
                width={90}
                height={60}
                src="/images/uploadlogo.png"
                alt="rve"
              />
            )}

            {selectedFile !== null && (
              <motion.div
                initial={{ scale: 0 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "tween" }}
                className="w-[100%] h-[90px] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="w-[76%] border-solid border-2 bg-[#fefefe] text-black flex items-center gap-2 rounded-md base:p-[8px] md:p-[7px] max-h-[60px]">
                  <img
                    className="base:w-[27px] base:h-[31px] md:w-[31px] md:h-[35px]"
                    src="/images/pdflogo.png"
                    alt="sd"
                  />
                  <div className="flex-1 gap-2">
                    <p className="base:text-[0.71rem] md:text-[0.77rem] font-[550] tracking-[0.3px] leading-none">
                      {truncateString(filename)}
                    </p>
                    <p className="base:text-[0.6rem] md:text-[0.65rem] opacity-[0.74]">
                      {`${(Number(filesize) / 1024).toFixed(2)} kb`}
                    </p>
                  </div>
                </div>
                <div className="ml-[5px]  max-h-[60px] min-h-[45px]  flex items-start justify-start">
                  <X
                    size={23}
                    color={resolvedTheme === "dark" ? "white" : "#707070"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFile(null);
                      setfilename("");
                      setfilesize("");
                    }}
                  />
                  {/* <img className='w-[20px] h-[20px] cursor-pointer ' src="/images/exchange.png" alt="dfv" /> */}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <CardWithForm
          sourcelang={sourcelang}
          targetlang={targetlang}
          description={description}
          changesourcelang={changesourcelang}
          changetargetlang={changetargetlang}
          changedescription={changedescription}
          handlesubmit={handlesubmit}
          removeFile={removeFile}
          request={request}
        />
      </div>
    </div>
  );
};

export default Translate;
