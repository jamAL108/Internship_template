import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu"

import { Pencil, Copy, Link, Star, Archive, Trash2, CheckCheck, CheckSquare2, BarChartHorizontalBig } from 'lucide-react';

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { votumTaskInterface } from '@/interface/interface'

import { cn } from "@/lib/utils"

import { Checkbox } from "@/components/ui/checkbox"

import { toast } from 'react-toastify';

import { markAsTodo, markAsOnprogress, markAsDone, deleteTask, makeDuplicate } from '@/apiReq/dashboardAPIs/Task'

import LinkDiv from 'next/link'

import EditTask from './Edittask';
const PendingTDrop: React.FC<any> = (props) => {
    const { Task, today_deadline, selectedBoxes, setSelectedBoxes, ListTasks, setListTasks, tasktype, bigAPIrequest, setBigAPIrequest, boardTasks, setBoardTasks } = props;

    const [dropdownPosition, setDropdownPosition] = useState({ x: -100, y: -38 });
    const [open, setopen] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<boolean>(false)

    const selectTheTask = async (e: any) => {
        console.log(Task)
        setSelectedTask(true)
        let arr = [...selectedBoxes]
        arr.push(Task.id)
        setSelectedBoxes(arr)
    }

    useEffect(() => {
        let arr = [...selectedBoxes]
        let idx = arr.indexOf(Task.id)
        if (idx !== -1) {
            setSelectedTask(true)
        }
    }, [])

    useEffect(() => {
        let arr = [...selectedBoxes]
        let idx = arr.indexOf(Task.id)
        if (idx !== -1) {
            setSelectedTask(true)
        } else {
            setSelectedTask(false)
        }
    }, [selectedBoxes])

    function formatDate(inputDateStr: any) {
        const date = new Date(inputDateStr)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const handleTriggerClick = (e: any) => {
        e.preventDefault()
        if (selectedBoxes.length === 0) {
            const rect = e.target.getBoundingClientRect();
            const posX = e.clientX + 40;
            const posY = e.clientY - 10;
            setDropdownPosition({ x: posX, y: posY });
            setopen(true);
        }
    };

    const duplicateFunction = async () => {
        const result: any = await makeDuplicate(Task)
        if (result.data !== null) {
            let arr = { ...ListTasks }
            let boardArr = { ...boardTasks }
            if (result.data[0].status === 0) {
                boardArr.todo.push(result.data[0])
            } else if (result.data[0].status === 1) {
                boardArr.onprogress.push(result.data[0])
            } else if (result.data[0].status === 2) {
                boardArr.done.push(result.data[0])
            }
            setBoardTasks(boardArr)
            if (tasktype === 0) {
                arr.todayDue.push(result.data[0])
            } else if (tasktype === 1) {
                arr.overDue.push(result.data[0])
            } else if (tasktype === 2) {
                arr.others.push(result.data[0])
            } else if (tasktype === 3) {
                arr.done.push(result.data[0])
            }
            setListTasks(arr)
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
            console.log("ERROR")
        }
    }

    const markAsTodoFunction = async () => {
        const result: any = await markAsTodo(Task.id)
        if (result.success === true) {
            let arr = { ...ListTasks }
            let status = Task.status
            Task.status = 0;
            console.log(status)
            if (tasktype === 0) {
                console.log(tasktype)
                let idx = arr.todayDue.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.todayDue[idx] = Task
                }
            } else if (tasktype === 1) {
                console.log(tasktype)
                let idx = arr.overDue.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.overDue[idx] = Task
                }
            } else if (tasktype === 2) {
                console.log(tasktype)
                let idx = arr.others.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.others[idx] = Task
                }
            } else if (tasktype === 3) {
                console.log(tasktype)
                let idx = arr.done.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    const todayDate = new Date();
                    const formattedTodayDate = todayDate.toDateString();
                    const givenDate = new Date(Task.dueDate)
                    const givenDateInString = givenDate.toDateString();
                    console.log(todayDate > givenDate)
                    if (formattedTodayDate === givenDateInString) {
                        arr.todayDue.push(Task)
                    } else if (todayDate > givenDate) {
                        arr.overDue.push(Task)
                    } else {
                        arr.others.push(Task);
                    }
                    let idx = arr.done.findIndex((obj: any) => obj.id === Task.id);
                    if (idx !== -1) {
                        arr.done.splice(idx, 1);
                    }
                }
            }
            setListTasks(arr)

            let boardArr = { ...boardTasks }
            console.log(arr)
            if (status === 1) {
                let idx = boardArr.onprogress.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    boardArr.onprogress.splice(idx, 1);
                    boardArr.todo.unshift(Task)
                }
            } else if (status === 2) {
                let idx = boardArr.done.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    boardArr.done.splice(idx, 1);
                    boardArr.todo.unshift(Task)
                }
            }
            setBoardTasks(boardArr)


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
            console.log("ERROR")
        }
    }

    const markAsOnprogressFunction = async () => {
        const result: any = await markAsOnprogress(Task.id)
        if (result.success === true) {
            let arr = { ...ListTasks }
            let status = Task.status
            Task.status = 1;

            if (tasktype === 0) {
                console.log(tasktype)
                let idx = arr.todayDue.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.todayDue[idx] = Task
                }
            } else if (tasktype === 1) {
                console.log(tasktype)
                let idx = arr.overDue.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.overDue[idx] = Task
                }
            } else if (tasktype === 2) {
                console.log(tasktype)
                let idx = arr.others.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.others[idx] = Task
                }
            } else if (tasktype === 3) {
                console.log(tasktype)
                let idx = arr.done.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    const todayDate = new Date();
                    const formattedTodayDate = todayDate.toDateString();
                    const givenDate = new Date(Task.dueDate)
                    const givenDateInString = givenDate.toDateString();
                    console.log(todayDate > givenDate)
                    if (formattedTodayDate === givenDateInString) {
                        arr.todayDue.push(Task)
                    } else if (todayDate > givenDate) {
                        arr.overDue.push(Task)
                    } else {
                        arr.others.push(Task);
                    }
                    let idx = arr.done.findIndex((obj: any) => obj.id === Task.id);
                    if (idx !== -1) {
                        arr.done.splice(idx, 1);
                    }
                }
            }

            setListTasks(arr)
            let boardArr = { ...boardTasks }
            if (status === 0) {
                let idx = boardArr.todo.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    boardArr.todo.splice(idx, 1);
                    boardArr.onprogress.unshift(Task)
                }
            } else if (status === 2) {
                let idx = boardArr.done.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    boardArr.done.splice(idx, 1);
                    boardArr.onprogress.unshift(Task)
                }
            }
            setBoardTasks(boardArr)

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
            console.log("ERROR")
        }
    }

    const markAsDoneFunction = async () => {
        const result: any = await markAsDone(Task.id)
        console.log(result)
        if (result.success === true) {
            let arr = { ...ListTasks }
            console.log(arr)
            let status = Task.status
            Task.status = 2;
            if (tasktype === 0) {
                console.log(tasktype)
                let idx = arr.todayDue.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.todayDue.splice(idx, 1);
                }
            } else if (tasktype === 1) {
                console.log(tasktype)
                let idx = arr.overDue.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.overDue.splice(idx, 1);
                }
            } else if (tasktype === 2) {
                console.log(tasktype)
                let idx = arr.others.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    arr.others.splice(idx, 1);
                }
            }
            arr.done.unshift(Task)
            setListTasks(arr)

            let boardArr = { ...boardTasks }
            if (status === 0) {
                let idx = boardArr.todo.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    boardArr.todo.splice(idx, 1);
                    boardArr.done.unshift(Task)
                }
            } else if (status === 1) {
                let idx = boardArr.onprogress.findIndex((obj: any) => obj.id === Task.id);
                if (idx !== -1) {
                    boardArr.onprogress.splice(idx, 1);
                    boardArr.done.unshift(Task)
                }
            }
            setBoardTasks(boardArr)
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
            console.log("ERROR")
        }
    }

    const deleteTheTask = async () => {
        const error: any = await deleteTask(Task)
        if (error === null) {
            let arr = { ...ListTasks }
            console.log(arr)
            if (tasktype === 0) {
                let idx = arr.todayDue.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    arr.todayDue.splice(idx, 1)
                }
            } else if (tasktype === 1) {
                let idx = arr.overDue.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    arr.overDue.splice(idx, 1)
                }
            } else if (tasktype === 2) {
                let idx = arr.others.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    arr.others.splice(idx, 1)
                }
            } else if (tasktype === 3) {
                let idx = arr.done.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    arr.done.splice(idx, 1)
                }
            }
            setListTasks(arr)
            
            let boardArr = {...boardTasks}
            if(Task.status===0){
                let idx = boardArr.todo.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    boardArr.todo.splice(idx, 1)
                }
            }else if(Task.status===1){
                let idx = boardArr.onprogress.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    boardArr.onprogress.splice(idx, 1)
                }
            }else{
                let idx = boardArr.done.findIndex((obj: any) => obj.id === Task.id)
                if (idx !== -1) {
                    boardArr.done.splice(idx, 1)
                }
            }
            setBoardTasks(boardArr)

            console.log("DONE")
        } else {
            toast.error('Some Issue With Server try Again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(error)
        }
    }

    return (
        <div className='flex base:w-auto tv:w-full z-[0]'>
            <div className='w-[3%] pl-[2px]  flex  items-center z-[0]'>
                {selectedBoxes.length !== 0 && (
                    <Checkbox className='border-[1px] border-[#0050C7] data-[state=checked]:bg-[#0050C7]' checked={selectedTask} onCheckedChange={async () => {
                        if (selectedTask === true) {
                            let arr = [...selectedBoxes]
                            let idx = arr.indexOf(Task.id)
                            if (idx !== -1) {
                                arr.splice(idx, 1);
                                setSelectedBoxes(arr)
                                setSelectedTask(false)
                                console.log(arr)
                            }
                        } else {
                            let arr = [...selectedBoxes]
                            arr.push(Task.id)
                            setSelectedBoxes(arr)
                            setSelectedTask(true)
                        }
                    }} />
                )}
            </div>
            <LinkDiv href={`/home/tasks/${Task.id}`} style={(open === true || selectedTask === true) ? { backgroundColor: "#F6F8FA" } : { cursor: "pointer" }} className="hover:bg-[#F6F8FA] cursor-pointer base:w-auto tv:w-[97%] py-[10px] flex px-[4px] rounded-[6px] transition duration-500  ease-in-out text-[#24282e]" onContextMenu={handleTriggerClick}>

                {tasktype === 3 ? (
                    <>
                        <h1 className='base:min-w-[140px] tv:w-[45%] text-[0.91rem] font-[550]'>{Task.name}</h1>
                        <p className='base:min-w-[120px] tv:w-[35%] text-[0.85rem]'>{Task.name}</p>
                        <p className='base:min-w-[100px] tv:w-[20%] text-[0.85rem]' style={today_deadline === true ? { color: "#FB8891" } : { color: "#24282e" }}>{formatDate(Task.dueDate)}</p>
                        <p className='base:min-w-[100px] tv:w-[20%] text-[0.85rem]'>{Task.priority}</p>
                    </>
                ) : (
                    <>
                        <h1 className='base:min-w-[140px] tv:w-[35%] text-[0.91rem] font-[550]'>{Task.name}</h1>
                        <p className='base:min-w-[130px] tv:w-[30%] text-[0.85rem]'>{Task.name}</p>
                        <p className='base:min-w-[110px] tv:w-[20%] text-[0.85rem]' style={today_deadline === true ? { color: "#FB8891" } : { color: "#24282e" }}>{formatDate(Task.dueDate)}</p>
                        <p className='base:min-w-[90px] tv:w-[15%] text-[0.85rem]'>{Task.priority}</p>
                        <div className='base:min-w-[90px] tv:w-[15%] flex items-center'>{Task.status === 0 ?

                            <div className='bg-[#d3e5ef] ml-[-10px] w-[58px] shadow-sm py-[2px] px-[4px] rounded-[25px] flex gap-1 items-center justify-center'>
                                <p className='text-[0.7rem] tracking-wide text-[#5b97bd] font-[500]'>To-do</p>
                            </div>
                            :
                            <div className='bg-[#FFD580] ml-[-10px] w-[95px] shadow-sm py-[2px] px-[4px] rounded-[25px] flex gap-1 items-center  justify-center'>
                                <p className='text-[0.7rem] text-[#f74b03] tracking-wide font-[500]'>On Progress</p>
                            </div>
                        }
                        </div>
                    </>
                )
                }
            </LinkDiv >
            <DropdownMenu open={open} onOpenChange={setopen} >
                <DropdownMenuContent style={{ position: 'absolute', left: dropdownPosition.x, top: dropdownPosition.y }}
                    className="rounded-[10px] w-56 shadow-[0px_1px_10px_-3px_rgba(0,0,0,0.18)]">
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='w-[full] flex gap-2 pl-[7px]'>
                                <BarChartHorizontalBig size={16} className='opacity-[0.6]' />
                                <h2>Change Status</h2>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className='flex flex-col gap-[3px] p-[5px]'>
                                    <DropdownMenuItem onClick={(e) => markAsTodoFunction()} className='cursor-pointer'>
                                        <div className='bg-[#d3e5ef] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center cursor-pointer justify-center'>
                                            <div className='bg-[#5b97bd] rounded-full h-[8px] w-[8px]'>
                                            </div>
                                            <p className='text-[0.7rem] tracking-wide font-[500]'>To-do</p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => markAsOnprogressFunction()} className='cursor-pointer'>
                                        <div className='bg-[#FFD580] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center  justify-center'>
                                            <div className='bg-[#f74b03] rounded-full h-[8px] w-[8px]'>
                                            </div>
                                            <p className='text-[0.7rem] tracking-wide font-[500]'>On Progress</p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => markAsDoneFunction()} className='cursor-pointer'>
                                        <div className='bg-[#dbeddb] shadow-sm py-[2px] px-[8px] rounded-[25px] flex gap-1 items-center  justify-center'>
                                            <div className='bg-[#6c9b7d] rounded-full h-[8px] w-[8px]'>
                                            </div>
                                            <p className='text-[0.7rem] tracking-wide font-[500]'>Done</p>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        {/* <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={markAsCompleted}>
                        <CheckCheck size={16} className='opacity-[0.6]' color='#67CAE7' />
                        <h2>Mark as Completed</h2>
                    </DropdownMenuItem> */}
                        <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={selectTheTask}>
                            <CheckSquare2 size={16} className='opacity-[0.6]' />
                            <h2>Select</h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={duplicateFunction}>
                            <Copy size={16} className='opacity-[0.6]' />
                            <h2>Duplicate</h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                            <Star size={16} className='opacity-[0.6]' />
                            <h2>Add to Favourites</h2>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className='h-[2px]' />
                    <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                        <Archive size={16} className='opacity-[0.6]' />
                        <h2>Archives</h2>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={deleteTheTask}>
                        <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
                        <h2 className='text-[#FC979F]'>Delete</h2>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}


const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }: any, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))

export default PendingTDrop