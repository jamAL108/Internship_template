'use client';
import React, { useEffect, useState, useRef } from 'react'
import Navbar from '@/components/homeComponent/navbar';
import { useRouter } from 'next/navigation';
import { Search, Plus, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { getAllClient } from '@/apiReq/newAPIs/client'
import Skeleton from './skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import checkUserAuthClient from '@/auth/getUserSession'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SessionNotFoundComp from '@/components/sessionNotFound'
const Component = () => {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [clientData, setClientData] = useState<any>([])
  const [tempClientDataHolder, setTempClientDataHolder] = useState<any>([])
  const [loader, setloader] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  let itemsPageArray = [10, 20, 30]

  const [page, setPage] = useState<number>(1)
  const [totalpage, setTotalPage] = useState<number>(tempClientDataHolder.length)
  const box1 = useRef<HTMLButtonElement | null>(null);
  const box2 = useRef<HTMLButtonElement | null>(null);
  const box3 = useRef<HTMLButtonElement | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPageArray[0])
  const refffu = useRef<HTMLInputElement | null>(null);

  const [sessionNotFound, setSessionNotFound] = useState<boolean>(false)
  useEffect(() => {
    getClientData()
  }, [])

  const getClientData = async () => {
    const res: any = await checkUserAuthClient()
    if (res.error !== null) {
      router.push('/')
      return
    }
    if (res.data.session === null) {
      setloader(false)
      setSessionNotFound(true)
      return
    }
    const metadata = res.data.session.user.user_metadata
    const data = await getAllClient(metadata.workspace_id)
    setClientData(data)
    setTempClientDataHolder(data)
    setloader(false)
    setUserData({ id: res.data.session.user.id, ...metadata })
  }


  useEffect(() => {
    setPage(1);
    setTotalPage(Math.ceil(clientData.length / itemsPerPage));
  }, [clientData]);

  useEffect(() => {
    if (box1.current) {
      const currentInnerHTML = box1.current.innerHTML;
      const backgroundColor =
        Number(currentInnerHTML) === Number(page) ? "#0064FF" : currentInnerHTML === 'X' ? "#A9A9A9" : "#f7f7f7";

      if (currentInnerHTML === "X" || Number(currentInnerHTML) === Number(page)) {
        box1.current.style.color = 'white'
      } else {
        box1.current.style.color = "black"
      }
      box1.current.style.backgroundColor = backgroundColor;
    }
    if (box2.current) {
      const currentInnerHTML = box2.current.innerHTML;
      const backgroundColor =
        Number(currentInnerHTML) === Number(page) ? "#0064FF" : currentInnerHTML === 'X' ? "#A9A9A9" : "#f7f7f7";
      if (currentInnerHTML === "X" || Number(currentInnerHTML) === Number(page)) {
        box2.current.style.color = 'white'
      } else {
        box2.current.style.color = "black"
      }
      box2.current.style.backgroundColor = backgroundColor;
    }
    if (box3.current) {
      const currentInnerHTML = box3.current.innerHTML;
      const backgroundColor =
        Number(currentInnerHTML) === Number(page) ? "#0064FF" : currentInnerHTML === 'X' ? "#A9A9A9" : "#f7f7f7";
      if (currentInnerHTML === "X" || Number(currentInnerHTML) === Number(page)) {
        box3.current.style.color = 'white'
      } else {
        box3.current.style.color = "black"
      }
      box3.current.style.backgroundColor = backgroundColor;
    }
  }, [page, clientData]);



  if (loader === true) {
    return (
      <Skeleton />
    )
  }


  if (sessionNotFound === true) {
    return <SessionNotFoundComp />
  }

  function shrinkEmail(text: string, threshold = 21) {
    if (text.length > threshold) {
      return text.substring(0, threshold) + "..."
    } else {
      return text.toLocaleLowerCase()
    }
  }

  const searchFunction = (e: any) => {
    if (!e) {
      setClientData(tempClientDataHolder)
    } else {
      console.log(e)
      let input = e.toLowerCase().trim()
      let newClientDataAfterFilter = clientData.filter((obj: any) => obj.Name.toLowerCase().includes(input))
      console.log(newClientDataAfterFilter)
      setClientData(newClientDataAfterFilter)
    }
  }

  function debounce(func: any, d: number) {
    let timer: any;
    return function () {
      if (timer) clearTimeout(timer);
      setTimeout(func, d);
    }
  }

  const timery = debounce(() => {
    if (refffu.current) {
      searchFunction(refffu?.current.value)
    }
  }, 800)

  const handlePrev = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  const handleNext = () => {
    if (page !== totalpage) {
      setPage(page + 1);
    }
  }

  return (
    <div className='w-full h-full flex flex-col base:overflow-y-auto bl:overflow-hidden'>

      <div className='w-full px-[25px] py-[20px] tv:h-[80px] base:gap-[10px] tv:gap-auto border-b-[1px] flex base:flex-col tv:flex-row tv:justify-between tv:items-center'>

        <div className=' flex gap-2 items-center'>
          <h1 className='text-[1.5rem] select-none font-[600] tracking-[0.6px]'>Clients</h1>
          <MoreHorizontal size={20} className='cursor-pointer' />
        </div>


        <div className='flex tv:px-[5px] tv:pr-[7px] base:justify-end tv:justify-center items-center base:gap-[12px] tv:gap-[25px]'>

          <div className='bg-[rgba(239,239,239,0.5)] border-[1px] base:px-[10px] tv:px-[14px] base:py-[4px] tv:py-[0px] tv:h-full flex justify-center items-center  rounded-[7px]'>
            <input ref={refffu} value={search} onChange={(e) => {
              setSearch(e.target.value)
              timery()
            }} type="text" className='bg-transparent base:py-[4px] tv:py-[8px] base:min-w-[50px] mymobile:min-w-[80px] tv:min-w-[210px] base:text-[0.85rem] tv:text-[0.92rem] outline-none  placeholder:text-[0.83rem] ClientDataInputField' placeholder='Search by client name ....' />
            <Search color='#888888' className='cursor-pointer w-4 h-4' />
          </div>

          <Link href={'/home/clients/addclient'} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white base:px-[10px] tv:px-[15px]  rounded-[7px] flex justify-center items-center gap-[0.54rem] addClientButton'>
            <Plus color='white' size={20} />
            <h2 className='base:py-[9.5px] tracking-wide tv:py-[9.5px] base:text-[0.73rem] mymobile:text-[0.85rem] tv:text-[0.9rem] font-[500]'>New client</h2>
          </Link>

        </div>
      </div>

      <div className='w-full tv:pl-[25px] base:mb-[70px] tv:mb-[0px] tv:overflow-hidden flex'>
        {clientData.length === 0 ? (
          <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3'>
            <h1 className='text-center text-2xl font-[600]'>No Client Found</h1>
            <h2 className='w-[330px] text-center text-[0.87rem]'>Track Client to better manage your firm’s productivity, Add your first client.</h2>
            <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
              onClick={(e) => {
                e.preventDefault()
                const addClientButton: any = document.querySelector('.addClientButton');
                if (addClientButton) {
                  addClientButton.click()
                }
              }}
            >Create contact</Button>
          </div>
          // flex flex-wrap justify-start items-start
        ) : (
          <div className='w-full h-auto tv:max-h-[calc(97vh_-_130px)] py-[20px] flex flex-wrap
          gap-x-[30px] !gap-y-[30px] tv:overflow-y-auto base:justify-center tv:justify-start items-start'>
            {clientData
              ?.slice(
                page * itemsPerPage - itemsPerPage,
                page * itemsPerPage
              ).map((client: any, index: number) => (
                <Link href={`/home/clients/${client.id}`} key={index} className='w-[340px] hover:shadow-[rgba(0,102,255,0.1)] hover:shadow-md h-[205px] cursor-pointer flex bg-[#fefefe] border-[1.66px] rounded-xl shadow-md px-[30px] py-[15px]  flex-col justify-center items-center'>
                  <div className='w-full flex gap-[15px] items-center py-[2px]'>
                    <div className='flex flex-col'>
                      <h1 className='text-[1rem] mb-[-2px] font-[600] capitalize'>{`${client.Name ? `${client.Salutation} ${client.Name}` : '-'}`}</h1>
                      <h2 className='text-[0.9rem] mt-[-2px] font-[500] text-muted-foreground'>{client.Company ? client.Company : '-'}</h2>
                    </div>
                  </div>
                  <Separator className="my-3" />


                  <div className='w-full flex gap-[20px]'>
                    <div className='w-[36%] flex flex-col gap-2'>
                      <div className='flex flex-col text-[0.87rem] tracking-normal'>
                        <h2 className='font-[600]'>Company</h2>
                        <h2 className='text-[0.83rem] font-[400] text-muted-foreground'>{client.Company ? client.Company : '-'}</h2>
                      </div>
                      <div className='flex flex-col text-[0.87rem] tracking-normal'>
                        <h2 className='font-[600]'>Phone</h2>
                        <h2 className='text-[0.83rem] font-[400] text-muted-foreground'>{client.Contact ? client.Contact : '-'}</h2>
                      </div>
                    </div>



                    <div className='w-[60%] flex flex-col !gap-2'>
                      <div className='flex flex-col text-[0.87rem] tracking-normal'>
                        <h2 className='font-[600]'>Email</h2>
                        <h2 className='text-[0.77rem] font-[400] text-muted-foreground'>{client.Email ? shrinkEmail(client.Email) : '-'}</h2>
                      </div>
                      <div className='flex flex-col text-[0.87rem] tracking-normal'>
                        <h2 className='font-[600]'>GSTIN</h2>
                        <h2 className='text-[0.83rem] font-[400] text-muted-foreground'>{client.GSTIN ? client.GSTIN : '-'}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>

      {clientData.length !== 0 && (
        <div className={`z-[10000] border-t-[1px] rounded-t-[17px] shadow-[0px_-2px_4px_-1px_rgba(0,0,0,0.24)] base:px-[10px] bl:px-[90px] flex justify-end gap-[15px] items-center bg-white base:fixed tv:absolute bottom-0 right-0 base:w-[100vw] bl:w-[82%] h-[55px]`}>

          <DropdownMenu>
            <DropdownMenuTrigger className='base:mr-[4px] tv:mr-[15px] base:px-[4px] tv:px-[12px] py-[4px] border-[2.4px] !border-[#9fa5c9] rounded-[6px]  flex justify-center items-center gap-3 !focus:border-none !active:border-none '>
              <h2 className='base:text-[0.8rem] tv:text-[0.95rem] font-[500] !text-black'>{itemsPerPage}</h2>
              <ChevronDown size={20} color='#9fa5c9' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-[100000]'>
              <DropdownMenuLabel>Data per page</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {itemsPageArray.map((item, index) => (
                <DropdownMenuItem key={index} onClick={(e) => setItemsPerPage(item)}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className={`flex items-center border-none px-[8px] py-[5px] justify-center transition duration-300 ease-in-out base:text-[0.77rem] mymobile:text-[0.8rem] tv:text-[0.85rem] base:gap-[0.25rem] tv:gap-[0.32rem] tracking-wide opacity-[1] ${page === 1 ? 'cursor-not-allowed opacity-[0.6] text-black hover:text-black' : 'hover:text-[#6680ff] cursor-pointer text-[#6680ff] opacity-[1]'}`}
            onClick={handlePrev}
          >
            <ChevronLeft size={19} color={page === 1 ? 'black' : '#6680ff'} className={`${page === 1 ? 'opacity-[0.6]' : 'opacity-[1]'}`} />
            Prev
          </button>

          <div className='flex base:mx-[6px] tv:mx-[0px] justify-center items-center base:w-[80px] tv:w-[120px] h-[70%] base:gap-[6px] tv:gap-[10px]'>
            <Button
              className='base:w-[15px] tv:w-[32px] border shadow-none base:h-[76%] tv:h-[85%] pointer-events-none text-[0.7rem]'
              ref={box1}
              onClick={(e) => e.stopPropagation()}
            >
              {page === 1
                ? 1
                : totalpage == 2
                  ? 1
                  : page === totalpage
                    ? page - 2
                    : page - 1}
            </Button>

            <Button
              ref={box2}
              className='base:w-[15px] tv:w-[32px] border shadow-none base:h-[76%] tv:h-[85%]  pointer-events-none text-[0.7rem]'
              // opacity={totalpage === 1 ? "0.3" : 1}
              onClick={(e) => e.stopPropagation()}
            >
              {totalpage == 1
                ? "X"
                : page === 1
                  ? page + 1
                  : totalpage == 2
                    ? page
                    : page === totalpage
                      ? page - 1
                      : page}
            </Button>

            <Button
              ref={box3}
              className='base:w-[15px] tv:w-[32px] border shadow-none base:h-[76%] tv:h-[85%]  pointer-events-none  text-[0.7rem]'
              // opacity={totalpage === 2 || totalpage === 1 ? "0.3" : 1}
              onClick={(e) => e.stopPropagation()}
            >
              {totalpage == 2 || totalpage === 1
                ? "X"
                : page === totalpage
                  ? page
                  : page === 1
                    ? page + 2
                    : page + 1}
            </Button>
          </div>

          <button className={`flex items-center border-none px-[8px] py-[5px] justify-center transition duration-300 ease-in-out base:text-[0.77rem] mymobile:text-[0.8rem] tv:text-[0.88rem] base:gap-[0.25rem] tv:gap-[0.32rem] tracking-wide opacity-[1]  ${page === totalpage ? 'cursor-not-allowed opacity-[0.6] text-black hover:text-black' : 'cursor-pointer text-[#6680ff] opacity-[1] hover:text-[#6680ff] '}`}
            onClick={handleNext}
          >
            Next
            <ChevronRight size={19} color={page === totalpage ? 'black' : '#6680ff'} className={`${page === totalpage ? 'opacity-[0.6]' : 'opacity-[1]'}`} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Component


