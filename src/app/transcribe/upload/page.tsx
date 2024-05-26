'use client';
import React from 'react'
import Nav from "../../../components/commonComponent/nav";
import AudioUpload from '../../../components/transcribe/audioupload'
const Page = () => {
  return (
    <div className='text-pop bg-[#FAFAFA] dark:bg-transparent  overflow-x-hidden flex items-center justify-center flex-col md:w-[100%] base:w-[100%]'>
    <Nav/>
      <div className='w-[min(87vw,1100px)] min-h-[100vh] h-auto flex mt-[50px] flex-col'>
        <h1 className='text-5xl font-[660] tracking-wide'>Audio To Text in 4 steps</h1>
         <AudioUpload/>
      </div>
    </div>
  )
}

export default Page