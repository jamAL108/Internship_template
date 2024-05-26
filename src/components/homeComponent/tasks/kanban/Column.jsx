import React from "react";
import styled from "styled-components";
import Card from "./Card";
import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";
import { Plus } from 'lucide-react'

const TaskList = styled.div`
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({boardTasks ,setBoardTasks , ListTasks , setListTasks ,   title, tasks, id}) {
    return (
        <div className="w-[280px] max-h-full overflow-hidden max-w-full flex flex-col flex-shrink-0 snap-center ">
            <div className="p-4 bg-[#f7f8fa] h-[55px] font-semibold !rounded-t-[14px] w-full  gap-[12px] flex flex-row !justify-start !items-center"
            >
                <span className="text-left text-[#5e6581]">{title}</span>
                <div className="bg-[#dee7ee] rounded-full !mt-[-0px] p-[8px] w-[24px] h-[24px] flex justify-center items-center" >
                    <p className=" text-[0.8rem] text-[#5e6581] m-0">{tasks!==null && tasks!==undefined && tasks.length}</p>
                </div>
            </div>
            <div className={`flex ${tasks.length===0 ?  '!max-h-[180px]' : 'max-h-[calc(100%_-_65px)]'} bg-[#f7f8fa] items-center mt-[5px] flex-grow flex-col gap-3 p-2 pt-[12px]`}>
                <div className="bg-[#eef2f5] border-2 border-[#dce3eb] rounded-[6px] w-[95%] !h-[40px] !min-h-[40px] flex justify-center items-center cursor-pointer">
                    <Plus size={23} color='#7b829d' />
                </div>
                <Droppable droppableId={id} className={` !w-full  ${tasks.length===0 ? '!max-h-[40px]' : '!max-h-[calc(100%_-_50px)]'} !p-0 !m-0`}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            className='!bg-[#f7f8fa] !p-0 !m-0 !w-full flex flex-col items-center gap-3 
                            max-h-full overflow-y-auto kanbanColumn !pb-[10px]' 
                        >
                            {tasks!==null && tasks.length!==0 && tasks.map((task, index) => (
                                <Card key={index} boardTasks={boardTasks} setBoardTasks={setBoardTasks} ListTasks={ListTasks} setListTasks={setListTasks} index={index} task={task} />
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </div>
        </div>
    );
}