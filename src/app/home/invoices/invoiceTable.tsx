import React, { useState } from 'react'
import { Trash2, Copy, ExternalLink, Pencil, MoreHorizontal, Plus } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { deleteInvoice } from '@/apiReq/dashboardAPIs/invoice'

import { AlertDialogContent } from '@/components/customizedShadcn/alert'

const InvoiceTable: React.FC<any> = (props) => {
    const { invoice, index, type, invoiceData, setInvoiceData, mainInvoiceData, setMainInvoiceData } = props
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [activeTag, setActiveTag] = useState<boolean>(false)
    const [deleteAlert, setDeleteAlert] = useState<boolean>(false)
    const [deleteLoader, setDeleteLoader] = useState<boolean>(false)

    const router = useRouter()

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

    const deleteFunction = async () => {
        setDeleteLoader(true)
        const result: any = await deleteInvoice(invoice.id)
        if (result.success === true) {
            let invoiceArray: any = [...invoiceData]
            let idx1: number = invoiceArray.findIndex((inv: any) => inv.id === invoice.id)
            if (idx1 !== -1) {
                invoiceArray.splice(idx1, 1)
                setInvoiceData(invoiceArray)
            }
            let mainInvoiceArray: any = [...mainInvoiceData]
            let idx2: number = mainInvoiceArray.findIndex((inv: any) => inv.id === invoice.id)
            if (idx2 !== -1) {
                mainInvoiceArray.splice(idx2, 1)
                setMainInvoiceData(mainInvoiceArray)
            }
            setDeleteLoader(false)
            setDeleteAlert(false)
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
            setDeleteLoader(false)
            setDeleteAlert(false)
        }
    }

    return (
        <TableRow onMouseEnter={(e) => setIsHovered(true)}
            onMouseLeave={(e) => setIsHovered(false)} key={invoice.id} className={`!h-[60px] cursor-pointer`}>

            <AlertDialog open={deleteAlert} onOpenChange={(e) => {
                setDeleteAlert(false)
            }}>
                <AlertDialogContent className='base:w-[90vw] tv:w-[400px] base:rounded-[10px] pb-[28px] !pt-[23px]'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm to delete the Invoice data</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this Invoice Data
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='base:flex-row tv:flex-row base:justify-end base:gap-[10px]'>
                        <button className='border-[2px] hover:bg-[#ededed] tracking-wide text-[0.8rem] font-[450] px-[10px] py-[2px] rounded-[4px] ' onClick={(e) => setDeleteAlert(false)}>Cancel</button>
                        <button disabled={deleteLoader} style={deleteLoader === true ? { opacity: 0.67 } : { opacity: 1 }}

                            className={`${deleteLoader === true ? "bg-[#e5484d] text-white hover:text-white hover:bg-[#e5484d]" : "bg-white text-[#e5484d] hover:text-white hover:bg-[#e5484d]"} text-[0.8rem] tracking-wide font-[450] px-[10px] py-[2px] flex justify-center items-center gap-1 rounded-[4px]   border-[#e5484d] border`} onClick={(e) => {
                                deleteFunction()
                            }}>
                            <ColorRing
                                visible={deleteLoader}
                                height="20"
                                width="20"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />
                            Delete</button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <TableCell className="font-medium">{invoice.votum_clients.Name}</TableCell>
            <TableCell className="w-[80px] text-sm">Invoice{invoice.invoiceId}</TableCell>
            <TableCell>{invoice.resourceName}</TableCell>
            <TableCell>{invoice.totalAmount}.0</TableCell>
            {type === true && (
                <TableCell>{getRemainingDays(invoice.dueDate)}</TableCell>
            )}
            <TableCell>{convertISOToCustomFormat(invoice.created_at)}</TableCell>
            {type === true && (
                <TableCell className="pl-[25px]">
                    <div className={` w-[60px] rounded-[6px] text-[0.88rem] font-[550] ${invoice.status === 0 ? 'bg-[#f4f7fa] text-[#cbcdd0]' : invoice.status === 1 ? 'bg-[#d9e8fb] text-[#4654a2]' : 'bg-[#defbdd] text-[#49a452]'} px-[7px] py-[3px] flex justify-center items-center`}>
                        <h2>{invoice.status === 0 ? 'Draft' : invoice.status === 1 ? 'Sent' : 'Paid'}</h2>
                    </div>
                </TableCell>
            )}
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <MoreHorizontal size={20} className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] px-[10px] py-[10px] relative !right-[30px]">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={(e) => router.push(`/home/audiotranscribe/${invoice.id}`)} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <ExternalLink size={20} color='#344054' />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Copy size={20} color='#344054' />
                                Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                            }} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Pencil size={20} color='#344054' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setDeleteAlert(true)
                            }} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Trash2 size={20} color='#344054' />
                                Move to trash
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default InvoiceTable