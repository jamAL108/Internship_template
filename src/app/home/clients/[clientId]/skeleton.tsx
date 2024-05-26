import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const skeletonComp = () => {
  return (
    <div className='flex w-full h-full justify-center'>
      <div className='w-[min(1300px,100%)] base:overflow-y-auto tv:overflow-y-hidden h-full flex base:flex-col tv:flex-row'>

        <div className='base:w-full tv:w-[37%] pl-[30px] pr-[15px] py-[20px] h-full flex flex-col'>
          <div className='w-full  flex justify-between items-center py-[2px] pr-[15px]'>
            <div className='flex items-center gap-[0.8rem]'>
              <Skeleton className='rounded-full w-[28px] h-[28px]' />
              <Skeleton className='rounded-[10px] w-[90px] h-[23px]' />
            </div>
          </div>


          <div className='w-full flex flex-col pr-[15px] overflow-y-auto overflow-x-hidden ClientDetailsContainer max-h-[90vh]'>
            <div className='flex flex-col mt-[25px] gap-[15px]'>
              <Skeleton className='w-[85px] h-[85px] rounded-[12px]' />
              <Skeleton className='rounded-[10px] w-[200px] h-[40px]' />
            </div>

            <div className='w-full pt-[20px] py-[10px] flex'>
              <div className='flex items-center gap-[18px]'>
                <Skeleton className='w-[180px] h-[20px]' />
                <Skeleton className='p-[5px] ml-[-5px] flex mt-[-5px] justify-center items-center rounded-full' />
              </div>
            </div>
            <div className='w-full flex flex-col gap-[8px] py-[10px]'>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='base:w-[95px] tv:w-[83px] h-[16px]' />
                <Skeleton className='base:w-[140px] tv:w-[122px] h-[16px]' />
              </div>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='base:w-[95px] tv:w-[83px] h-[16px]' />
                <Skeleton className='base:w-[141px] tv:w-[123px] h-[16px]' />
              </div>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='base:w-[95px] tv:w-[83px] h-[16px]' />
                <Skeleton className='base:w-[137px] tv:w-[115px] h-[16px]' />
              </div>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='base:w-[95px] tv:w-[83px] h-[16px]' />
                <Skeleton className='base:w-[138px] tv:w-[120px] h-[16px]' />
              </div>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='base:w-[95px] tv:w-[83px] h-[16px]' />
                <Skeleton className='base:w-[128px] tv:w-[118px] h-[16px]' />
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col pr-[15px] overflow-y-auto overflow-x-hidden ClientDetailsContainer max-h-[90vh]'>
            <div className='w-full pt-[20px] py-[10px] flex'>
              <div className='flex items-center gap-[18px]'>
                <Skeleton className='w-[180px] h-[20px]' />
                <Skeleton className='p-[5px] ml-[-5px] flex mt-[-5px] justify-center items-center rounded-full' />
              </div>
            </div>
            <div className='w-full flex flex-col gap-[8px] py-[10px]'>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='w-[83px] h-[16px]' />
                <Skeleton className='w-[122px] h-[16px]' />
              </div>
              <div className='w-full flex gap-[16px]'>
                <Skeleton className='w-[83px] h-[16px]' />
                <Skeleton className='w-[123px] h-[16px]' />
              </div>
            </div>
          </div>



        </div>

        <div className='base:w-full tv:w-[63%] base:px-[15px] tv:px-[0px] tv:pr-[30px] py-[20px] h-full flex flex-col'>
          <div className='w-full base:gap-[10px] tv:gap-[20px] flex pb-[15px] items-center'>
            <div className='cursor-pointer rounded-[5px] select-none base:px-[3px] tv:px-[10px] py-[6px] flex justify-center items-center'>
              <Skeleton className='w-[70px] h-[23px]' />
            </div>
            <div className='cursor-pointer rounded-[5px] select-none base:px-[3px] tv:px-[10px] py-[6px] flex justify-center items-center'>
              <Skeleton className='w-[70px] h-[23px]' />
            </div>
            <div className='cursor-pointer rounded-[5px] select-none base:px-[3px] tv:px-[10px] py-[6px] flex justify-center items-center'>
              <Skeleton className='w-[70px] h-[23px]' />
            </div>
            <div className='cursor-pointer rounded-[5px] select-none base:px-[3px] tv:px-[10px] py-[6px] flex justify-center items-center'>
              <Skeleton className='w-[70px] h-[23px]' />
            </div>
          </div>

          {/* new content coming */}

          <div className='w-full flex flex-col'>
            <Skeleton className='rounded-lg w-full h-[210px] px-[23px] flex flex-col !gap-3 py-[20px]'/>
          </div>

        </div>



      </div>
    </div>
  )
}

export default skeletonComp