'use client';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Copy, Trash2 } from 'lucide-react';



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { createNewTask, markAsCompletedBulk, markAsPendingBulk, deleteBulk } from '@/apiReq/newAPIs/Task';
import Alerts from './alerts';
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import TextareaAutosize from 'react-textarea-autosize';

// import * as DialogPrimitive from "@radix-ui/react-dialog"

import defaultTemplate from './defaultTemplate'

import { Separator } from '@/components/ui/separator';

import Editor from './Editor'

import Image from 'next/image'
import { ListTree, Search, StickyNote, Ban, Save } from 'lucide-react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import { getAllTask, newCreateNewTask } from '@/apiReq/newAPIs/Task'

import DropDownSubtask from './dropdownForSubtask'

import ClipLoader from "react-spinners/ClipLoader";


const newTask: React.FC<any> = (props) => {
    const { listViewSelected, setListTasks, setListViewSelected, ListTasks, bigAPIrequest, setBigAPIrequest, boardTasks, setBoardTasks, dummyPropToAvoidBug } = props;

    const defaultTaskDetail = ['', 'todo', new Date(), new Date(), 'Low']
    const [taskdetail, settaskdetail] = useState<any>(['', 'todo', new Date(), new Date(), 'Low'])
    const [taskContent, setTaskContent] = useState('')

    const [endDate, setEndDate] = useState<any>()
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [taskName, setTaskName] = useState<string>("")
    const [taskPriorty, setTaskPriority] = useState<string>("")
    const [datecreated, setdatecreated] = useState<Date | null>(new Date())


    const [taskHyperLink, settaskHyperLink] = useState<any>([])
    const [dummyTaskHyper, setDummyHyper] = useState<any>([])
    const [subTaskCommand, setSubtaskCommand] = useState<boolean>(false)
    const [listOfOthertask, setListOfOtherTask] = useState<any>([])
    const [subTaskChooseInput, setSubTaskChooseInput] = useState<string>('')
    const [hoveredChildIndex, setHoveredChildIndex] = useState<any>(null);

    const [dummyDropdownRemoval, setDummyDropdownRemoval] = useState<boolean>(false)

    const [taskSaveLoader, setTaskSaveLoader] = useState<boolean>(false)


    const [error, seterror] = useState<string>("")
    const [newTaskCreateBox, setNewTaskCreateBox] = useState<boolean>(false)
    const [newTaskCreateLoader, setNewTaskCreateLoader] = useState<boolean>(false)

    useEffect(() => {
        if (subTaskCommand === false && taskHyperLink.length === 0) {
            settaskHyperLink(dummyTaskHyper)
        }
    }, [subTaskCommand])

    useEffect(() => {
        if (newTaskCreateBox === true) {
            getAllTaskFunction()
        }
    }, [newTaskCreateBox])

    const getAllTaskFunction = async () => {
        const allOthertask = await getAllTask()
        if (allOthertask.success === false) {
            console.log("MEOW")
        } else {
            setListOfOtherTask(allOthertask.userTask)
        }
    }

    const checkAndProceed = async () => {
        setNewTaskCreateLoader(true)
        if (startDate === null || taskName.length === 0 || taskPriorty.length === 0) {
            seterror("Enter All fields properly")
            setNewTaskCreateLoader(false)
        } else {
            const formdata = {
                name: taskName,
                priority: taskPriorty,
                startDate: startDate,
                dueDate: endDate,
                status: false
            }
            const result: any = await createNewTask(formdata)
            if (result.error !== null) {
                seterror(result.error.message)
            } else if (result.data !== null) {
                console.log(result.data[0])
                AddNewlyCreatedTaskToNormal(result.data[0])
                setTaskName('')
                setTaskPriority('')
                setNewTaskCreateBox(false)
                setNewTaskCreateLoader(false)
            }
        }
    }


    const AddNewlyCreatedTaskToNormal = (Task: any) => {
        if (Task.status === 2) {
            // let arr: any = { ...ListTasks }
            let boardArr = { ...boardTasks }
            boardArr.done.unshift(Task)
            // arr.done.unshift(Task)
            // setListTasks(arr)
            setBoardTasks(boardArr)
        } else {
            // let arr: any = { ...ListTasks }
            let boardArr = { ...boardTasks }
            // console.log(arr)
            // const todayDate = new Date()
            // const formattedTodayDate = todayDate.toDateString()
            // const givenDate = new Date(Task.dueDate)
            // const givenDateInString = givenDate.toDateString()
            // console.log(todayDate > givenDate)
            // if (formattedTodayDate === givenDateInString) {
            //     arr.todayDue.push(Task)
            // } else if (todayDate > givenDate) {
            //     arr.overDue.push(Task)
            // } else {
            //     arr.others.push(Task)
            // }
            // setListTasks(arr)
            // console.log(arr)
            if (Task.status === 0) {
                boardArr.todo.unshift(Task)
            } else {
                boardArr.onprogress.unshift(Task)
            }
            setBoardTasks(boardArr)
        }
        let arr: any = [ ...ListTasks ]
        arr.unshift(Task)
        setListTasks(arr)
    }

    const markAsCompleted = async () => {
        if (bigAPIrequest === false) {
            setBigAPIrequest(true)
            let result = 'meow'
            // const result: any = await markAsCompletedBulk(pendingSelected, completedTask, pendingTask)
            if (result === 'success') {
                toast.success('🦄 Wow so easy!', {
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
                toast.error('🦄 Wow so easy!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            }
            setBigAPIrequest(false)
        }
    }

    const markAsPending = () => {
    }

    const deletePending = () => {

    }

    const deleteCompleted = () => {

    }

    const unselectFunction = (name: string) => {
        if (name === 'Listview') {
            setListViewSelected([])
        }
    }

    const textOnChange = (content: string) => {
        console.log(content)
        setTaskContent(content)
    }


    const customizeDateCreated = (currentDate: any) => {
        if (currentDate === null) {
            currentDate = new Date()
        }
        let year = currentDate.getFullYear();
        let month = currentDate.toLocaleString('default', { month: 'long' });
        let date = String(currentDate.getDate()).padStart(2, '0');

        // Get the hours, minutes, and AM/PM format
        let hours = currentDate.getHours();
        let minutes = String(currentDate.getMinutes()).padStart(2, '0');
        let amPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        hours = String(hours).padStart(2, '0');

        // Construct the date-time string
        let dateTimeString = `${year} ${month} ${date} | ${hours}:${minutes} ${amPM}`;

        return dateTimeString;
    }

    const saveTask = async () => {
        setTaskSaveLoader(true)
        let sub_tasks: any[] = []
        for (var i = 0; i < taskHyperLink.length; i++) {
            sub_tasks.push(taskHyperLink[i].id)
        }
        const obj = {
            name: taskName.length !== 0 ? taskName : "Untitled",
            status: taskdetail[1] === 'todo' ? 0 : taskdetail[1] === 'onprogress' ? 1 : 2,
            startDate: taskdetail[2],
            dueDate: taskdetail[3],
            priority: taskdetail[4],
            taskContent: taskContent,
            sub_tasks: sub_tasks
        }
        const result = await newCreateNewTask(obj)
        if (result.success === false) {
            toast.error(result.resultOftaskCreation.error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            setDummyDropdownRemoval(false)
            setTaskSaveLoader(false)
        } else {
            AddNewlyCreatedTaskToNormal(result.resultOftaskCreation.data[0])
            setDummyDropdownRemoval(false)
            setTaskSaveLoader(false)
            setTimeout(() => {
                settaskdetail(defaultTaskDetail)
                setTaskName('')
                setdatecreated(null)
                settaskHyperLink([])
                setDummyHyper([])
                setTaskContent('')
                setNewTaskCreateBox(false)
            }, 50)
            toast.success("Task created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            ////  make up code
        }
    }

    return (
        <div className='px-[25px] border-b-[2px] gap-4 border-b-[#F5F5F5] w-full h-[3rem] flex justify-end items-center'>
            {listViewSelected.length !== 0 && (
                <Alerts markFunction={markAsCompleted} name={"Listview"} DeleteFunction={deletePending} unselectFunction={unselectFunction} />
            )}

            {
                taskSaveLoader === true && (
                    <div className='absolute top-0 left-0 bg-[rgba(0,0,0,0.1)]
                    z-[1000000000] w-[100vw] h-[100vh] flex justify-center items-center'>
                        <ClipLoader
                            color={"#6680ff"}
                            loading={true}
                            size={70}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )
            }

            <AlertDialog open={newTaskCreateBox} onOpenChange={setNewTaskCreateBox} >
                <AlertDialogTrigger asChild>
                    <button className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white base:px-[10px] tv:px-[15px]  rounded-[7px] flex justify-center items-center gap-[0.54rem] select-none createNewTaskButtonTaskSection' onClick={(e) => {
                        if (bigAPIrequest === false) {
                            setNewTaskCreateBox(true)
                        }
                    }}><Plus size={20} />
                        <h2 className='base:py-[7.5px] tracking-wide tv:py-[7.5px] base:text-[0.73rem] mymobile:text-[0.85rem] tv:text-[0.9rem] font-[500]'>New</h2>
                    </button>

                </AlertDialogTrigger>
                <AlertDialogContent className='sm:max-w-[425px] tv:h-[600px] bl:h-[500px] tv:min-w-[700px] !px-[0px] !mx-[0px]  dialogForAddTask tv:w-[700px] bbl:min-w-[45vw] bbl:min-h-[60vh]'>
                    <div className={`absolute right-8 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ${taskSaveLoader === true ? 'pointer-events-none' : ''}`}>
                        <DropdownMenu open={dummyDropdownRemoval} onOpenChange={setDummyDropdownRemoval}>
                            <DropdownMenuTrigger onClick={(e) => {
                                setDummyDropdownRemoval(true)
                            }}>
                                <MoreHorizontal size={20} color='black' className='cursor-pointer' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent style={{ position: 'absolute', left: "130" }}>
                                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => {
                                    saveTask()
                                }}>
                                    <Save size={16} className='opacity-[0.6]' />
                                    <h2>Save</h2>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => {
                                    setDummyDropdownRemoval(false)
                                    setTimeout(() => {
                                        settaskdetail(defaultTaskDetail)
                                        setTaskName('')
                                        setdatecreated(null)
                                        settaskHyperLink([])
                                        setListOfOtherTask([])
                                        setDummyHyper([])
                                        setTaskContent('')
                                        setNewTaskCreateBox(false)
                                    }, 50)
                                }}>
                                    <Ban size={16} className='opacity-[0.6]' />
                                    <h2>cancel</h2>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                                    <Copy size={16} className='opacity-[0.6]' />
                                    <h2>Duplicate</h2>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                                    <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
                                    <h2 className='text-[#FC979F]'>Delete</h2>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>



                    <div className={`text-black flex flex-col min-h-[430px] py-[15px] overflow-y-auto overflow-x-hidden 
                    ${taskSaveLoader === true ? 'pointer-events-none' : ''}`}>

                        <div className='px-[40px] pl-[48px] w-full h-auto min-h-[80px] flex items-center my-[4px] '>
                            <TextareaAutosize placeholder='Untitled' value={taskName} onChange={(e) => setTaskName(e.target.value)} className='w-full !resize-none text-[1.82rem] bg-transparent font-semibold break-words outline-none text-[#3f3f3f] placeholder:opacity-[0.6]' />
                        </div>

                        <div className='px-[40px] pl-[48px] w-full  flex flex-col gap-1 '>
                            {defaultTemplate.map((item: any, index: number) => (

                                <div key={index} className='w-full h-[35px] max-h-[35px] flex gap-3'>

                                    <div className='w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                        <Image unoptimized width={13} height={13} src={item.icon} alt="cfv" />
                                        <p className='capitalize text-[0.83rem] text-[#777672] '>{item.name}</p>
                                    </div>

                                    <div className='w-[72%] h-full flex rounded-[5px] text-[#37352f]'>
                                        {item.type === 'date' ? (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[100%] border-none shadow-none pl-[7px] justify-start text-left font-normal text-[0.85rem] hover:bg-[#efefef]",
                                                            !taskdetail[index] && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {taskdetail[index] ? format(taskdetail[index], "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={taskdetail[index]}
                                                        onSelect={(e) => {
                                                            let arr = [...taskdetail]
                                                            arr[index] = e
                                                            settaskdetail(arr)
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        ) : item.type === 'status' ? (

                                            <Select defaultValue='todo' value={taskdetail[index]} onValueChange={(e) => {
                                                let arr = [...taskdetail]
                                                arr[index] = e
                                                settaskdetail(arr)
                                            }}>
                                                <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 !outline-none focus:border-none  w-full pl-[7px] border-none shadow-none rounded-[7px] hover:bg-[#efefef] ">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Status</SelectLabel>

                                                        <SelectItem value="todo">
                                                            <div className='bg-[#d3e5ef] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                                <div className='bg-[#5b97bd] rounded-full h-[8px] w-[8px]'>
                                                                </div>
                                                                <p className='text-[0.7rem] tracking-wide font-[500]'>To-do</p>
                                                            </div>
                                                        </SelectItem>

                                                        <SelectItem value="onprogress">
                                                            <div className='bg-[#FFD580] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                                <div className='bg-[#f74b03] rounded-full h-[8px] w-[8px]'>
                                                                </div>
                                                                <p className='text-[0.7rem] tracking-wide font-[500]'>On Progress</p>
                                                            </div>
                                                        </SelectItem>

                                                        <SelectItem value="done">
                                                            <div className='bg-[#dbeddb] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center justify-center'>
                                                                <div className='bg-[#6c9b7d] rounded-full h-[8px] w-[8px]'>
                                                                </div>
                                                                <p className='text-[0.7rem] tracking-wide font-[500]'>Done</p>
                                                            </div>
                                                        </SelectItem>

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        ) : item.type === 'priority' ? (

                                            <Select defaultValue='Low' value={taskdetail[index]} onValueChange={(e) => {
                                                let arr = [...taskdetail]
                                                arr[index] = e
                                                settaskdetail(arr)
                                            }}>
                                                <SelectTrigger className="!focus-visible:ring-0 !focus-visible:ring-transparent !focus-visible:ring-offset-0 !outline-none focus:border-none  w-full pl-[7px] border-none shadow-none rounded-[7px] hover:bg-[#efefef] ">
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

                                        ) : item.type === 'date-created' ? (
                                            <div className='w-full rounded-[5px] hover:bg-[#efefef] text-[0.8rem] h-full flex items-center pl-[7px]'>
                                                <p>{customizeDateCreated(datecreated)}</p>
                                            </div>
                                        ) : (
                                            <div className='w-full rounded-[5px] hover:bg-[#efefef] text-[0.85rem] h-full flex items-center pl-[7px]'>
                                                <h1>Hello</h1>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            ))}
                        </div>

                        <div className='px-[40px] pl-[48px] w-full h-[35px] min-h-[35px] flex gap-3 my-[0.25rem]'>
                            <div className='py-[2px] cursor-pointer w-[28%] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                                <Image unoptimized src='/images/plusIcon.png' alt="cfv" width={13} height={13} />
                                <p className='text-[0.83rem] text-[#777672] '>Add a property</p>
                            </div>
                        </div>

                        <Separator className='mx-[48px] w-full mt-[6px]' />

                        <div className='px-[40px] pl-[48px] w-full flex flex-col'>

                            <div className='z-[1000] w-full h-[45px] flex items-center'>
                                {
                                    taskHyperLink.length === 0 ? (
                                        <DropDownSubtask subTaskCommand={subTaskCommand} setSubtaskCommand={setSubtaskCommand} subTaskChooseInput={subTaskChooseInput} setSubTaskChooseInput={setSubTaskChooseInput} SelectedTasks={dummyTaskHyper} setSelected={setDummyHyper} listOfOthertask={listOfOthertask} setListOfOtherTask={setListOfOtherTask} newDropdown={true} newTask={true} />
                                    ) : (
                                        <div className='w-full h-full flex justify-between items-center'>
                                            <div className='rounded-[6px] flex items-center justify-center gap-[0.4rem] px-[14px] py-[7px] cursor-pointer'>
                                                <ListTree size={15} color='#9d9c99' />
                                                <p className='text-[0.88rem] text-[#777672] '>sub-tasks</p>
                                            </div>
                                            <div className='flex justify-center items-center gap-2 pr-[20px]'>
                                                <Search className='cursor-pointer p-[3px] rounded-[3px] hover:bg-[#efefef]' size={24} color='#777672' />

                                                <DropDownSubtask subTaskCommand={subTaskCommand} setSubtaskCommand={setSubtaskCommand} subTaskChooseInput={subTaskChooseInput} setSubTaskChooseInput={setSubTaskChooseInput} SelectedTasks={taskHyperLink} setSelected={settaskHyperLink} listOfOthertask={listOfOthertask} setListOfOtherTask={setListOfOtherTask} newDropdown={false} newTask={true} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            {
                                taskHyperLink.length !== 0 ? (
                                    <div className='ml-[20px] w-[94%] h-auto flex flex-col justify-center items-center gap-1'>
                                        {taskHyperLink.map((task: any, idx: number) => (
                                            <div className='hover:bg-[#efefef] w-full py-[5px] px-[3px] flex justify-between cursor-pointer items-center rounded-[4px]' onMouseEnter={() => setHoveredChildIndex(idx)} onMouseLeave={() => setHoveredChildIndex(null)}>
                                                <div className='flex justify-center items-center gap-2'>
                                                    <StickyNote size={18} color='#9d9c99' />
                                                    <p className={`text-[0.75rem] font-[400] ${hoveredChildIndex === idx ? 'text-with-gap' : ''}`}>{task.name}</p>
                                                </div>
                                                {hoveredChildIndex === idx && (
                                                    <div className='px-[7px]'>
                                                        <Trash2 size={18} color='#9d9c99' />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='z-0 w-full mt-[-37px] h-[30px] flex justify-center items-center'>
                                        <p className='text-[0.67rem] font-[450] text-muted-foreground'>No Sub Tasks Added</p>
                                    </div>
                                )
                            }
                        </div>

                        <Editor
                            newTask={true}
                            editable={true}
                            onChange={textOnChange}
                            initialContent={taskContent}
                        />

                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default newTask






// const DialogOverlay = React.forwardRef(({ className, ...props }: any, ref) => (
//     <DialogPrimitive.Overlay
//         ref={ref}
//         className={cn(
//             "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//             className
//         )}
//         {...props}
//     />
// ))




// const AlertDialogOverlay = React.forwardRef(({ className, ...props }: any, ref) => (
//     <AlertDialogPrimitive.Overlay
//         className={cn(
//             "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//             className
//         )}
//         {...props}
//         ref={ref}
//     />
// ))

// const AlertDialogContent = React.forwardRef(({ className, ...props }: any, ref) => (
//     <AlertDialogPrimitive.AlertDialogPortal>
//         <AlertDialogOverlay />
//         <AlertDialogPrimitive.Content
//             ref={ref}
//             className={cn(
//                 "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
//                 className
//             )}
//             {...props}
//         />
//     </AlertDialogPrimitive.AlertDialogPortal>
// ))

// const DialogContent = React.forwardRef(({ className, children, ...props }: any, ref) => (
//     <DialogPrimitive.Portal>
//         <DialogOverlay />
//         <DialogPrimitive.Content
//             ref={ref}
//             className={cn(
//                 "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
//                 className
//             )}
//             {...props}
//         >
//             {children}
//             <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//                 <DropdownMenu>
//                     <DropdownMenuTrigger>
//                         <MoreHorizontal size={20} color='black' className='cursor-pointer' />
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent style={{ position: 'absolute', left: "130" }}>
//                         <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
//                             <Save size={16} className='opacity-[0.6]' />
//                             <h2>Save</h2>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
//                             <Ban size={16} className='opacity-[0.6]' />
//                             <h2>cancel</h2>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
//                             <Copy size={16} className='opacity-[0.6]' />
//                             <h2>Duplicate</h2>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
//                             <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
//                             <h2 className='text-[#FC979F]'>Delete</h2>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </DialogPrimitive.Content>
//     </DialogPrimitive.Portal>
// ))