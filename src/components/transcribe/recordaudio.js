'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MicRecorder from 'mic-recorder-to-mp3';
import { useToast } from "@/components/ui/use-toast";
import Wavefront from './waveform'

const RecordAudio = (props) => {
    const { audioflow, changeRecording, changeRecordblobURL, changeisBlocked, isRecording, RecordblobURL, isBlocked, changeaudioflow,changeRecordDialog } = props
    const [recorder, setMp3Recorder] = useState(
        new MicRecorder({ bitRate: 128 })
    );
    const { toast } = useToast();

    const [timer, setTimer] = useState(0);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };

    useEffect(() => {
        if (audioflow === 0) {
            navigator.getUserMedia({ audio: true },
                () => {
                    console.log('Permission Granted');
                    changeisBlocked(false)
                },
                () => {
                    console.log('Permission Denied');
                    changeisBlocked(true)
                },
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioflow])


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
                    changeRecording(true)
                }).catch((e) => console.error(e));
        }
    };


    const stop = () => {
        recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                changeRecordblobURL(blobURL)
                changeRecording(false)
            }).catch((e) => console.log(e));
    };

    return (
        <>
            {audioflow === 0 && (
                <div className="w-[100%] h-[200px] flex justify-center" onClick={(e) => {
                    e.preventDefault()
                    start()
                    changeaudioflow(1)
                }}>
                    <div className="w-[80%] h-[90%] flex flex-col justify-center items-center gap-[15px] cursor-pointer">
                        <div className="w-[115px] h-[115px] flex justify-center items-center bg-[#7C3AED] rounded-full">
                            <Image width={80} height={80} src="/images/transcribeLightMic.png" alt="ev" />
                        </div>
                        <h2 className="text-md font-[550]">Tap to talk.!</h2>
                    </div>
                </div>
            )}
            {audioflow === 1 && (
                <div className="w-[100%] h-[200px] flex justify-center items-center flex-col">
                    <div className="w-[80%] h-[100px] flex justify-center items-center">
                        <img className="w-[80%] h-[60px]" src="/images/color_wave.gif" alt="er" />
                    </div>
                    <div className="w-[80%] h-[100px] flex justify-center items-center gap-5">
                        <h1 className="text-sm font-[600] text-muted-foreground">{formatTime(timer)}</h1>
                        <div className="w-[50px] h-[50px]" onClick={(e) => {
                            e.preventDefault()
                            stop()
                            changeaudioflow(2)
                        }}>
                            <img src="/images/transcribeStop.png" alt="fvdvre" className="w-[100%] h-[100%] cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}
            {audioflow === 2 && (
                <div className="w-[100%] h-[200px] flex justify-center items-center flex-col">
                    <Wavefront fileURL={RecordblobURL} changeaudioflow={changeaudioflow} changeRecordblobURL={changeRecordblobURL} changeRecordDialog={changeRecordDialog} />
                </div>
            )}
        </>
    )
}

export default RecordAudio