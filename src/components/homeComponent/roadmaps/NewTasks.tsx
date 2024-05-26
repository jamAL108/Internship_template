'use client';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { addEvent } from '@/apiReq/dashboardAPIs/roadmaps';

import { HiQuestionMarkCircle } from "react-icons/hi";

import { Timer } from 'lucide-react';
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
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify';


import Time from './time'

import { addTimeToDate } from '@/utils/dateRelated'

import Link from 'next/link'

import { googleAuth } from '@/auth/googleAuth'



const newTask: React.FC<any> = (props) => {
    const { setEventList, eventList, startDate, googleAuthentication, eventAddOpen, setStartDate, endDate, setEndDate } = props

    // const [startDate, setStartDate] = useState<Date>()
    // const [endDate, setEndDate] = useState<Date>()

    const [eventName, setEventName] = useState<string>("")
    const [taskPriorty, setTaskPriority] = useState<string>("")
    const [error, seterror] = useState<string>("")
    const [newTaskCreateBox, setNewTaskCreateBox] = useState<boolean>(false)
    const [newTaskCreateLoader, setNewTaskCreateLoader] = useState<boolean>(false)
    const [open, setopen] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<string>("")
    const [endTime, setEndTime] = useState<string>("")

    const [googleIntegratePopUp, setGoogleintegratePopUp] = useState<boolean>(false)


    useEffect(() => {
        if (eventAddOpen === true) {
            setNewTaskCreateBox(true)
        }
    }, [eventAddOpen])

    useEffect(() => {
        getNextHour()
    }, [])

    function getNextHour() {
        const currentTime = new Date()
        let hours = currentTime.getHours()
        let nextHour = (hours + 1) % 24

        if (nextHour === 0) {
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate() + 1)
            setStartDate(currentDate)
            setEndDate(currentDate)
        } else {
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate())
            setStartDate(currentDate)
            setEndDate(currentDate)
        }
        setStartTime(`${nextHour < 10 ? "0" : ""}${nextHour}:00`)
        setEndTime(`${nextHour < 10 ? "0" : ""}${nextHour}:30`)
    }


    const checkAndProceed = async () => {
        setNewTaskCreateLoader(true)
        if (startDate === null || eventName.length === 0 || endDate === null) {
            seterror("Enter All fields properly")
            setNewTaskCreateLoader(false)
            toast.error('Please Enter All Details properly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            if (startDate !== undefined && endDate !== undefined) {

                let startD = addTimeToDate(startDate, startTime)

                let endD = addTimeToDate(endDate, endTime)

                const formdata = {
                    title: eventName,
                    startDate: startD,
                    endDate: endD
                }
                const result: any = await addEvent(formdata)
                if (result.error !== null) {
                    setNewTaskCreateLoader(false)
                    seterror(result.error.message)
                    toast.error(result.error.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else if (result.data !== null) {
                    toast.success("Event Created !", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log(result.data[0])
                    AddNewlyCreatedTaskToNormal(result.data[0])
                    setEventName('')
                    setTaskPriority('')
                    setNewTaskCreateBox(false)
                    setNewTaskCreateLoader(false)
                }
            }
        }
    }

    const AddNewlyCreatedTaskToNormal = (Task: any) => {
        let obj: any = { ...Task }

        obj.start = new Date(obj.startDate)
        obj.end = new Date(obj.endDate)
        obj.className = "bg-[#029BE6]  min-h-[30px] text-white hover:bg-[#029BE6] text-[0.8rem] text-[450] "
        obj.allDay = false
        obj.type = "events"
        let arr = [...eventList]
        arr.push(obj)
        setEventList(arr)
        console.log(arr)
    }


    return (
        <div className='px-[25px] border-b-[2px] border-b-[#F5F5F5] w-full h-[3rem] flex justify-end items-center gap-4'>

            <AlertDialog open={googleIntegratePopUp} onOpenChange={setGoogleintegratePopUp}>
                <AlertDialogTrigger onClick={(e) => setGoogleintegratePopUp(true)}>
                    {googleAuthentication === false ? (
                        <div className='px-[10px] py-[6px] h-[70%] rounded-md border-[2px] flex gap-[0.6rem] justify-center items-center hover:bg-[#e5e5e5] transition ease-in-out duration-500'>
                            <img src="/images/googleCalender.png" alt="dsfvbgr" className='w-[18px] h-[18px]' />
                            <div className='flex justify-center items-center gap-1'>
                                <h2 className='text-[0.85rem] font-[500]'>Integrate With Google </h2>
                                <div className='flex justify-center w-[16px] h-[16px] items-center'>
                                    <HiQuestionMarkCircle size={19} color='#ff3333' />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='px-[10px] py-[6px] hover:bg-[#e5e5e5] transition ease-in-out duration-500 h-[70%] rounded-md border-[1.6px] flex gap-[0.65rem] justify-center items-center'>
                            <img src="/images/googleCalender.png" alt="dsfvbgr" className='w-[18px] h-[18px]' />
                            <div className='flex justify-center items-center gap-1'>
                                <h2 className='text-[0.85rem] font-[500]'>Integrated With Google !</h2>
                                <div className='flex justify-center w-[16px] h-[16px] items-center rounded-full bg-[#83d17f]'>
                                    <Check size={11} color='white' />
                                </div>
                            </div>
                        </div>
                    )}
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white w-[500px] h-[400px] flex flex-col gap-[30px] rounded-[20px] py-[30px]'>
                    {googleAuthentication === false ? (
                        <>
                            <h1 className='px-[30px] text-lg text-center mt-[20px] font-[500]'>Integrate Votum App with your Google Calender , to get all Event Notification thorugh google and you can manage all your work here itself</h1>
                            <div className='px-[30px] flex flex-col gap-[15px] w-full justify-center items-center'>
                                <Button onClick={async(e)=>{
                                    localStorage.setItem('VotumRedirectToCalender',JSON.stringify({code:"QWERTY&*^(%RFV"}))
                                   await googleAuth()
                                }} className='bg-white py-[25px] hover:bg-[#e5e5e5] flex justify-center items-center gap-4 text-black border-[1.7px] rounded-[30px] w-[85%]'>
                                    <img src="/images/googleCalender.png" alt="dcvfrbt" className='w-[30px] h-[30px]' />
                                    <h2 className='text-[1rem] font-[500]'>Integrate Google Calender</h2>
                                </Button>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    setGoogleintegratePopUp(false)
                                }} className='bg-white py-[25px] hover:bg-[#e5e5e5] flex justify-center items-center gap-4 text-black border-[1.7px] rounded-[30px] w-[85%]'>
                                    <h2 className='text-[1rem] font-[500]'>Not Interested !</h2>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className='px-[30px] text-lg text-center mt-[10px] font-[500]'>Your Votum Account has been integrated with your google calender , you can get timely Event notification through your google and you can remove this feature any time you want.</h1>
                            <div className='px-[30px] flex flex-col gap-[15px] w-full justify-center items-center'>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    setGoogleintegratePopUp(false)
                                }} className='bg-white py-[25px] hover:bg-[#e5e5e5] flex justify-center items-center gap-4 text-black border-[1.7px] rounded-[30px] w-[90%]'>
                                    <img src="/images/googleCalender.png" alt="dcvfrbt" className='w-[20px] h-[20px]' />
                                    <h2 className='text-[1rem] font-[500]'>Remove Google Calender Integration</h2>
                                </Button>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    setGoogleintegratePopUp(false)
                                }} className='bg-white py-[25px] hover:bg-[#e5e5e5] flex justify-center items-center gap-4 text-black border-[1.7px] rounded-[30px] w-[90%]'>
                                    <h2 className='text-[1rem] font-[500]'>Close this tab</h2>
                                </Button>
                            </div>
                        </>
                    )}

                    <div className='w-[100%] ml-[-15px] absolute bottom-[20px] flex justify-center items-center gap-[15px]'>
                        <Link className='underline text-[0.8rem]' href={'/privacy'}>Privacy policy</Link>
                        |
                        <Link className='underline text-[0.8rem]' href={'/terms&condition'}>Terms & condition</Link>
                    </div>
                </AlertDialogContent>
            </AlertDialog>


            <AlertDialog open={newTaskCreateBox} onOpenChange={setNewTaskCreateBox}>
                <AlertDialogTrigger asChild onClick={(e) => setNewTaskCreateBox(true)}>
                    <Button className='flex bg-[#0064FF] text-[0.8rem] font-[600] tracking-wider hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%] createNewTaskButtonTaskSection'><Plus size={20} />New Event</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add New Event</AlertDialogTitle>
                        <AlertDialogDescription className='text-black flex flex-col min-h-[400px] py-[15px] gap-5'>
                            <div className='w-full'>
                                <h2 className='text-[1rem] font-[580]'>Event Details</h2>
                            </div>
                            <form className='pt-[0px]'>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Title</Label>
                                        <Input value={eventName} id="name" placeholder="Title" onChange={(e) => {
                                            setEventName(e.target.value)
                                        }} />
                                    </div>

                                    <div className="flex space-y-1.5 items-center gap-4">
                                        <div className='flex space-y-1.5 flex-col'>
                                            <Label htmlFor="name">Start Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !startDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={startDate}
                                                        onSelect={setStartDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className='flex flex-col space-y-1.5'>
                                            <Label htmlFor="name">Time</Label>
                                            <Select value={startTime} onValueChange={(change) => {
                                                setStartTime(change)
                                            }}>
                                                <SelectTrigger className="w-[180px] flex items-center gap-1">
                                                    <Timer className='opacity-[0.4]' size={20} />
                                                    <SelectValue placeholder="Select a fruit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className='max-h-[280px]' >
                                                        {Time.map((item, idx) => (
                                                            <SelectItem key={idx} value={item.value}>{item.title}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="flex space-y-1.5 items-center gap-4">
                                        <div className='flex space-y-1.5 flex-col'>
                                            <Label htmlFor="name">End Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !endDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={endDate}
                                                        onSelect={setEndDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className='flex flex-col space-y-1.5'>
                                            <Label htmlFor="name">Time</Label>
                                            <Select value={endTime} onValueChange={(change) => {
                                                setEndTime(change)
                                            }}>
                                                <SelectTrigger className="w-[180px] flex items-center gap-1">
                                                    <Timer className='opacity-[0.4]' size={20} />
                                                    <SelectValue placeholder="Select a fruit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className='max-h-[280px]'>
                                                        {Time.map((item, idx) => (
                                                            <SelectItem key={idx} value={item.value}>{item.title}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>


                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => {
                            setEventName('')
                            setNewTaskCreateBox(false)
                            setNewTaskCreateLoader(false)
                        }}>Cancel</AlertDialogCancel>
                        <Button className="gap-1" disabled={newTaskCreateLoader} style={newTaskCreateLoader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => {
                            checkAndProceed();
                        }}> <ColorRing
                                visible={newTaskCreateLoader}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />
                            Create Event</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default newTask