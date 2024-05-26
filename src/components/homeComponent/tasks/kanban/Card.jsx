import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";

import { useRouter } from "next/navigation";
import LinkDiv from 'next/link'

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { toast } from 'react-toastify'
import { cn } from "@/lib/utils"

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
import { makeDuplicate, deleteTask } from '@/apiReq/newAPIs/Task'


const Container = styled.div`
    border-radius: 10px;
    padding: 8px;
    color: #000;
    margin-bottom: 8px;
    min-height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${(props) => bgcolorChange(props)};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

function bgcolorChange(props) {
    return props.isDragging
        ? "lightgreen"
        : props.isDraggable
            ? props.isBacklog
                ? "#F2D7D5"
                : "#DCDCDC"
            : props.isBacklog
                ? "#F2D7D5"
                : "#EAF4FC";
}


function formatDate(isoDateString) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];

    return `${day} ${month}`;
}


export default function Card({ task, index, boardTasks, setBoardTasks, ListTasks, setListTasks, }) {

    const [dropdownPosition, setDropdownPosition] = useState({ x: -100, y: -38 });
    const [open, setopen] = useState(false)

    const handleTriggerClick = (e) => {
        e.preventDefault()
        const rect = e.target.getBoundingClientRect();
        const posX = e.clientX + 20;
        const posY = e.clientY - 10;
        setDropdownPosition({ x: posX, y: posY });
        setopen(true);
    };

    const duplicateFunction = async () => {
        const result = await makeDuplicate(task)
        const todayDate = new Date();
        const formattedTodayDate = todayDate.toDateString();
        const givenDate = new Date(task.dueDate)
        const givenDateInString = givenDate.toDateString();
        if (result.data !== null) {
            let arr = [ ...ListTasks ]
            let boardArr = { ...boardTasks }
            if (result.data[0].status === 0) {
                boardArr.todo.push(result.data[0])
            } else if (result.data[0].status === 1) {
                boardArr.onprogress.push(result.data[0])
            } else if (result.data[0].status === 2) {
                boardArr.done.push(result.data[0])
            }
            setBoardTasks(boardArr)
            arr.push(result.data[0])
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


    const deleteFunction = async () => {
        const result = await deleteTask(task)
        if (result === null) {
            let arr = [ ...ListTasks ]
            let boardArr = { ...boardTasks }
            if (task.status === 0) {
                boardArr.todo.splice(index, 1)
            } else if (task.status === 1) {
                boardArr.onprogress.splice(index, 1)
            } else if (task.status === 2) {
                boardArr.done.splice(index, 1)
            }
            setBoardTasks(boardArr)
            let idx1 = arr.findIndex((item) => item.id === task.id)
            if (idx1 !== -1) {
                arr.splice(idx1, 1)
            }
            setListTasks(arr)
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
            console.log("ERROR")
        }
    }

    return (
        <Draggable className='!bg-[#f7f8fa]' draggableId={task.id} key={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    className='shadow-sm w-[95%] !m-0 rounded-[6px] !bg-white border-[1.4px] border-[#e9eef2]'
                >
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
                                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => duplicateFunction()}>
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
                            <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => {
                                deleteFunction()
                            }}>
                                <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
                                <h2 className='text-[#FC979F]'>Delete</h2>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <LinkDiv href={`/home/tasks/${task.id}`} className="flex px-[10px] !py-[10px] flex-col gap-[4px]">
                        <div className="w-full flex justify-between items-center">
                            <h2 className="text-[0.86rem] font-[550] tracking-wide">{task.name}</h2>
                            <BsThreeDots size={18} color='black' className="cursor-pointer" onMouseEnter={(e) => {
                                e.stopPropagation()
                            }} onClick={handleTriggerClick} />
                        </div>
                        <div className="w-full flex items-center gap-[12px]">
                            <h2 className="text-[0.76rem] text-muted-foreground font-[450]">{`Due in ${formatDate(task.dueDate)}`}</h2>
                            <div className={`px-[10px] py-[2px] rounded-[5px] flex justify-center items-center ${task.priority === 'Low' ? 'bg-[#d5e6fa] text-[#3a87ed]' : task.priority === 'Medium' ? 'bg-[#fcebdb] text-[#f4a967]' : 'bg-[#f2d2c9] text-[#c04b47]'}`}>
                                <h2 className="text-[0.8rem] font-[500]">{task.priority}</h2>
                            </div>
                        </div>
                        <div className='flex justify-end items-center gap-1 mr-[5px]'>
                            <Link size={13} color="black" className="opacity-[0.6]" />
                            <p className="text-[0.76rem] font-[400]">{task.sub_tasks !== null && task.sub_tasks.length}</p>
                        </div>
                    </LinkDiv>
                    {provided.placeholder}
                </Container>
            )}
        </Draggable>
    );
}


const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
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
