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
        <div className='w-full h-full flex flex-col overflow-hidden'>
            <div className='w-full px-[25px] base:py-[15px] tv:py-[18px] flex justify-between topComponentOfAddClient'>
                <SkeletonElement width={200} height={40} className='!rounded-[8px]' />
                <SkeletonElement width={130} height={40} className='!rounded-[8px]' />
            </div>

            <div className='w-full px-[25px] py-[5px] mt-[3px]'>
                <div className='flex gap-[20px]'>
                    <SkeletonElement width={100} height={20} className='!rounded-[8px]' />
                    <SkeletonElement width={80} height={20} className='!rounded-[8px]' />
                    <SkeletonElement width={80} height={20} className='!rounded-[8px]' />
                </div>
                <Table className='!py-[20px]'>
                    {/* <TableCaption>A list of your recent Audio Transcriptions.</TableCaption> */}
                    <TableHeader className='border-b-[3px] h-[50px]'>
                        <TableRow className='text-[0.9rem] border-b-[3px] MonaSans font-[600]'>
                            <TableHead className="w-[200px]">Client</TableHead>
                            <TableHead className="w-[110px]">Invoice #</TableHead>
                            <TableHead className="w-[160px]">Resource Name</TableHead>
                            <TableHead className="w-[120px]">Amount in ₹</TableHead>
                            <TableHead className='w-[100px]'>Due</TableHead>
                            <TableHead className='w-[100px]'>Created</TableHead>
                            <TableHead className='text-right px-[25px] w-[80px]'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
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
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default Skeleton