"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Check } from 'lucide-react';

export default function AudioWaveform(props) {
  const { fileURL , changeaudioflow , changeRecordblobURL , changeRecordDialog} = props;
  // const waveformRef = useRef(null);
  // let wavesurfer;
  // const [playPause, setPlayPause] = useState();

  // const [play, setplay] = useState(true)

  // useEffect(() => {
  //   wavesurfer = WaveSurfer.create({
  //     container: waveformRef.current,
  //     waveColor: "#34374B",
  //     progressColor: "#7C3AED",
  //     url: fileURL,
  //     dragToSeek: true,
  //     width: "260px",
  //     hideScrollbar: true,
  //     normalize: true,
  //     barGap: 5,
  //     height: 90,
  //     barHeight: 20,
  //     barRadius: 20,
  //     barWidth: 5,
  //   });

  //   wavesurfer.on("finish", () => {
  //     console.log("song finished");
  //   });

  //   wavesurfer.on("ready", () => {
  //     console.log("Waveform is ready");
  //   });

  //   return () => {
  //     wavesurfer.destroy();
  //   };
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleStop = () => {
  //   if (wavesurfer) {
  //     wavesurfer.stop();
  //   }
  // };
  // const handlePause = () => {
  //   if (wavesurfer) {
  //     wavesurfer.playPause();
  //   }
  // };
  // const handleSkipForward = () => {
  //   if (wavesurfer) {
  //     wavesurfer.skip(2);
  //   }
  // };
  // const handleSkipBack = () => {
  //   if (wavesurfer) {
  //     wavesurfer.skip(-2);
  //   }
  // };

  return (
    <div className="w-[100%] h-[200px] flex mt-[15px] items-center flex-col container gap-4">
      {/* <div ref={waveformRef} className="w-[90%] h-[100px] mt-[-5px] flex justify-center wavesurfer-container" />
      <div className="w-[90%] h-[50px] flex justify-center items-center gap-4">
        <button onClick={(e)=>{
          e.preventDefault()
          changeaudioflow(0)
          changeRecordblobURL('')
        }}>
          <Image width={30} height={30} className="opacity-[0.7]" src='/images/trashicon.png' alt='erg' />
        </button>

        <div className="w-[60%] h-[45px] bg-[#7C3AED] rounded-sm flex justify-center items-center ">
          <div className="w-[27px] h-[27px] bg-[#34374B] cursor-pointer " onClick={handlePause}></div>
        </div>
          <Check size={30} color="#34374B" className="cursor-pointer" onClick={(e)=>{
            e.preventDefault()
            changeRecordDialog(false)
          }}/>
      </div> */}
    </div>
  );
}


//   const { fileURL } = props;
//   const waveformRef = useRef(null);
//   let wavesurfer;
//   const [play, setPlay] = useState(false);
//   const [playPause , setplayPause] = useState()

//   useEffect(() => {
//     wavesurfer = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: "#34374B",
//       progressColor: "#7C3AED",
//       url: fileURL,
//       dragToSeek: true,
//       width: "250px",
//       hideScrollbar: true,
//       normalize: true,
//       barGap: 1,
//       height: 90,
//       barHeight: 20,
//       barRadius: 20,
//       barWidth: 5,
//     });

//     wavesurfer.on("finish", () => {
//       wavesurfer.stop();
//       setPlay(false)
//       console.log("song finished");
//     });

//     wavesurfer.on("ready", () => {
//       console.log("Waveform is ready");
//     });
//     return () => {
//       wavesurfer.destroy();
//     };
//   }, []);


//   useEffect(()=>{
//     console.log(wavesurfer)
//   },[wavesurfer])


//   const handlePlay = () => {
//     if (wavesurfer) {
//       setPlay(true)
//       wavesurfer.play();
//     }
//   };



//   return (
//     <div className="w-[100%] h-[200px] flex mt-[15px] items-center flex-col container gap-4">
//       <div ref={waveformRef} className="w-[90%] h-[100px] flex justify-center wavesurfer-container" />


//       <div className="w-[90%] h-[50px] !flex !justify-center !items-center !gap-2 wavesurfer-controls">
//       <button >
//           <Image width={30} height={30} className="opacity-[0.5]" src='/images/trashicon.png' alt='erg' />
//         </button>

//         <div className="w-[60%] h-[50px] bg-[#7C3AED] rounded-sm flex justify-center items-center ">
//           {play === false && (
//             <Image className="cursor-pointer" src='/images/transcribePlay.png' alt='play' width={35} height={35} onClick={(e)=>{
//               e.preventDefault()
//               console.log("play")
//               handlePlay()
//             }}/>
//           )}
//           {play === true && (
//             <button className="cursor-pointer" onClick={(e)=>{
//               console.log("pause")
//               console.log(wavesurfer)
//               e.preventDefault()
//               if (wavesurfer) {
//                 setPlay(false)
//                 wavesurfer.playPause();
//               }
//             }}>
//               <Image src='/images/transcribePause.png' alt='rgr' width={35} height={35}/>
//             </button>
//           )}
//         </div>

//         <button>
//         <Image width={30} height={30} className="opacity-[0.5]" src='/images/trashicon.png' alt='erg' />
//         </button>
//       </div>
//     </div>
//   );
// }






{/* <button >
          <Image width={30} height={30} className="opacity-[0.5]" src='/images/trashicon.png' alt='erg' />
        </button>
        <div className="w-[60%] h-[50px] bg-[#7C3AED] rounded-sm flex justify-center items-center ">
          {play === false && (
            <Image className="cursor-pointer" src='/images/transcribePlay.png' alt='play' width={35} height={35} onClick={(e)=>{
              e.preventDefault()
              console.log("play")
              handlePlay()
            }}/>
          )}
          {play === true && (
            <Image className="cursor-pointer" src='/images/transcribePause.png' alt='pause' width={35} height={35} onClick={(e)=>{
              console.log("pause")
              console.log(wavesurfer)
              e.preventDefault()
              if (wavesurfer) {
                setPlay(false)
                wavesurfer.pause();
              }
            }}/>
          )}
        </div>
        <button>
        <Image width={30} height={30} className="opacity-[0.5]" src='/images/trashicon.png' alt='erg' />
        </button> */}