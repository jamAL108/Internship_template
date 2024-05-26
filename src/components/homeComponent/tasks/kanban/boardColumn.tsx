import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { Task, TaskCard } from "./taskCard";
import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical } from "lucide-react";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { Plus } from 'lucide-react'

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: any[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "w-[280px] max-w-full flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-[#0064FF]",
        },
      },
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })} !border-none !shadow-none `}
    >
      <CardHeader className="p-4 bg-[#f7f8fa] font-semibold !rounded-t-[14px] w-full  gap-[12px] flex flex-row !justify-start !items-center">
        <span className="text-left text-[#5e6581]"> {column.title}</span>
        <div className="bg-[#dee7ee] rounded-full !mt-[-0px] p-[8px] w-[24px] h-[24px] flex justify-center items-center" >
          <p className=" text-[0.8rem] text-[#5e6581] m-0">3</p>
        </div>
        {/* <h2>Helo</h2> */}
        {/* <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripVertical />
        </Button> */}
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex bg-[#f7f8fa] items-center mt-[5px] flex-grow flex-col gap-3 p-2 pt-[12px] ">
          <div className="bg-[#eef2f5] border-2 border-[#dce3eb] rounded-[6px] w-[95%] h-[40px] flex justify-center items-center cursor-pointer">
           <Plus size={23} color='#7b829d'/>
          </div>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 px-[20px]">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}