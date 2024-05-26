import React, { useEffect, useState } from 'react'
import CompletedDropDown from './completedDropdown';

const Completedtask: React.FC<any> = (props) => {
    const {pendingTask , setPendingTask , setCompletedTask , completed_task , selectedBoxes  , setSelectedBoxes , setPendingBoxes , bigAPIrequest , setBigAPIrequest} = props;

    useEffect(()=>{
        setPendingBoxes([])
    },[])

    return (
        <div className='py-[10px] mt-[6px] w-full flex flex-col pl-[7px] pr-[25px] gap-2 pb-[50px] h-[calc(100vh_-_7rem)] overflow-y-auto'>

            <div className='w-[100%] flex border-b-[2px]  border-b-[#F2F4F6] py-[9px]'>
                <div className='w-[3.5%] pl-[2px]'>

                </div>
                <div className='w-[95.5%] h-auto flex'>
                    <h1 className='w-[45%] opacity-[0.74] text-[0.84rem] font-[460]'>Name</h1>
                    <h1 className='w-[35%] opacity-[0.74] text-[0.84rem] font-[460]'>Description</h1>
                    <h1 className='w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Due Date</h1>
                    <h1 className='w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Priority</h1>
                </div>
            </div>
            <div className='flex flex-col w-full h-auto gap-1'>
                {completed_task.map((Task: any, index: any) => (
                    <CompletedDropDown key={index} bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} setCompletedTask={setCompletedTask} Task={Task} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes} pendingTask={pendingTask} setPendingTask={setPendingTask} completed_task={completed_task}    />
                ))}
            </div>
        </div>
    )
}

export default Completedtask