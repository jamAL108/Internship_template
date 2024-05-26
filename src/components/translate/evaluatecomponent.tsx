'use client';
import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react';
import scroll from '@/utils/scroll';
const EvaluateComponent = () => {
  return (
    <div className='text-pop poppinsFonts w-[min(90vw,1300px)] bg-[#F2F4FF] rounded-t-[2rem] h-[600px] flex flex-col justify-start items-center mb-[4rem] '>
       <div className='h-[90%] w-[100%] px-[60px] py-[50px] flex justify-center items-center'>
          <div className=' w-[50%] h-[100%] flex justify-center '>
               <img className='w-[100%] mt-[40px] h-[75%]' src="/images/evaluateShot2.png" alt="dvf" />
          </div>
          <div className=' pl-[30px] w-[50%] h-[100%] rounded-b-[2rem] flex flex-col justify-center gap-3'>
          <p className='text-[#4D6AFF] text-[0.77rem] tracking-wider font-[650] '>EVALUATION OF DOCUMENT</p>
         <h1 className='text-[#0F1949]  text-[2rem] tracking-[2px] font-[650] leading-[40px]'>Perfecting Document Translation Accuracy</h1>
         <p className='text-[0.9rem] font-[500] text-muted-foreground tracking-[0.4px]'>Correct the low-confidence words mentioned here and adjust them as you see fit for improved translation.</p>

         <div className='w-[100%] flex  items-center gap-2 mt-[13px]'>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>Hindi word suggestions are Provided for Seamless Typing.</p>
         </div>

         <div className='w-[100%] flex  items-center gap-2 mt-[7px] '>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>A preview of The Original Document is provided and making it easier for user to identify where corrections are required</p>
         </div>

         <div className='w-[100%] flex  items-center gap-2 mt-[7px]'>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>Hindi Keyboard support Provided for Seamless Typing.</p>
         </div>

         <div className='w-[100%] flex  items-center gap-2 mt-[7px]'>
          <img src="/images/correct.svg" alt="vf"  className='w-[17px] h-[17px]'/>
          <p className='text-[0.85rem] font-[500] tracking-[0.4px]'>Hindi Keyboard support Provided for Seamless Typing.</p>
         </div>

          </div>
       </div>
       <div className='h-[60px] w-[100%]  bg-[#CCD5FF] rounded-b-[2rem] flex justify-center items-center '>
        <Button onClick={(e)=>scroll('transDiv')} className='text-[0.97rem] transition duration-500 ease-in-out tracking-[0.6px] text-[#4D6AFF] font-[600] hover:text-[#4D6AFF] flex justify-center items-center gap-1 hover:bg-white bg-transparent border-none' variant='outline'>
          Translate
          <ChevronRight size={20} color='#4D6AFF'/>
          </Button>
       </div>
    </div>
  )
}

export default EvaluateComponent