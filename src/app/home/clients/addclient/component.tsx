'use client'
import React, { useState } from 'react'
import { MoreHorizontal, Plus, Trash2, CheckCircle2 } from 'lucide-react'
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify';
import { addClient } from '@/apiReq/newAPIs/client'
import { ColorRing } from 'react-loader-spinner'
import { useRouter } from 'next/navigation'

import CustomTag from './customTag'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Component = () => {
    const router = useRouter()
    const [customTag, setCustomTag] = useState<any>(CustomTag)
    const [customTagInput, setCustomTagInput] = useState<string>('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [contactError, setContactError] = useState<boolean>(false)
    const [loader, setloader] = useState<boolean>(false)
    const [customFieldKey, setCustomFieldKey] = useState<any>([''])
    const [customFieldValue, setCustomFieldValue] = useState<any>([''])
    const [clientDetail, setClientDetail] = useState<any>({
        Name: '',
        Salutation: "",
        Company: '',
        Group: '',
        Contact: "",
        Email: "",
        GSTIN: "",
        Address: "",
    })

    const check = async () => {
        setloader(true)
        setNameError(false)
        setContactError(false)
        if (clientDetail.Name.length === 0) {
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
        if (clientDetail.Contact.length === 0) {
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
        }
        if (clientDetail.Contact.length !== 0 && clientDetail.Name.length !== 0) {
            const obj = {
                clientDetail,
                customFieldKey,
                customFieldValue,
                customTag
            }
            const result: any = await addClient(obj)
            if (result.error === null) {
                toast.success('client created successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setClientDetail({
                    Name: '',
                    Salutation: "",
                    Company: '',
                    Group: '',
                    Contact: "",
                    Email: "",
                    GSTIN: "",
                    Address: "",
                })
                setCustomFieldKey([''])
                setCustomFieldValue([''])
                router.back()
            } else {
                toast.error(result.error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        setloader(false)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addItem();
        }
    };

    const addItem = () => {
        if (customTagInput.trim() !== '') {
            let arr = [...customTag]
            const obj ={
                name:customTagInput,
                selected:true
            }
            arr.unshift(obj)
            setCustomTag(arr)
            setCustomTagInput('')
        }
    };

    const scroll = (string: any) => {
        let target: any = document.querySelector(`.${string}`);
        console.log(target);
        target.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <div className='w-full h-full flex flex-col overflow-y-auto'>
                <div className='w-full px-[25px] base:py-[15px] tv:py-[20px] border-b-[2px] flex justify-between items-center topComponentOfAddClient'>
                    <div className=' flex gap-2 items-center'>
                        <h1 className='text-[1.5rem] font-[600] tracking-[0.6px]'>Add Client</h1>
                        <MoreHorizontal size={20} className='cursor-pointer' />
                    </div>
                </div>

                <div className='px-[25px] py-[10px] w-full flex flex-col gap-4'>
                    <div className='w-full py-[5px] flex flex-col gap-2'>
                        <h2 className='text-[1.13rem] text-muted-foreground font-[420]'>Basic Details</h2>
                    </div>

                    <div className='base:pl-[10px] tv:pl-[25px] base:pr-[10px] tv:pr-[50px] w-full flex flex-wrap base:gap-[20px] tv:gap-[40px]'>

                        <div className="base:w-[250px] tv:w-[30%] flex flex-col space-y-1.5">
                            <Label className={`${nameError === true ? '!text-[#ff3333]' : 'text-black'}`} htmlFor="name">Name <span className={`pl-[6px] text-[0.63rem] ${nameError === true ? '!text-[#ff3333]' : 'text-black'}`}>(required)</span></Label>
                            <Input value={clientDetail.Name} onChange={(e) => setClientDetail({ ...clientDetail, Name: e.target.value })} id="name" placeholder="Name of contact" className={` ${nameError === true ? 'border-[#ff3333]' : 'border-[#e5e7eb]'}`} />
                        </div>

                        <div className="base:w-[220px] tv:w-[20%] flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Salutation</Label>
                            <Select value={clientDetail.Salutation} onValueChange={(newValue) => setClientDetail({ ...clientDetail, Salutation: newValue })}>
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

                        <div className="base:w-[250px] tv:w-[30%] flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email</Label>
                            <Input value={clientDetail.Email} onChange={(e) => setClientDetail({ ...clientDetail, Email: e.target.value })} id="name" placeholder="Email of contact" />
                        </div>

                        <div className="base:w-[250px] tv:w-[30%] flex flex-col space-y-1.5">
                            <Label htmlFor="name">Company</Label>
                            <Input value={clientDetail.Company} onChange={(e) => setClientDetail({ ...clientDetail, Company: e.target.value })} id="name" placeholder="Name of company" />
                        </div>
                        <div className="base:w-[250px] tv:w-[30%] flex flex-col space-y-1.5">
                            <Label htmlFor="name">Group</Label>
                            <Input value={clientDetail.Group} onChange={(e) => setClientDetail({ ...clientDetail, Group: e.target.value })} id="name" placeholder="Name of group" />
                        </div>

                        <div className="base:w-[260px] tv:w-[40%] flex flex-col space-y-1.5">
                            <Label className={`${contactError === true ? '!text-[#ff3333]' : 'text-black'}`} htmlFor="name">Contact <span className={`pl-[6px] text-[0.63rem] ${contactError === true ? '!text-[#ff3333]' : 'text-black'}`}>(required)</span></Label>
                            <Input value={clientDetail.Contact} onChange={(e) => setClientDetail({ ...clientDetail, Contact: e.target.value })} className={` ${contactError === true ? 'border-[#ff3333]' : 'border-[#e5e7eb]'}`} id="name" placeholder="Enter phone number of contact" />
                        </div>

                        <div className="base:w-[260px] tv:w-[40%] flex flex-col space-y-1.5">
                            <Label htmlFor="name">GSTIN </Label>
                            <Input value={clientDetail.GSTIN} onChange={(e) => setClientDetail({ ...clientDetail, GSTIN: e.target.value })} id="name" placeholder="Enter GST Number" />
                        </div>
                    </div>


                    <div className='w-full py-[5px] flex flex-col gap-2 mt-[25px]'>
                        <h2 className='text-[1.13rem] text-muted-foreground font-[420]'>Client Address</h2>
                    </div>

                    <div className='base:pl-[10px] tv:pl-[25px] base:pr-[10px] tv:pr-[50px] w-full flex flex-wrap gap-[50px]'>
                        <div className="base:w-[260px] tv:w-[40%] flex flex-col space-y-1.5">
                            <Label htmlFor="name">Address</Label>
                            <Textarea value={clientDetail.Address} onChange={(e) => setClientDetail({ ...clientDetail, Address: e.target.value })} placeholder="Contact Address..." className='h-[120px] !resize-none  break-words' />
                        </div>
                    </div>


                    <div className='w-full py-[5px] flex flex-col gap-2 mt-[25px]'>
                        <h2 className='text-[1.13rem] text-muted-foreground font-[420]'>Add Tags</h2>
                    </div>

                    <div className='base:pl-[10px] tv:pl-[25px] base:pr-[10px] tv:pr-[50px] w-full flex flex-wrap gap-[50px]'>
                        <div className="base:w-[260px] tv:w-[40%] gap-[18px] flex flex-col pb-[10px] tv:px-[15px] rounded-[10px]">
                            <Input onKeyPress={handleKeyPress} value={customTagInput} onChange={(e) => {
                                setCustomTagInput(e.target.value)
                            }} placeholder='Enter your custom tags here' className='px-[15px] bg-[#f7f7f7] placeholder:select-none rounded-[6px] py-[13px] border text-[0.9rem] w-full' />
                            <div className='w-full flex flex-col gap-[8px]'>
                                <Label htmlFor="name" className='text-[0.77rem] opacity-[0.7] font-[470]'>Select tags from below list</Label>
                                <div className='w-full select-none cursor-pointer rounded-[6px] flex flex-wrap gap-[10px]'>
                                    {
                                        customTag.map((tag: any, index: number) => (
                                            <div key={index} onClick={(e) => {
                                                let arr = [...customTag]
                                                if (arr[index].selected === true) {
                                                    arr[index].selected = false
                                                } else {
                                                    arr[index].selected = true
                                                }
                                                setCustomTag(arr)
                                            }} className={`px-[8px] py-[3px] rounded-[6px] flex justify-center text-[0.77rem] border-[1.8px] items-center  gap-[6px]  ${tag.selected === false ? 'bg-white text-black hover:bg-[#f5f5f5]' : 'bg-[#0064FF] hover:bg-[#0064FF] text-white'} `}>{tag.name}
                                                {
                                                    tag.selected === true && (
                                                        <CheckCircle2 size={14} color='white' />
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className='w-full py-[5px] base:pr-[0px] tv:pr-[60px] flex base:items-center tv:items-start justify-between gap-2 mt-[25px]'>
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

                    <div className='base:pl-[10px] tv:pl-[25px] base:pr-[10px] tv:pr-[60px] w-full flex flex-col gap-[25px]'>
                        {customFieldKey.map((item: any, idx: number) => (
                            <div className='w-full flex justify-between base:items-start tv:items-center'>

                                <div className='flex base:gap-[15px] tv:gap-[30px] base:flex-col tv:flex-row'>
                                    <div className="base:w-[200px] tv:w-[300px] flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Key</Label>
                                        <Input id="name" placeholder="Enter Key" value={customFieldKey[idx]} onChange={(e) => {
                                            let keey = [...customFieldKey]
                                            keey[idx] = e.target.value
                                            setCustomFieldKey(keey)
                                        }} />
                                    </div>
                                    <div className="base:w-[200px] tv:w-[300px] flex flex-col space-y-1.5">
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

                <div className='base:pl-[10px] tv:pl-[25px] base:pr-[20px] tv:pr-[80px] py-[10px] w-full'>
                    <div className='min-h-[100px] flex justify-end items-center gap-6'>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            setClientDetail({
                                Name: '',
                                Salutation: "",
                                Company: '',
                                Group: '',
                                Contact: "",
                                Email: "",
                                GSTIN: "",
                                Address: "",
                            })
                            setCustomFieldKey([''])
                            setCustomFieldValue([''])
                        }} variant='outline' className='border-[#0064FF]'>
                            clear all
                        </Button>
                        <Button disabled={loader} style={loader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => check()} className='bg-[#0064FF] flex items-center justify-center gap-2 hover:bg-[#004fc5]'>
                            <ColorRing
                                visible={loader}
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
        </>
    )
}

export default Component

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border-[2px] border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:opacity-[0.8] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#0064FF]",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)