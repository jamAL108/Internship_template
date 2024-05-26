'use client';
import React, { useEffect, useState } from 'react'

//// API imports
import { getClientDetail, deleteClient } from '@/apiReq/newAPIs/client'

/// Basic necessaries import
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as AccordionRadix from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils'
import Link from 'next/link'

/// Child components importing
import Overview from '@/components/homeComponent/client/overview';
import Notes from '@/components/homeComponent/client/Notes';
import Documents from '@/components/homeComponent/client/Documents';
import Cases from '@/components/homeComponent/client/cases';
import Skeleton from './skeleton'

///icons 
import { BsThreeDotsVertical } from "react-icons/bs";
import { Trash2, Plus, ArrowLeft, MoreVertical } from 'lucide-react'
import { BsFillTriangleFill } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";

/// shad cn UI imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionItem,
} from "@/components/ui/accordion"
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

const components: React.FC<any> = (props) => {
  const { clientId } = props
  const [clientInfo, setClientInfo] = useState<any>({})
  const [customFieldKey, setCustomFieldKey] = useState<any>([])
  const [customFieldValue, setCustomFieldValue] = useState<any>([])
  const [loader, setLoader] = useState<boolean>(true)
  const [detailAccordion, setDetailAccordion] = useState<string>('item-1')
  const [tagAccordion, setTagAccordion] = useState<string>('item-1')
  const [noteAccordion, setNoteAccordion] = useState<string>('item-1')
  const [activeNav, setActiveNav] = useState<string>('Overview')

  const [deleteAlert, setDeleteAlert] = useState<boolean>(false)

  // let navcontent = ['Overview', 'Notes', 'Cases', 'Documents']
  let navcontent = ['Overview', 'Notes', 'Cases']
  const router = useRouter()
  useEffect(() => {
    console.log(clientId)
    getClientInfo()
  }, [])
  const getClientInfo = async () => {
    const result: any = await getClientDetail(clientId)
    if (result.success === true) {
      console.log(result.data.custom_fields)
      const customField: any = JSON.parse(result.data.custom_fields)
      setCustomFieldKey(Object.keys(customField))
      setCustomFieldValue(Object.values(customField))
      setClientInfo(result.data)
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
      setTimeout(() => {
        router.back()
      }, 900)
    }
    setLoader(false)
  }
  if (loader === true) {
    return (
      <Skeleton />
    )
  }


  const AccordDetailFunction = () => {
    if (detailAccordion.length !== 0) {
      setDetailAccordion('')
    } else {
      setDetailAccordion('item-1')
    }
  }

  const AccordNoteFunction = () => {
    if (noteAccordion.length !== 0) {
      setNoteAccordion('')
    } else {
      setNoteAccordion('item-1')
    }
  }

  const AccordTagFunction = () => {
    if (tagAccordion.length !== 0) {
      setTagAccordion('')
    } else {
      setTagAccordion('item-1')
    }
  }

  const deleteClientFunction = async () => {
    const result = await deleteClient(clientId)
    if (result.success === false) {
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
      toast.success("client deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.back()
    }
  }

  return (
    <div className='flex w-full h-full justify-center'>

      <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
        <AlertDialogContent className='base:w-[90vw] tv:w-[400px] base:rounded-[10px]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm to delete the client data</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='base:flex-row tv:flex-row base:justify-end base:gap-[10px]'>
            <button className='border-[2px] hover:bg-[#ededed] tracking-wide text-[0.8rem] font-[450] px-[10px] py-[2px] rounded-[4px] ' onClick={(e) => setDeleteAlert(false)}>Cancel</button>
            <button className='hover:bg-[#e5484d] text-[0.8rem] tracking-wide font-[450] px-[10px] py-[2px] flex justify-center items-center rounded-[4px]  text-[#e5484d] hover:text-white border-[#e5484d] border' onClick={(e) => {
              setDeleteAlert(false)
              deleteClientFunction()
            }}>Delete</button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='w-[min(1300px,100%)] h-full base:overflow-y-auto tv:overflow-y-hidden flex base:flex-col tv:flex-row'>
        <div className='base:min-w-full tv:min-w-[37%] base:pl-[20px] tv:pl-[30px] pr-[15px] py-[20px] h-full flex flex-col'>
          <div className='w-full  flex justify-between items-center py-[2px] pr-[15px]'>
            <div className='flex items-center gap-[0.8rem]'>
              <div onClick={(e) => router.push('/home/clients')} className='rounded-full cursor-pointer bg-[#e8effe] w-[28px] h-[28px] flex justify-center items-center'>
                <ArrowLeft size={21} color='#5b89e9' />
              </div>
              <h2 className='text-[0.95rem] font-[500] select-none'>Clients list</h2>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className='outline-none focus:border-none active:border-none border-none'>
                <MoreVertical className='cursor-pointer' size={15} color='black' />
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ position: 'relative' }} className='base:right-[34px] tv:right-[60px]'>
                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]'>
                  <LuPencil size={16} className='opacity-[0.6]' color='black' />
                  <h2>Edit</h2>
                </DropdownMenuItem>
                <DropdownMenuItem className='w-[full] flex gap-2 pl-[7px]' onClick={(e) => {
                  setDeleteAlert(true)
                }}>
                  <Trash2 size={16} className='opacity-[0.6]' color='#FC979F' />
                  <h2 className='text-[#FC979F]'>Delete</h2>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className='w-full flex flex-col pr-[15px] base:overflow-y-hidden tv:hover:overflow-y-auto  overflow-x-hidden  ClientDetailsContainer tv:max-h-[90vh]'>
            <div className='flex flex-col mt-[25px] gap-[15px]'>
              <div className='w-[85px] h-[85px] rounded-[12px] bg-[#c7b9da]'>
              </div>
              <h1 className='text-[1.3rem] font-[600]'>{clientInfo.Salutation} {clientInfo.Name}</h1>
            </div>
            <div className='w-full pt-[20px] py-[10px] flex'>
              <Accordion type="single" value={detailAccordion} collapsible>
                <AccordionItem value='item-1' className='border-none'>
                  <AccordionTrigger className="flex gap-[18px] items-center">
                    <BsFillTriangleFill className='w-[10px]' style={detailAccordion.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(90deg)" }} onClick={AccordDetailFunction} size={8} color='#bfbfbf' />
                    <h2 className='text-[1rem] font-[600]' onClick={AccordDetailFunction}>Client Details</h2>
                    <div className='p-[5px] ml-[-5px] flex mt-[-5px] justify-center items-center rounded-full hover:bg-[#efefef]'>
                      <LuPencil onClick={(e) => router.push(`/home/clients/${clientId}/edit`)} size={16} color='#5b89e9' />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='w-full flex flex-col gap-[6px] py-[10px]'>
                    <div className='w-full flex gap-[16px]'>
                      <h2 className='w-[100px] text-muted-foreground text-[0.77rem] font-[400]'>Email</h2>
                      <Link href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${clientInfo.Email}`} className='text-[#5b89e9] overflow-visible cursor-pointer  text-[0.87rem] font-[500]'>{clientInfo.Email}</Link>
                    </div>
                    <div className='w-full flex gap-[16px]'>
                      <h2 className='w-[100px]  text-muted-foreground text-[0.77rem] font-[400]'>Phone number</h2>
                      <h2 className='text-[#5b89e9]  text-[0.87rem] font-[500]'>{clientInfo.Contact}</h2>
                    </div>
                    <div className='w-full flex gap-[16px]'>
                      <h2 className='w-[100px] text-muted-foreground text-[0.77rem] font-[400]'>Company</h2>
                      <h2 className='text-[0.87rem]  font-[500]'>{clientInfo.Company}</h2>
                    </div>

                    <div className='w-full flex gap-[16px]'>
                      <h2 className='w-[100px] text-muted-foreground text-[0.77rem] font-[400]'>GSTIN</h2>
                      <h2 className='text-[0.87rem]  font-[500]'>{clientInfo.GSTIN}</h2>
                    </div>

                    <div className='w-full flex gap-[16px]'>
                      <h2 className='w-[100px] text-muted-foreground text-[0.77rem] font-[400]'>Address</h2>
                      <h2 className='text-[0.87rem] w-[200px] font-[500]'>{clientInfo.Address}</h2>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='w-full py-[10px] pt-[2px] flex'>
              <Accordion type="single" value={tagAccordion} collapsible>
                <AccordionItem value='item-1' className='border-none'>
                  <AccordionTrigger className="flex gap-[18px] items-center">
                    <BsFillTriangleFill className='w-[10px]' style={tagAccordion.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(90deg)" }} onClick={AccordTagFunction} size={8} color='#bfbfbf' />
                    <h2 className='text-[1rem] font-[600]' onClick={AccordTagFunction}>Tags</h2>
                    <div className='p-[5px] ml-[-9px] flex  justify-center items-center rounded-full hover:bg-[#efefef]'>
                      <Plus size={17} color='#5b89e9' />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='w-full flex flex-wrap gap-[15px] py-[10px]'>
                    {clientInfo.tags.map((tag: any, index: number) => (
                      <div key={index} className='bg-[#e8effe] text-[#5b89e9] flex justify-center items-center px-[15px] py-[7.5px] rounded-l-[40px] rounded-r-[7px]'>
                        <h2 className='text-[0.86rem] font-[500]'>{tag}</h2>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className='w-full py-[10px] pt-[2px] flex'>
              <Accordion type="single" value={noteAccordion} collapsible>
                <AccordionItem value='item-1' className='border-none'>
                  <AccordionTrigger className="flex gap-[18px] items-center">
                    <BsFillTriangleFill className='w-[10px]' style={noteAccordion.length !== 0 ? { transform: "rotate(180deg)" } : { transform: "rotate(90deg)" }} onClick={AccordNoteFunction} size={8} color='#bfbfbf' />
                    <h2 className='text-[1rem] font-[600]' onClick={AccordNoteFunction}>Custom fields</h2>
                    <div className='p-[5px] ml-[-9px] mt-[-5px] flex  justify-center items-center rounded-full hover:bg-[#efefef]'>
                      <Plus size={17} color='#5b89e9' />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='w-full flex gap-[20px] py-[10px]'>
                    <div className='flex justify-center flex-col gap-[7px] text-muted-foreground text-[0.8rem] font-[400]'>
                      {customFieldKey.map((key: string, index: number) => (
                        <h2 key={index}>{key}</h2>
                      ))}
                    </div>
                    <div className='flex justify-center flex-col gap-[7px] text-[0.87rem] font-[500]'>
                      {customFieldValue.map((key: string, index: number) => (
                        <h2 key={index}>{key}</h2>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>

        </div>
        {/* ///w-[37%] */}

        <div className='base:w-full tv:w-[63%] base:px-[15px] tv:px-[0px] tv:pr-[30px] py-[20px] h-full flex flex-col'>
          <div className='w-full gap-[20px] flex pb-[15px] items-center'>
            {navcontent.map((item, index) => (
              <div key={index} onClick={(e) => setActiveNav(item)} style={activeNav === item ? { backgroundColor: '#e8effe', color: "#5b89e9" } : { backgroundColor: "transparent", color: "black" }} className='cursor-pointer rounded-[5px] select-none px-[10px] py-[6px] flex justify-center items-center'>
                <h2 className='text-[0.8rem] font-[500]'>{item}</h2>
              </div>
            ))}
          </div>
          {/* {activeNav === 'Overview' ? (
            <Overview notes={clientInfo.notes} setActiveNav={setActiveNav} />
          ) : activeNav === 'Notes' ? (
            <Notes notes={clientInfo.notes} clientInfo={clientInfo} setClientInfo={setClientInfo} clientId={clientId} />
          ) : activeNav === 'Cases' ? (
            <Cases />
          ) : (
            <Documents />
          )} */}
          {activeNav === 'Overview' ? (
            <Overview notes={clientInfo.notes} setActiveNav={setActiveNav} />
          ) : activeNav === 'Notes' ? (
            <Notes  clientInfo={clientInfo} setClientInfo={setClientInfo} clientId={clientId} />
          ) : (
            <Cases />
          )}
        </div>
      </div>
    </div>
  )
}


export default components



const AccordionTrigger = React.forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <AccordionRadix.Header className="AccordionHeader">
    <AccordionRadix.Trigger
      className={cn('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </AccordionRadix.Trigger>
  </AccordionRadix.Header>
));

const AccordionContent = React.forwardRef(({ className, children, ...props }: any, ref) => (
  <AccordionRadix.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionRadix.Content>
))








// <AccordionContent className='w-full flex gap-[20px] py-[10px]'>
// {/* <div className='flex justify-center flex-col gap-[7px] text-muted-foreground text-[0.77rem] font-[400]'>
//   <h2>Email</h2>
//   <h2>Phone number</h2>
//   <h2>Company</h2>
//   <h2>GSTIN</h2>
//   <h2>Address</h2>
// </div>
// <div className='flex justify-center flex-col gap-[7px] text-[0.87rem] font-[500]'>
//   <Link href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${clientInfo.Email}`} className='text-[#5b89e9] cursor-pointer'>{clientInfo.Email}</Link>
//   <h2 className='text-[#5b89e9]'>{clientInfo.Contact}</h2>
//   <h2>{clientInfo.Company}</h2>
//   <h2>{clientInfo.GSTIN}</h2>
//   <h2>{clientInfo.Address}</h2>
// </div> */}
// </AccordionContent>