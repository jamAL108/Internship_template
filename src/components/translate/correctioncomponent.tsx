'use client';
import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react';
import scroll from '@/utils/scroll';
const EvaluateComponent = () => {
  return (
    <div className='text-pop poppinsFonts w-[min(90vw,1300px)] bg-[#F1EAFF] rounded-t-[2rem] h-[600px] flex flex-col justify-start items-center mb-[8rem] '>
       <div className='h-[90%] w-[100%] px-[60px] py-[50px] flex justify-center items-center'>
          <div className=' w-[50%] h-[100%] rounded-b-[2rem] flex flex-col justify-center gap-3'>
          <p className='text-[#4D6AFF] text-[0.77rem] tracking-wider font-[650] '>CORRECTION OF DOCUMENT</p>
         <h1 className='text-[#0F1949]  text-[2rem] tracking-[2px] font-[650] leading-[40px]'>Make Any Changes as per your wish</h1>
         <p className='text-[0.9rem] font-[500] w-[95%] text-muted-foreground tracking-[0.4px]'>check the translated document ( provided paragraph wise ) and make any changes if required</p>

         <div className='w-[95%] flex  items-center gap-2 mt-[13px]'>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>Hindi word suggestions are Provided for Seamless Typing.</p>
         </div>

         <div className='w-[95%] flex  items-center gap-2 mt-[7px] '>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>A preview of The Original Document is provided and making it easier for user to identify where corrections are required</p>
         </div>

         <div className='w-[95%] flex  items-center gap-2 mt-[7px]'>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>A preview of The Translated Document is provided and giveing the clear view of how the Translated Document will look like.</p>
         </div>

         <div className='w-[95%] flex  items-center gap-2 mt-[7px]'>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>Hindi Keyboard support Provided for Seamless Typing.</p>
         </div>

          </div>

          <div className=' w-[50%] h-[100%] flex justify-center '>
               <img className='w-[100%] mt-[40px] h-[75%]' src="/images/correctionShot.png" alt="dvf" />
          </div>


       </div>
       <div className='h-[60px] w-[100%]  bg-[#D0A2F7] rounded-b-[2rem] flex justify-center items-center 3'>
        <Button onClick={(e)=>scroll('transDiv')} className='text-[0.97rem] transition duration-500 ease-in-out tracking-[0.6px] text-[#5B0888] font-[600] hover:text-[#5B0888] flex justify-center items-center gap-1 hover:bg-white bg-transparent border-none' variant='outline'>
          Translate 
          <ChevronRight size={20} color='#5B0888'/>
        </Button>
       </div>
    </div>
  )
}

export default EvaluateComponent