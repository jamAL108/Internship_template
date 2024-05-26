"use client";
import React from 'react'
import { getTodaySession } from "@/apiReq/newAPIs/Dash";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "./skeleton";
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  CalendarClock,
  ClipboardList
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import checkUserAuthClient from '@/auth/getUserSession'
import SessionNotFoundComp from '@/components/sessionNotFound'

const Component = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [load, setload] = useState<boolean>(true);
  const [tasks, settask] = useState<any>([]);
  const [events, setevent] = useState<any>([])
  const [sessionNotFound, setSessionNotFound] = useState<boolean>(false)
  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const res: any = await checkUserAuthClient()
    if (res.error !== null) {
      router.push('/')
      return
    }
    if (res.data.session === null) {
      setload(false)
      setSessionNotFound(true)
      return
    }
    const metadata = res.data.session.user.user_metadata
    const result = await getTodaySession(res.data.session.user.id, metadata.workspace_id);
    if (result.success === true) {
      settask(result.tasks);
      setevent(result.events);
    }
    setUserData({ id: res.data.session.user.id, ...metadata })
    setload(false);
  };

  function shortenString(str: string, len: number): string {
    if (str.length > len) {
      return str.slice(0, len) + "...";
    } else {
      return str;
    }
  }

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Determine AM/PM
    const period = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  }

  const Dummytasks = [
    {
      taskNumber: 123,
      name: 'Complete React component',
      priority: 'High',
      dueDate: new Date('2024-04-05')
    },
    {
      taskNumber: 22,
      name: 'Fix bug in API integration',
      priority: 'Medium',
      dueDate: new Date('2024-04-08')
    },
    {
      taskNumber: 322,
      name: 'Refactor Redux store',
      priority: 'High',
      dueDate: new Date('2024-04-10')
    },
    {
      taskNumber: 434,
      name: 'Write unit tests for utility functions',
      priority: 'Low',
      dueDate: new Date('2024-04-15')
    },
    {
      taskNumber: 5,
      name: 'Design UI for dashboard',
      priority: 'Medium',
      dueDate: new Date('2024-04-20')
    }
  ];

  function getRemainingDays(dateString: any) {
    // Parse the given date string
    const targetDate: any = new Date(dateString);

    // Get the current date
    const currentDate: any = new Date();

    // Calculate the difference in milliseconds
    const differenceMs: any = targetDate - currentDate;

    // Convert milliseconds to days
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    // Determine the remaining days format
    let remainingDays = '';
    if (differenceDays > 7) {
      remainingDays = `in ${differenceDays} days`;
    } else if (differenceDays === 7) {
      remainingDays = 'in 7 days';
    } else if (differenceDays > 1) {
      remainingDays = `in ${differenceDays} days`;
    } else if (differenceDays === 1) {
      remainingDays = 'in 1 day';
    } else if (differenceDays === 0) {
      remainingDays = 'today';
    } else {
      remainingDays = 'overdue';
    }

    return remainingDays;
  }


  if (sessionNotFound === true) {
    return <SessionNotFoundComp />
  }

  return (
    <>
      {load === true ? (
        <Skeleton />
      ) : (
        // <div className="w-full pt-[15px] h-full flex flex-col items-center gap-5 overflow-y-auto">
        //   <div className="GsansFont w-[min(1250px,100%)] px-[25px] h-auto flex flex-col py-[18px]">
        //     <h1 className="text-gradient base:text-[2.7rem]  bl:text-[3rem] bbl:text-[3.3rem] cursor-default base:leading-[52px] bl:leading-[57px] !base:font-[599] bbl:font-[599] tracking-wide">{`Hello, ${userDetail ? userDetail.name.split(" ")[0] : "user"
        //       }.`}</h1>
        //     <h1 className="base:text-[2.7rem] bl:text-[3rem] bbl:text-[3.3rem] base:leading-[48px] bl:leading-[60px] text-[#b5b8bf] opacity-[0.6] !base:font-[599] bbl:font-[599] tracking-wide text-muted-foreground cursor-default">
        //       How can I help you today?
        //     </h1>
        //   </div>

        //   <div className="px-[25px] w-[min(1350px,100%)] flex flex-col justify-center items-center gap-[50px] ">
        //     <div className="flex justify-between  gap-6  base:w-full base:flex-col tv:flex-row bl:w-[92%] base:pt-[10px] bl:pt-[20px] select-none">
        //       <div className="base:w-full tv:w-[48%] shadow-md flex  py-[6px] min-h-[60px] bg-[#EEF5FF]  rounded-[15px] ">
        //         <div className="px-[20px] max-h-[60px] flex justify-center items-center gap-2">
        //           <h1 className="text-[2rem] GsansFont text-gradient-number">
        //             {tasks.length}
        //           </h1>
        //           <p className="text-[0.87rem] font-[500] ">Task due today</p>
        //         </div>

        //         <Separator className="py-[20px] max-w-[2px] w-[2px] min-h-[40px] h-[100%] bg-black opacity-[0.2]" />

        //         <div
        //           style={
        //             tasks.length !== 0
        //               ? { alignItems: "center" }
        //               : { display: "flex" }
        //           }
        //           className="w-[55%] flex justify-center"
        //         >
        //           {tasks.length === 0 ? (
        //             <div className="w-full max-h-[60px] h-[60px]  flex items-center pl-[20px] ">
        //               <p className="text-[0.87rem] font-[500] text-muted-foreground">
        //                 No task due Today
        //               </p>
        //             </div>
        //           ) : (
        //             <div
        //               style={
        //                 tasks.length >= 2
        //                   ? { paddingTop: "5px", paddingBottom: "2px" }
        //                   : { display: "flex" }
        //               }
        //               className="w-full  flex flex-col justify-center pl-[22px] gap-2"
        //             >
        //               {tasks.slice(0, 2).map((task: any, index: number) => (
        //                 <div
        //                   key={index}
        //                   className="bg-[rgba(180,212,255,0.6)] text-black hover:bg-[rgba(180,212,255,0.7)] rounded-[6px] px-[4px] min-w-[165px] max-w-[165px] py-[5px] min-h-[35px] flex items-center pl-[10px]"
        //                 >
        //                   <p className="text-[0.8rem] inline">
        //                     {shortenString(task.name, 19)}
        //                   </p>
        //                 </div>
        //               ))}
        //               {tasks.length >= 2 && (
        //                 <div className="w-full flex justify-end items-center py-[2px] ">
        //                   <p
        //                     className="cursor-pointer font-[400] hover:underline text-[0.77rem]"
        //                     onClick={(e) => {
        //                       router.push("/home/tasks");
        //                     }}
        //                   >
        //                     see more
        //                   </p>
        //                 </div>
        //               )}
        //             </div>
        //           )}
        //         </div>
        //       </div>

        //       {/* EEF5FF
        //         #86B6F6
        //         #B4D4FF
        //         #029BE6
        //         #0064FF */}
        //       <div className="base:w-full tv:w-[48%] flex  py-[6px] min-h-[60px] bg-[#EEF5FF] shadow-md  rounded-[15px] ">
        //         <div className="px-[20px] base:pr-[0px] tv:pr-[20px]  max-h-[60px] flex justify-center items-center gap-2">
        //           <h1 className="text-[2rem] GsansFont text-gradient-number">
        //             {events.length}
        //           </h1>
        //           <p className="text-[0.87rem] font-[500] ">
        //             Calender event today
        //           </p>
        //         </div>

        //         <Separator className="py-[20px] max-w-[2px] w-[2px] min-h-[40px] h-[100%] bg-black opacity-[0.3]" />

        //         <div
        //           style={
        //             events.length !== 0
        //               ? { alignItems: "center" }
        //               : { display: "flex" }
        //           }
        //           className="w-[55%] flex justify-center"
        //         >
        //           {events.length === 0 ? (
        //             <div className="w-full max-h-[60px] h-[60px] flex items-center pl-[20px] ">
        //               <p className="text-[0.87rem] font-[500] text-muted-foreground">
        //                 No calender event Today
        //               </p>
        //             </div>
        //           ) : (
        //             <div
        //               style={
        //                 events.length >= 2
        //                   ? { paddingTop: "5px", paddingBottom: "2px" }
        //                   : { display: "flex" }
        //               }
        //               className="w-full select-none flex flex-col justify-center pl-[18px] gap-2"
        //             >
        //               {events.slice(0, 2).map((event: any, index: number) => (
        //                 <div className="bg-[rgba(180,212,255,0.6)] text-black hover:bg-[rgba(180,212,255,0.7)]  rounded-[6px] px-[4px] min-w-[165px] max-w-[165px] py-[5px] min-h-[35px] flex items-center pl-[10px] gap-2">
        //                   <p className="text-[0.7rem] font-[550]">
        //                     {formatTime(event.startDate)}
        //                   </p>
        //                   <p className="text-[0.72rem] inline">
        //                     {shortenString(event.title, 12)}
        //                   </p>
        //                 </div>
        //               ))}
        //               {events.length >= 2 && (
        //                 <div className="w-full flex justify-end items-center py-[2px] ">
        //                   <p
        //                     className="cursor-pointer font-[400] hover:underline text-[0.77rem]"
        //                     onClick={(e) => {
        //                       router.push("/home/roadmaps");
        //                     }}
        //                   >
        //                     see more
        //                   </p>
        //                 </div>
        //               )}
        //             </div>
        //           )}
        //         </div>
        //       </div>
        //     </div>

        //     <div className="base:w-full bl:w-[92%] base:flex base:overflow-x-auto bl:overflow-x-hidden bl:grid bl:grid-cols-4 gap-4  min-h-[200px] mb-[50px]">
        //       <div
        //         className="bg-[#F0F4F9] base:min-w-[200px] bl:w-full shadow-sm poppinsFonts text-[#46494f] hover:bg-[#dde3ea]  rounded-[13px] cursor-pointer transition duration-300 ease-in-out px-[15px] py-[30px] flex flex-col gap-[6px] "
        //         onClick={(e) => router.push("/translate")}
        //       >
        //         <h1 className="base:text-[1.35rem] bbl:text-[1.42rem] leading-[25px] font-[580]">
        //           Translate Document
        //         </h1>
        //         <p className="base:text-[0.78rem] bbl:text-[0.88rem] font-[400]">
        //           Translate any document(PDF or DOCX) from any 22 Indic
        //           languages to English and vice versa. <br />
        //           Fix any translation error once and the AI will ensure to make
        //           that mistake again.
        //         </p>
        //       </div>

        //       <div
        //         className="bg-[#F0F4F9] base:min-w-[200px] bl:w-full shadow-sm poppinsFonts text-[#46494f] hover:bg-[#dde3ea]  rounded-[13px] cursor-pointer transition duration-300 ease-in-out px-[15px] py-[30px] flex flex-col gap-[6px] "
        //         onClick={(e) => router.push("/transcribe")}
        //       >
        //         <h1 className="base:text-[1.35rem] bbl:text-[1.42rem] leading-[25px] font-[580]">
        //           Transcribe Audio
        //         </h1>
        //         <p className="base:text-[0.78rem] bbl:text-[0.88rem] font-[400]">
        //           Record and transcribe meetings and get accurate text along
        //           with diarization and brief summary.
        //           <br /> Works in English and Hindi and learns from your
        //           vocabulary and phonetics.
        //         </p>
        //       </div>

        //       <div
        //         className="bg-[#F0F4F9] base:min-w-[200px] bl:w-full shadow-sm poppinsFonts text-[#46494f] hover:bg-[#dde3ea]  rounded-[13px] cursor-pointer transition duration-300 ease-in-out px-[15px] py-[30px] flex flex-col gap-[6px]"
        //         onClick={(e) => router.push("/home/cases")}
        //       >
        //         <h1 className="base:text-[1.35rem] bbl:text-[1.42rem] leading-[25px] font-[580]">
        //           Manage Cases
        //         </h1>
        //         <p className="base:text-[0.78rem] bbl:text-[0.88rem] font-[400]">
        //           Manage the entire lifecycle of the contracts and cases,
        //           keeping track of changes and progress updates directly from
        //           courts.
        //           <br />
        //           Utilize advanced AI features like Document QA, Summarization,
        //           Statute predictions and precedent retrieval.
        //         </p>
        //       </div>

        //       <div
        //         className="bg-[#F0F4F9] base:min-w-[200px] bl:w-full shadow-sm poppinsFonts text-[#46494f] hover:bg-[#dde3ea]  rounded-[13px] cursor-pointer transition duration-300 ease-in-out px-[15px] py-[30px] flex flex-col gap-[6px]"
        //         onClick={(e) => router.push("/home/my-client")}
        //       >
        //         <h1 className="base:text-[1.35rem] bbl:text-[1.42rem] leading-[25px] font-[580]">
        //           Manage Clients
        //         </h1>
        //         <p className="base:text-[0.78rem] bbl:text-[0.88rem] font-[400]">
        //           Easily manage clients, including creating notes,managing
        //           invoices and billing hours and keeping the client in the loop
        //           via Whatsapp or email updates.
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <main className="w-full pt-[15px] h-full items-center  overflow-y-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="w-full flex justify-center items-center">
            <h1 className="text-[#37352f] text-3xl text-center font-[550]">{`${getGreeting()}, ${userData ? userData.name : "user"
              }.`}</h1>
          </div>
          <div className="w-[min(1250px,100%)] grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Due task
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  Tasks Due Today
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Calender Events
                </CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
                <p className="text-xs text-muted-foreground">
                  Calender Events Today
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Your tasks</CardTitle>
                  <CardDescription>
                    Recent tasks assigned to you
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/home/invoices">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>
                        Priority
                      </TableHead>
                      <TableHead className="text-right">Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Dummytasks.map((task, idx) => (
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Task-{task.taskNumber}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {task.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="text-xs" variant="outline">
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{getRemainingDays(task.dueDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                  {/* <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar> */}
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar> */}
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar> */}
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Isabella Nguyen
                    </p>
                    <p className="text-sm text-muted-foreground">
                      isabella.nguyen@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$299.00</div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar> */}
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      William Kim
                    </p>
                    <p className="text-sm text-muted-foreground">
                      will@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$99.00</div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar> */}
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Sofia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      sofia.davis@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-[min(1250px,100%)] grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card onClick={(e) => router.push('/translate')} className="cursor-pointer hover:bg-[#f4f4f5]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Translate Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground ">
                  Translate any document (PDF or DOCX) from any 22 Indic
                  languages to English and vice versa. <br />
                  Fix any translation error once and the AI will ensure to make
                  that mistake again.
                </p>
              </CardContent>
            </Card>
            <Card onClick={(e) => router.push('/transcribe')} className="cursor-pointer hover:bg-[#f4f4f5]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Transcribe Audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Record and transcribe meetings and get accurate text along
                  with diarization and brief summary.
                  <br /> Works in English and Hindi and learns from your
                  vocabulary and phonetics.
                </p>
              </CardContent>
            </Card>
            <Card onClick={(e) => router.push('/home/cases')} className="cursor-pointer hover:bg-[#f4f4f5]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Manage Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage the entire lifecycle of the contracts and cases,
                  keeping track of changes and progress updates directly from
                  courts.
                  <br />
                  Utilize advanced AI features like Document QA, Summarization,
                  Statute predictions and precedent retrieval.
                </p>
              </CardContent>
            </Card>
            <Card onClick={(e) => router.push('/home/clients')} className="cursor-pointer hover:bg-[#f4f4f5]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Manage Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Easily manage clients, including creating notes,managing
                  invoices and billing hours and keeping the client in the loop
                  via Whatsapp or email updates.
                </p>
              </CardContent>
            </Card>
          </div>

        </main>
      )}
    </>
  );
};

export default Component;


const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
