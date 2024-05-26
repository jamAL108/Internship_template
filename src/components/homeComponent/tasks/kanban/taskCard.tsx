import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Badge } from '@/components/ui/badge'
import { ColumnId } from "./kanbanBoard";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'lucide-react'

import { useRouter } from "next/navigation";

export interface Task {
    id: UniqueIdentifier;
    columnId: ColumnId;
    content: string;
}

interface TaskCardProps {
    task: Task;
    isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
    type: TaskType;
    task: Task;
}

export function TaskCard({ task, isOverlay }: any) {
    const router = useRouter()
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        } satisfies TaskDragData,
        attributes: {
            roleDescription: "Task",
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
        cursor: "grab"
    };

    const variants = cva("", {
        variants: {
            dragging: {
                over: "ring-2 opacity-30",
                overlay: "ring-2 ring-[#0064FF]",
            },
        },
    });

    function formatDate(isoDateString: string): string {
        const months: string[] = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date(isoDateString);
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = months[date.getMonth()];

        return `${day} ${month}`;
    }

    // ${task.columnId==='todo' ? 'bg-[#fbf6fa] border-t-[#9e9eb2]' : task.columnId==='done' ? 'bg-[#e9f8f5] border-t-[#0fc862]' : 'bg-[#fff1da] border-t-[#fbba4a]'}
    // href={`/home/tasks/${Task.id}`}
    return (
        <Card
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className={`${variants({
                dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
            })}  shadow-sm w-[95%] rounded-[6px] !bg-white border-[1.4px] border-[#e9eef2] `}
        >
            {/* <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
                <Badge variant={"outline"} className="ml-auto font-semibold">
                    Task
                </Badge>
            </CardHeader> */}
            <CardContent className="flex px-[10px] py-[10px] flex-col gap-[4px]">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-[0.86rem] font-[550] tracking-wide">{task.name}</h2>
                    <BsThreeDots size={18} color='black' className="cursor-pointer" onMouseEnter={(e) => {
                        e.stopPropagation()
                    }} onClick={(e) => {
                        e.stopPropagation()
                    }} />
                </div>
                <div className="w-full flex items-center gap-[12px]">
                    <h2 className="text-[0.76rem] text-muted-foreground font-[450]">{`Due in ${formatDate(task.dueDate)}`}</h2>
                    <div className={`px-[10px] py-[2px] rounded-[5px] flex justify-center items-center ${task.priority === 'Low' ? 'bg-[#d5e6fa] text-[#3a87ed]' : task.priority === 'Medium' ? 'bg-[#fcebdb] text-[#f4a967]' : 'bg-[#f2d2c9] text-[#c04b47]'}`}>
                        <h2 className="text-[0.8rem] font-[500]">{task.priority}</h2>
                    </div>
                </div>
                <div className='flex justify-end items-center gap-1 mr-[5px]'>
                    <Link size={13} color="black" className="opacity-[0.6]" />
                    <p className="text-[0.76rem] font-[400]">{task.sub_task.length}</p>
                </div>
            </CardContent>
        </Card>
    );
}