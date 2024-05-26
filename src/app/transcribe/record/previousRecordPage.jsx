'use client';
import React, { useState, useEffect } from 'react'
//bg-[#E8F3FF] bg-[#efe6ff] bg-[#efd7fa]  bg-[#f9e8ff]  bg-[#ffe8f8]  bg-[#ebe8ff]
import { Button } from '@/components/ui/button'
import MicRecorder from 'mic-recorder-to-mp3';
import { useToast } from "@/components/ui/use-toast";
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );
  const router = useRouter()
  const [isBlocked, setisBlocked] = useState(false)
  const [Blob, setBlob] = useState('')
  const [isRecording, setisRecording] = useState(false)
  const toast = useToast()
  const [audioform, setaudioform] = useState(0)
  const [timer, setTimer] = useState(0);
  const [seconds, setSeconds] = useState(0);




  useEffect(() => {
    let interval = null;

    if (isRecording === true) {
      if (seconds < 60) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (seconds === 60) {
        clearInterval(interval);
        setisRecording(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRecording, seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  useEffect(() => {
    if (audioform === 1) {
      if(navigator.getUserMedia){
        navigator.getUserMedia({ audio: true },
          () => {
            console.log('Permission Granted');
            start()
            setisBlocked(false)
          },
          () => {
            console.log('Permission Denied');
            setisBlocked(true)
          },
        );
        }else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          console.log("WORKED BROOOO SUCCESSS")
        navigator.mediaDevices.getUserMedia({ audio: true },
          () => {
            console.log('Permission Granted');
            start()
            setisBlocked(false)
          },
          () => {
            console.log('Permission Denied');
            setisBlocked(true)
          },
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioform])

  const start = () => {
    if (isBlocked) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "The permission to access your mic is denied",
      });
    } else {
      recorder
        .start()
        .then(() => {
          setisRecording(true)
        }).catch((e) => console.error(e));
    }
  };


  const stop = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, bloby]) => {
        storeBlobInlocalStorage(bloby)
        setBlob(bloby)
        router.push('/transcribe/result')
        setisRecording(false)
      }).catch((e) => console.log(e));
  };

  const storeBlobInlocalStorage = (blobURL) => {
    if (blobURL) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64String = (event.target.result).split(",")[1];
          localStorage.setItem("votumAudio", base64String);
        }
      };
      reader.readAsDataURL(blobURL);
    } else {
      console.error("No Blob data available to store.");
    }
  };



  return (
    <div className='bg-white text-pop w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='w-[97vw] h-[97vh] base:rounded-[30px] md:rounded-[36px]   bg-[#E1E1FF] flex flex-col '>
        <div className='w-[150px] h-[70px] flex ml-[30px] justify-center items-center'>
          <h1 className='text-[#465A69] font-[600] text-[0.95rem] tracking-[0.4px]'>RECORD AUDIO</h1>
        </div>
        {audioform === 0 && (
          <div className='w-[100%] base:h-[400px] md:h-[300px] flex justify-center items-center flex-col gap-4'>
            <h1 className='text-black text-4xl font-[540] tracking-[0.5px] text-center'>Say Something to <span className='text-[#7C3AED]'>transcribe</span> it into Text</h1>
            <h2 className='text-md font-[550] text-muted-foreground text-center'>Please speak naturally and at a moderate pace for best results.</h2>
            <Button className='absolute bottom-[70px] p-6 px-8 font-[600] text-[0.86rem]' onClick={(e) => {
              e.preventDefault()
              setaudioform(1);
            }}>START RECORDING</Button>
          </div>
        )}
        {audioform === 1 && (
          <div className='w-[100%] h-[300px] flex justify-center items-center flex-col gap-4'>
            <div className='w-[300px] flex justify-center items-center gap-4'>
              <div className="w-[50px] h-[50px]">
                <img src="/images/transcribeStop.png" alt="fvdvre" className="w-[100%] h-[100%] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push('/transcribe/result')
                    stop()
                  }} />
              </div>
              <div className='flex justify-center items-center gap-2'>
                <h1 className='text-2xl font-[600]'>{formatTime(seconds)}</h1>
                <h1 className='text-2xl font-[600]'>Speak..!</h1>
              </div>
            </div>
            <h2 className='base:[90%] md:w-[600px] text-center text-md font-[550] text-muted-foreground'>You can record an audio clip that’s 2-60 seconds in length ,  Please speak naturally and at a moderate pace for best results.</h2>
            <Button className='absolute bottom-[70px] p-6 px-8 font-[600] text-[0.86rem]'
              onClick={(e) => {
                e.preventDefault()
                stop()
              }}
            >STOP RECORDING</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page