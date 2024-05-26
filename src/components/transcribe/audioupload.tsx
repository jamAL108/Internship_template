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
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import RecordAudio from './recordaudio'
import { Numans } from "next/font/google";

type FileState = Blob | null

interface Recordobj{
  isRecording:boolean,
  blobURL:string,
  isBlocked:boolean
}

const AudioUpload = () => {
  const { toast } = useToast();
  const [open, setopen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [fileURL, setURL] = useState<string>('')
  const { resolvedTheme } = useTheme();

  const [RecordVoice, setRecordvoice] = useState(null)

  const [audioflow, setaudioflow] = useState<number>(0)



  const [isRecording,setisRecording]  = useState<boolean>(false)
  const [RecordblobURL,setRecordblobURL] = useState<string>('')
  const [isBlocked , setisBlocked] = useState<boolean>(false)


  const [recordopen , setrecordopen] = useState<boolean>(false)

  const changeRecording=(flag:boolean)=>{
    setisRecording(flag)
  }

  const changeRecordblobURL =(url:string)=>{
    setRecordblobURL(url)
  }
  
  const changeisBlocked =(flag:boolean)=>{
    setisBlocked(flag)
  }

  const changeaudioflow = (num:number)=>{
    setaudioflow(num)
  }

  const changeRecordDialog = (flag:boolean)=>{
    setrecordopen(flag)
  }



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // const file = e.target.files ? e.target.files[0] : null;
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file && !isValidFile(file.name)) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Make sure that you're uploading a DOCX/PDF file",
      });
    } else if (file) {
      setSelectedFile(file);
      // setfilename(file.name);
      // setfilesize(file.size);
    }
  };

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  const isValidFile = (filePath: string) => {
    return filePath.endsWith(".mp4");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    const elem = document.querySelector(".uploadiconTranscribe") as HTMLElement;
    if (elem) {
      elem.style.transform = "scale(1.1)";
    }
    const roundebox = document.querySelector(".roundedboxTranscribe") as HTMLElement;
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
      const elem = document.querySelector(".uploadiconTranscribe") as HTMLElement;
      if (elem) {
        elem.style.transform = "scale(1)";
      }
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    const roundebox = document.querySelector(".roundedboxTranscribe") as HTMLElement;
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
        description: "Make sure that you're uploading a mp3 file",
      });
    } else if (file) {
      setSelectedFile(file);
      // setfilename(file.name);
      // setfilesize(file.size);
    }
  };


  useEffect(()=>{
   if(recordopen===false){
    setRecordblobURL('')
    setaudioflow(0)
   }
  },[recordopen])


  return (
    <div className='text-pop w-full h-600px flex mt-[20px] flex-col gap-1'>
      <div className='w-full h-[60px] flex items-center gap-2'>
        <div className='w-[60px] h-[60px] rounded-full bg-primary flex justify-center items-center text-3xl font-[660] text-white'>1</div>
        <h2 className='text-[1.6rem] font-[600]'>Upload Audio file.</h2>
      </div>
      <div className='w-full h-[350px] flex'>
        <div className='w-[65px] h-full flex justify-center'>
          <div className='w-[3px] h-full border-solid border-2 rounded-full'></div>
        </div>

        <div className='w-[calc(100%_-_65px)] h-full  flex justify-center items-center'>




          <div className="bg-[#F5F5F8] shadow-[2px_2px_15px_5px_rgba(255,255,255,1)] dark:bg-[transparent] border-solid border-[2px] border-[#EAEAEA] flex items-center p-[10px] gap-[10px]  rounded-lg dark:border-[rgba(252,252,252,0.2)]  w-[550px] h-[260px] mt-[-10px]">

            <input
              type="file"
              hidden
              onChange={handleFileChange}
              className="fileinputTranscribe"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handelDragLeave}
              onDrop={handleDrop}
              className="w-[265px] h-[100%] border-dashed border-[2px] rounded-lg border-[#DFDFDF] flex justify-center items-center gap-3 flex-col roundedboxTranscribe"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.querySelector(".fileinputTranscribe") as HTMLElement;
                if (elem) {
                  elem.click();
                }
              }}
            >

              <div className="h-auto w-full flex justify-center items-center">
                <h1 className="w-[85%] text-left text-sm font-[600] text-[#697586] ">
                  Drop your files here, <span className="text-primary hover:underline hover:cursor-pointer transition-[0.5s] duration-&lsqb;ease-in-out&rsqb;"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation()
                      const elem = document.querySelector(".fileinputTranscribe") as HTMLElement;
                      if (elem) {
                        elem.click();
                      }
                    }}>browse files</span>
                </h1>
              </div>

              {selectedFile === null && (
                <Image
                  className="uploadiconTranscribe"
                  style={{ transition: "0.5s ease-in-out" }}
                  width={90}
                  height={60}
                  src="/images/feature1.png"
                  alt="rve"
                />
              )}
            </div>


            <div className="w-[calc(100%_-_265px)] h-full border-2 border-solid flex items-center flex-col ">



              <div className="hover:bg-[#F1F3F6] hover:cursor-pointer w-full h-[50px] flex justify-center items-center mt-[5px] border-b-[0.1px] border-solid "
                onClick={(e) => {
                  e.preventDefault();
                  const elem = document.querySelector(".fileinputTranscribe") as HTMLElement;
                  if (elem) {
                    elem.click();
                  }
                }}
              >
                <div className="w-[20%] h-full flex items-center justify-center ">
                  <Image
                    width={27}
                    height={27}
                    src="/images/transcribeComputer.png"
                    alt="rve"
                  />
                </div>
                <h2 className="text-[0.87rem] font-[650] w-[80%] text-[#525252]">My Desktop</h2>
              </div>

              <div className="hover:bg-[#F1F3F6] hover:cursor-pointer w-full h-[50px] flex justify-center items-center border-b-[0.1px] border-solid">
                <Dialog open={open} onOpenChange={setopen}>
                  <DialogTrigger asChild>
                    <div className="hover:bg-[#F1F3F6] hover:cursor-pointer w-full h-[50px] flex justify-center items-center  border-b-[0.1px] border-solid">
                      <div className="w-[20%] h-full flex items-center justify-center">
                        <Image
                          width={27}
                          height={27}
                          src="/images/transcribeLink.png"
                          alt="rve"
                        />
                      </div>
                      <h2 className="text-[0.87rem] font-[650] w-[80%] text-[#525252] ">Link (G.Drive, Cloud..)</h2>
                    </div>
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
                        onClick={async (e) => {
                          e.preventDefault();
                          setopen(false)
                        }}
                      >
                        Upload
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>



              <Dialog open={recordopen} onOpenChange={setrecordopen} >
                <DialogTrigger asChild>
                  <div className="hover:bg-[#F1F3F6] hover:cursor-pointer w-full h-[50px] flex justify-center items-center  border-b-[0.1px] border-solid">
                    <div className="w-[20%] h-full flex items-center justify-center">
                      <Image
                        width={27}
                        height={27}
                        src="/images/transcribeRecord.png"
                        alt="rve"
                      />
                    </div>
                    <h2 className="text-[0.87rem] font-[650] w-[80%] text-[#525252] ">Capture Audio</h2>
                  </div>
                </DialogTrigger>
                <DialogContent className="base:max-w-[90%] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Capture Audio</DialogTitle>
                    <DialogDescription>
                      Please speak naturally and at a moderate pace for best results.
                    </DialogDescription>
                  </DialogHeader>
                 <RecordAudio audioflow={audioflow} changeRecording={changeRecording} changeRecordblobURL={changeRecordblobURL} changeisBlocked={changeisBlocked} isRecording={isRecording} RecordblobURL={RecordblobURL} isBlocked={isBlocked} changeaudioflow={changeaudioflow} changeRecordDialog={changeRecordDialog} />
                  {RecordVoice !== null && (
                    <DialogFooter>
                      <Button type="submit" className="px-6">Upload</Button>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioUpload