import React, { useState } from 'react'
import { Trash2, Copy, ExternalLink, Pencil, MoreHorizontal, Plus, ChevronLeft, BarChartHorizontalBig, CheckSquare2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { deleteInvoice } from '@/apiReq/newAPIs/invoice'

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"

import { markAsTodo, markAsOnprogress, markAsDone, deleteTask, makeDuplicate } from '@/apiReq/newAPIs/Task'

import { AlertDialogContent } from '@/components/customizedShadcn/alert'

const TaskRow: React.FC<any> = (props) => {
    const { ListTasks, setListTasks, task, index, setCheckList, checkList, boardTasks, setBoardTasks } = props

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [activeTag, setActiveTag] = useState<boolean>(false)
    const [deleteAlert, setDeleteAlert] = useState<boolean>(false)
    const [deleteLoader, setDeleteLoader] = useState<boolean>(false)

    const router = useRouter()

    function getRemainingDays(dateString: any) {
        // Parse the given date string
        const targetDate: any = new Date(dateString);

        // Get the current date
        const currentDate: any = new Date();

        // Calculate the difference in milliseconds
        const differenceMs: any = targetDate - currentDate;

        // Convert milliseconds to days
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        // Determine the remaining days format
        let remainingDays = '';
        if (differenceDays > 7) {
            remainingDays = `in ${differenceDays} days`;
        } else if (differenceDays === 7) {
            remainingDays = 'in 7 days';
        } else if (differenceDays > 1) {
            remainingDays = `in ${differenceDays} days`;
        } else if (differenceDays === 1) {
            remainingDays = 'in 1 day';
        } else if (differenceDays === 0) {
            remainingDays = 'today';
        } else {
            remainingDays = 'overdue';
        }

        return remainingDays;
    }

    function convertISOToCustomFormat(isoString: string) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(isoString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    }

    const deleteFunction = async () => {
        setDeleteLoader(true)
        let result: any = {
            success: true
        }
        const error: any = await deleteTask(task)
        if (error === null) {
            let arr = [ ...ListTasks ]
            let idx = arr.findIndex((item: any) => item.id === task.id)
            if (idx !== -1) {
                arr.splice(idx, 1)
            }
            setListTasks(arr)

            let boardArr = { ...boardTasks }
            if (task.status === 0) {
                let idx = boardArr.todo.findIndex((obj: any) => obj.id === task.id)
                if (idx !== -1) {
                    boardArr.todo.splice(idx, 1)
                }
            } else if (task.status === 1) {
                let idx = boardArr.onprogress.findIndex((obj: any) => obj.id === task.id)
                if (idx !== -1) {
                    boardArr.onprogress.splice(idx, 1)
                }
            } else {
                let idx = boardArr.done.findIndex((obj: any) => obj.id === task.id)
                if (idx !== -1) {
                    boardArr.done.splice(idx, 1)
                }
            }
            setBoardTasks(boardArr)
            setDeleteLoader(false)
            setDeleteAlert(false)
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
            setDeleteLoader(false)
            setDeleteAlert(false)
        }
    }

    function formatDate(inputDateStr: any) {
        const date = new Date(inputDateStr)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const markAsTodoFunction = async () => {
        const result: any = await markAsTodo(task.id)
        if (result.success === true) {
            let arr = [ ...ListTasks ]
            let status = task.status
            task.status = 0;
            let idx = arr.findIndex((item: any) => item.id === task.id)
            if (idx !== -1) {
                arr[idx] = task
            }
            setListTasks(arr)

            let boardArr = { ...boardTasks }
            console.log(arr)
            if (status === 1) {
                let idx = boardArr.onprogress.findIndex((obj: any) => obj.id === task.id);
                if (idx !== -1) {
                    boardArr.onprogress.splice(idx, 1);
                    boardArr.todo.unshift(task)
                }
            } else if (status === 2) {
                let idx = boardArr.done.findIndex((obj: any) => obj.id === task.id);
                if (idx !== -1) {
                    boardArr.done.splice(idx, 1);
                    boardArr.todo.unshift(task)
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
        const result: any = await markAsOnprogress(task.id)
        if (result.success === true) {
            let arr = [ ...ListTasks ]
            let status = task.status
            task.status = 1;
            let idx = arr.findIndex((item: any) => item.id === task.id)
            if (idx !== -1) {
                arr[idx] = task
            }
            setListTasks(arr)
            let boardArr = { ...boardTasks }
            if (status === 0) {
                let idx = boardArr.todo.findIndex((obj: any) => obj.id === task.id);
                if (idx !== -1) {
                    boardArr.todo.splice(idx, 1);
                    boardArr.onprogress.unshift(task)
                }
            } else if (status === 2) {
                let idx = boardArr.done.findIndex((obj: any) => obj.id === task.id);
                if (idx !== -1) {
                    boardArr.done.splice(idx, 1);
                    boardArr.onprogress.unshift(task)
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
        const result: any = await markAsDone(task.id)
        if (result.success === true) {
            let arr = [ ...ListTasks ]
            let status = task.status
            task.status = 2;
            let idx = arr.findIndex((item: any) => item.id === task.id)
            if (idx !== -1) {
                arr[idx] = task
            }
            setListTasks(arr)

            let boardArr = { ...boardTasks }
            if (status === 0) {
                let idx = boardArr.todo.findIndex((obj: any) => obj.id === task.id);
                if (idx !== -1) {
                    boardArr.todo.splice(idx, 1);
                    boardArr.done.unshift(task)
                }
            } else if (status === 1) {
                let idx = boardArr.onprogress.findIndex((obj: any) => obj.id === task.id);
                if (idx !== -1) {
                    boardArr.onprogress.splice(idx, 1);
                    boardArr.done.unshift(task)
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

    return (
        <TableRow onClick={(e)=>router.push(`/home/tasks/${task.id}`)} onMouseEnter={(e) => setIsHovered(true)}
            onMouseLeave={(e) => setIsHovered(false)} key={task.id} className={`cursor-pointer text-[0.88rem] ${checkList[index] === true ? 'bg-[#e0eaff] hover:bg-[#e0eaff]' : 'hover:bg-[#f9fafb]'} `}>

            <AlertDialog open={deleteAlert} onOpenChange={(e) => {
                setDeleteAlert(false)
            }}>
                <AlertDialogContent className='base:w-[90vw] z-[0] tv:w-[400px] base:rounded-[10px] pb-[28px] !pt-[23px]'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm to delete the Invoice data</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this Invoice Data
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='base:flex-row tv:flex-row base:justify-end base:gap-[10px]'>
                        <button className='border-[2px] hover:bg-[#ededed] tracking-wide text-[0.8rem] font-[450] px-[10px] py-[2px] rounded-[4px] ' onClick={(e) => setDeleteAlert(false)}>Cancel</button>
                        <button disabled={deleteLoader} style={deleteLoader === true ? { opacity: 0.67 } : { opacity: 1 }}

                            className={`${deleteLoader === true ? "bg-[#e5484d] text-white hover:text-white hover:bg-[#e5484d]" : "bg-white text-[#e5484d] hover:text-white hover:bg-[#e5484d]"} text-[0.8rem] tracking-wide font-[450] px-[10px] py-[2px] flex justify-center items-center gap-1 rounded-[4px]   border-[#e5484d] border`} onClick={(e) => {
                                deleteFunction()
                            }}>
                            <ColorRing
                                visible={deleteLoader}
                                height="20"
                                width="20"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />
                            Delete</button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <TableCell className='base:w-[30px] tv:w-[45px]'>
                <div onClick={(e) => {
                    e.stopPropagation()
                    let arr = [...checkList]
                    if (checkList[index] === false) {
                        arr[index] = true
                    } else {
                        arr[index] = false
                    }
                    setCheckList(arr)
                }} className='base:w-[30px] tv:w-[30px] flex justify-center items-center base:h-[30px] tv:h-[30px] rounded-full hover:bg-[#eef4ff]'>
                    <Checkbox checked={checkList[index]} onCheckedChange={(e) => {
                        let arr = [...checkList]
                        if (checkList[index] === false) {
                            arr[index] = true
                        } else {
                            arr[index] = false
                        }
                        setCheckList(arr)
                    }} className='border-[#657FFE] data-[state=checked]:bg-[#657FFE]' id="terms" />
                </div>
            </TableCell>
            <TableCell className="base:min-w-[110px] tv:w-[110px]">Task-4567</TableCell>
            <TableCell className="font-medium">{task.name}</TableCell>
            <TableCell>{formatDate(task.dueDate)}</TableCell>
            <TableCell className='pl-[20px]'>{task.status === 0 ?
                <div className='bg-[#d3e5ef] ml-[-10px] w-[58px] shadow-sm py-[2px] px-[4px] rounded-[8px] flex gap-1 items-center justify-center'>
                    <p className='text-[0.7rem] tracking-wide text-[#5b97bd] font-[500]'>To-do</p>
                </div>
                : task.status === 1 ? (
                    <div className='bg-[#FFD580] ml-[-10px] w-[95px] shadow-sm py-[2px] px-[4px] rounded-[8px] flex gap-1 items-center  justify-center'>
                        <p className='text-[0.7rem] text-[#f74b03] tracking-wide font-[500]'>On Progress</p>
                    </div>
                ) : (
                    <div className='bg-[#dbeddb] ml-[-10px] w-[58px] shadow-sm py-[2px] px-[4px] rounded-[8px] flex gap-1 items-center  justify-center'>
                        <p className='text-[0.7rem] text-[#6c9b7d] tracking-wide font-[500]'>Done</p>
                    </div>
                )
            }</TableCell>
            <TableCell className='pl-[20px]'>{task.priority}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <MoreHorizontal size={20} className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] px-[10px] py-[10px] relative !right-[30px]">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={(e) => router.push(`/home/tasks/${task.id}`)} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <ExternalLink size={20} color='#344054' />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]' onClick={(e) => {
                                e.stopPropagation()
                                console.log(checkList)
                                let arr = [...checkList]
                                if (arr[index] === false) {
                                    arr[index] = true
                                }
                                setCheckList(arr)
                            }}>
                                <CheckSquare2 size={20} color='#344054' />
                                <h2>Select</h2>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Copy size={20} color='#344054' />
                                Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                    <BarChartHorizontalBig color='#344054' />
                                    Status</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className='flex flex-col gap-[3px] p-[5px]'>
                                        <DropdownMenuItem onClick={(e) => markAsTodoFunction()} className='cursor-pointer'>
                                            <div className='bg-[#d3e5ef] shadow-sm py-[2px] px-[8px] rounded-[8px] flex gap-1 items-center cursor-pointer justify-center'>
                                                <div className='bg-[#5b97bd] rounded-full h-[8px] w-[8px]'>
                                                </div>
                                                <p className='text-[0.7rem] tracking-wide font-[500]'>To-do</p>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => markAsOnprogressFunction()} className='cursor-pointer'>
                                            <div className='bg-[#FFD580] shadow-sm py-[2px] px-[8px] rounded-[8px] flex gap-1 items-center  justify-center'>
                                                <div className='bg-[#f74b03] rounded-full h-[8px] w-[8px]'>
                                                </div>
                                                <p className='text-[0.7rem] tracking-wide font-[500]'>On Progress</p>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => markAsDoneFunction()} className='cursor-pointer'>
                                            <div className='bg-[#dbeddb] shadow-sm py-[2px] px-[8px] rounded-[8px] flex gap-1 items-center  justify-center'>
                                                <div className='bg-[#6c9b7d] rounded-full h-[8px] w-[8px]'>
                                                </div>
                                                <p className='text-[0.7rem] tracking-wide font-[500]'>Done</p>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                            }} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Pencil size={20} color='#344054' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setDeleteAlert(true)
                            }} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Trash2 size={20} color='#344054' />
                                Move to trash
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default TaskRow
