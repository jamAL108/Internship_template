'use client';
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// @ts-ignore  
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
// @ts-ignore  
import { Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
// @ts-ignore  
import { ColorRing } from 'react-loader-spinner'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from 'react-toastify';
import { getAllClients, addInvoice } from '@/apiReq/newAPIs/invoice'
import { Plus } from 'lucide-react'
import { MoreHorizontal, ArrowLeft, ArrowRight, Image, ImageMinus } from 'lucide-react'
import { IndianRupee } from 'lucide-react';
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
import './style.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table"



import { generateInvoice, getClientDetail, sendInvoiceToMail } from '@/apiReq/newAPIs/invoice'
import { truncateSync } from 'fs';
import LivePreview from './livePreview';
import { FileDown } from 'lucide-react'
const Component = () => {
    const [clientdata, setClientDetail] = useState<any>([])
    const [particularKey, setParticularKey] = useState<any>([''])
    const [particularValue, setParticularValue] = useState<any>([''])
    const [loader, setloader] = useState<boolean>(false)
    const [draftLoader, setDraftLoader] = useState<boolean>(false)

    const reportTemplateRef = useRef<any>(null);

    const [raiseModal, setRaiseModal] = useState<boolean>(false)
    const [downloadLoad, setDownloadLoader] = useState<boolean>(false)

    const [invoiceData, setInvoiceData] = useState<any>({
        resourceType: "None",
        resourceName: "",
        clientID: "",
        clientName: "",
        dueDate: new Date(),
        totalAmount: 0,
    })

    const [otherData, setOtherData] = useState<any>({
        bankName: "",
        accountName: "",
        accountNumber: "",
        additionalNotes: '',
        paymentTerms: '',
        pdfTemplate: 1,
        invoiceDate: new Date(),
        invoiceNumber: '',
        clientEmail: "",
        clientAddress: "",
        clientContact: '',
        senderName: "",
        senderEmail: "",
        senderContact: ""
    })

    const [clientError, setClientError] = useState<boolean>(false)

    const [currentInfoIndex, setCurrentInfoIndex] = useState<number>(0)

    const [image, setImage] = useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleParentClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const router = useRouter()
    useEffect(() => {
        getAllClientFunction()
    }, [])

    const getAllClientFunction = async () => {
        const result: any = await getAllClients()
        if (result.success === true) {
            setClientDetail(result.data)
            console.log(result)
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
        }
    }

    const check = async (invoiceStatus: string) => {
        setClientError(false)
        if (invoiceData.clientID.length === 0) {
            setClientError(true)
        } else {
            if (invoiceStatus === 'draft') {
                setDraftLoader(true)
            } else {
                setloader(true)
            }
            const obj = {
                form: {
                    resourceType: invoiceData.resourceType,
                    resourceName: invoiceData.resourceName,
                    clientID: invoiceData.clientID,
                    dueDate: invoiceData.dueDate,
                    totalAmount: invoiceData.totalAmount,
                    status: invoiceStatus === 'draft' ? 0 : 1
                },
                particularKey,
                particularValue
            }
            const result: any = await addInvoice(obj)
            if (result.success === true) {
                const resp: any = await sendInvoiceToMail({ ...invoiceData, ...otherData, Logo: image, particularKey, particularValue })
                if (resp.success === true) {
                    toast.success('Invoice send successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setInvoiceData({
                        resourceType: "",
                        resourceName: "",
                        clientID: "",
                        clientName: "",
                        duedate: new Date(),
                        totalAmount: 0
                    })
                    setParticularKey([''])
                    setParticularValue([''])
                    router.back()
                } else {
                    toast.error(resp.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setloader(false)
                    setDraftLoader(false)
                }
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
                setloader(false)
                setDraftLoader(false)
            }
        }
    }

    useEffect(() => {
        console.log(invoiceData)
    }, [invoiceData])


    const generatePDFFunction = async () => {
        setDownloadLoader(true)
        const result: any = await generateInvoice({ ...invoiceData, ...otherData, Logo: image, particularKey, particularValue })
        console.log(result)
        if (result.success === true) {
            setRaiseModal(false)
            setDownloadLoader(false)
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
            setRaiseModal(false)
            setDownloadLoader(false)
        }
    }


    return (
        <div className='w-full h-full flex flex-col overflow-y-auto'>
            <div className='w-full px-[25px] base:py-[15px] tv:py-[20px] flex justify-between items-center topComponentOfAddClient'>
                <div className=' flex gap-2 items-center'>
                    <h1 className='text-[1.5rem] font-[600] tracking-[0.6px]'>Raise Invoice</h1>
                    <MoreHorizontal size={20} className='cursor-pointer' />
                </div>
                <div className='flex justify-end items-center gap-6'>
                    <Button onClick={(e) => {
                        setInvoiceData({
                            resourceType: "",
                            resourceName: "",
                            clientID: "",
                            clientName: "",
                            duedate: new Date()
                        })
                        // setloader(false)
                        setParticularKey([''])
                        setParticularValue([''])
                    }} variant='outline' className='border-[#0064FF]'>
                        clear all
                    </Button>

                    <Button disabled={loader || draftLoader} style={draftLoader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => {
                        check('draft')
                    }} variant='outline' className='border-[#0064FF] flex items-center justify-center gap-2'>
                        <ColorRing
                            visible={draftLoader}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#0064FF', '#0064FF', '#0064FF', '#0064FF', '#0064FF']}
                        />
                        Save as Draft
                    </Button>

                    <Button onClick={(e) => {
                        setRaiseModal(true)
                    }} className='bg-[#0064FF] px-[20px] flex items-center justify-center gap-2 hover:bg-[#004fc5]'>
                        Raise
                    </Button>
                </div>
            </div>

            <div className={`w-[100vw] ${raiseModal === true ? 'flex' : 'hidden'} h-[100vh] bg-[rgba(0,0,0,0.5)] justify-center items-center absolute top-0 right-0 z-[1000000]`}>
                <div className='w-[800px] h-[min(640px,90vh)] flex justify-center items-center py-[20px] px-[20px] bg-white gap-[40px] rounded-[20px]'>

                    <div className='w-[65%] h-full flex justify-center items-center'>
                        <LivePreview formdata={{ ...invoiceData, ...otherData, Logo: image, particularKey, particularValue, raiseModal }} />
                    </div>

                    <div className='w-[35%] flex items-center justify-center flex-col gap-[20px]'>
                        <Button disabled={loader || draftLoader || downloadLoad} style={downloadLoad === true ? { opacity: 0.67 } : { opacity: 1 }} className='bg-[#0064FF] flex justify-center items-center gap-2 w-[200px] hover:bg-[#004fc5]' onClick={generatePDFFunction}
                        >
                            <ColorRing
                                visible={downloadLoad}
                                height="20"
                                width="20"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />
                            Download</Button>

                        <Button disabled={loader} style={loader === true ? { opacity: 0.67 } : { opacity: 1 }} className='bg-[#0064FF] w-[200px] flex justify-center items-center gap-2 hover:bg-[#004fc5]' onClick={(e) => check('raise')}>
                            <ColorRing
                                visible={loader}
                                height="20"
                                width="20"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />
                            Confirm Invoice</Button>

                        <Button variant='outline' className='w-[200px] border-[#0064FF] text-[#0064FF] hover:bg-[#0064FF] hover:text-white' onClick={(e) => setRaiseModal(false)}>Cancel</Button>
                    </div>
                </div>
            </div>

            <div className='px-[25px] py-[10px] w-full flex flex-col gap-4'>

                {currentInfoIndex === 0 ? (
                    <div className='min-h-[300px] flex flex-col gap-2'>
                        <div className='w-full py-[5px] flex flex-col gap-2'>
                            <h1 className='text-xl font-[600]'>Necessary Informations:</h1>
                        </div>
                        <div className='flex gap-[70px]  items-center w-full '>
                            <div className="space-y-2 ">
                                <Label htmlFor="resource">Resource</Label>
                                <Select defaultValue='None' value={invoiceData.resourceType} onValueChange={(e: any) => {
                                    setInvoiceData({ ...invoiceData, resourceType: e })
                                }}>
                                    <SelectTrigger className='px-[8px] py-[6px] min-w-[160px]' aria-label="Resource" id="resource">
                                        <SelectValue placeholder="Select a resource" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="None" className='hover:bg-[#f1f5f9]'>None</SelectItem>
                                        <SelectItem value="Case" className='hover:bg-[#f1f5f9]'>Case</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 w-[400px]">
                                <Label htmlFor="details">Resource name</Label>
                                {invoiceData.resourceType === 'None' ? (
                                    <Input value={invoiceData.resourceName} onChange={(e) => {
                                        setInvoiceData({ ...invoiceData, resourceName: e.target.value })
                                    }} className="" id="details" placeholder="Resource name" />
                                ) : (
                                    <Select defaultValue='None' value={invoiceData.resourceName} onValueChange={(e: any) => {
                                        setInvoiceData({ ...invoiceData, resourceType: e })
                                    }}>
                                        <SelectTrigger className='min-w-[160px]' aria-label="Resource" id="resource">
                                            <SelectValue placeholder="Select a resource" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="None">None</SelectItem>
                                            <SelectItem value="Case">Case</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>

                        <div className='w-full pt-[10px] flex gap-[70px] items-center'>
                            <div className="space-y-2" >
                                <Label htmlFor="contact">Choose client</Label>
                                <Select value={invoiceData.clientID} onValueChange={(e: any) => {
                                    let clientData: any = clientdata.filter((item: any) => item.id === e)
                                    clientData = clientData[0]
                                    setInvoiceData((prevData: any) => ({
                                        ...prevData,
                                        clientID: e,
                                        clientName: clientData.Name,
                                    }));
                                    setOtherData({
                                        ...otherData,
                                        clientAddress: clientData.Address,
                                        clientContact: clientData.Contact,
                                        clientEmail: clientData.Email
                                    })
                                }}>
                                    <SelectTrigger className='px-[15px] py-[15px] text-[0.8rem] min-w-[200px] text-left clientSelectTrigger' aria-label="Contact" id="contact">
                                        <SelectValue placeholder="Select a contact" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientdata.map((client: any, index: number) => (
                                            <SelectItem className='!hover:bg-[#e8effe]' key={index} value={client.id}>
                                                <div className='w-full h-full flex flex-col clientOtherInfoForInvoice'>
                                                    <h2 className='text-[0.9rem] font-[450]'>{client.Name}</h2>
                                                    <p className='text-[0.7rem] font-[400] '>{client.Contact} | {client.Email}</p>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='flex gap-[40px]'>

                            <div className='flex flex-col gap-2 mt-[40px]'>
                                <h2 className='text-md font-[600]'>Bill From:</h2>
                                <div className='w-[500px] flex flex-wrap gap-[30px]'>
                                    <div className=" flex flex-col space-y-1.5">
                                        <h2 className='text-[0.88rem] font-[500]'>Name:</h2>
                                        <Input id="name" className='min-w-[200px]' value={otherData.senderName} onChange={(e)=>setOtherData({...otherData,senderName:e.target.value})} placeholder="Sender Name" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <h2 className='text-[0.88rem] font-[500]'>Email:</h2>
                                        <Input id="name" className='min-w-[250px]' value={otherData.senderEmail} onChange={(e)=>setOtherData({...otherData,senderEmail:e.target.value})}  placeholder="Sender Email" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <h2 className='text-[0.88rem] font-[500]'>Contact:</h2>
                                        <Input id="name" className='min-w-[200px]' value={otherData.senderContact} onChange={(e)=>setOtherData({...otherData,senderContact:e.target.value})}  placeholder="Sender Contact" />
                                    </div>
                                </div>
                            </div>
                            {
                                invoiceData.clientID && invoiceData.clientID.length !== 0 && (
                                    <div className='flex flex-col gap-2 mt-[40px]'>
                                        <h2 className='text-md font-[600]'>Bill To:</h2>
                                        <div className='w-[500px] flex flex-wrap gap-[30px]'>
                                            <div className=" flex flex-col space-y-1.5">
                                                <h2 className='text-[0.88rem] font-[500]'>Name:</h2>
                                                <Input id="name" className='min-w-[200px]' value={invoiceData.clientName} placeholder="Bank Name" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <h2 className='text-[0.88rem] font-[500]'>Email:</h2>
                                                <Input id="name" className='min-w-[250px]' value={otherData.clientEmail} placeholder="Account Name" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <h2 className='text-[0.88rem] font-[500]'>Contact:</h2>
                                                <Input id="name" className='min-w-[200px]' value={otherData.clientContact} placeholder="Account Number" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <h2 className='text-[0.88rem] font-[500]'>Contact:</h2>
                                                <Textarea id="name" className='min-w-[250px]' value={otherData.clientAddress} placeholder="Account Number" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                ) : currentInfoIndex === 1 ? (
                    <div className='w-full min-h-[300px] flex flex-col gap-3'>
                        <h1 className='text-xl font-[600]'>Invoice Details:</h1>
                        <div className='flex base:flex-col tv:flex-row w-full gap-[50px]'>
                            <div className='flex flex-col  gap-2'>
                                <h2 className='text-md font-[500]'>Invoice Logo:</h2>
                                {
                                    image === null && (
                                        <div onClick={handleParentClick} className='border-[2px] border-black rounded-[7px] hover:border-[#a0c1f6] bg-[#f3f4f6] px-[20px] py-[30px] flex justify-center items-center flex-col w-[200px] cursor-pointer gap-2'>
                                            <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                                            <Image size={22} />
                                            <h2 className='text-[0.9rem] font-[500]'>Click to uplaod Logo</h2>
                                        </div>
                                    )
                                }
                                {image && (
                                    <div className='flex flex-col gap-3 min-w-[180px]'>
                                        <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '140px', maxHeight: '140px' }} />
                                        <button className='hover:bg-[#f05656] flex justify-center items-center gap-2 text-md font-[500] bg-[#EF4444] text-white w-auto px-[8px] py-[8px] rounded-[6px]' onClick={handleRemoveImage}><ImageMinus size={22} color='white' /> Remove Image</button>
                                    </div>
                                )}
                            </div>
                            <div className='w-[150px] gap-2 flex flex-col'>
                                <h2 className='text-md font-[500]'>Invoice Number:</h2>
                                <Input id="name" className='min-w-[180px]' value={otherData.invoiceNumber} onChange={(e) => setOtherData({ ...otherData, invoiceNumber: e.target.value })} placeholder="Invoice Number" />
                            </div>
                            <div className=' gap-4 flex flex-col bl:pl-[30px] items-center'>
                                <div className=' gap-4 flex  '>
                                    <h2 className='text-md font-[500] w-[100px]'>Issue Date:</h2>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !otherData.invoiceDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {otherData.invoiceDate ? format(otherData.invoiceDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={otherData.invoiceDate}
                                                onSelect={(e: any) => {
                                                    setOtherData({ ...otherData, invoiceDate: e })
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className=' gap-4 flex '>
                                    <h2 className='text-md font-[500] w-[100px]'>Due Date:</h2>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !invoiceData.dueDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {invoiceData.dueDate ? format(invoiceData.dueDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={invoiceData.dueDate}
                                                onSelect={(e: any) => {
                                                    setInvoiceData({ ...invoiceData, dueDate: e })
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : currentInfoIndex === 2 ? (
                    <div className='w-full min-h-[300px] flex flex-col gap-3'>
                        <div className='flex justify-between items-center w-[700px]'>
                            <h1 className='text-xl font-[600]'>Particulars:</h1>
                            <div className='flex justify-center items-center gap-3 '>
                                <div className='px-[20px] py-[5px] flex justify-end items-center'>
                                    <h2>Total Amount: <span className='text-[0.9rem] font-[600]'>{invoiceData.totalAmount}</span></h2>
                                </div>
                                <button onClick={(e) => {
                                    let keey = [...particularKey]
                                    let valuee = [...particularValue]
                                    keey.push('')
                                    valuee.push('')
                                    setParticularKey(keey)
                                    setParticularValue(valuee)
                                }} className='h-[40px] transition duration-500 ease-in-out  hover:bg-[#e5e5e5] rounded-[8px] border-[2px] px-[10px] py-[5px] flex justify-center items-center gap-[0.6rem]'>
                                    <Plus size={20} color='#888888' />
                                    <h2 className='text-[0.8rem] font-[440]'>Add particulars</h2>
                                </button>
                            </div>
                        </div>
                        <div className='base:pl-[10px] tv:pl-[25px] base:pr-[10px] tv:pr-[60px] w-full flex flex-col gap-[25px]'>
                            {particularKey.map((item: any, idx: number) => (
                                <div key={idx} className='w-full flex flex-col gap-3'>
                                    <h1 className='text-[0.94rem] font-[500]'>{`Particular ${idx + 1}`}</h1>
                                    <div className='w-full flex items-center'>
                                        <div className='flex base:gap-[15px] tv:gap-[30px] base:flex-col tv:flex-row'>
                                            <div className="base:w-[200px] tv:w-[300px] flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Particular</Label>
                                                <Input id="name" placeholder="Enter Particular" value={particularKey[idx]} onChange={(e) => {
                                                    let keey = [...particularKey]
                                                    keey[idx] = e.target.value
                                                    setParticularKey(keey)
                                                }} />
                                            </div>
                                            <div className="base:w-[200px] tv:w-[300px] flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Amount</Label>
                                                <div className='flex border rounded-[7px] max-w-[220px] px-[10px] items-center gap-[4px]'>
                                                    <IndianRupee size={16} color='#888888' />
                                                    <Input type='number' id="name" placeholder="Enter Amount" value={particularValue[idx]} className='focus-visible:ring-0 focus-visible:ring-ring border-none max-w-[180px] px-[5px] outline-none' onChange={(e) => {
                                                        let valuee = [...particularValue]
                                                        valuee[idx] = parseFloat(e.target.value)
                                                        let totalamount = valuee.reduce((acc, curr) => acc + (curr || 0), 0)
                                                        setInvoiceData({ ...invoiceData, totalAmount: totalamount })
                                                        setParticularValue(valuee)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={(e) => {
                                            let keey = [...particularKey]
                                            let valuee = [...particularValue]
                                            let totalamount = invoiceData.totalAmount - Number(valuee[idx])
                                            keey.splice(idx, 1)
                                            valuee.splice(idx, 1)
                                            setInvoiceData({ ...invoiceData, totalAmount: totalamount })
                                            setParticularKey(keey)
                                            setParticularValue(valuee)
                                        }} className='cursor-pointer bg-[#ef5656] hover:bg-[#ef5656] transition duration-500 ease-in-out flex justify-center items-center p-[7px] rounded-[8px] border-[1.7px]'>
                                            <Trash2 color='white' size={20} />

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : currentInfoIndex === 3 ? (
                    <div className='w-full min-h-[300px] flex flex-col gap-3'>
                        <h1 className='text-xl font-[600]'>Payment Information:</h1>
                        <div className='max-w-[500px] w-[500px] h-auto flex flex-wrap gap-[40px] mt-[10px]'>

                            <div className=" flex flex-col space-y-1.5">
                                <h2 className='text-[0.94rem] font-[500]'>Bank Name:</h2>
                                <Input id="name" className='min-w-[200px]' value={otherData.bankName} onChange={(e) => setOtherData({ ...otherData, bankName: e.target.value })} placeholder="Bank Name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <h2 className='text-[0.94rem] font-[500]'>Account Name:</h2>
                                <Input id="name" className='min-w-[200px]' value={otherData.accountName} onChange={(e) => setOtherData({ ...otherData, accountName: e.target.value })} placeholder="Account Name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <h2 className='text-[0.94rem] font-[500]'>Account Number:</h2>
                                <Input id="name" className='min-w-[200px]' value={otherData.accountNumber} onChange={(e) => setOtherData({ ...otherData, accountNumber: e.target.value })} placeholder="Account Number" />
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className='w-full min-h-[300px] flex flex-col gap-3'>
                        <h1 className='text-xl font-[600]'>Summary:</h1>
                        <div className='flex gap-[40px] mt-[10px] flex-col'>

                            <div className=" flex flex-col space-y-1.5">
                                <h2 className='text-[0.94rem] font-[500]'>Additional Notes:</h2>
                                <Textarea id="name" className='max-w-[250px] ' value={otherData.additionalNotes} onChange={(e) => setOtherData({ ...otherData, additionalNotes: e.target.value })} placeholder="Notes" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <h2 className='text-[0.94rem] font-[500]'>Payment Terms:</h2>
                                <Textarea id="name" className='max-w-[250px]' value={otherData.paymentTerms} onChange={(e) => setOtherData({ ...otherData, paymentTerms: e.target.value })} placeholder="Ex:- Net 30" />
                            </div>
                        </div>
                    </div>
                )}


                <div className='w-[80%] flex justify-end items-center px-[40px] gap-5 mt-[30px]'>
                    <Button disabled={currentInfoIndex === 0} className='flex justify-center items-center gap-2 hover:bg-[#004fc5] bg-[#0064FF]' onClick={(e) => setCurrentInfoIndex(currentInfoIndex - 1)}><ArrowLeft size={18} /> Back</Button>
                    <Button disabled={currentInfoIndex === 4} className='flex justify-center items-center gap-2 hover:bg-[#004fc5] bg-[#0064FF]' onClick={(e) => setCurrentInfoIndex(currentInfoIndex + 1)}>Next <ArrowRight size={18} /></Button>
                </div>




                {/* 
                <div className="space-y-2 flex flex-col">
                    <Label htmlFor="due">Due on date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !invoiceData.dueDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {invoiceData.dueDate ? format(invoiceData.dueDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={invoiceData.dueDate}
                                onSelect={(e) => {
                                    setInvoiceData({ ...invoiceData, dueDate: e })
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div> */}




                {/* <div className='w-full pr-[60px] flex flex-col mt-[10px]'>
                    <div className='w-full border-b-[1.6px] py-[10px] flex justify-between items-center'>
                        <h2>Add Particulars</h2>
                        <button onClick={(e) => {
                            let keey = [...particularKey]
                            let valuee = [...particularValue]
                            keey.push('')
                            valuee.push('')
                            setParticularKey(keey)
                            setParticularValue(valuee)
                        }} className='h-[40px] transition duration-500 ease-in-out  hover:bg-[#e5e5e5] rounded-[8px] border-[2px] px-[10px] py-[5px] flex justify-center items-center gap-[0.6rem]'>
                            <Plus size={20} color='#888888' />
                            <h2 className='text-[0.8rem] font-[440]'>Add particulars</h2>
                        </button>
                    </div>
                </div> */}

                {/* <div className='base:pl-[10px] tv:pl-[25px] base:pr-[10px] tv:pr-[60px] w-full flex flex-col gap-[25px]'>
                    {particularKey.map((item: any, idx: number) => (
                        <div key={idx} className='w-full flex justify-between base:items-start tv:items-center'>

                            <div className='flex base:gap-[15px] tv:gap-[30px] base:flex-col tv:flex-row'>
                                <div className="base:w-[200px] tv:w-[300px] flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Particular</Label>
                                    <Input id="name" placeholder="Enter Particular" value={particularKey[idx]} onChange={(e) => {
                                        let keey = [...particularKey]
                                        keey[idx] = e.target.value
                                        setParticularKey(keey)
                                    }} />
                                </div>
                                <div className="base:w-[200px] tv:w-[300px] flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Amount</Label>
                                    <div className='flex border rounded-[7px] max-w-[220px] px-[10px] items-center gap-[4px]'>
                                        <IndianRupee size={16} color='#888888' />
                                        <Input type='number' id="name" placeholder="Enter Amount" value={particularValue[idx]} className='focus-visible:ring-0 focus-visible:ring-ring border-none max-w-[180px] px-[5px] outline-none' onChange={(e) => {
                                            let valuee = [...particularValue]
                                            valuee[idx] = parseFloat(e.target.value)
                                            let totalamount = valuee.reduce((acc, curr) => acc + (curr || 0), 0)
                                            setInvoiceData({ ...invoiceData, totalAmount: totalamount })
                                            setParticularValue(valuee)
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div onClick={(e) => {
                                let keey = [...particularKey]
                                let valuee = [...particularValue]
                                keey.splice(idx, 1)
                                valuee.splice(idx, 1)
                                setInvoiceData({ ...invoiceData, totalAmount: invoiceData.totalAmount - valuee[idx] })
                                setParticularKey(keey)
                                setParticularValue(valuee)
                            }} className='cursor-pointer hover:bg-[#e5e5e5] transition duration-500 ease-in-out flex justify-center items-center p-[7px] rounded-[5px] border-[1.7px] border-[#888888]'>
                                <Trash2 color='#888888' size={20} />
                            </div>

                        </div>
                    ))}
                </div> */}

            </div>


            {/* <div className='base:pl-[10px] tv:pl-[25px] base:pr-[20px] tv:pr-[80px] py-[10px] w-full flex justify-end flex-col'>
                <div className='px-[20px] py-[5px] flex justify-end items-center'>
                    <h2>Total Amount: <span className='text-[0.9rem] font-[600]'>{invoiceData.totalAmount}</span></h2>
                </div>
            </div> */}



        </div >
    )
}

export default Component