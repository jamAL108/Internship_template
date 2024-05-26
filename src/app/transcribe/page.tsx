'use client';
import React, { useEffect, useState } from 'react'
import Nav from "../../components/commonComponent/nav";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
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


type FileState = Blob | null

const Page = () => {
  const router = useRouter()
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<FileState>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file && !isValidFile(file.name)) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Make sure that you're uploading a DOCX/PDF file",
      });
    } else if (file) {
      setSelectedFile(file);

    }
  };

  useEffect(() => {
    if (selectedFile) {
      storeBlobInSessionStorage()
    }
  }, [selectedFile])

  const storeBlobInSessionStorage = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const base64String = (event.target.result as string).split(",")[1];
          localStorage.setItem("votumAudio", base64String);
        }
      };
      reader.readAsDataURL(selectedFile);
      router.push('/transcribe/result')
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "some issue with your file....!",
      });
    }
  };


  const isValidFile = (filePath: string) => {
    return true;
    // return filePath.endsWith(".mp3");
  };



  return (
    <div className='bg-[#FAFAFA] min-h-[100vh] dark:bg-transparent  overflow-x-hidden flex items-center justify-start flex-col md:w-[100%] base:w-[100%]'>
      <Nav />
      <AlertDialog>
      <AlertDialogTrigger asChild className='w-0 h-0 opacity-0 appearance-none'>
        <div className='w-0 h-0 opacity-0 transcribeloginalertbox'>Show Dialog</div>
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
          <AlertDialogAction className='px-5' onClick={(e)=>{
            e.preventDefault()
            router.push('/auth/signin')
          }}>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
      <div className="md:w-[min(85vw,1100px)] base:w-[90vw] flex flex-col items-center justify-start mb-[40px] relative base:gap-[30px] tv:gap-[0px]">
        <h1 className="font-pop base:text-[3rem] tv:text-[5rem] mt-6 text-center base:leading-[50px] tv:leading-[100px]">
          Automated Transcription <br /> Audio-Text Convertor
        </h1>
        <p className="base:w-[95%] tv:w-[80%] tv:mt-[30px] text-center text:sm text-muted-foreground">
          Our Votum-Transcribe app merges advanced AI with expert review,
          delivering swift, precise, and reliable Audio to Text converison in just 4 Steps.
        </p>
        <div className='w-[50%] h-[100px] flex base:flex-col tv:flex-row justify-center items-center base:gap-4 tv:gap-7'>
          <input
            type="file"
            hidden
            // accept="audio/mp3"
            onChange={handleFileChange}
            className="fileinputTranscribe"

          />
          <Button className='base:w-[80vw] tv:w-auto tv:mt-[30px] p-5 px-6 text-[1rem]' onClick={async (e) => {
            e.preventDefault()
            const result = await checkUserAuthClient()
            console.log(result)
            const {userExist} = result
            if (userExist === false) {
              const elem = document.querySelector('.transcribeloginalertbox') as HTMLElement;
              if(elem){
                elem.click();
              }
            } else {
              const elem = document.querySelector(".fileinputTranscribe") as HTMLElement;
              if (elem) {
                elem.click();
              }
            }
          }}>Browse file</Button>

          <Button className='base:w-[80vw] tv:w-auto tv:mt-[30px] p-5 px-6 text-[1rem]' onClick={async(e) => {
            e.preventDefault()
            const result = await checkUserAuthClient()
            console.log(result)
            const {userExist} = result
            console.log(userExist)
            if (userExist === false) {
              const elem = document.querySelector('.transcribeloginalertbox') as HTMLElement;
              if(elem){
                elem.click();
              }
            }else if(userExist === true) {
              router.push('/transcribe/record')
            }
          }}>Capture Audio</Button>
        </div>
      </div>

    </div>
  )
}

export default Page