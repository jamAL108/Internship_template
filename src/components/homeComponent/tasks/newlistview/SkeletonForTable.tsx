import React from 'react'
import SkeletonElement from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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


const Skeleton = () => {
    return (
        <>
            {[0, 0, 0, 0].map((invoice: any, index: number) => (
                <TableRow key={invoice.invoice} className='hover:bg-[#f9fafb] !h-[60px] cursor-pointer'>
                    <TableCell><SkeletonElement width={160} height={25} className='!rounded-[8px]' /></TableCell>
                    <TableCell><SkeletonElement width={90} height={25} className='!rounded-[8px]' /></TableCell>
                    <TableCell><SkeletonElement width={110} height={25} className='!rounded-[8px]' /></TableCell>
                    <TableCell><SkeletonElement width={100} height={25} className='!rounded-[8px]' /></TableCell>
                    <TableCell><SkeletonElement width={100} height={25} className='!rounded-[8px]' /></TableCell>
                    <TableCell><SkeletonElement width={100} height={25} className='!rounded-[8px]' /></TableCell>
                    <TableCell><SkeletonElement width={20} height={20} className='!rounded-full' /></TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default Skeleton