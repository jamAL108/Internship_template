import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
} from "@/components/ui/accordion"
import * as AccordionRadix from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils'

import ListViewDropdown from './listDropdown';


const listViewComponent: React.FC<any> = (props) => {
    const { ListTasks, setListTasks, selectedBoxes,  boardTasks, setBoardTasks , setSelectedBoxes, bigAPIrequest, setBigAPIrequest } = props

    const [accordionToday, setAccordionToday] = useState<string>('item-1')
    const [accordionWeek, setAccordionWeek] = useState<string>('')
    const [accordionOverDue, setAccordionOverDue] = useState<string>('')
    const [accordionCompleted, setAccordionCompleted] = useState<string>('')


    const AccordTodayFunction = () => {
        if (accordionToday.length !== 0) {
            setAccordionToday('')
        } else {
            setAccordionToday('item-1')
        }
    }

    const AccordOverDueFunction = () => {
        if (accordionOverDue.length !== 0) {
            setAccordionOverDue('')
        } else {
            setAccordionOverDue('item-1')
        }
    }

    const AccordWeekFunction = () => {
        if (accordionWeek.length !== 0) {
            setAccordionWeek('')
        } else {
            setAccordionWeek('item-1')
        }
    }

    const AccordionCompletedFunction = () => {
        if (accordionCompleted.length !== 0) {
            setAccordionCompleted('')
        } else {
            setAccordionCompleted('item-1')
        }
    }

    return (
        <div className='py-[13px] w-full flex flex-col pl-[7px] base:pr-[18px] tv:pr-[25px] gap-5 pb-[50px] h-[calc(100vh_-_7rem)] overflow-y-auto'>

            <div className='w-full base:pl-[10px] tv:pl-[0px] h-auto flex gap-1 z-0 justify-start items-start'>
                <div className='base:w-[5%] tv:w-[3%] flex justify-center transition duration-500 items-center opacity-[0.6] h-[42px]' >
                    <img src="/images/accord.png" alt="fvrb" style={accordionToday.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }} className='w-[13px] h-[8px] cursor-pointer' onClick={AccordTodayFunction} />
                </div>
                <Accordion type="single" value={accordionToday} collapsible className="base:w-[95%] tv:w-[97%] relative">
                    <AccordionItem value="item-1" className='border-none '>
                        <AccordionTrigger onClick={AccordTodayFunction} className='w-full flex items-center px-[15px]  gap-[0.67rem] h-[42px] border-[1px] border-[#ece6fb] rounded-[6px] bg-[#F5F5F5]' >
                            <div className='w-[12px] h-[12px] shadow-[3px_3px_11px_-3px_rgba(0,0,0,0.4)] rounded-full bg-white flex justify-center items-center p-0 m-0'>
                                <div className='w-[6px] h-[6px] rounded-full bg-[#a2a2a2] text-[#1c1f24]'>
                                </div>
                            </div>
                            <h1 className='text-[0.95rem] font-[640] tracking-[0.4px] text-[#1F2329]'>Due Today</h1>
                            <h1 className='ml-[5px] text-[1.15rem] font-[600] opacity-[0.4]'>{ListTasks.todayDue.length}</h1>
                        </AccordionTrigger>
                        <AccordionContent className='tv:w-full overflow-x-auto h-auto flex z-[10000] flex-col'>
                            <div className='w-[100%] flex border-b-[2px]  border-b-[#F2F4F6] py-[9px]'>
                                <div className='w-[3.5%] pl-[2px]'>

                                </div>
                                <div className='base:w-auto tv:w-[95.5%] h-auto flex'>
                                    <h1 className='base:min-w-[140px] tv:w-[35%] opacity-[0.74] text-[0.84rem] font-[460]'>Name</h1>
                                    <h1 className='base:min-w-[130px] tv:w-[30%] opacity-[0.74] text-[0.84rem] font-[460]'>Description</h1>
                                    <h1 className='base:min-w-[110px] tv:w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Due Date</h1>
                                    <h1 className='base:min-w-[90px] tv:w-[15%] opacity-[0.74] text-[0.84rem] font-[460]'>Status</h1>
                                    <h1 className='base:min-w-[90px] tv:w-[15%] opacity-[0.74] text-[0.84rem] font-[460]'>Priority</h1>
                                </div>
                            </div>
                            <div className='flex flex-col base:w-auto tv:w-full h-auto gap-1'>
                                {ListTasks.todayDue.map((Task: any, index: any) => (
                                    <ListViewDropdown key={index} bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} Task={Task} today_deadline={true} selectedBoxes={selectedBoxes} setListTasks={setListTasks} setSelectedBoxes={setSelectedBoxes} boardTasks={boardTasks} setBoardTasks={setBoardTasks} tasktype={0} ListTasks={ListTasks} />
                                ))}
                                {ListTasks.todayDue.length === 0 && (
                                    <div className='w-full py-[20px] flex justify-center items-center'>
                                        <h2 className='text-[0.97rem] font-[430] text-muted-foreground'>No Task Due Today</h2>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className='w-full base:pl-[10px] tv:pl-[0px] h-auto flex gap-1 z-1 justify-start items-start'>
                <div className='base:w-[5%] tv:w-[3%] flex justify-center transition duration-500 items-center opacity-[0.6] h-[42px]' >
                    <img src="/images/accord.png" alt="fvrb" style={accordionOverDue.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }} className='w-[13px] h-[8px] cursor-pointer' onClick={AccordOverDueFunction} />
                </div>
                <Accordion type="single" value={accordionOverDue} collapsible className="base:w-[95%] tv:w-[97%] relative">
                    <AccordionItem value="item-1" className='border-none '>
                        <AccordionTrigger onClick={AccordOverDueFunction} className='w-full flex items-center px-[15px]  gap-[0.67rem] h-[42px] border-[1px] border-[#F9F0F0] rounded-[6px] bg-[rgba(255,205,210,0.3)]' >
                            <div className='w-[12px] h-[12px] shadow-[3px_3px_11px_-3px_rgba(0,0,0,0.4)] rounded-full bg-white flex justify-center items-center p-0 m-0'>
                                <div className='w-[6px] h-[6px] rounded-full bg-[#f44336] text-[#1c1f24]'>

                                </div>
                            </div>
                            <h1 className='text-[0.95rem] font-[640] tracking-[0.4px] text-[#f44336]'>Over Due</h1>
                            <h1 className='ml-[5px] text-[1.15rem] font-[600] opacity-[0.4]'>{ListTasks.overDue.length}</h1>
                        </AccordionTrigger>
                        <AccordionContent className='tv:w-full overflow-x-auto h-auto flex z-[10000] flex-col'>
                            <div className='w-[100%] flex border-b-[2px]  border-b-[#F2F4F6] py-[9px]'>
                                <div className='w-[3.5%] pl-[2px]'>

                                </div>
                                <div className='base:w-auto tv:w-[95.5%] h-auto flex'>
                                    <h1 className='base:min-w-[140px] tv:w-[35%] opacity-[0.74] text-[0.84rem] font-[460]'>Name</h1>
                                    <h1 className='base:min-w-[130px] tv:w-[30%] opacity-[0.74] text-[0.84rem] font-[460]'>Description</h1>
                                    <h1 className='base:min-w-[110px] tv:w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Due Date</h1>
                                    <h1 className='base:min-w-[90px] tv:w-[15%] opacity-[0.74] text-[0.84rem] font-[460]'>Status</h1>
                                    <h1 className='base:min-w-[90px] tv:w-[15%] opacity-[0.74] text-[0.84rem] font-[460]'>Priority</h1>
                                </div>
                            </div>
                            <div className='flex flex-col base:w-auto tv:w-full h-auto gap-1'>
                                {ListTasks.overDue.map((Task: any, index: any) => (
                                    <ListViewDropdown key={index} bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} Task={Task} today_deadline={false} selectedBoxes={selectedBoxes} setListTasks={setListTasks} setSelectedBoxes={setSelectedBoxes}  boardTasks={boardTasks} setBoardTasks={setBoardTasks}  tasktype={1} ListTasks={ListTasks} />
                                ))}
                                {ListTasks.overDue.length === 0 && (
                                    <div className='w-full py-[20px] flex justify-center items-center'>
                                        <h2 className='text-[0.97rem] font-[430] text-muted-foreground'>No Task Over Due</h2>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className='w-full base:pl-[10px] tv:pl-[0px] h-auto flex gap-1 z-1 justify-start items-start '>
                <div className='base:w-[5%] tv:w-[3%] flex justify-center transition duration-500 items-center opacity-[0.6] h-[42px]' >
                    <img src="/images/accord.png" alt="fvrb" style={accordionWeek.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }} className='w-[13px] h-[8px] cursor-pointer' onClick={AccordWeekFunction} />
                </div>
                <Accordion type="single" value={accordionWeek} collapsible className="base:w-[95%] tv:w-[97%] relative">
                    <AccordionItem value="item-1" className='border-none '>
                        <AccordionTrigger onClick={AccordWeekFunction} className='w-full flex items-center px-[15px]  gap-[0.67rem] h-[42px] border-[1px] border-[#FEEEDA] rounded-[6px] bg-[#FFF3E6]' >
                            <div className='w-[12px] h-[12px] shadow-[3px_3px_11px_-3px_rgba(0,0,0,0.4)] rounded-full bg-white flex justify-center items-center p-0 m-0'>
                                <div className='w-[6px] h-[6px] rounded-full bg-[#FE7300] text-[#1c1f24]'>

                                </div>
                            </div>
                            <h1 className='text-[0.95rem] font-[640] tracking-[0.4px] text-[#FF921C]'>Others</h1>
                            <h1 className='ml-[5px] text-[1.15rem] font-[600] opacity-[0.4]'>{ListTasks.others.length}</h1>
                        </AccordionTrigger>
                        <AccordionContent className='tv:w-full overflow-x-auto h-auto flex z-[10000] flex-col'>
                            <div className='w-[100%] flex border-b-[2px]  border-b-[#F2F4F6] py-[9px]'>
                                <div className='w-[3.5%] pl-[2px]'>

                                </div>
                                <div className='base:w-auto tv:w-[95.5%] h-auto flex'>
                                    <h1 className='base:min-w-[140px] tv:w-[35%] opacity-[0.74] text-[0.84rem] font-[460]'>Name</h1>
                                    <h1 className='base:min-w-[130px] tv:w-[30%] opacity-[0.74] text-[0.84rem] font-[460]'>Description</h1>
                                    <h1 className='base:min-w-[110px] tv:w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Due Date</h1>
                                    <h1 className='base:min-w-[90px] tv:w-[15%] opacity-[0.74] text-[0.84rem] font-[460]'>Status</h1>
                                    <h1 className='base:min-w-[90px] tv:w-[15%] opacity-[0.74] text-[0.84rem] font-[460]'>Priority</h1>
                                </div>
                            </div>
                            <div className='flex flex-col base:w-auto tv:w-full h-auto gap-1'>
                                {ListTasks.others.map((Task: any, index: any) => (
                                    <ListViewDropdown key={index} bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} Task={Task} today_deadline={false} selectedBoxes={selectedBoxes} setListTasks={setListTasks} setSelectedBoxes={setSelectedBoxes}  boardTasks={boardTasks} setBoardTasks={setBoardTasks}  tasktype={2} ListTasks={ListTasks} />
                                ))}
                                {ListTasks.others.length === 0 && (
                                    <div className='w-full py-[20px] flex justify-center items-center'>
                                        <h2 className='text-[0.97rem] font-[430] text-muted-foreground'>No Task Pending from Tommorow</h2>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className='w-full base:pl-[10px] tv:pl-[0px] h-auto flex gap-1 z-1 justify-start items-start mb-[180px]'>
                <div className='base:w-[5%] tv:w-[3%] flex justify-center transition duration-500 items-center opacity-[0.6] h-[42px]' >
                    <img src="/images/accord.png" alt="fvrb" style={accordionCompleted.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }} className='w-[13px] h-[8px] cursor-pointer' onClick={AccordionCompletedFunction} />
                </div>
                <Accordion type="single" value={accordionCompleted} collapsible className="base:w-[95%] tv:w-[97%] relative">
                    <AccordionItem value="item-1" className='border-none '>
                        <AccordionTrigger onClick={AccordionCompletedFunction} className='w-full flex items-center px-[15px]  gap-[0.67rem] h-[42px] border-[1px] border-[#EDF1D6] rounded-[6px] bg-[#DFFFD8]' >
                            <div className='w-[12px] h-[12px] shadow-[3px_3px_11px_-3px_rgba(0,0,0,0.4)] rounded-full bg-white flex justify-center items-center p-0 m-0'>
                                <div className='w-[6px] h-[6px] rounded-full bg-[#6c9b7d] text-[#1c1f24]'>
                                </div>
                            </div>
                            <h1 className='text-[0.95rem] font-[640] tracking-[0.4px] text-[#6c9b7d]'>Completed</h1>
                            <h1 className='ml-[5px] text-[1.15rem] font-[600] opacity-[0.4]'>{ListTasks.done.length}</h1>
                        </AccordionTrigger>
                        <AccordionContent className='tv:w-full overflow-x-auto h-auto flex z-[10000] flex-col'>
                            <div className='w-[100%] flex border-b-[2px]  border-b-[#F2F4F6] py-[9px]'>
                                <div className='w-[3.5%] pl-[2px]'>

                                </div>
                                <div className='base:w-auto tv:w-[95.5%] h-auto flex'>
                                    <h1 className='base:min-w-[140px] tv:w-[45%] opacity-[0.74] text-[0.84rem] font-[460]'>Name</h1>
                                    <h1 className='base:min-w-[120px] tv:w-[35%] opacity-[0.74] text-[0.84rem] font-[460]'>Description</h1>
                                    <h1 className='base:min-w-[100px] tv:w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Due Date</h1>
                                    <h1 className='base:min-w-[100px] tv:w-[20%] opacity-[0.74] text-[0.84rem] font-[460]'>Priority</h1>
                                </div>
                            </div>
                            <div className='flex flex-col base:w-auto tv:w-full h-auto gap-1'>
                                {ListTasks.done.map((Task: any, index: any) => (
                                    <ListViewDropdown key={index} bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} Task={Task} today_deadline={false} selectedBoxes={selectedBoxes} setListTasks={setListTasks} setSelectedBoxes={setSelectedBoxes}  boardTasks={boardTasks} setBoardTasks={setBoardTasks}  tasktype={3} ListTasks={ListTasks} />
                                ))}
                                {ListTasks.done.length === 0 && (
                                    <div className='w-full py-[20px] flex justify-center items-center'>
                                        <h2 className='text-[0.97rem] font-[430] text-muted-foreground'>No Task Completed yet</h2>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div >
    )
}











const AccordionTrigger = React.forwardRef(({ children, className, ...props }: any, forwardedRef) => (
    <AccordionRadix.Header className="AccordionHeader">
        <AccordionRadix.Trigger
            className={cn('AccordionTrigger', className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </AccordionRadix.Trigger>
    </AccordionRadix.Header>
));

const AccordionContent = React.forwardRef(({ className, children, ...props }: any, ref) => (
    <AccordionRadix.Content
        ref={ref}
        className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionRadix.Content>
))

export default listViewComponent