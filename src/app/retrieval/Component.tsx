'use client';
import React, { useState } from 'react'
import Nav from '@/components/commonComponent/nav'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getPrecedentContent } from '@/apiReq/retrieval'
import PrecedentData from './precedentData'
import { useToast } from "@/components/ui/use-toast";
import { ColorRing } from 'react-loader-spinner'
import Scroll from '@/utils/scroll'

const Component = () => {
    const { toast } = useToast()
    const currentYear = new Date().getFullYear();
    const [precedentDataArray, setPrecendentData] = useState<any>([])
    const years = Array.from({ length: currentYear - 1950 + 1 }, (v, k) => currentYear - k);
    const [bool, setbool] = useState<boolean>(false)
    const [caseYear, setCaseYear] = useState<any>('')
    const [partyName, setPartyName] = useState<string>('')
    const [caseDescription, setCaseDescription] = useState<string>('')
    const [caseName, setCaseName] = useState<string>('')
    const [searchLoader, setSearchLoader] = useState<boolean>(false)
    const [searchQueryDone , setSearchQueryDone] = useState<boolean>(false)

    const getPrecedentfunction = async () => {
        setSearchLoader(true)
        setSearchQueryDone(true)
        const objectForAPI = {
            caseName,
            caseDescription,
            partyName,
            caseYear
        }
        const result: any = await getPrecedentContent(objectForAPI)
        if (result.success === true) {
            setSearchLoader(false)
            setPrecendentData(result.data)
            Scroll('precedentdatas')
        } else {
            setSearchLoader(false)
            toast({
                variant: "destructive",
                title: "SERVER ERROR",
                description: result.error,
            });
        }
    }

    return (
        <div className='w-[100%] h-[100%] flex flex-col items-center overflow-x-hidden'>
            <Nav />
            <div className='md:w-[min(100%,1700px)] bg-white base:w-[90vw]  overflow-x-hidden retrieval  flex flex-col items-center justify-start mb-[40px] relative'>
                <div className='w-[100%] h-[220px] retrievalBook text-white'>
                    <div className='flex h-full flex-col px-[50px] gap-[0.41rem] justify-center py-[30px]'>
                        <h1 className='text-[2rem] font-[599]'>Find your research right here</h1>
                        <h2 className='text-[1.4rem] !font-[200]'>Search using act-name, party and much <br /> more</h2>
                    </div>
                </div>

                <div className='w-[min(83%,1400px)] h-[80px] gap-7 px-[20px] py-[16px] mt-[-28px] flex justify-center items-center rounded-[10px] shadow-lg bg-white select-none'>

                    <Popover>
                        <PopoverTrigger asChild>
                            <div className='flex flex-col gap-[3px] cursor-pointer'>
                                <h2 className='font-[600] text-[0.91rem]'>Mention case name/title</h2>
                                <h2 className='font-[400] text-[0.86rem] text-muted-foreground'>Which case do you want to research</h2>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Case Name</Label>
                                    <Input
                                        id="width"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Separator orientation="vertical" className='w-[2px] h-full' />

                    <Popover>
                        <PopoverTrigger asChild>
                            <div className='flex flex-col gap-[3px] cursor-pointer'>
                                <h2 className='font-[600] text-[0.91rem]'>Write party name</h2>
                                <h2 className='font-[400] text-[0.86rem] text-muted-foreground'>Who is involved?</h2>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Party Name</Label>
                                    <Input
                                        id="width"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Separator orientation="vertical" className='w-[2px] h-full' />

                    <Popover>
                        <PopoverTrigger asChild>
                            <div className='flex flex-col gap-[3px] cursor-pointer'>
                                <h2 className='font-[600] text-[0.91rem]'>Choose year</h2>
                                <h2 className='font-[400] text-[0.86rem] text-muted-foreground'>When did it happen?</h2>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="height" className={`${bool === true ? 'text-[#ff3333]' : 'text-black'}`}>Year</Label>
                                <Select onValueChange={(e) => setCaseYear(parseInt(e, 10))} value={String(caseYear)}>
                                    <SelectTrigger className={`w-[190px] ${bool === true ? 'border-[#ff3333]' : 'border-[#e5e7eb]'}`}>
                                        <SelectValue placeholder="Select a year" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[270px] overflow-y-auto">
                                        <SelectGroup>
                                            <SelectLabel>Year</SelectLabel>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Separator orientation="vertical" className='w-[2px]' />

                    <Popover>
                        <PopoverTrigger asChild>
                            <div className='flex flex-col gap-[3px] cursor-pointer'>
                                <h2 className='font-[600] text-[0.91rem]'>Describe your case</h2>
                                <h2 className='font-[400] text-[0.86rem] text-muted-foreground'>Brief Description of case (Optional)</h2>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">About your case</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Mention something about your case.
                                    </p>
                                </div>
                                <div className="flex">
                                    <Textarea rows={5} className='min-h-[60px]' placeholder="Type your content here." />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Separator orientation="vertical" className='w-[2px]' />

                    <Button disabled={searchLoader} style={searchLoader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={getPrecedentfunction} className='text-[0.93rem] px-[20px] font-[550] bg-[#657FFE] hover:bg-[#004fc5]'>
                        <ColorRing
                            visible={searchLoader}
                            height="20"
                            width="20"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        />
                        Search</Button>
                </div>

                <div className='w-[min(83vw,1400px)] overflow-x-hidden MonaSans mt-[30px] flex h-auto gap-3 precedentdatas'>
                    {
                        precedentDataArray.length !== 0 && searchQueryDone===true ? (
                            <PrecedentData precedents={precedentDataArray} />
                        ) : searchQueryDone===true &&  (
                            <div className='w-full flex justify-center items-center py-[30px] max-h-[500px] flex-col gap-3 '>
                                <img src="/images/noSearchFound.png" alt="sv" className='base:w-[200px] tv:w-[220px] base:h-[150px] tv:h-[185px]' />
                                <h2 className='w-[330px] text-center text-[0.87rem]'>No Result Found , Try again with some more detailing or we dont have the Data for what you're searching.</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Component