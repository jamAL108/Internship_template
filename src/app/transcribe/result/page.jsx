'use client';
import React, { useRef, useState, useEffect } from 'react'
import Nav from '@/components/commonComponent/nav'
import { useRouter } from 'next/navigation';
import Audioshowcomp from './audioshow'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

import { Copy, Check } from 'lucide-react';

import saveATranscribeData from '@/apiReq/saveTranscribeData'

import { ColorRing } from 'react-loader-spinner'

import getBlobDuration from 'get-blob-duration'

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
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import TextareaAutosize from 'react-textarea-autosize';
import { PencilLine, Pen, ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IndicTransliterate, Language } from "../../../@ai4bharat/indic-transliterate";
import "../../../@ai4bharat/indic-transliterate/dist/index.css";

const Page = () => {
  const [BlobURL, setBlobURL] = useState(null)
  const [blobcontent, setblobcontent] = useState(null)
  const waveformRef = useRef(null);
  const [sourceLang, setsourceLang] = useState('')
  const router = useRouter()
  const [showresult, setshowresult] = useState(false)

  const [repsonseText, setresponseText] = useState('')

  const [copyClickPadState, setCopyClickPadState] = useState(false)

  const [loader, setLoader] = useState(false)

  const [saveChangesDialog, setSaveChangesDialog] = useState(false)

  const [audioName, setAudioName] = useState('')

  const [edit, setedit] = useState(false)
  const [hindiKeyboard, sethindiKeyboard] = useState(false)

  useEffect(() => {
    const storedBlob = localStorage.getItem('votumAudio')
    if (storedBlob === null) {
      router.push('/transcribe')
    } else {
      const byteCharacters = atob(storedBlob);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const restoredBlob = new Blob([byteArray], { type: "audio/mpeg" });
      const bloburl = URL.createObjectURL(restoredBlob)
      setBlobURL(bloburl)
      setblobcontent(restoredBlob)
    }
  }, [])

  useEffect(() => {
    console.log(BlobURL)
  }, [BlobURL])

  const copyOutputText = () => {
    setCopyClickPadState(true)
    navigator?.clipboard?.writeText(repsonseText)
    setTimeout(() => {
      setCopyClickPadState(false)
    }, 1000)
  }

  const handleclick = () => {
    if (BlobURL === null || sourceLang.length === 0) {
      console.log("ERRRORRR")
      toast({
        variant: "destructive",
        title: "Data missing Error",
        description: "Please provide us with the audio and source language to proceed",
      });
    } else {
      setshowresult(true)
      API();
    }
  }

  const saveChangesApi = async () => {
    setLoader(true)
    var audioBlob = blobcontent
    const duration = await getBlobDuration(blobcontent)
    console.log(duration)
    var audioFileName = Math.floor(Math.random() * 90000) + 10000;
    var audioFileName = `${audioFileName}.mp3`
    var file = new File([audioBlob], audioFileName, { type: audioBlob.type });
    console.log(file.duration)
    const formdata = {
      file, repsonseText, Language: sourceLang, Length: Math.trunc(duration), Name: audioName
    }
    const result = await saveATranscribeData(formdata)
    if (result.success === true) {
      toast.success("Transcribe Data Stored successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoader(false)
      setSaveChangesDialog(false)
    } else {
      toast.error(result.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoader(false)
      setSaveChangesDialog(false)
    }
  }

  function getAudioDuration(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        const audioBlob = new Blob([event.target.result]);
        const audio = new Audio();
        const url = URL.createObjectURL(audioBlob);

        audio.addEventListener('loadedmetadata', () => {
          const duration = audio.duration;
          URL.revokeObjectURL(url);
          resolve(duration);
        });

        audio.addEventListener('error', () => {
          reject(new Error('Error loading audio'));
        });

        audio.src = url;
      };

      reader.onerror = function () {
        reject(new Error('Error reading audio file'));
      };

      reader.readAsArrayBuffer(blob);
    });
  }

  const API = async () => {
    setresponseText("")
    console.log(blobcontent)
    var audioBlob = blobcontent;
    var audioFileName = 'audiofile.mp3';

    var audioFile = new File([audioBlob], audioFileName, { type: audioBlob.type });
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("Language", sourceLang);
    formData.append("file_name", audioFileName);
    const URL = "https://transcribe.thevotum.com/transcribe"
    try {
      const resp = await fetch(URL, {
        method: "POST",
        body: formData
      })
      const msg = await resp.json();
      console.log(msg)
      setresponseText(msg.transcript)
      setresponseText('lorem wekjfnwe kjweef jk erv erkjbvrkj rkj brkbnkw fkjwbnfouw kjnfwkjf owenff wenf kjwenc kjndck jknqwd iuqwhwd qiwwdh 9wsjoid mswiwd uwef uw')
    } catch (err) {
      console.log(err)
      setresponseText('lorem wekjfnwe kjweef jk erv erkjbvrkj rkj brkbnkw fkjwbnfouw kjnfwkjf owenff wenf kjwenc kjndck jknqwd iuqwhwd qiwwdh 9wsjoid mswiwd uwef uw')
    }
  }

  return (
    <div className='text-pop bg-white w-[100vw] dark:text-black flex items-center justify-start !overflow-x-hidden flex-col max-w-[100vw] landing min-h-[100vh]'>
      <Nav />
      <AlertDialog onOpenChange={setSaveChangesDialog} open={saveChangesDialog} >
        <AlertDialogContent className='base:w-[90%] tv:w-auto base:rounded-[10px]'>
          <CardHeader className='!px-[10px] !py-[5px]'>
            <CardTitle className='base:text-[1.1rem]'>Save Transcription</CardTitle>
            <CardDescription>Adding a Name to your transcript can help you uniquely identify it. Give a name which gives a proper context to your audio </CardDescription>
          </CardHeader>
          <CardContent className='!px-[10px] !py-[5px]'>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input value={audioName} onChange={(e) => setAudioName(e.target.value)} className='w-[80%]' id="name" placeholder="Context of your audio" />
                </div>
              </div>
            </form>
          </CardContent>
          <AlertDialogFooter className='base:flex-row base:justify-end base:gap-[20px]'>
            <AlertDialogCancel onClick={(e) => setSaveChangesDialog(false)}>Cancel</AlertDialogCancel>
            <div disabled={loader} style={loader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={saveChangesApi} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] cursor-pointer flex justify-center items-center px-5 base:min-h-[20px] tv:min-h-[35px] tv:py-[0.32rem] rounded-[8px]'>
              <ColorRing
                visible={loader}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
              <h2 className='text-white text-[0.88rem] font-[580]'>Save Changes</h2>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='w-[min(100%,1900px)] mt-[15px] flex flex-col justify-center items-center gap-7'>
        <div className='w-[95%] h-[150px] rounded-[15px] bg-[#E1E1FF] flex  items-center flex-col'>

          <div className='w-full h-[40px] flex ml-[40px] items-center'>
            <h1 className='text-[#465A69] font-[600] text-[0.9rem] tracking-[0.4px] text-center'>INPUT AUDIO</h1>
          </div>
          {BlobURL !== null && (
            <Audioshowcomp source={BlobURL} />
          )}
        </div>

        <div className='w-[95%] h-[100px] flex justify-between'>
          <div className='w-[300px] h-full flex flex-col gap-2'>
            <Label htmlFor="framework" className='text-[#465A69]  text-[0.9rem] tracking-[0.4px] font-[600] '>Provide the Source Language<span className="span">*</span></Label>

            <Select value={sourceLang}
              onValueChange={(e) => {
                setsourceLang(e)
                const bloburl = URL.createObjectURL(blobcontent)
                setBlobURL(bloburl)
              }}
            >
              <SelectTrigger id="framework" className="font-[530] p-6 rounded-xl translateSelect">
                <SelectValue placeholder="Source Language" className='!text-lg opacity-[0.6]' />
              </SelectTrigger>
              <SelectContent position="popper" >
                <SelectItem value="English" className='p-2'>English</SelectItem>
                <SelectItem value="Hindi" className='p-2'>Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div style={sourceLang.length !== 0 ? { opacity: 1 } : { opacity: 0.7 }}>
            <Button disabled={sourceLang.length === 0} className='p-5 px-8 bg-[#6680ff] hover:bg-[#004fc5] font-[600] text-[0.89rem] tracking-wider' onClick={(e) => handleclick()}>Generate</Button>
          </div>
        </div>
        {/* ////#FFDD95  /// #F1EAFF//#D0A2F7  ///     */}
        {showresult === true && (
          <div className='select-none bg-[#E5CFF7] w-[95%] min-h-[300px] h-auto rounded-[15px] flex flex-col mb-[50px]'>
            <div className='w-full h-[70px] flex items-center justify-between'>

              <div className='flex items-center base:ml-[20px] md:ml-[40px] h-full w-auto gap-7'>
                {/* <div className=' flex justify-center items-center  py-[0.32rem] rounded-[50px]'>
                  <h2 className='text-[#5B0888] text-[0.88rem] font-[580]'>RESULT</h2>
                </div> */}
                <div className=' flex justify-center items-center  py-[0.32rem] rounded-[50px]'>
                  <h2 className='text-[#5B0888] text-[0.88rem] font-[580]'>Transcribed Text</h2>
                </div>
                {repsonseText.length !== 0 && (
                  <>
                    <div onClick={(e) => setSaveChangesDialog(true)} className='bg-[#5B0888] cursor-pointer flex justify-center items-center px-5 py-[0.32rem] rounded-[50px]'>
                      <h2 className='text-white text-[0.88rem] font-[580]'>Save Audio</h2>
                    </div>

                    <div onClick={(e) => {
                      if (edit === true) {
                        setedit(false)
                      } else {
                        setedit(true)
                      }
                    }} className={` ${edit === false ? 'bg-[#5B0888]' : 'bg-white'} cursor-pointer flex justify-center items-center w-[36px] h-[36px] rounded-full`}>
                      {edit === true ? (
                        <Pen size={20} color='#5B0888' />
                      ) : (
                        <PencilLine size={20} color='white' />
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className='bg-[#5B0888] hover:bg-[#5B0888 flex justify-center items-center gap-1'>
                          Keyboards <ChevronsUpDown size={12} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={hindiKeyboard}
                          onCheckedChange={sethindiKeyboard}
                        >
                          Hindi Keyboard
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>

              <div className=' mr-[20px] px-[10px]'>
                {repsonseText.length !== 0 && copyClickPadState === false && (
                  <Copy size={20} color='black' className='cursor-pointer' onClick={copyOutputText} />
                )}
                {copyClickPadState === true && (
                  <Check size={28} color='#5B0888' />
                )}
              </div>

            </div>

            {repsonseText.length !== 0 && (
              <div className='w-[90%] ml-[5%] mr-[5%] flex mt-[10px] mb-[20px]'>
                {edit === false ? (
                  <h1 className='text-[#5B0888] base:text-3xl md:text-3xl font-[500] base:leading-[55px] md:leading-[50px]'>{repsonseText}</h1>
                ) : hindiKeyboard === false && edit === true ? (
                  <TextareaAutosize value={repsonseText} onChange={(e) => setresponseText(e.target.value)} className='w-full !resize-none  bg-transparent  break-words outline-none text-[#5B0888] base:text-3xl md:text-3xl font-[500] base:leading-[55px] md:leading-[50px]' />
                ) : hindiKeyboard === true && edit === true && (
                  <IndicTransliterate
                    renderComponent={(props) => <TextareaAutosize className='w-[min(85vw,1670px)] !resize-none  bg-transparent  break-words outline-none text-[#5B0888] base:text-3xl md:text-3xl font-[500] base:leading-[55px] md:leading-[50px] !max-h-auto !h-auto' {...props} />}
                    value={repsonseText}
                    onChangeText={(text) => {
                      setresponseText(text)
                    }}
                    offsetX={10}
                    maxOptions={3}
                    lang='hi'
                  />
                )}
              </div>
            )}
            {repsonseText.length === 0 && (
              <div className='w-[100%] h-[300px] flex justify-center items-center'>
                <ClipLoader
                  color={"#5B0888"}
                  loading={true}
                  size={70}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page