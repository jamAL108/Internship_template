import React from 'react'
import { AlertCircle } from 'lucide-react';
const Error = () => {
  return (
    <div className='w-[100%] !h-[550px] bg-[#fff] '>
    <div className='w-[100%] !h-[550px]   flex justify-center items-center'>
      <div className='flex justify-center items-center gap-2'>
      <AlertCircle size={30} color='red'/>
      <h2 className='text-pop text-[1rem] font-560' style={{color:"black"}}>Error occured while loading the Document</h2>
      </div>
    </div>
  </div>
  )
}

export default Error