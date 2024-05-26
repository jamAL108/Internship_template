'use client';
import React, { useState, useRef } from 'react'
import { Search, Filter, ArrowUpDown, ChevronsUpDown } from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
const PrecedentData: React.FC<any> = (props) => {
    const { precedents } = props
    const router = useRouter();
    const refffu = useRef<any>(null)
    const [search, setSearch] = useState<string>('')
    const [sortBY, setSortBy] = useState<string>('')
    const obj = {
        popular: ['Supreme Court of India', 'Armed Forces Tribunal', 'Constitutional Courts', 'Indian Penal Code(IPC)', 'Income Tax Act'],
        Jurisdiction: ['Supreme Court of India', 'High Courts', 'District Courts', 'Subordinate Courts', 'Constitutional Courts', 'Armed Forces Tribunal', 'Specialised Tribunal', 'Consumer Forums']
    }

    function splitAndShrink(str: string): string[] {
        const splitArray = str.split(' Vs ')

        if (splitArray.length !== 0) {
            let firstElement = splitArray[0].substring(0, 28)
            let lastElement = splitArray[1].substring(0, 28)

            if (splitArray[0].length > 28) {
                firstElement += '...'
            }
            if (splitArray[1].length > 28) {
                lastElement += '...'
            }
            return [firstElement, ' Vs ', lastElement]
        }
        return splitArray
    }

    function shortenText(text: string) {
        return text.substring(360, 560) + '...';
    }



    return (
        <div className='w-full overflow-y-auto  overflow-x-hidden min-h-[400px]'>
            <div className='w-full flex justify-between items-center  py-[10px] px-[10px]'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex cursor-pointer border-[2px] px-[10px] py-[7px] rounded-[12px] justify-center items-center gap-2 text-[0.9rem] text-black'>
                            <ArrowUpDown size={15} color='#667085' />
                            sort by:  Relevance
                            <ChevronsUpDown size={11} color='#667085' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Alphabetic</DropdownMenuItem>
                        <DropdownMenuItem>Relevance</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className='flex items-center gap-4'>
                    <div className='bg-[rgba(239,239,239,0.5)] border-[1px] base:px-[10px] tv:px-[14px] base:py-[4px] tv:py-[0px] tv:h-full flex justify-center items-center  rounded-[7px]'>
                        <input ref={refffu} value={search} onChange={(e) => {
                            setSearch(e.target.value)
                            // timery()
                        }} type="text" className='bg-transparent base:py-[4px] tv:py-[8px] base:min-w-[50px] mymobile:min-w-[80px] tv:min-w-[210px] base:text-[0.85rem] tv:text-[0.92rem] outline-none  placeholder:text-[0.83rem] ClientDataInputField placeholder:select-none' placeholder='Search by case name ....' />
                        <Search color='#888888' className='cursor-pointer w-4 h-4' />
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className='flex MonoSans text-[#667085] hover:text-[#667085] justify-center items-center gap-1 py-[6px] border-[1.7px]'>
                                <Filter size={15} color='#667085' />
                                Filter</Button>
                        </SheetTrigger>
                        <SheetContent className='!pr-[0px]'>
                            <SheetHeader>
                                <SheetTitle>Apply Filters</SheetTitle>
                                <SheetDescription>
                                    Accelerate data retrieval with filter functionality.
                                </SheetDescription>
                            </SheetHeader>
                            <ScrollArea className="h-[85vh] mr-[10px]">
                                <div className='flex flex-col gap-4 py-4 mt-[10px]'>
                                    <div className='w-full flex flex-col gap-3'>
                                        <h1 className='text-[1rem] font-[550]'>Popular filters :</h1>
                                        <div className='flex pl-[10px] flex-col w-full gap-[5px]'>
                                            {
                                                obj.popular.map((item, index) => (
                                                    <div key={index} className='flex gap-[13px] items-center'>
                                                        <Checkbox className='border-[#657FFE] data-[state=checked]:bg-[#657FFE]' />
                                                        <h2 className='text-[0.9rem] font-[450]'>{item}</h2>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-col gap-3'>
                                        <h1 className='text-[1rem] font-[550]'>Jurisdiction :</h1>
                                        <div className='flex pl-[10px] flex-col w-full gap-[5px]'>
                                            {
                                                obj.Jurisdiction.map((item, index) => (
                                                    <div key={index} className='flex gap-[13px] items-center'>
                                                        <Checkbox className='border-[#657FFE] data-[state=checked]:bg-[#657FFE]' />
                                                        <h2 className='text-[0.9rem] font-[450]'>{item}</h2>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div>more to come</div>
                                    <div>more to come</div>
                                    <div>more to come</div>
                                    <div>more to come</div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className='flex mt-[20px] flex-wrap w-full justify-between items-start'>
                {precedents.map((item: any, index: number) => (
                <div onClick={(e)=>{
                    sessionStorage.setItem('RetrievalData',JSON.stringify(item))
                    router.push('/retrieval/viewcase')
                }} style={{ width: 'calc(33.33% - 30px)' }} key={index} className={`relative  bg-[#f8f9fb] hover:bg-[#e8effe] cursor-pointer mb-[30px] !min-h-[180px] border-[1px] rounded-[12px] shadow-sm flex flex-col  overflow-hidden py-[10px] transition duration-300 ease  `}>
                    <h1 className='px-[10px] text-[0.85rem] font-[500]'>
                        {splitAndShrink(item.case_name).map((val: string, idx: number) => (
                            <span key={idx}>{val}</span>
                        ))}</h1>
                    <h2 className="px-[10px] text-[0.7rem] font-[490] absolute bottom-[40px]">
                        {shortenText(item.pdf_text)}
                    </h2>
                    <div className="w-full  px-[10px] flex justify-between items-center absolute bottom-[8px]">
                        <div className="flex justify-center items-center gap-[0.4rem]">
                            {/* <Scale size={14} color='#6680ff' /> */}
                            <h2 className={`text-[0.8rem] font-[400] text-[#6680ff]`}>{item.citation_value}</h2>
                        </div>
                        <p className="text-[0.75rem] font-[400] text-muted-foregorund">{item.date_of_decision}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default PrecedentData