import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonComp = () => {
  return (
    <div className='w-[min(90vw,1300px)] h-[100vh] flex flex-col justify-start items-center'>
        <div className='w-[100%] h-[4rem] flex justify-between items-center mt-[10px]'>
         <div className='w-[50%] h-full flex justify-evenly items-center'>
         <Skeleton className="w-[200px] h-[30px] rounded-2" />
         <Skeleton className="w-[200px] h-[30px] rounded-2" />
         </div>

         <div className='w-[50%] h-full flex justify-end items-center mr-[20px]'>
           <Skeleton className="w-[200px] h-[30px] rounded-2" />
         </div>

        </div>

        <div className='w-full h-[100%] flex justify-center gap-3'>
           <Skeleton className="w-[50%] h-[80vh] rounded-2 base:hidden md:inline-block mt-[20px]" />

           <div className='w-[50%] h-full flex flex-col justify-start items-start pt-[10px]'>
             <div className='w-[100%] ml-[18px] mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[40%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>
             <div className='w-[100%] ml-[18px] mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[60%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] mt-[10px] ml-[18px] mr-[10px] pb-[18px] h-auto flex flex-col items-center justify-between border-b border-gray-100 dark:border-[#1F2937] gap-4'>

             <div className='h-[2.5rem] w-full flex items-center justify-between '>
             <Skeleton className="w-[55%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-full h-auto flex flex-col justify-center items-start gap-4'>
              <Skeleton className="w-[55%] h-[14px] rounded-2" />
              <Skeleton className='w-[98%] h-[2.2rem]'/>
              <div className='w-[50%] h-[2.5rem] flex justify-between items-center'>
                <Skeleton className='w-[100px] h-[2rem]'/>
                <Skeleton className='w-[160px] h-[2rem]'/>
              </div>
             </div>
             </div>

             <div className='w-[100%] ml-[18px]   mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[80%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[70%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             
             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[90%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>


             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[40%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             
             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[60%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             
             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[75%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[90%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[92%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[67%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[69%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>
             
             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[56%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px]  mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[87%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px] mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[29%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

             <div className='w-[100%] ml-[18px] mr-[10px] h-[3rem] flex items-center justify-between border-b border-gray-100 dark:border-[#1F2937]'>
             <Skeleton className="w-[26%] h-[14px] rounded-2" />
             <Skeleton className="w-[18px] h-[18px] rounded-full" />
             </div>

           </div>

        </div>
    </div>
  )
}

export default SkeletonComp