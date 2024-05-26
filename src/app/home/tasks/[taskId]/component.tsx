'use client';
import React, { useEffect, useState, useRef } from 'react'

/// API request
import { getTaskInfo, getAllTask } from '@/apiReq/newAPIs/Task'

/// Basic necess
import { toast } from 'react-toastify';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

/// shad cn  UI
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import TextareaAutosize from 'react-textarea-autosize';

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { Trash2, Plus, ArrowLeft, MoreHorizontal, ListTree, Search, StickyNote } from 'lucide-react'
import { BsFillTriangleFill } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";

import { Separator } from '@/components/ui/separator';

import Editor from './Editor'

import Image from 'next/image'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Skeleton from './skeleton'

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Label } from "@/components/ui/label"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import DropDownSubtask from './dropdownCOmponent'
import { updateTask } from '@/apiReq/newAPIs/Task'

const Component: React.FC<any> = (props) => {
    const { taskId } = props;
    const refffu = useRef<any>(null)
    const refffu1 = useRef<any>(null);
    const router: any = useRouter()
    const [taskInfo, setTaskInfo] = useState<any>({})
    const [dummySuppartiveData, setDummySUpportiveData] = useState<any>({})
    const [loader, setLoader] = useState<boolean>(true)

    const [taskHyperLink, settaskHyperLink] = useState<any>([])
    const [dummyTaskHyper, setDummyHyper] = useState<any>([])
    const [subTaskCommand, setSubtaskCommand] = useState<boolean>(false)
    const [listOfOthertask, setListOfOtherTask] = useState<any>([])
    const [subTaskChooseInput, setSubTaskChooseInput] = useState<string>('')
    const [hoveredChildIndex, setHoveredChildIndex] = useState<any>(null)

    useEffect(() => {
        fetchTaskInfo()
    }, [])

    useEffect(() => {
        if (subTaskCommand === false && taskHyperLink.length === 0 && dummyTaskHyper.length !== 0) {
            const arrayOfIds: string[] = dummyTaskHyper.map((obj:any) => obj.id)
            let arr =[...dummyTaskHyper]
            updateSubTask(arrayOfIds , arr,arr)

            // settaskHyperLink(dummyTaskHyper)
            setDummyHyper([])
        }
    }, [subTaskCommand])

    const fetchTaskInfo = async () => {
        const result = await getTaskInfo(taskId)
        if (result.success === true) {
            setTaskInfo(result.TaskInfo)
            setDummySUpportiveData(result.TaskInfo)
            let otherTasks: any = await fetchOtherTasks()
            let dummyArray: any = result.TaskInfo.sub_tasks
            /// setup for subtasks
            let HyperLinkArray: any = filterArray(dummyArray, otherTasks)
            settaskHyperLink(HyperLinkArray)
            setDummyHyper(HyperLinkArray)

            //// setup for other Tasks
            dummyArray.push(result.TaskInfo.id)
            let filteredArray: any = removeCommonElements(otherTasks, dummyArray)
            setListOfOtherTask(filteredArray)
            setLoader(false)

        } else {
            toast.error(result.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoader(false)
        }
    }

    function removeCommonElements(array1: any[], array2: any[]): any[] {
        return array1.filter(item => !array2.includes(item.id));
    }

    function filterArray(array1: string[], array2: any[]): any[] {
        return array2.filter(obj => array1.includes(obj.id));
    }

    const fetchOtherTasks = async () => {
        const result = await getAllTask()
        if (result.success === true) {
            return result.userTask
        } else {
            toast.error(result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoader(false)
        }
    }

    const customizeDateCreated = (currentDate: any) => {
        const timestamptz: any = new Date(currentDate);
        let year = timestamptz.getFullYear();
        let month = timestamptz.toLocaleString('default', { month: 'long' });
        let date = String(timestamptz.getDate()).padStart(2, '0');
        let hours = timestamptz.getHours();
        let minutes = String(timestamptz.getMinutes()).padStart(2, '0');
        let amPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        hours = String(hours).padStart(2, '0');

        let dateTimeString = `${year} ${month} ${date} | ${hours}:${minutes} ${amPM}`;

        return dateTimeString;
    }



    const textOnChange = (e: any) => {
        setTaskInfo({ ...taskInfo, taskContent: e })
    }

    const titleUpdate = async (e: any) => {
        let prev = dummySuppartiveData.name
        let obj = {
            name: e
        }
        const result: any = await updateTask(obj, taskInfo.id)
        if (result.success === false) {
            setTaskInfo({ ...taskInfo, name: prev })
            toast.error(result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setDummySUpportiveData(result.data)
        }
    }


    function debounce(func: any, d: number) {
        let timer: any;
        return function () {
            if (timer) clearTimeout(timer);
            setTimeout(func, d);
        }
    }

    const timery = debounce(() => {
        titleUpdate(refffu.current.value)
    }, 800)



    const updateSubTask = async (IDs: any, array:any , otherTask:any) => {
        console.log(array)
        let obj = {
            sub_tasks: IDs
        }
        const result: any = await updateTask(obj, taskInfo.id)
        if (result.success === false) {
            let arr = [...listOfOthertask]
            arr.push(...otherTask)
            setListOfOtherTask(arr)
            toast.error(result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }else{
            settaskHyperLink(array)
        }
    }






    if (loader === true) {
        return <Skeleton />
    }


    return (
        <div className='flex w-full h-full justify-center'>
            <div className='w-full h-full flex flex-col  bl:justify-start bl:items-start bbl:items-center'>

                <div className='w-full px-[25px] py-[20px] flex justify-between items-center'>
                    <div className='flex items-center gap-[0.8rem]'>
                        <div onClick={(e) => router.back()} className='rounded-full cursor-pointer bg-[#e8effe] w-[28px] h-[28px] flex justify-center items-center'>
                            <ArrowLeft size={21} color='#5b89e9' />
                        </div>
                        <h2 className='text-[0.95rem] font-[500] select-none'>Task list</h2>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='outline-none focus:border-none active:border-none border-none'>
                            <MoreHorizontal className='cursor-pointer' size={25} color='black' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent style={{ position: 'relative', right: "30px" }} className='z-[10000]'>
                            <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => console.log("MEOW")}>
                                <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
                                <h2 className='text-[#FC979F]'>Delete</h2>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <div className='base:w-[min(1300px,100%)] bbl:w-[920px] px-[25px] py-[10px] bl:items-start bbl:items-center bbl:justify-center flex base:flex-col bl:flex-row bbl:flex-col'>
                    <div className='base:w-[100%] bl:w-[45%] bbl:w-[100%]  h-auto flex flex-col gap-[3px]'>
                        <div className='bl:px-[20px] bbl:px-[0px] w-full h-auto min-h-[60px] overflow-hidden flex items-center my-[4px] '>
                            <TextareaAutosize ref={refffu} placeholder='Untitled' value={taskInfo.name} onChange={async (e) => {
                                setTaskInfo({ ...taskInfo, name: e.target.value })
                                timery()
                            }} className='w-full !resize-none overflow-hidden base:text-[1.82rem] tll:text-[2.1rem] bg-transparent font-semibold break-words outline-none text-[#3f3f3f] placeholder:opacity-[0.6]' />
                        </div>

                        <div className='flex flex-col gap-[4px] w-full'>

                            <div className='w-full h-[40px] flex gap-3'>
                                <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                    <Image unoptimized width={17} height={17} src='/images/clockIcon.png' alt="cfv" />
                                    <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem]  ttl:text-[0.92rem] font-[450] text-[#777672] '>created At</p>
                                </div>
                                <div className='w-[72%] h-full flex rounded-[5px] text-[#37352f]'>
                                    <div className='w-full rounded-[5px] hover:bg-[#efefef] base:text-[0.84rem] ttl:text-[0.91rem] h-full flex items-center pl-[7px]'>
                                        <p>{customizeDateCreated(taskInfo.created_at)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full h-[40px] flex gap-3'>
                                <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                    <Image unoptimized width={17} height={17} src='/images/statusIcon.png' alt="cfv" />
                                    <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem]  ttl:text-[0.92rem] font-[450] text-[#777672] '>Status</p>
                                </div>
                                <div className='w-[72%] h-full flex rounded-[5px] text-[#37352f]'>
                                    <Select value={String(taskInfo.status)} onValueChange={async (e) => {
                                        let prev = taskInfo.status
                                        setTaskInfo({ ...taskInfo, status: Number(e) })
                                        let obj = {
                                            status: Number(e)
                                        }
                                        const result: any = await updateTask(obj, taskInfo.id)
                                        if (result.success === false) {
                                            setTaskInfo({ ...taskInfo, status: Number(prev) })
                                            toast.error(result.message, {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                            });
                                        } else {
                                            setDummySUpportiveData(result.data)
                                        }
                                    }}>
                                        <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 !outline-none focus:border-none  w-full pl-[7px] border-none shadow-none rounded-[7px] hover:bg-[#efefef] ">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>

                                                <SelectItem value="0">
                                                    <div className='bg-[#d3e5ef] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                        <div className='bg-[#5b97bd] rounded-full h-[8px] w-[8px]'>
                                                        </div>
                                                        <p className='text-[0.7rem] tracking-wide font-[500]'>Todo</p>
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="1">
                                                    <div className='bg-[#FFD580] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                        <div className='bg-[#f74b03] rounded-full h-[8px] w-[8px]'>
                                                        </div>
                                                        <p className='text-[0.7rem] tracking-wide font-[500]'>On Progress</p>
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="2">
                                                    <div className='bg-[#dbeddb] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                        <div className='bg-[#6c9b7d] rounded-full h-[8px] w-[8px]'>
                                                        </div>
                                                        <p className='text-[0.7rem] tracking-wide font-[500]'>Completed</p>
                                                    </div>
                                                </SelectItem>

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    {/* <div className='w-full rounded-[5px] hover:bg-[#efefef] text-[0.7rem] h-full flex items-center pl-[7px]'>
                                        <p>{customizeDateCreated(taskInfo.status)}</p>
                                    </div> */}
                                </div>
                            </div>



                            <div className='w-full h-[40px] flex gap-3'>
                                <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                    <Image unoptimized width={17} height={17} src='/images/clockIcon.png' alt="cfv" />
                                    <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem] ttl:text-[0.92rem] font-[450] text-[#777672] '>Start Date</p>
                                </div>
                                <div className='w-[72%] h-full flex rounded-[5px] text-[#37352f]'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[100%] border-none shadow-none pl-[7px] justify-start text-left font-normal base:text-[0.85rem] ttl:text-[0.92rem] hover:bg-[#efefef]",
                                                    !taskInfo.startDate && "text-muted-foreground"
                                                )}
                                            >
                                                {taskInfo.startDate ? format(taskInfo.startDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={taskInfo.startDate}
                                                onSelect={async (e) => {
                                                    let prev = taskInfo.startDate
                                                    setTaskInfo({ ...taskInfo, startDate: e })
                                                    let obj = {
                                                        startDate: e
                                                    }
                                                    const result: any = await updateTask(obj, taskInfo.id)
                                                    if (result.success === false) {
                                                        setTaskInfo({ ...taskInfo, startDate: prev })
                                                        toast.error(result.message, {
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "colored",
                                                        });
                                                    } else {
                                                        setDummySUpportiveData(result.data)
                                                    }
                                                    // setTaskInfo({ ...taskInfo, startDate: e })
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>



                            <div className='w-full h-[40px] flex gap-3'>
                                <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                    <Image unoptimized width={17} height={17} src='/images/clockIcon.png' alt="cfv" />
                                    <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem] ttl:text-[0.92rem] font-[450] text-[#777672] '>Due Date</p>
                                </div>
                                <div className='w-[72%] h-full flex rounded-[5px] text-[#37352f]'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[100%] border-none shadow-none pl-[7px] justify-start text-left font-normal base:text-[0.85rem] ttl:text-[0.92rem] hover:bg-[#efefef]",
                                                    !taskInfo.dueDate && "text-muted-foreground"
                                                )}
                                            >
                                                {taskInfo.dueDate ? format(taskInfo.dueDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={taskInfo.dueDate}
                                                onSelect={async (e) => {
                                                    let prev = taskInfo.dueDate
                                                    setTaskInfo({ ...taskInfo, dueDate: e })
                                                    let obj = {
                                                        dueDate: e
                                                    }
                                                    const result: any = await updateTask(obj, taskInfo.id)
                                                    if (result.success === false) {
                                                        setTaskInfo({ ...taskInfo, dueDate: prev })
                                                        toast.error(result.message, {
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "colored",
                                                        });
                                                    } else {
                                                        setDummySUpportiveData(result.data)
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className='w-full h-[40px] flex gap-3'>
                                <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                    <Image unoptimized width={17} height={17} src='/images/priorityIcon.png' alt="cfv" />
                                    <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem] ttl:text-[0.92rem] font-[450] text-[#777672] '>Priority</p>
                                </div>
                                <div className='w-[72%] h-full flex rounded-[5px] text-[#37352f]'>
                                    <Select value={taskInfo.priority} onValueChange={async (e) => {
                                        let prev = taskInfo.priority
                                        setTaskInfo({ ...taskInfo, priority: e })
                                        let obj = {
                                            priority: e
                                        }
                                        const result: any = await updateTask(obj, taskInfo.id)
                                        if (result.success === false) {
                                            setTaskInfo({ ...taskInfo, priority: prev })
                                            toast.error(result.message, {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                            });
                                        } else {
                                            setDummySUpportiveData(result.data)
                                        }
                                    }}>
                                        <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 !outline-none focus:border-none  w-full pl-[7px] border-none shadow-none rounded-[7px] hover:bg-[#efefef] ">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Priority</SelectLabel>
                                                <SelectItem value="Low">
                                                    <div className='bg-[#d3e5ef] shadow-sm py-[2px] px-[10px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                        <div className='bg-[#5b97bd] rounded-full h-[8px] w-[8px]'>
                                                        </div>
                                                        <p className='text-[0.7rem] tracking-wide font-[500]'>Low</p>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Medium">
                                                    <div className='bg-[#FFD580] shadow-sm py-[1px] px-[10px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                        <div className='bg-[#f74b03] rounded-full h-[8px] w-[8px]'>
                                                        </div>
                                                        <p className='text-[0.7rem] font-[500] tracking-wide'>Medium</p>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="High">
                                                    <div className='bg-[#f2d2c9] shadow-sm py-[2px] px-[10px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                        <div className='bg-[#c04b47] rounded-full h-[8px] w-[8px]'>
                                                        </div>
                                                        <p className='text-[0.7rem] tracking-wide font-[500]'>High</p>
                                                    </div>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className='w-full h-[40px] flex gap-3'>
                                <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                    <Image unoptimized width={13} height={13} src='/images/plusIcon.png' alt="cfv" />
                                    <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem] ttl:text-[0.92rem] font-[450] text-[#777672] '>Add Property</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='base:w-[100%] bl:w-[50%] bbl:w-[100%]  h-auto flex flex-col gap-[3px]'>
                        <div className='z-[1000] w-full h-[45px] flex items-center'>
                            {
                                taskHyperLink.length === 0 ? (
                                    <DropDownSubtask subTaskCommand={subTaskCommand} setSubtaskCommand={setSubtaskCommand} subTaskChooseInput={subTaskChooseInput} setSubTaskChooseInput={setSubTaskChooseInput} SelectedTasks={dummyTaskHyper} setSelected={setDummyHyper} listOfOthertask={listOfOthertask} setListOfOtherTask={setListOfOtherTask} newDropdown={true} newTask={false} />
                                ) : (
                                    <div className='w-full h-full flex justify-between items-center'>
                                        <div className='rounded-[6px] flex items-center justify-center gap-[0.4rem] bl:px-[14px] bbl:px-[5px] py-[7px] cursor-pointer'>
                                            <ListTree size={15} color='#9d9c99' />
                                            <p className='base:text-[0.88rem] ttl:text-[0.95rem] text-[#777672] '>sub-tasks</p>
                                        </div>
                                        <div className='flex justify-center items-center gap-2 pr-[20px]'>
                                            <Search className='cursor-pointer p-[3px] rounded-[3px] hover:bg-[#efefef]' size={24} color='#777672' />

                                            <DropDownSubtask subTaskCommand={subTaskCommand} setSubtaskCommand={setSubtaskCommand} subTaskChooseInput={subTaskChooseInput} setSubTaskChooseInput={setSubTaskChooseInput} SelectedTasks={taskHyperLink} setSelected={settaskHyperLink} listOfOthertask={listOfOthertask} setListOfOtherTask={setListOfOtherTask} newDropdown={false} newTask={false} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {
                            taskHyperLink.length !== 0 ? (
                                <div className='ml-[20px] mb-[20px] border-b-[2px] w-[94%] h-auto flex flex-col justify-center items-center gap-1'>
                                    {taskHyperLink.map((task: any, idx: number) => (
                                        <div className='hover:bg-[#efefef] w-full py-[5px] px-[3px] flex justify-between cursor-pointer items-center rounded-[4px]' onMouseEnter={() => setHoveredChildIndex(idx)} onMouseLeave={() => setHoveredChildIndex(null)}>
                                            <div className='flex justify-center items-center gap-2'>
                                                <StickyNote size={18} color='#9d9c99' />
                                                <Link href={`/home/tasks/${task.id}`} className={`text-[0.75rem] tll:text-[0.85rem] font-[400] ${hoveredChildIndex === idx ? 'text-with-gap' : ''}`}>{task.name}</Link>
                                            </div>
                                            {hoveredChildIndex === idx && (
                                                <div className='px-[7px]'>
                                                    <Trash2 size={18} color='#9d9c99' onClick={(e) => {
                                                        e.stopPropagation()
                                                        ///removing from selected list
                                                        const indexOfTask = taskHyperLink.findIndex((obj: any, idx: number) => obj.id === task.id);
                                                        let arr: any = [...taskHyperLink]
                                                        if (indexOfTask !== -1) {
                                                            arr.splice(indexOfTask, 1);
                                                            const arrayID: number[] = arr.map((obj:any) => obj.id);
                                                            updateSubTask(arrayID,arr,[task])
                                                            // settaskHyperLink(arr)
                                                            
                                                            /// normal list
                                                            let normalList: any = [...listOfOthertask]
                                                            normalList.push(task)
                                                            setListOfOtherTask(normalList)
                                                        }
                                                    }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='z-0 border-b-[2px] w-full mt-[-7px] h-[30px] flex justify-center items-center'>
                                    <p className='base:text-[0.67rem] tll:text-[0.8rem] font-[450] text-muted-foreground'>No Sub Tasks Added</p>
                                </div>
                            )
                        }

                        <Editor
                            editable={true}
                            onChange={textOnChange}
                            initialContent={taskInfo.taskContent}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component