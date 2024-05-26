import React, { useEffect, useState } from 'react'
import Taskrow from './TaskRow';
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import SkeletonforTable from './SkeletonForTable'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, MoveUp, MoveDown, ArrowUp, ArrowDown } from 'lucide-react';
const listViewComponent: React.FC<any> = (props) => {
    const { ListTasks, setListTasks, selectedBoxes, boardTasks, setBoardTasks, setSelectedBoxes, bigAPIrequest, setBigAPIrequest, setSkeletonLoaderForTable, skeletonLoaderForTable } = props

    const [checkAll, setCheckAll] = useState<boolean>(false)
    const [checkList, setCheckList] = useState<any>([])
    const [Title, setTitle] = useState<string>('')
    const [Status, setStatus] = useState<string>('')
    const [Priority, setPriority] = useState<string>('')
    const ascOrderPriority = ['Low', 'Medium', 'High']
    const descOrderPriority = ['High', 'Medium', 'Low']

    useEffect(() => {
        let arr: any = new Array(ListTasks.length)
        arr.fill(false)
        setCheckList(arr)
    }, [ListTasks])

    const checkForAll = () => {
        if (checkList.length === 0) {
            return false
        }
        for (var i = 0; i < checkList.length; i++) {
            if (checkList[i] === false) {
                return false
            }
        }
    }

    return (
        <div className='py-[0px] w-full flex flex-col pl-[20px] base:pr-[18px] tv:pr-[25px] gap-5 pb-[50px] h-[calc(100vh_-_7rem)] overflow-y-auto'>
            <ScrollArea className='w-full !h-[calc(100vh_-_145px)]'>
                <Table>
                    <TableCaption>A list of your recent Tasks.</TableCaption>
                    <TableHeader className='!border-b-[3px] !z-[10] bg-white'>
                        <TableRow className='text-[0.8rem] border-b-[3px] hover:bg-[#f9f9fa] MonaSans font-[600]'>
                            <TableHead className='base:w-[30px] tv:w-[45px]'>
                                <div className='base:w-[30px] tv:w-[30px] flex justify-center items-center base:h-[30px] tv:h-[30px] rounded-full hover:bg-[#eef4ff]'>
                                    <Checkbox checked={checkAll || checkForAll()} onCheckedChange={(e) => {
                                        if (checkAll === false) {
                                            setCheckList(checkList.fill(true))
                                        } else {
                                            setCheckList(checkList.fill(false))
                                        }
                                        setCheckAll(!checkAll)

                                    }} className='border-[#657FFE] data-[state=checked]:bg-[#657FFE]' id="terms" />
                                </div>
                            </TableHead>
                            <TableHead className="base:min-w-[110px] tv:w-[110px]">Task</TableHead>
                            <TableHead className="base:min-w-[180px] tv:w-[55%]">
                                <DropdownMenu>
                                    <DropdownMenuTrigger onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                        className='flex items-center gap-1 px-[15px] outline-none py-[2px] rounded-[7px] hover:bg-[#f4f4f5]'>
                                        <h2 className='mt-[3px]'>Title</h2>
                                        {Title === 'asc' ? (
                                            <ArrowUp size={15} />
                                        ) : Title === 'desc' ? (
                                            <ArrowDown size={15} />
                                        ) : (
                                            <ChevronsUpDown size={12} />
                                        )}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className='flex items-center gap-1' onClick={(e) => {
                                            setTitle('asc')
                                            let arr = [...ListTasks]
                                            arr.sort((a, b) => a.name.localeCompare(b.name));
                                            setListTasks(arr)
                                        }}>

                                            <MoveUp size={12} />
                                            Asc</DropdownMenuItem>
                                        <DropdownMenuItem className='flex items-center gap-1' onClick={(e) => {
                                            setTitle('desc')
                                            let arr = [...ListTasks]
                                            arr.sort((a, b) => b.name.localeCompare(a.name));
                                            setListTasks(arr)
                                        }
                                        }>
                                            <MoveDown size={12} />
                                            Desc</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableHead>
                            <TableHead className="base:min-w-[110px] tv:w-[110px]">Due</TableHead>
                            <TableHead className="base:min-w-[120px] tv:w-[120px]">
                                <DropdownMenu>
                                    <DropdownMenuTrigger onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                        className='flex items-center gap-1 px-[15px] outline-none py-[2px] rounded-[7px] hover:bg-[#f4f4f5]'>
                                        <h2 className='mt-[3px]'>Status</h2>
                                        {Status === 'asc' ? (
                                            <ArrowUp size={15} />
                                        ) : Status === 'desc' ? (
                                            <ArrowDown size={15} />
                                        ) : (
                                            <ChevronsUpDown size={12} />
                                        )}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className='flex items-center gap-1' onClick={(e) => {
                                            setSkeletonLoaderForTable(true)
                                            setStatus('asc')
                                            let arr = [...ListTasks]
                                            arr.sort((a, b) => a.status - b.status);
                                            setListTasks(arr)
                                            setSkeletonLoaderForTable(false)
                                        }}>
                                            <MoveUp size={12} />
                                            Asc</DropdownMenuItem>
                                        <DropdownMenuItem className='flex items-center gap-1' onClick={(e) => {
                                            setSkeletonLoaderForTable(true)
                                            setStatus('desc')
                                            let arr = [...ListTasks]
                                            arr.sort((a, b) => b.status - a.status);
                                            setListTasks(arr)
                                            setSkeletonLoaderForTable(false)
                                        }}>
                                            <MoveDown size={12} />
                                            Desc</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableHead>
                            <TableHead className="base:min-w-[120px] tv:w-[120px]">
                                <DropdownMenu>
                                    <DropdownMenuTrigger onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                        className='flex items-center gap-1 px-[15px] outline-none py-[2px] rounded-[7px] hover:bg-[#f4f4f5]'>
                                        <h2 className='mt-[3px]'>Priority</h2>
                                        {Priority === 'asc' ? (
                                            <ArrowUp size={15} />
                                        ) : Priority === 'desc' ? (
                                            <ArrowDown size={15} />
                                        ) : (
                                            <ChevronsUpDown size={12} />
                                        )}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className='flex items-center gap-1' onClick={(e) => {
                                            setPriority('asc')
                                            let arr = [...ListTasks]
                                            arr.sort((a, b) => ascOrderPriority.indexOf(a.priority) - ascOrderPriority.indexOf(b.priority));
                                            setListTasks(arr)
                                        }}>
                                            <MoveUp size={12} />
                                            Asc</DropdownMenuItem>
                                        <DropdownMenuItem className='flex items-center gap-1' onClick={(e) => {
                                            setPriority('desc')
                                            let arr = [...ListTasks]
                                            arr.sort((a, b) => descOrderPriority.indexOf(a.priority) - descOrderPriority.indexOf(b.priority));
                                            setListTasks(arr)
                                        }}>
                                        <MoveDown size={12} />
                                        Desc</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableHead>
                        <TableHead className='base:min-w-[50px] tv:w-[50px]'></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        skeletonLoaderForTable === true && (
                            <SkeletonforTable />
                        )
                    }
                    {skeletonLoaderForTable === false && ListTasks.length !== 0 && ListTasks.map((task: any, index: number) => (
                        <Taskrow ListTasks={ListTasks} setListTasks={setListTasks} task={task} key={index} index={index} setCheckList={setCheckList} checkList={checkList} boardTasks={boardTasks} setBoardTasks={setBoardTasks} />
                    ))}
                </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        </div >
    )
}


export default listViewComponent
