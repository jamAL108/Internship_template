import React from 'react'
import SkeletonElement from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const skeleton = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex justify-between items-center base:pl-[20px] tv:pl-[30px] py-[20px] pr-[30px]'>
                <div className='flex items-center gap-[0.8rem]'>
                    <SkeletonElement width={30} height={30} className='!rounded-full' />
                    <SkeletonElement width={100} height={20} className='!rounded-[8px]' />
                </div>
            </div>

            <div className='w-full flex flex-col px-[60px] py-[20px]'>
                <div className='w-full flex flex-col gap-[15px]'>
                <SkeletonElement width={300} height={50} className='!rounded-[8px]' />
                    <div className='flex gap-[15px] items-center '>
                        <div className='flex gap-2 items-center'>
                            <SkeletonElement width={20} height={20} className='!rounded-full' />
                            <SkeletonElement width={80} height={20} className='!rounded-[8px]' />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <SkeletonElement width={20} height={20} className='!rounded-full' />
                            <SkeletonElement width={80} height={20} className='!rounded-[8px]' />
                        </div>
                    </div>
                    <div className='flex gap-[20px] items-center mt-[-8px]'>
                        <div className='flex gap-2 items-center'>
                            <SkeletonElement width={20} height={20} className='!rounded-full' />
                            <SkeletonElement width={80} height={20} className='!rounded-[8px]' />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default skeleton