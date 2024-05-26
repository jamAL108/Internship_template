import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
const skeleton = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full px-[25px] py-[20px] border-b-[1px] flex base:flex-col tv:flex-row tv:justify-between base:items-start tv:items-center base:gap-[10px] tv:gap-[0px]'>
                <div className=' flex gap-2 items-center'>
                    <h1 className='text-[1.5rem] font-[600] tracking-[0.6px]'>Clients</h1>
                    <MoreHorizontal size={20} className='cursor-pointer' />
                </div>
                <div className='flex px-[5px] base:w-full tv:w-auto pr-[7px] base:justify-end tv:justify-center items-center gap-[25px]'>

                    <Skeleton className='base:w-[150px] tv:w-[260px] h-[40px] border-[1px] px-[14px] flex justify-center items-center  rounded-[7px]' />

                    <Skeleton className='base:w-[105px] tv:w-[125px] h-[40px] px-[15px] rounded-[7px] flex justify-center items-center gap-[0.54rem]' />
                </div>
            </div>

            <div className='w-full px-[35px] py-[20px] flex flex-col gap-[20px]'>
                <div className='w-full base:flex base:flex-col tv:grid grid-cols-3 base:gap-[30px] tv:gap-[80px]'>
                    <Skeleton className='w-full h-[190px] rounded-lg' />
                    <Skeleton className='w-full h-[190px] rounded-lg' />
                    <Skeleton className='w-full h-[190px] rounded-lg' />
                </div>
                <div className='base:hidden tv:grid w-full grid-cols-3 gap-[80px]'>
                    <Skeleton className='w-full h-[190px] rounded-lg' />
                    <Skeleton className='w-full h-[190px] rounded-lg' />
                    <Skeleton className='w-full h-[190px] rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default skeleton