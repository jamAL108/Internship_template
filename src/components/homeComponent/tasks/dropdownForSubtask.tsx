import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

import { Plus, ListTree, Trash2 } from 'lucide-react'

const DropDownForSubTask: React.FC<any> = (props) => {
    const { subTaskCommand, setSubtaskCommand, subTaskChooseInput, setSubTaskChooseInput, SelectedTasks, setSelected, listOfOthertask, setListOfOtherTask, newDropdown, newTask } = props;
    return (
        <DropdownMenu open={subTaskCommand} onOpenChange={setSubtaskCommand}>
            <DropdownMenuTrigger onClick={(e) => setSubtaskCommand(true)}>
                {newDropdown === true ? (
                    <div style={subTaskCommand === true ? { backgroundColor: "#efefef" } : { display: "flex" }} className=' subtasksButton rounded-[6px] flex items-center justify-center gap-[0.4rem] px-[14px] py-[7px] cursor-pointer'>
                        <ListTree size={15} color='#9d9c99' />
                        <p className='text-[0.88rem] text-[#777672] '>sub-tasks</p>
                    </div>
                ) : (
                    <Plus style={subTaskCommand === true ? { backgroundColor: "#efefef" } : { display: "flex" }} className='cursor-pointer p-[3px] rounded-[3px] hover:bg-[#efefef]' size={24} color='#777672' />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-[300px] !p-[0px] relative ${newTask === true ? '!left-[90px]' : '!left-[-70px]'}`}>
                <Command className="overflow-y-auto rounded-lg border shadow-lg w-[300px]">
                    <CommandInput value={subTaskChooseInput} onValueChange={(search) => {
                        setSubTaskChooseInput(search)
                    }} placeholder="Enter task name" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Selected">
                            {SelectedTasks.map((subtask: any, index: number) => (
                                <CommandItem key={index} onClick={(e) => {
                                    e.stopPropagation()
                                }} className='flex justify-between items-center'>
                                    <span>{subtask.name}</span>
                                    <Trash2 onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        ///removing from selected list
                                        const indexOfTask = SelectedTasks.findIndex((obj: any, idx: number) => obj.id === subtask.id);
                                        let arr: any = [...SelectedTasks]
                                        if (indexOfTask !== -1) {
                                            arr.splice(indexOfTask, 1);
                                            setSelected(arr)


                                            /// normal list
                                            let normalList: any = [...listOfOthertask]
                                            normalList.push(subtask)
                                            setListOfOtherTask(normalList)
                                        }
                                    }} className='cursor-pointer' size={17} color='#777672' />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Choose sub tasks">
                            {listOfOthertask.map((subTask: any, index: number) => (
                                <CommandItem className='flex justify-between items-center' key={index} onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <span>{subTask.name}</span>
                                    <Plus onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        ///removing from normal list
                                        const indexOfTask = listOfOthertask.findIndex((obj: any, idx: number) => obj.id === subTask.id);
                                        let arr = [...listOfOthertask]
                                        if (indexOfTask !== -1) {
                                            arr.splice(indexOfTask, 1)
                                            setListOfOtherTask(arr)

                                            //// selected List
                                            let selectedList: any = [...SelectedTasks]
                                            selectedList.push(subTask)
                                            setSelected(selectedList)
                                        }
                                    }} className='cursor-pointer' size={17} color='#777672' />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownForSubTask