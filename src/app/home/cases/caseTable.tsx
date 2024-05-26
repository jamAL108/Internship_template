'use client';
import React from 'react'
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
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteCase } from '@/apiReq/newAPIs/cases'
import { toast } from 'react-toastify';
import { Item } from '@radix-ui/react-accordion';
const CaseTable: React.FC<any> = (props) => {
    const { item , setMainuserCases , mainUserCases, userCases, setUserCases  } = props
    const router = useRouter()

    function shrinkString(input: string, threshold: number): string {
        console.log(input)
        if (input.length <= threshold) {
            return input;
        } else {
            return input.slice(0, threshold);
        }
    }

    const deleteCaseFunction = async () => {
        const result: any = await deleteCase(item.id)
        if (result.success === true) {
           let arr = [...mainUserCases]
           let idx:number = arr.findIndex(caseItem => caseItem.id === item.id)
           if(idx!==-1){
            arr.splice(idx,1)
            setMainuserCases(arr)
           }

           let newarr = [...userCases]
           let idx1:number = newarr.findIndex(caseItem => caseItem.id === item.id)
           if(idx1!==-1){
            newarr.splice(idx1,1)
            setUserCases(newarr)
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
        }
    }

    return (
        <TableRow onClick={(e) => router.push(`/home/cases/${item.id}`)} key={item.id} className="h-[50px] cursor-pointer hover:bg-[#f9fafb]">
            <TableCell className="font-small text-[0.82rem]">{item['Case Type']}</TableCell>
            <TableCell>{shrinkString(item['CNR Number'], 16)}</TableCell>
            <TableCell className=' text-[0.85rem]'>{item['Petitioner and Advocate']}</TableCell>
            <TableCell className=' text-[0.85rem]'>{item['Respondent and Advocate']}</TableCell>
            <TableCell>{item['Case Status'] === 'Case disposed' ? 'Disposed' : "pending"}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <MoreHorizontal size={20} className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] px-[10px] py-[10px] relative !right-[30px]">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={(e) => router.push(`/home/cases/${item.id}`)} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
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
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                deleteCaseFunction()
                            }} className='flex items-center bg-white text-[#344054]
                             focus:bg-[#EF4444] cursor-pointer transition duration-300 ease-in-out focus:text-white gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                                <Trash2 size={20} />
                                Move to trash
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default CaseTable