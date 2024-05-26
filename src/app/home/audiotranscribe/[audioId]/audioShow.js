'use client';
import React, { useRef, useEffect, useState } from 'react'
import WaveSurfer from "wavesurfer.js";
import { useRouter } from 'next/navigation';

const Audioshow = (props) => {
    const { source } = props;
    const waveformRef = useRef(null);
    const router = useRouter()
    let wavesurfer;
    const [playPause, setPlayPause] = useState();


    useEffect(() => {
        console.log(source)
        console.log("SOURCE MILGAYA")
        let wavewidth = '1050'
        let barWidth= '5'

        const wave = document.querySelector('.wavecontent')
        if(wave){
            const width = wave.offsetWidth;
            wavewidth = width-140;
            if(window.innerWidth<760){
                barWidth='3'
            }
        }

        console.log(wavewidth)

        wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#34374B",
            progressColor: "#5b89e9",
            url: source,
            dragToSeek: true,
            width: `${wavewidth}px`,
            hideScrollbar: true,
            normalize: true,
            barGap: 3,
            height: 90,
            barHeight: 16,
            barRadius: 20,
            barWidth: 3,
        });

        wavesurfer.on("finish", () => {
            console.log("song finished");
        });

        wavesurfer.on("ready", () => {
            console.log("Waveform is ready");
        });

        return () => {
            wavesurfer.destroy();
        };
    }, [source]);

    const handleStop = () => {
        if (wavesurfer) {
            wavesurfer.stop();
        }
    };
    const handlePause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
        }
    };


    return (
        <div className='w-[100%] ml-[-40px] h-[110px] flex gap-2 items-center wavecontent'>
            <div className='w-[120px] h-full flex justify-center items-center '>
                <div className='cursor-pointer w-[50%] h-full flex flex-col justify-center items-center gap-1'>
                    <img className='w-[34px] h-[34px]' src="/images/playResult.png" alt="evf" onClick={handlePause} />
                    <h2 className='text-sm font-[550] text-muted-foreground'>Play</h2>
                </div>
                {/* <div className='cursor-pointer w-[50%] h-full flex flex-col justify-center items-center gap-1'>
                    <img className='w-[34px] h-[34px]' src="/images/trashResult.png" alt="evf" onClick={(e) => {
                        e.preventDefault()
                        localStorage.removeItem('votumAudio')
                        router.push('/transcribe')
                    }} />
                    <h2 className='text-sm font-[550] text-muted-foreground'>Remove</h2>
                </div> */}
            </div>
            <div className='w-[calc(100%_-_120px)] h-full flex justify-center items-center'>
                <div ref={waveformRef} className="w-[100%] h-[100%] pr-[3px] flex justify-center wavesurfer-container" />
            </div>
        </div>
    )
}

export default Audioshow