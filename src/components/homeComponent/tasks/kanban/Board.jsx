import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { markAsTodo, markAsOnprogress, markAsDone, deleteTask, makeDuplicate } from '@/apiReq/newAPIs/Task'
import { toast } from 'react-toastify';

export default function Board(props) {
    const { boardTasks, setBoardTasks, ListTasks, setListTasks } = props;

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        console.log(destination, source, draggableId)

        if (!destination || source.droppableId === destination.droppableId) return;

        let tempData = deletePreviousState(source.droppableId, draggableId)
        const task = findItemById(draggableId, [...boardTasks.todo, ...boardTasks.onprogress, ...boardTasks.done]);
        console.log(task)
        const NewState = setNewState(destination.droppableId, task, tempData);
        setBoardTasks(NewState)
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        let arr = { ...boardTasks }
        switch (sourceDroppableId) {
            case "0":
                arr.todo = [...removeItemById(taskId, arr.todo)]
                break;
            case "1":
                arr.onprogress = [...removeItemById(taskId, arr.onprogress)]
                break;
            case "2":
                arr.done = [...removeItemById(taskId, arr.done)]
                break;
        }
        return arr
    }

    const placeItem = () => {

    }

    const markAsTodoFunction = async (task, val) => {
        const result = await markAsTodo(task.id)
        const todayDate = new Date();
        const formattedTodayDate = todayDate.toDateString();
        const givenDate = new Date(task.dueDate)
        const givenDateInString = givenDate.toDateString();
        let arr = [ ...ListTasks ]
        if (result.success === true) {
            let idx = arr.findIndex((item) => item.id === task.id)
            if (idx !== -1) {
                arr[idx].status = 0
            }
            setListTasks(arr)
            // if (val === 2) {
            //     let idx = arr.done.findIndex((item) => item.id == task.id)
            //     if (idx !== -1) {
            //         arr.done.splice(idx, 1)
            //     }
            // }
            // if (formattedTodayDate === givenDateInString) {
            //     if (val === 2) {
            //         arr.todayDue.push(task)
            //     } else {
            //         let idx = arr.todayDue.findIndex((item) => item.id == task.id)
            //         if (idx !== -1) {
            //             arr.todayDue[idx].status = 0;
            //         }
            //     }
            // } else if (todayDate > givenDate) {
            //     if (val === 2) {
            //         arr.overDue.push(task)
            //     } else {
            //         let idx = arr.overDue.findIndex((item) => item.id == task.id)
            //         if (idx !== -1) {
            //             arr.overDue[idx].status = 0;
            //         }
            //     }
            // } else {
            //     if (val === 2) {
            //         arr.others.push(task)
            //     } else {
            //         let idx = arr.others.findIndex((item) => item.id == task.id)
            //         if (idx !== -1) {
            //             arr.others[idx].status = 0;
            //         }
            //     }
            // }
            // setListTasks(arr)
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
        }
    }

    const markAsOnprogressFunction = async (task, val) => {
        const result = await markAsOnprogress(task.id)
        const todayDate = new Date();
        const formattedTodayDate = todayDate.toDateString();
        const givenDate = new Date(task.dueDate)
        const givenDateInString = givenDate.toDateString();
        let arr = [ ...ListTasks ]
        if (result.success === true) {
            let idx = arr.findIndex((item) => item.id === task.id)
            if (idx !== -1) {
                arr[idx].status = 1
            }
            setListTasks(arr)
            // if (val === 2) {
            //     let idx = arr.done.findIndex((item) => item.id == task.id)
            //     if (idx !== -1) {
            //         arr.done.splice(idx, 1)
            //     }
            // }
            // if (formattedTodayDate === givenDateInString) {
            //     if (val === 2) {
            //         arr.todayDue.push(task)
            //     } else {
            //         let idx = arr.todayDue.findIndex((item) => item.id == task.id)
            //         if (idx !== -1) {
            //             arr.todayDue[idx].status = 1;
            //         }
            //     }
            // } else if (todayDate > givenDate) {
            //     if (val === 2) {
            //         arr.overDue.push(task)
            //     } else {
            //         let idx = arr.overDue.findIndex((item) => item.id == task.id)
            //         if (idx !== -1) {
            //             arr.overDue[idx].status = 1;
            //         }
            //     }
            // } else {
            //     if (val === 2) {
            //         arr.others.push(task)
            //     } else {
            //         let idx = arr.others.findIndex((item) => item.id == task.id)
            //         if (idx !== -1) {
            //             arr.others[idx].status = 1;
            //         }
            //     }
            // }
            // setListTasks(arr)
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
        }
    }

    const markAsDoneFunction = async (task, val) => {
        const result = await markAsDone(task.id)
        const todayDate = new Date();
        const formattedTodayDate = todayDate.toDateString();
        const givenDate = new Date(task.dueDate)
        const givenDateInString = givenDate.toDateString();
        let arr = [ ...ListTasks ]
        if (result.success === true) {
            let idx = arr.findIndex((item) => item.id === task.id)
            if (idx !== -1) {
                arr[idx].status = 2
            }
            setListTasks(arr)
            // arr.done.unshift(task)
            // let idx1 = arr.todayDue.findIndex((item)=>item.id===task.id)
            // if(idx1!==-1){
            //    arr.todayDue.splice(idx1,1)
            // }else{
            //     let idx2 = arr.overDue.findIndex((item)=>item.id===task.id)
            //     if(idx2!==-1){
            //         arr.overDue.splice(idx2,1)
            //     }else{
            //         let idx3 = arr.others.findIndex((item)=>item.id===task.id)
            //         if(idx3!==-1){
            //             arr.others.splice(idx3,1)
            //         }
            //     }
            // }
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
        }
    }

    function setNewState(destinationDroppableId, task, tempData) {
        let arr = { ...tempData }
        let updatedTask = { ...task }
        console.log(updatedTask)
        switch (destinationDroppableId) {
            case "0":
                updatedTask.status = 0
                markAsTodoFunction(updatedTask, task.status)
                arr.todo.unshift(updatedTask)
                break;
            case "1":
                updatedTask.status = 1
                markAsOnprogressFunction(updatedTask, task.status)
                arr.onprogress.unshift(updatedTask)
                break;
            case "2":
                updatedTask.status = 2
                markAsDoneFunction(updatedTask, task.status)
                arr.done.unshift(updatedTask)
                break;
        }
        console.log(arr)
        return arr
    }
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd} className='kanbanBoard h-full'>
            <div className="flex gap-4 px-[20px] max-h-full base:overflow-x-auto bl:overflow-x-hidden"
            >
                <Column title={"To do"} tasks={boardTasks.todo} boardTasks={boardTasks} setBoardTasks={setBoardTasks} ListTasks={ListTasks} setListTasks={setListTasks} id={"0"} />
                <Column title={"On Progress"} tasks={boardTasks.onprogress} boardTasks={boardTasks} setBoardTasks={setBoardTasks} ListTasks={ListTasks} setListTasks={setListTasks} id={"1"} />
                <Column title={"Done"} tasks={boardTasks.done} boardTasks={boardTasks} setBoardTasks={setBoardTasks} ListTasks={ListTasks} setListTasks={setListTasks} id={"2"} />
            </div>
        </DragDropContext>
    );
}