import React, { useState } from 'react'
import { Trash2, Copy, ExternalLink, Pencil, MoreHorizontal, Plus , CheckCircle2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const AudioTable: React.FC<any> = (props) => {
    const { checkList, setCheckList, audio, index, setRenameAlert, setRenameData, setDeleteData, setDeleteAlert } = props
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [activeTag, setActiveTag] = useState<boolean>(false)
    const [customTag, setCustomTag] = useState<any>(audio.tags)
    const [customTagInput, setCustomTagInput] = useState<string>('')

    const router = useRouter()
    function convertISOToCustomFormat(isoString: string) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(isoString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day} ${year}`;
    }

    function formatSeconds(seconds: number): string {
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            if (remainingSeconds === 0) {
                return `${minutes}m`;
            } else {
                return `${minutes}m ${remainingSeconds}s`;
            }
        }
    }

    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addItem();
        }
    };

    const addItem = () => {
        if (customTagInput.trim() !== '') {
            let arr = [...customTag]
            const obj ={
                name:customTagInput,
                selected:true
            }
            arr.unshift(obj)
            setCustomTag(arr)
            setCustomTagInput('')
        }
    };

    return (
        <TableRow onMouseEnter={(e) => setIsHovered(true)}
            onMouseLeave={(e) => setIsHovered(false)} onClick={(e) => router.push(`/home/audiotranscribe/${audio.id}`)} key={audio.invoice} className={` ${checkList[index] === true ? 'bg-[#e0eaff] hover:bg-[#e0eaff]' : 'hover:bg-[#f9fafb]'} !h-[60px] cursor-pointer`}>
            <TableCell className='base:w-[30px] tv:w-[40px]'>
                <div onClick={(e) => {
                    e.stopPropagation()
                    let arr = [...checkList]
                    if (checkList[index] === false) {
                        arr[index] = true
                    } else {
                        arr[index] = false
                    }
                    setCheckList(arr)
                }} className='base:w-[30px] tv:w-[40px] flex justify-center items-center base:h-[30px] tv:h-[40px] rounded-full hover:bg-[#eef4ff]'>
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
            <TableCell className="font-medium">{audio.Name}</TableCell>
            <TableCell>{formatSeconds(audio.Length)}</TableCell>
            <TableCell>{audio.Language}</TableCell>
            <TableCell colSpan={activeTag === true ? 2 : 1}>
                {activeTag === false && audio.tags.length !== 0 ? (
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className={` !flex !items-center  !justify-start ${isHovered === true ? 'bg-[#f9fafb] !z-[1000]' : 'bg-white !z-[-20]'} !hover:bg-[#f9fafb]`}>
                                    <div className='border-[1.5px] rounded-[20px] flex justify-center gap-3 px-[4px] items-center max-w-[70px] z-[0] h-[25px] bg-[#fefefe] ' onClick={(e) => {
                                        e.stopPropagation()
                                    }}>
                                        <div className='flex'>
                                            <div className='w-[5px] z-[10]'>
                                                <div className='h-3 w-3 border-white border-[1.4px] rounded-full bg-[#D5EDFB]'>
                                                </div>
                                            </div>
                                            <div className='w-[5px] z-[10]'>
                                                <div className='h-3 w-3 border-white border-[1.4px] rounded-full bg-[#FAEDD6]'>
                                                </div>
                                            </div>
                                            <div className='w-[5px] z-[10]'>
                                                <div className='h-3 w-3 border-white border-[1.4px] rounded-full bg-[#FAD6F6]'>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className='text-[0.67rem] font-[550]'>{audio.tags.length} tags</h2>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className={`min-w-[200px] ${isHovered === true ? '!z-[1000]' : '!z-[0]'} !bg-white min-h-[100px]`}>
                                    <div className='!z-[1000000] h-full w-full'>
                                        meow
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                ) : activeTag === false && isHovered === true ? (
                    <div onClick={(e) => {
                        e.stopPropagation()
                        setActiveTag(true)
                    }} className='flex  hover:text-[#657FFE] text-[#98a2b3] items-center ml-[-5px] gap-1 text-[0.76rem] font-[500]'>
                        <Plus size={15} />
                        Add tags
                    </div>
                ) : activeTag === false && (
                    '-'
                )}
                {activeTag === true && (
                    <Popover open={activeTag} onOpenChange={setActiveTag}>
                        <PopoverTrigger>
                            <div onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                            }} className='flex text-[#657FFE]  items-center ml-[-5px] gap-1 text-[0.76rem] font-[500]'>
                                <Plus size={15} />
                                Add tags
                            </div>
                        </PopoverTrigger>
                        <PopoverContent onClick={(e)=>{
                            e.stopPropagation()
                        }} className='w-full flex relative left-[100px]'>
                            <div className="base:w-[260px] tv:w-[300px] gap-[18px] flex flex-col pb-[10px] tv:px-[15px] rounded-[10px]">
                                <Input onKeyPress={handleKeyPress} value={customTagInput} onChange={(e) => {
                                    setCustomTagInput(e.target.value)
                                }} placeholder='Type to create a new tag here' className='px-[15px] bg-[#f7f7f7] placeholder:select-none rounded-[6px] py-[13px] border text-[0.9rem] w-full' />
                                <div className='w-full flex flex-col gap-[8px]'>
                                    <Label htmlFor="name" className='text-[0.77rem] opacity-[0.7] font-[470]'>Select tags from below list</Label>
                                    <div className='w-full select-none cursor-pointer rounded-[6px] flex flex-wrap gap-[10px]'>
                                        {
                                            customTag.map((tag: any, index: number) => (
                                                <div key={index} onClick={(e) => {
                                                    let arr = [...customTag]
                                                    if (arr[index].selected === true) {
                                                        arr[index].selected = false
                                                    } else {
                                                        arr[index].selected = true
                                                    }
                                                    setCustomTag(arr)
                                                }} className={`px-[8px] py-[3px] rounded-[6px] flex justify-center text-[0.77rem] border-[1.8px] items-center  gap-[6px]  ${tag.selected === false ? 'bg-[#f7f7f7] text-black hover:bg-[#f5f5f5]' : 'bg-[#657FFE] hover:bg-[#0064FF] text-white'} `}>{tag.name}
                                                    {
                                                        tag.selected === true && (
                                                            <CheckCircle2 size={14} color='white' />
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </TableCell>
            <TableCell hidden={activeTag}>{convertISOToCustomFormat(audio.created_at)}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <MoreHorizontal size={20} className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] px-[10px] py-[10px] relative !right-[30px]">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={(e:any) => router.push(`/home/audiotranscribe/${audio.id}`)} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <ExternalLink size={20} color='#344054' />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Copy size={20} color='#344054' />
                                Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                setRenameAlert(true)
                                const obj = {
                                    id: audio.id,
                                    Name: audio.Name
                                }
                                setRenameData(obj)
                            }} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Pencil size={20} color='#344054' />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                setDeleteData(index)
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

export default AudioTable


const NavigationMenuTrigger = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), "group", className)}
        {...props}
    >
        {children}{" "}
    </NavigationMenuPrimitive.Trigger>
))