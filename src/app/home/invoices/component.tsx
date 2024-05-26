'use client'
import React, { useEffect, useState } from 'react'
// @ts-ignore  
import { Search, Plus } from 'lucide-react'
// @ts-ignore  
import { MoreHorizontal, KanbanSquare, ListTodo } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { getAllInvoice } from '@/apiReq/newAPIs/invoice'
import Skeleton from './Skeleton';
import { Button } from '@/components/ui/button'
import SkeletonforTable from './SkeletonForTable'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import InvoiceTable from './invoiceTable'
import { useRouter } from "next/navigation";
import checkUserAuthClient from '@/auth/getUserSession'
import SessionNotFoundComp from '@/components/sessionNotFound'
const Component = () => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [invoiceData, setInvoiceData] = useState<any>([])
  const [mainInvoiceData, setMainInvoiceData] = useState<any>([])
  const [loader, setLoader] = useState<boolean>(true)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [sessionNotFound, setSessionNotFound] = useState<boolean>(false)
  const [skeletonLoaderForTable, setSkeletonLoaderForTable] = useState<boolean>(false)

  useEffect(() => {
    getAllInvoicefunciton()
  }, [])

  const getAllInvoicefunciton = async () => {
    const res: any = await checkUserAuthClient()
    if (res.error !== null) {
      router.push('/')
      return
    }
    if (res.data.session === null) {
      setLoader(false)
      setSessionNotFound(true)
      return
    }
    const metadata = res.data.session.user.user_metadata
    const result: any = await getAllInvoice(metadata.workspace_id)
    if (result.success === true) {
      setInvoiceData(result.data)
      setMainInvoiceData(result.data)
      setLoader(false)
    } else {
      setLoader(false)
      ///// router.back()
    }
  }

  const ChangeeActiveTab = (newTab: string) => {
    if (mainInvoiceData.length !== 0) {
      setSkeletonLoaderForTable(true)
      if (newTab === 'all') {
        setInvoiceData(mainInvoiceData)
        setSkeletonLoaderForTable(false)
        setActiveTab(newTab)
      } else if (newTab === 'overdue') {
        let overdueObjects: any[] = []
        mainInvoiceData.forEach((obj: any) => {
          if (isOverdue(obj.dueDate)) {
            overdueObjects.push(obj);
          }
        });
        setInvoiceData(overdueObjects)
        setSkeletonLoaderForTable(false)
        setActiveTab(newTab)
      } else if (newTab === 'draft') {
        let draftObjects: any[] = []
        mainInvoiceData.forEach((obj: any) => {
          if (obj.status === 0) {
            draftObjects.push(obj);
          }
        });
        setInvoiceData(draftObjects)
        setSkeletonLoaderForTable(false)
        setActiveTab(newTab)
      }
    }
  }

  const isOverdue = (dueDate: string): boolean => {
    const currentDate = new Date()
    const due = new Date(dueDate)
    return due.getTime() < currentDate.getTime()
  }





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

  function convertISOToCustomFormat(isoString: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  }

  const getTotalAmount = (items: any): number => {
    return items.reduce((total: number, item: any) => total + item.totalAmount, 0);
  };

  useEffect(() => {
    setTotalAmount(getTotalAmount(invoiceData))
  }, [activeTab, invoiceData])

  if (loader === true) {
    return <Skeleton />
  }
  if (sessionNotFound === true) {
    return <SessionNotFoundComp />
  }


  return (
    <div className='w-full h-full flex flex-col base:overflow-y-auto bl:overflow-hidden'>
      <div className='w-full px-[25px] py-[20px] tv:h-[80px] base:gap-[10px] tv:gap-auto flex tv:flex-row justify-between items-center'>

        <div className=' flex gap-2 items-center'>
          <h1 className='text-[1.5rem] select-none font-[600] tracking-[0.6px]'>Invoices</h1>
          <MoreHorizontal size={20} className='cursor-pointer' />
        </div>

        <div className='flex tv:px-[5px] tv:pr-[7px] base:justify-end tv:justify-center items-center base:gap-[12px] tv:gap-[25px]'>
          <Link href={'/home/invoices/addinvoice'} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white base:px-[10px] tv:px-[15px]  rounded-[7px] flex justify-center items-center gap-[0.54rem] select-none addInvoiceButton'>
            <Plus color='white' size={20} />
            <h2 className='base:py-[9.5px] tracking-wide tv:py-[9.5px] base:text-[0.73rem] mymobile:text-[0.85rem] tv:text-[0.9rem] font-[500]'>New Invoice</h2>
          </Link>
        </div>
      </div>

      <div className='w-full base:px-[15px] tv:px-[25px] flex flex-col'>
        <div className='px-[25px] border-b-[2px] gap-4 border-b-[#F5F5F5] w-full h-[2.37rem] flex justify-end items-center'>
          <div className='h-full'>

          </div>
        </div>
        <Tabs defaultValue="all" className="mt-[-2.37rem] w-full h-[calc(100vh_-_30px)] overflow-hidden">
          <TabsList className='bg-transparent' >

            <TabsTrigger className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#6680ff] data-[state=active]:border-b-[2px] data-[state=active]:border-[#6680ff] flex justify-center items-center gap-[0.37rem] p-[6px] px-[15px] text-[0.9rem] font-[520]' value="all" onClick={(e: any) => {
              if (activeTab !== 'all') {
                ChangeeActiveTab('all')
              }
            }}>
              All Invoices
            </TabsTrigger>



            <TabsTrigger className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#6680ff] data-[state=active]:border-b-[2px] data-[state=active]:border-[#6680ff] flex justify-center items-center gap-[0.37rem] p-[6px] px-[15px] text-[0.9rem] font-[520]' value="draft" onClick={(e: any) => {
              if (activeTab !== 'draft') {
                ChangeeActiveTab('draft')
              }
            }}>
              Draft
            </TabsTrigger>

            <TabsTrigger className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#6680ff] data-[state=active]:border-b-[2px] data-[state=active]:border-[#6680ff] flex justify-center items-center gap-[0.37rem]  p-[6px] px-[15px] text-[0.9rem] font-[520]' value="overdue" onClick={(e: any) => {
              if (activeTab !== 'overdue') {
                ChangeeActiveTab('overdue')
              }
            }}>
              Over due
            </TabsTrigger>

          </TabsList>

          <TabsContent value="all">
            {
              mainInvoiceData.length === 0 ? (
                <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3 '>
                  <h1 className='text-center text-2xl font-[600]'>No Invoice Found</h1>
                  <h2 className='w-[330px] text-center text-[0.87rem]'>Track Your Pyaments and billings to better manage your firm’s productivity, Add your first Invoice.</h2>
                  <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
                    onClick={(e) => {
                      e.preventDefault()
                      const addInvoiceButton: any = document.querySelector('.addInvoiceButton');
                      if (addInvoiceButton) {
                        addInvoiceButton.click()
                      }
                    }}
                  >Raise Invoice</Button>
                </div>
              ) : (
                <ScrollArea className='w-full !h-[calc(100vh_-_145px)]'>
                  <Table >
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className='!border-b-[3px] !z-[10] bg-white'>
                      <TableRow className='text-[0.9rem] border-b-[3px] MonaSans font-[600]'>
                        <TableHead className="base:min-w-[180px] tv:w-[200px]">Client</TableHead>
                        <TableHead className="base:min-w-[110px] tv:w-[110px]">Invoice #</TableHead>
                        <TableHead className="base:min-w-[150px] tv:w-[160px]">Resource Name</TableHead>
                        <TableHead className="base:min-w-[120px] tv:w-[120px]">Amount in ₹</TableHead>
                        <TableHead className='base:min-w-[100px] tv:w-[100px]'>Due</TableHead>
                        <TableHead className='base:min-w-[100px] tv:w-[100px]'>Created</TableHead>
                        <TableHead className='text-right px-[25px] base:min-w-[80px] tv:w-[80px]'>Status</TableHead>
                        <TableHead className='base:min-w-[50px] tv:w-[50px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        skeletonLoaderForTable === true && (
                          <SkeletonforTable />
                        )
                      }
                      {skeletonLoaderForTable === false && invoiceData.length !== 0 && invoiceData.map((invoice: any, index: number) => (
                        <InvoiceTable mainInvoiceData={mainInvoiceData} setMainInvoiceData={setMainInvoiceData} invoiceData={invoiceData} setInvoiceData={setInvoiceData} invoice={invoice} key={index} index={index} type={true} />
                      ))}
                    </TableBody>
                    {invoiceData.length !== 0 && (
                      <TableFooter>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-left">₹ {totalAmount}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableFooter>
                    )}
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
          </TabsContent>
          <TabsContent value="draft">
            {
              invoiceData.length === 0 ? (
                <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3 '>
                  <h1 className='text-center text-2xl font-[600]'>No Invoice Found</h1>
                  <h2 className='w-[330px] text-center text-[0.87rem]'>Track Your Pyaments and billings to better manage your firm’s productivity, Add your first Invoice.</h2>
                  <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
                    onClick={(e) => {
                      e.preventDefault()
                      const addInvoiceButton: any = document.querySelector('.addInvoiceButton');
                      if (addInvoiceButton) {
                        addInvoiceButton.click()
                      }
                    }}
                  >Raise Invoice</Button>
                </div>
              ) : (
                <ScrollArea className='w-full !h-[calc(100vh_-_190px)]'>
                  <Table>
                    <TableCaption>A list of Draft invoices.</TableCaption>
                    <TableHeader className='!border-b-[3px] !z-[10] bg-white'>
                      <TableRow className='text-[0.9rem] border-b-[3px] MonaSans font-[600]'>
                        <TableHead className="base:min-w-[200px] tv:w-[200px]">Client</TableHead>
                        <TableHead className="base:min-w-[100px] tv:w-[110px]">Invoice #</TableHead>
                        <TableHead className="base:min-w-[140px] tv:w-[160px]">Resource Name</TableHead>
                        <TableHead className="base:min-w-[110px] tv:w-[120px]">Amount in ₹</TableHead>
                        <TableHead className='base:min-w-[90px] tv:w-[100px]'>Created</TableHead>
                        <TableHead className='base:min-w-[50px] tv:w-[50px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        skeletonLoaderForTable === true && (
                          <SkeletonforTable />
                        )
                      }
                      {skeletonLoaderForTable === false && invoiceData.length !== 0 && invoiceData.map((invoice: any, index: number) => (
                        <InvoiceTable mainInvoiceData={mainInvoiceData} setMainInvoiceData={setMainInvoiceData} invoiceData={invoiceData} setInvoiceData={setInvoiceData} invoice={invoice} key={index} index={index} type={false} />
                      ))}
                    </TableBody>
                    {invoiceData.length !== 0 && (
                      <TableFooter>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-left">₹ {totalAmount}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableFooter>
                    )}
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
          </TabsContent>
          <TabsContent value="overdue">
            {
              invoiceData.length === 0 ? (
                <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3 '>
                  <h1 className='text-center text-2xl font-[600]'>No Invoice Found</h1>
                  <h2 className='w-[330px] text-center text-[0.87rem]'>Track Your Pyaments and billings to better manage your firm’s productivity, Add your first Invoice.</h2>
                  <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
                    onClick={(e) => {
                      e.preventDefault()
                      const addInvoiceButton: any = document.querySelector('.addInvoiceButton');
                      if (addInvoiceButton) {
                        addInvoiceButton.click()
                      }
                    }}
                  >Raise Invoice</Button>
                </div>
              ) : (
                <ScrollArea className='w-full !h-[calc(100vh_-_190px)]'>
                  <Table>
                    <TableCaption>A list of overDue invoices.</TableCaption>
                    <TableHeader className='!border-b-[3px] !z-[10] bg-white'>
                      <TableRow className='text-[0.9rem] border-b-[3px] MonaSans font-[600]'>
                        <TableHead className="base:min-w-[200px] tv:w-[200px]">Client</TableHead>
                        <TableHead className="base:min-w-[100px] tv:w-[110px]">Invoice #</TableHead>
                        <TableHead className="base:min-w-[150px] tv:w-[160px]">Resource Name</TableHead>
                        <TableHead className="base:min-w-[110px] tv:w-[120px]">Amount in ₹</TableHead>
                        <TableHead className='base:min-w-[100px] tv:w-[100px]'>Created</TableHead>
                        <TableHead className='base:min-w-[50px] tv:w-[50px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        skeletonLoaderForTable === true && (
                          <SkeletonforTable />
                        )
                      }
                      {skeletonLoaderForTable === false && invoiceData.length !== 0 && invoiceData.map((invoice: any, index: number) => (
                        <InvoiceTable mainInvoiceData={mainInvoiceData} setMainInvoiceData={setMainInvoiceData} invoiceData={invoiceData} setInvoiceData={setInvoiceData} invoice={invoice} key={index} index={index} type={false} />
                      ))}
                    </TableBody>
                    {invoiceData.length !== 0 && (
                      <TableFooter>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-left">₹ {totalAmount}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableFooter>
                    )}
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
          </TabsContent>
        </Tabs>
      </div >
    </div >
  )
}

export default Component