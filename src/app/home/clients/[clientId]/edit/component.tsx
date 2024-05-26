'use client';
import React, { useEffect, useState } from 'react'
import { getClientDetail } from '@/apiReq/newAPIs/client'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Skeleton from './Skeleton';
import { ArrowLeft, Tags } from 'lucide-react';
import { ColorRing } from 'react-loader-spinner'
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify';

import { updateClientDetail } from '@/apiReq/newAPIs/client'

const component: React.FC<any> = (props) => {
  const { clientId } = props
  const router = useRouter()
  const [customFieldKey, setCustomFieldKey] = useState<any>([''])
  const [customFieldValue, setCustomFieldValue] = useState<any>([''])

  const [nameError, setNameError] = useState<boolean>(false)
  const [contactError, setContactError] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(true)


  const [Requestloader, setRequestloader] = useState<boolean>(false)
  const [clientInfo, setClientInfo] = useState<any>({})
  const [tags , setTags] = useState<any>([])
  useEffect(() => {
    console.log(clientId)
    getClientInfo()
  }, [])

  const getClientInfo = async () => {
    const result: any = await getClientDetail(clientId)
    if (result.success === true) {
      const customField: any = JSON.parse(result.data.custom_fields)
      setCustomFieldKey(Object.keys(customField))
      setCustomFieldValue(Object.values(customField))
      setClientInfo(result.data)
      setTags(result.data.tags)
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
    <Skeleton />
  }

  const check = async () => {
    setRequestloader(true)
    setNameError(false)
    setContactError(false)
    if (clientInfo.Name.length === 0) {
      scroll('topComponentOfAddClient')
      toast.error(`Please Mention the client's name.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNameError(true)
    }
    if (clientInfo.Contact.length === 0) {
      scroll('topComponentOfAddClient')
      toast.error(`Please Mention the client's contact.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setContactError(true)
    } else if (clientInfo.Contact.length !== 0 && clientInfo.Name.length !== 0) {
      const obj = {
        formdata: {
          clientInfo,
          customFieldKey,
          customFieldValue
        },
        clientId,
        tags
      }
      const result:any = await updateClientDetail(obj)
      console.log(result)
      if (result.success === true) {
        toast.success("Changes are successfully saved", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push(`/home/clients/${clientId}`)
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
        setRequestloader(false)
      }
    }
  }


  const scroll = (string: any) => {
    let target: any = document.querySelector(`.${string}`);
    console.log(target);
    target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>

      <div className='w-full px-[30px] py-[20px] flex items-center gap-[0.7rem]'>
        <div onClick={(e) => router.back()} className='rounded-full cursor-pointer bg-[#e8effe] w-[28px] h-[28px] flex justify-center items-center'>
          <ArrowLeft size={21} color='#5b89e9' />
        </div>
        <h2 className='text-[0.95rem] font-[500]'>Go Back</h2>
      </div>

      <div className='w-[min(1250px,100%)] px-[30px] h-full overflow-y-auto'>
        <div className='py-[20px] pt-[5px] w-full flex flex-col gap-4'>
          <div className='w-full py-[5px] flex flex-col gap-2 topComponentOfAddClient'>
            <h2 className='text-[1.13rem] text-muted-foreground font-[420]'>Basic Details</h2>
          </div>

          <div className='pl-[25px] pr-[50px] w-full flex flex-wrap gap-[40px]'>

            <div className="w-[30%] flex flex-col space-y-1.5">
              <Label className={`${nameError === true ? '!text-[#ff3333]' : 'text-black'}`} htmlFor="name">Name <span className={`pl-[6px] text-[0.63rem] ${nameError === true ? '!text-[#ff3333]' : 'text-black'}`}>(required)</span></Label>
              <Input value={clientInfo.Name} onChange={(e) => setClientInfo({ ...clientInfo, Name: e.target.value })} id="name" placeholder="Name of contact" className={` ${nameError === true ? 'border-[#ff3333]' : 'border-[#e5e7eb]'}`} />
            </div>

            <div className="w-[20%] flex flex-col space-y-1.5">
              <Label htmlFor="framework">Salutation</Label>
              <Select value={clientInfo.Salutation} onValueChange={(newValue) => setClientInfo({ ...clientInfo, Salutation: newValue })}>
                <SelectTrigger id="framework" className='!placeholder:text-muted-foreground !placeholder:opacity-[0.7]'>
                  <SelectValue placeholder="Salutation" className='!placeholder:opacity-[0.7]' />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className=" w-[30%] flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input value={clientInfo.Email} onChange={(e) => setClientInfo({ ...clientInfo, Email: e.target.value })} id="name" placeholder="Email of contact" />
            </div>

            <div className="w-[30%] flex flex-col space-y-1.5">
              <Label htmlFor="name">Company</Label>
              <Input value={clientInfo.Company} onChange={(e) => setClientInfo({ ...clientInfo, Company: e.target.value })} id="name" placeholder="Name of company" />
            </div>
            <div className="w-[30%] flex flex-col space-y-1.5">
              <Label htmlFor="name">Group</Label>
              <Input value={clientInfo.Group} onChange={(e) => setClientInfo({ ...clientInfo, Group: e.target.value })} id="name" placeholder="Name of group" />
            </div>

            <div className="w-[40%] flex flex-col space-y-1.5">
              <Label className={`${contactError === true ? '!text-[#ff3333]' : 'text-black'}`} htmlFor="name">Contact <span className={`pl-[6px] text-[0.63rem] ${contactError === true ? '!text-[#ff3333]' : 'text-black'}`}>(required)</span></Label>
              <Input value={clientInfo.Contact} onChange={(e) => setClientInfo({ ...clientInfo, Contact: e.target.value })} className={` ${contactError === true ? 'border-[#ff3333]' : 'border-[#e5e7eb]'}`} id="name" placeholder="Enter phone number of contact" />
            </div>

            <div className="w-[40%] flex flex-col space-y-1.5">
              <Label htmlFor="name">GSTIN </Label>
              <Input value={clientInfo.GSTIN} onChange={(e) => setClientInfo({ ...clientInfo, GSTIN: e.target.value })} id="name" placeholder="Enter GST Number" />
            </div>
          </div>


          <div className='w-full py-[5px] flex flex-col gap-2 mt-[25px]'>
            <h2 className='text-[1.13rem] text-muted-foreground font-[420]'>Client Address</h2>
          </div>

          <div className='pl-[25px] pr-[50px] w-full flex flex-wrap gap-[50px]'>
            <div className="w-[40%] flex flex-col space-y-1.5">
              <Label htmlFor="name">Address</Label>
              <Textarea value={clientInfo.Address} onChange={(e) => setClientInfo({ ...clientInfo, Address: e.target.value })} placeholder="Contact Address..." className='h-[120px] !resize-none  break-words' />
            </div>
          </div>


          <div className='w-full py-[5px] pr-[60px] flex justify-between gap-2 mt-[25px]'>
            <h2 className='text-[1.13rem] text-muted-foreground font-[420]'>Custom Fields</h2>
            <button onClick={(e) => {
              let keey = [...customFieldKey]
              let valuee = [...customFieldValue]
              keey.push('')
              valuee.push('')
              setCustomFieldKey(keey)
              setCustomFieldValue(valuee)
            }} className='h-[40px] transition duration-500 ease-in-out  hover:bg-[#e5e5e5] rounded-[8px] border-[2px] px-[10px] py-[5px] flex justify-center items-center gap-[0.6rem]'>
              <Plus size={20} color='#888888' />
              <h2 className='text-[0.8rem] font-[440]'>Add custom field</h2>
            </button>
          </div>

          <div className='pl-[25px] pr-[60px] w-full flex flex-col gap-[25px]'>
            {customFieldKey.map((item: any, idx: number) => (
              <div key={idx} className='w-full flex justify-between items-center'>

                <div className='flex gap-[30px]'>
                  <div className="w-[300px] flex flex-col space-y-1.5">
                    <Label htmlFor="name">Key</Label>
                    <Input id="name" placeholder="Enter Key" value={customFieldKey[idx]} onChange={(e) => {
                      let keey = [...customFieldKey]
                      keey[idx] = e.target.value
                      setCustomFieldKey(keey)
                    }} />
                  </div>
                  <div className="w-[300px] flex flex-col space-y-1.5">
                    <Label htmlFor="name">Value</Label>
                    <Input id="name" placeholder="Enter Value" value={customFieldValue[idx]} onChange={(e) => {
                      let valuee = [...customFieldValue]
                      valuee[idx] = e.target.value
                      setCustomFieldValue(valuee)
                    }} />
                  </div>
                </div>

                <div onClick={(e) => {
                  e.preventDefault()
                  let keey = [...customFieldKey]
                  let valuee = [...customFieldValue]
                  keey.splice(idx, 1)
                  valuee.splice(idx, 1)
                  setCustomFieldKey(keey)
                  setCustomFieldValue(valuee)
                }} className='cursor-pointer hover:bg-[#e5e5e5] transition duration-500 ease-in-out flex justify-center items-center p-[7px] rounded-[5px] border-[1.7px] border-[#888888]'>
                  <Trash2 color='#888888' size={20} />
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className='px-[25px] pr-[80px] py-[10px] w-full'>
          <div className='min-h-[100px] flex justify-end items-center gap-6'>
            <Button onClick={(e) => {
              e.preventDefault()
            }} variant='outline' className='border-[#0064FF]'>
              cancel
            </Button>
            <Button disabled={Requestloader} style={Requestloader === true ? { opacity: 0.67 } : { opacity: 1 }} className='bg-[#0064FF] flex items-center justify-center gap-2 hover:bg-[#004fc5]' onClick={check}>
              <ColorRing
                visible={Requestloader}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
              save changes
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default component