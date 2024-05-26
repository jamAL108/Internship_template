'use client';
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/homeComponent/navbar';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewTask from '@/components/homeComponent/roadmaps/NewTasks';
import { GanttChart, List } from 'lucide-react';
import './calenderStyling.scss';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Pencil, CalendarPlus, CheckCheck, KanbanSquare } from 'lucide-react';
import { getAlltasks, getAllEvents, changeEvent } from '@/apiReq/newAPIs/roadmaps';
import checkUserAuthClient from '@/auth/getUserSession'
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import { getUserDetail } from '@/apiReq/newAPIs/roadmaps'

const Component = () => {

  const [googleAlert, setGoogleAlert] = useState<boolean>(false)

  const [dropdownPosition, setDropdownPosition] = useState<any>({ x: -100, y: -38 });
  const [open, setopen] = useState<boolean>(false)
  const [calenderCurrentView, setCalenderCurrentView] = useState<string>('')
  const [listCurrentView, setListCurrentView] = useState<string>('')
  const [currentTab, setCurrentTab] = useState<string>('timeline')

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [taskList, setTaskList] = useState<any>([])
  const [eventList, setEventList] = useState<any>([])


  const [tempDateForStart, setTempDateForStart] = useState<Date>(new Date())
  const [tempDateForEnd, setTempDateForEnd] = useState<Date>(new Date())




  const [eventAddOpen, setEventOpen] = useState<boolean>(false)

  const [googleAuthentication , setGoogleAuthenticated] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    getUserSession()
    getAllWorks()
  }, [])

  const getUserSession = async () => {
    const googleLoginAlert = localStorage.getItem('googleLoginAlert')
    const userSession: any = await checkUserAuthClient()
    const userData:any = await getUserDetail(userSession.data.session.user.email)
    if (userSession.data !== null && userSession.data.session.provider_token !== undefined && userData.google_calender_integrated===true) {
      setGoogleAuthenticated(true)
    } else {
      if (googleLoginAlert === null) {
        setGoogleAlert(true)
      }
    }
  }

  const getAllWorks = async () => {
    const tasks = await getAlltasks()
    const events = await getAllEvents()
    setTaskList(tasks)
    setEventList(events)
  }

  const handleDateClick = (arg: any) => {
    // console.log(arg)
  }

  const drapCatchFunction = (selectionInfo: any) => {
    const timestamp1: any = new Date(selectionInfo.start)
    const timestamp2: any = new Date(selectionInfo.end)
    timestamp2.setDate(timestamp2.getDate() - 1);
    setTempDateForStart(timestamp1)
    setTempDateForEnd(timestamp2)
    const jsEventContainer = selectionInfo.jsEvent
    const posX = jsEventContainer.clientX + 40;
    const posY = jsEventContainer.clientY - 10;
    setDropdownPosition({ x: posX, y: posY });
    setopen(true);
  }

  const eventClickFunction = (info: any) => {
    console.log(info.event.extendedProps)
    info.jsEvent.preventDefault(); // don't let the browser navigate

    if (info.event.url) {
      router.push(info.event.url)
    }
  }

  const eventResizeFunction = (eventResizeInfo: any) => {
    console.log(eventResizeInfo.event)
    if (eventResizeInfo.event.extendedProps.type === "tasks") {
      eventResizeInfo.revert()
    }
    console.log(eventResizeInfo.event.startStr, eventResizeInfo.event.endStr)
  }

  const datesSetFunctionForTimeline = (datesSet: any) => {
    setCalenderCurrentView(datesSet.view.type)
    console.log(datesSet.view.type)
  }

  useEffect(() => {
    let arr = ['resourceTimelineWeek', 'dayGridMonth', 'timeGridWeek']
    if (calenderCurrentView.length !== 0 && currentTab === 'timeline') {
      for (var i = 0; i < 3; i++) {
        const fetchClass: any = document.querySelector(`.fc-${arr[i]}-button`);
        // console.log(fetchClass)
        if (arr[i] === calenderCurrentView && fetchClass !== null) {
          fetchClass.style.backgroundColor = "#0064FF";
          fetchClass.style.color = 'white';
        } else if (fetchClass !== null) {
          fetchClass.style.backgroundColor = '#F6F8FA';
          fetchClass.style.color = 'black';
        }
      }
    }
  }, [calenderCurrentView, currentTab])


  const datesSetFunctionForList = (datesSet: any) => {
    setListCurrentView(datesSet.view.type)
    console.log(datesSet.view.type)
  }

  const eventChangeFunction = async (changeInfo: any) => {
    const obj = {
      id: changeInfo.event.id,
      start: changeInfo.event.startStr,
      end: changeInfo.event.endStr
    }
    const result: any = await changeEvent(obj)
    console.log(result)
    if (result.success === false) {
      changeInfo.revert()
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
    } else {
      let arr = [...eventList]
      arr.push(result.obj)
      setEventList(arr)
    }
  }

  useEffect(() => {
    let arr = ['listDay', 'listWeek', 'listYear']
    if (listCurrentView.length !== 0 && currentTab === 'lists') {
      for (var i = 0; i < 3; i++) {
        const fetchClass: any = document.querySelector(`.fc-${arr[i]}-button`);
        console.log(fetchClass)
        if (arr[i] === listCurrentView && fetchClass !== null) {
          fetchClass.style.backgroundColor = "#0064FF";
          fetchClass.style.color = 'white';
        } else if (fetchClass !== null) {
          fetchClass.style.backgroundColor = '#F6F8FA';
          fetchClass.style.color = 'black';
        }
      }
    }
  }, [listCurrentView, currentTab])


  const eventMouseover = ({ event, jsEvent }: any) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltipevent py-[5px] px-[15px] rounded-[4px] h-auto text-white !text-[0.77rem]';
    tooltipElement.style.background = 'rgb(36,33,34)';
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.zIndex = '10001';
    tooltipElement.textContent = event.title;
    document.body.appendChild(tooltipElement);

    const moveTooltip = (e: any) => {
      tooltipElement.style.zIndex = '100001';
      tooltipElement.style.top = e.pageY + 10 + 'px';
      tooltipElement.style.left = e.pageX + 20 + 'px';
    };

    const removeTooltip = () => {
      document.removeEventListener('mousemove', moveTooltip);
      tooltipElement.remove();
    };

    document.addEventListener('mousemove', moveTooltip);
    document.addEventListener('mouseout', removeTooltip);
  };


  useEffect(() => {
    if (open === false) {
      setEventOpen(false)
    }
  }, [open])

  return (
    <>
      <div className='w-full pt-[15px] flex flex-col gap-1 h-full'>

        {googleAlert === true && (
          <div className='z-[1000000] absolute w-[100vw] h-[100vh] flex justify-center items-center top-0 left-0 bg-[rgba(0,0,0,0.5)]'>
            <div className='bg-white relative w-[500px] h-[400px] flex flex-col gap-[30px] rounded-[20px] py-[30px]'>
              <h1 className='px-[30px] text-lg text-center mt-[20px] font-[500]'>Integrate Votum App with your Google Calender , to get all Event Notification thorugh google and you can manage all your work here itself</h1>
              <div className='px-[30px] flex flex-col gap-[15px] w-full justify-center items-center'>
                <Button className='bg-white py-[25px] hover:bg-[#e5e5e5] flex justify-center items-center gap-4 text-black border-[1.7px] rounded-[30px] w-[85%]'>
                  <img src="/images/googleCalender.png" alt="dcvfrbt" className='w-[30px] h-[30px]' />
                  <h2 className='text-[1rem] font-[500]'>Integrate Google Calender</h2>
                </Button>
                <Button className='bg-white py-[25px] hover:bg-[#e5e5e5] flex justify-center items-center gap-4 text-black border-[1.7px] rounded-[30px] w-[85%]'>
                  <h2 className='text-[1rem] font-[500]' onClick={(e)=>{
                    e.preventDefault()
                    setGoogleAlert(false)
                    localStorage.setItem('googleLoginAlert',JSON.stringify({status:false}))
                  }}>Not Interested !</h2>
                </Button>
              </div>

              <div className='w-[100%] absolute bottom-[20px] flex justify-center items-center gap-[15px]'>
                 <Link className='underline text-[0.8rem]' href={'/privacy'}>Privacy policy</Link>
                  |
                 <Link className='underline text-[0.8rem]' href={'/terms&condition'}>Terms & condition</Link>
              </div>
            </div>
          </div>
        )}


        <div className='px-[25px] flex py-[4px] gap-2 items-center'>
          <h1 className='text-[1.5rem] font-[600] tracking-[0.6px]'>Calender</h1>
          <MoreHorizontal size={20} className='cursor-pointer' />
        </div>

        <div className='w-full mt-[-10px]'>
          <NewTask googleAuthentication={googleAuthentication} setEventList={setEventList} eventList={eventList} endDate={endDate} setEndDate={setEndDate} startDate={startDate} setStartDate={setStartDate} eventAddOpen={eventAddOpen} />


          <div className=' w-full overflow-hidden pt-[8px]'>
            <DropdownMenu open={open} onOpenChange={setopen} >
              <DropdownMenuContent style={{ position: 'absolute', left: dropdownPosition.x, top: dropdownPosition.y }}
                className="rounded-[10px] w-56 shadow-[0px_1px_10px_-3px_rgba(0,0,0,0.18)]">
                <DropdownMenuGroup>

                  <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => {
                    setEventOpen(true)
                    setStartDate(tempDateForStart)
                    setEndDate(tempDateForEnd)
                  }}>
                    <CalendarPlus size={16} className='opacity-[0.6]' />
                    <h2>Add a Event</h2>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='h-[2px]' />

                  <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                    <Pencil size={16} className='opacity-[0.6]' />
                    <h2>Add a Tasks</h2>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>

                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

              <FullCalendar
              plugins={[resourceTimelinePlugin,
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next title',
                center: '',
                right: 'dayGridMonth,timeGridWeek'
              }}
              select={drapCatchFunction}
              eventChange={eventChangeFunction}
              datesSet={datesSetFunctionForTimeline}
              eventMouseEnter={eventMouseover}
              initialView='dayGridMonth'
              nowIndicator={true}
              editable={true}
              selectable={true}
              selectMirror={true}
              // timeZone='Asia/Kolkata'
              buttonText={{
                today: 'today',
                month: 'Month wise',
                week: 'week wise',
                day: 'day wise',
                list: 'list'
              }}
              eventResize={eventResizeFunction}
              eventBorderColor="white"
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
              events={[...eventList , ...taskList]}
              resources={[
                { title: 'Resource A' },
                { title: 'Resource B' }
              ]}
              dateClick={handleDateClick}
              eventClick={eventClickFunction}
            /> 
          </div>
          {/* <Tabs defaultValue="Timeline" className="mt-[-2.37rem] w-full overflow-hidden">
              <TabsList className='pl-[20px] bg-transparent' >

                <TabsTrigger onClick={(e) => setCurrentTab('timeline')} className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#0064FF] data-[state=active]:border-b-[2px] flex justify-center items-center gap-[0.3rem] data-[state=active]:border-[#0064FF]  p-[6px] px-[13px] text-[0.9rem] font-[520]' value="Timeline">
                  <GanttChart style={currentTab==='timeline' ? {color:"0064FF"} : {color:'#636f7e'}} size={15}  />
                  Timeline
                </TabsTrigger>

                <TabsTrigger onClick={(e) => setCurrentTab('lists')} className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#0064FF] data-[state=active]:border-b-[2px] flex justify-center items-center gap-[0.3rem] data-[state=active]:border-[#0064FF] p-[6px] px-[15px] text-[0.9rem] font-[520]' value="Lists">
                  <KanbanSquare style={currentTab==='lists' ? {color:"0064FF"} : {color:'#636f7e'}} size={15}  />
                  Board
                </TabsTrigger>


              </TabsList>
              <TabsContent value="Timeline" className='pt-[7px] w-full'>


                <DropdownMenu open={open} onOpenChange={setopen} >
                  <DropdownMenuContent style={{ position: 'absolute', left: dropdownPosition.x, top: dropdownPosition.y }}
                    className="rounded-[10px] w-56 shadow-[0px_1px_10px_-3px_rgba(0,0,0,0.18)]">
                    <DropdownMenuGroup>

                      <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e)=>{
                        setEventOpen(true)
                        setStartDate(tempDateForStart)
                        setEndDate(tempDateForEnd)
                      }}>
                        <CalendarPlus size={16} className='opacity-[0.6]' />
                        <h2>Add a Event</h2>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className='h-[2px]' />

                      <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                        <Pencil size={16} className='opacity-[0.6]' />
                        <h2>Add a Tasks</h2>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>

                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>


                <FullCalendar
                  plugins={[resourceTimelinePlugin,
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin]}
                  headerToolbar={{
                    left: 'prev,next title',
                    center: '',
                    right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek'
                  }}
                  select={drapCatchFunction}
                  eventChange={eventChangeFunction}
                  datesSet={datesSetFunctionForTimeline}
                  eventMouseEnter={eventMouseover}
                  initialView='dayGridMonth'
                  nowIndicator={true}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  // timeZone='Asia/Kolkata'
                  buttonText={{
                    today: 'today',
                    month: 'Month wise',
                    week: 'week wise',
                    day: 'day wise',
                    list: 'list'
                  }}
                  eventResize={eventResizeFunction}
                  eventBorderColor="white"
                  eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                  }}
                  events={[...eventList, ...taskList]}
                  resources={[
                    { title: 'Resource A' },
                    { title: 'Resource B' }
                  ]}
                  dateClick={handleDateClick}
                  eventClick={eventClickFunction}
                // columnHeaderFormat = {
                //   month: 'ddd',
                //   week: 'ddd d/M',
                //   day: 'dddd d/M'
                // }
                />
              </TabsContent>
              <TabsContent value="Lists" className='pt-[7px] w-full'>
                <FullCalendar
                  plugins={[listPlugin]}
                  headerToolbar={{
                    left: 'prev,next title',
                    center: '',
                    right: 'listDay,listWeek,listYear'
                  }}
                  buttonText={{
                    listDay: 'Day wise',
                    listWeek: 'Week wise',
                    listYear: 'Year wise'
                  }}
                  select={drapCatchFunction}
                  initialView='listWeek'
                  nowIndicator={true}
                  editable={true}
                  datesSet={datesSetFunctionForList}
                  selectable={true}
                  selectMirror={true}
                  events={[
                    {
                      title: 'Morning Shift',
                      start: new Date('02/02/2024'),
                      end: new Date('02/03/2024'),
                      // className: 'bg-[#029BE6]'
                    },
                    {
                      title: 'Night Shift',
                      start: new Date('02/02/2024'),
                      end: new Date('02/05/2024'),
                      // className: 'bg-[#029BE6]'
                    },
                    {
                      title: 'Regular Shift',
                      start: new Date('02/02/2024'),
                      end: new Date('02/03/2024'),
                      // className: 'bg-[#029BE6]'
                    }
                  ]}
                  dateClick={handleDateClick}
                />
              </TabsContent>
            </Tabs> */}
        </div>
      </div>
    </>
  )
}

export default Component