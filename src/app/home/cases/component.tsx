"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/homeComponent/navbar";
import { useRouter } from "next/navigation";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import Link from "next/link";
import { getOrderStatus } from "./order";
import { format } from "date-fns";
import CaseList from "./caseList";

import { Search, Plus, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { getAllClient } from '@/apiReq/newAPIs/client'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import checkUserAuthClient from '@/auth/getUserSession'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
import { ScrollArea } from '@/components/ui/scroll-area'


import CaseTable from './caseTable'
import CaseListArray from './casesList'
import SampleCases from './sampleCase'
import { getAllCases } from '@/apiReq/newAPIs/cases'
import { toast } from 'react-toastify';
import { Rows3, List } from 'lucide-react';
import Skeleton from './Skeleton'
const Component = () => {
  const router = useRouter();
  const refffu = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('total')
  const [userCases, setUserCases] = useState<any>([])
  const [mainUserCases, setMainuserCases] = useState<any>([])
  const [loader, setLoader] = useState<any>(true)

  useEffect(() => {
    getUserCases()
  }, [])

  const getUserCases = async () => {
    const result: any = await getAllCases()
    if (result.success === true) {
      setUserCases(result.data)
      setMainuserCases(result.data)
      setLoader(false)
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
      setLoader(false)
    }
  }

  function shrinkString(input: string, threshold: number): string {
    console.log(input)
    if (input.length <= threshold) {
      return input;
    } else {
      return input.slice(0, threshold);
    }
  }

  if (loader === true) {
    return <Skeleton />
  }

  return (
    <div className='w-full h-full flex flex-col base:overflow-y-auto bl:overflow-hidden'>
      <div className='w-full px-[25px] py-[20px] tv:h-[80px] base:gap-[20px] tv:gap-auto border-b-[1px] flex base:flex-col tv:flex-row tv:justify-between tv:items-center'>

        <div className='w-full flex gap-2 justify-between items-center'>
          <div className="flex gap-2 items-center">
            <h1 className='text-[1.5rem] select-none font-[600] tracking-[0.6px]'>Cases</h1>
            <MoreHorizontal size={20} className='cursor-pointer' />
          </div>
          <Link href={'/home/cases/addcase'} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white base:px-[20px] base:flex tv:hidden tv:px-[15px]  rounded-[7px] flex justify-center items-center gap-[0.54rem] addClientButton select-none addCasesButton'>
            <Plus className='rounded-[30%]' color='white' size={19} />
            <h2 className='base:py-[9.5px] tv:py-[9.5px] base:text-[0.73rem] mymobile:text-[0.79rem] tv:text-[0.86rem] font-[450]'>New</h2>
          </Link>
        </div>

        <div className='flex tv:px-[5px] tv:pr-[7px] base:justify-end tv:justify-center items-center base:gap-[12px] tv:gap-[25px]'>

          <div className='bg-[rgba(239,239,239,0.5)] border-[1px] base:px-[10px] tv:px-[14px] base:py-[4px] tv:py-[0px] tv:h-full flex justify-center items-center  rounded-[7px]'>
            <input ref={refffu} value={search} onChange={(e) => {
              setSearch(e.target.value)
              // timery()
            }} type="text" className='bg-transparent base:py-[4px] tv:py-[8px] base:min-w-[50px] mymobile:min-w-[80px] tv:min-w-[210px] base:text-[0.85rem] tv:text-[0.92rem] outline-none  placeholder:text-[0.83rem] ClientDataInputField placeholder:select-none' placeholder='Search by case name ....' />
            <Search color='#888888' className='cursor-pointer w-4 h-4' />
          </div>

          <Popover>
            <PopoverTrigger className="border-[2px] outline-none shadow-sm flex justify-center items-center gap-3 px-[15px] py-[8px] rounded-[8px]">
              <h2 className="text-[0.88rem] font-[470]">Filter</h2>
              <ChevronDown size={18} />
            </PopoverTrigger>
            <PopoverContent>coming soon...</PopoverContent>
          </Popover>

          <Link href={'/home/cases/addcase'} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white base:px-[10px] base:hidden tv:flex tv:px-[15px]  rounded-[7px] flex justify-center items-center gap-[0.5rem] addClientButton select-none addCasesButton'>
            <Plus color='white' size={20} />
            <h2 className='base:py-[9.5px] tv:py-[9.5px] base:text-[0.73rem] mymobile:text-[0.79rem] tv:text-[0.86rem] font-[450]'>New</h2>
          </Link>

        </div>
      </div>

      <div className="w-full tv:px-[25px] base:mb-[70px] tv:mb-[0px] tv:overflow-hidden flex gap-[20px] flex-col">
        <div className="w-full base:hidden tv:flex py-[10px] gap-[20px] ">
          <button onClick={(e) => {
            setUserCases(mainUserCases)
            setActiveTab('total')
          }} className={`${activeTab === 'total' ? 'bg-[#6680ff] text-white' : 'bg-[#f8f8f8] hover:bg-[#e8effe] text-black'} transition duration-100 ease-in-out  border min-w-[140px]  rounded-[10px] px-[20px] py-[12px] flex flex-col gap-[4px]`}>
            <h2 className={` ${activeTab === 'total' ? 'text-white' : "text-muted-foreground"} text-[0.8rem] font-[400] `}>Total cases</h2>
            <h1 className="text-[1.4rem] font-[600]">{mainUserCases.length}</h1>
          </button>
          <button onClick={(e) => {
            setUserCases(mainUserCases.filter((caseItem: any) => caseItem['Case Status'] === 'Case pending'))
            setActiveTab('pending')
          }} className={`${activeTab === 'pending' ? 'bg-[#6680ff] text-white' : 'bg-[#f8f8f8] hover:bg-[#e8effe] text-black'} transition duration-100 ease-in-out  border min-w-[140px]  rounded-[10px] px-[20px] py-[12px] flex flex-col gap-[4px]`}>
            <h2 className={` ${activeTab === 'pending' ? 'text-white' : "text-muted-foreground"} text-[0.8rem] font-[400] `}>Pending cases</h2>
            <h1 className="text-[1.4rem] font-[600]">{mainUserCases.filter((caseItem: any) => caseItem['Case Status'] === 'Case pending').length}</h1>
          </button>
          <button onClick={(e) => {
            setUserCases(mainUserCases.filter((caseItem: any) => caseItem['Case Status'] === 'Case disposed'))
            setActiveTab('disposed')
          }} className={`${activeTab === 'disposed' ? 'bg-[#6680ff] text-white' : 'bg-[#f8f8f8] hover:bg-[#e8effe] text-black'} transition duration-100 ease-in-out  border min-w-[140px]  rounded-[10px] px-[20px] py-[12px] flex flex-col gap-[4px]`}>
            <h2 className={` ${activeTab === 'disposed' ? 'text-white' : "text-muted-foreground"} text-[0.8rem] font-[400]`}>Disposed cases</h2>
            <h1 className="text-[1.4rem] font-[600]">{mainUserCases.filter((caseItem: any) => caseItem['Case Status'] === 'Case disposed').length}</h1>
          </button>

        </div>

        <div className="w-full h-auto flex flex-col gap-[10px]">
          {userCases.length === 0 ? (
            <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3'>
              <h1 className='text-center text-2xl font-[600]'>No Cases Found</h1>
              <h2 className='w-[330px] text-center text-[0.87rem]'>search for oyur case and add it for better management</h2>
              <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
                onClick={(e) => {
                  e.preventDefault()
                  const addCasesButton: any = document.querySelector('.addCasesButton');
                  if (addCasesButton) {
                    addCasesButton.click()
                  }
                }}
              >Search Case</Button>
            </div>
          ) : (
            <ScrollArea className='w-full !h-[calc(100vh_-_270px)] '>
            <Table>
              <TableCaption>A list of your recent Cases.</TableCaption>
              <TableHeader>
                <TableRow className="!text-[0.7rem] font-[560]">
                  <TableHead>TYPE</TableHead>
                  <TableHead>CASE NUMBER</TableHead>
                  <TableHead>PETITIONER AND ADVOCATE</TableHead>
                  <TableHead>RESPONDENT AND ADVOCATE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userCases.map((item: any, idx: number) => (
                    <CaseTable item={item} key={idx} index={idx} setMainuserCases={setMainuserCases} mainUserCases={mainUserCases} userCases={userCases} setUserCases={setUserCases} />
                ))}
              </TableBody>
            </Table>
            </ScrollArea>
          )
          }
        </div >
      </div >
    </div >
  );
};

export default Component;
