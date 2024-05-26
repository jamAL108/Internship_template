'use client';
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAudioData } from '@/apiReq/dashboardAPIs/transcribe'
import { toast } from 'react-toastify'
import Skeleton from './skeleton'
import { Globe, Clock4, Tags , Copy , Check } from 'lucide-react'
import AudioShow from './audioShow'
const component: React.FC<any> = (props) => {
    const { audioId } = props
    const router = useRouter()
    const [audioData, setAudioData] = useState<any>({})
    const [loader, setLoader] = useState<boolean>(true)
    const [copyClickPadState , setCopyClickPadState] = useState<boolean>(false)
    useEffect(() => {
        getAudioDataFunction()
    }, [])

    const getAudioDataFunction = async () => {
        const result: any = await getAudioData(audioId)
        if (result.success === true) {
            setLoader(false)
            setAudioData(result.data)
        } else {
            setLoader(false)
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
        }
    }

    const copyOutputText = () => {
        setCopyClickPadState(true)
        navigator?.clipboard?.writeText(audioData.text)
        setTimeout(() => {
          setCopyClickPadState(false)
        }, 1000)
      }

    if (loader === true) {
        return <Skeleton />
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex justify-between items-center base:pl-[20px] tv:pl-[30px] py-[20px] pr-[30px]'>
                <div className='flex items-center gap-[0.8rem]'>
                    <div onClick={(e) => router.push('/home/audiotranscribe')} className='rounded-full cursor-pointer bg-[#e8effe] w-[28px] h-[28px] flex justify-center items-center'>
                        <ArrowLeft size={21} color='#5b89e9' />
                    </div>
                    <h2 className='text-[0.95rem] font-[500] select-none'>Go back</h2>
                </div>
            </div>

            <div className='w-full flex flex-col px-[60px] py-[20px]'>
                <div className='w-full flex flex-col gap-[15px]  select-none'>
                    <h1 className='text-[#667085] text-4xl font-[600]'>{audioData.Name}</h1>
                    <div className='flex gap-[15px] items-center '>
                        <div className='flex gap-2 items-center'>
                            <Globe size={17} color='#667085' />
                            <p className='tetx-[0.89rem]'>{audioData.Language}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Clock4 size={17} color='#667085' />
                            <p className='tetx-[0.89rem]'>{audioData.Length}s</p>
                        </div>
                    </div>
                    <div className='flex gap-[20px] items-center mt-[-8px]'>
                        <div className='flex gap-2 items-center'>
                            <Tags size={17} color='#667085' />
                            <p className='tetx-[0.89rem]'>Tags</p>
                        </div>
                    </div>

                </div>

                <div className='w-full flex flex-col gap-[30px] py-[30px]'>
                    <AudioShow source={audioData.audio} />
                    <div className='w-full h-auto rounded-[10px] bg-[#e8effe] text-[#5b89e9] flex px-[20px] py-[20px] font-[600] min-h-[100px] pr-[40px] relative'>
                        <h1>{audioData.text}</h1>

                        <div className='px-[10px] absolute right-[20px] top-[20px]'>
                            {audioData.text.length !== 0 && copyClickPadState === false && (
                                <Copy size={18} color='black' className='cursor-pointer' onClick={copyOutputText} />
                            )}
                            {copyClickPadState === true && (
                                <Check size={18} color='#5B0888' />
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default component