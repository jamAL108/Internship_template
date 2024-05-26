import React, { useState, useEffect } from 'react'
import { CompletedTaskObject } from '@/interface/interface'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Pencil, Copy, Archive, Trash2, CheckCheck, CheckSquare2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

// import { useToast } from "@/components/ui/use-toast";
import { toast } from 'react-toastify';
import { markAsPendingAPI, deleteTask } from '@/apiReq/dashboardAPIs/Task'

import Link from 'next/link'

const CompletedDropDown: React.FC<any> = (props) => {
    const { Task, selectedBoxes, setSelectedBoxes, pendingTask, setPendingTask, completed_task, setCompletedTask ,  bigAPIrequest ,  setBigAPIrequest  } = props;

    // const { toast } = useToast()

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

    const markAsPending = async () => {
        const result: any = await markAsPendingAPI(Task)
        if (result.data !== null) {
            let arr = { ...pendingTask }
            const todayDate = new Date();
            const formattedTodayDate = todayDate.toDateString();
            const givenDate = new Date(Task.dueDate)
            const givenDateInString = givenDate.toDateString();
            console.log(todayDate > givenDate)
            Task.status = false
            if (formattedTodayDate === givenDateInString) {
                arr.todayDue.push(Task)
            } else if (todayDate > givenDate) {
                arr.overDue.push(Task)
            } else {
                arr.others.push(Task);
            }
            setPendingTask(arr)
            let tempcomp = [...completed_task]
            let idx = tempcomp.findIndex((obj: any) => obj.id === Task.id);
            if (idx !== -1) {
                tempcomp.splice(idx, 1);
            }
            setCompletedTask(tempcomp)
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
            console.log('ERROR')
        }
    }

    const deleteTheTask = async () => {
        const error = await deleteTask(Task)
        if (error === null) {
            let tempcomp = [...completed_task]
            let idx = tempcomp.findIndex((obj: any) => obj.id === Task.id);
            if (idx !== -1) {
                tempcomp.splice(idx, 1);
            }
            setCompletedTask(tempcomp)
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
            console.log('ERROR')
        }
    }

    return (
        <div className='flex w-full z-[0]'>
            <div className='w-[3%]  flex justify-center pr-[4px] items-center z-[0]'>
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
            <Link href={`/home/tasks/${Task.id}`} style={(open === true || selectedTask === true) ? { backgroundColor: "#F6F8FA" } : { cursor: "pointer" }} className="hover:bg-[#F6F8FA] cursor-pointer w-full py-[10px] flex px-[4px] rounded-[6px] transition duration-500 ease-in-out" onContextMenu={handleTriggerClick}>
                <h1 className='w-[45%] text-[#24282e] text-[0.93rem] font-[590]'>{Task.name}</h1>
                <p className='w-[35%] text-[0.85rem] font-[400]'>{Task.name}</p>
                <p className='w-[20%] text-[0.85rem] font-[400]'>{formatDate(Task.dueDate)}</p>
                <p className='w-[20%] text-[0.87rem] font-[440]'>{Task.priority}</p>
            </Link>
            <DropdownMenu open={open} onOpenChange={setopen}>
                <DropdownMenuContent style={{ position: 'absolute', left: dropdownPosition.x, top: dropdownPosition.y }}
                    className="rounded-[10px] w-56 shadow-[0px_1px_10px_-3px_rgba(0,0,0,0.18)]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer w-[full] flex gap-2 pl-[7px]' onClick={markAsPending}>
                            <CheckCheck size={16} className='opacity-[0.6]' color='#67CAE7' />
                            <h2>Mark as Pending</h2>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={selectTheTask}>
                            <CheckSquare2 size={16} className='opacity-[0.6]' />
                            <h2>Select</h2>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className='h-[2px]' />
                    <DropdownMenuItem className='cursor-pointer w-[full] flex gap-2 pl-[7px]' onClick={deleteTheTask}>
                        <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
                        <h2 className='text-[#FC979F]'>Delete</h2>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CompletedDropDown