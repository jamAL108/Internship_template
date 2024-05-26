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

      <div className='w-full px-[25px] py-[20px] mt-[3px]'>
      <Table>
          {/* <TableCaption>A list of your recent Audio Transcriptions.</TableCaption> */}
          <TableHeader className='hover:bg-white'>
            <TableRow className='hover:bg-white'>
              <TableHead className='w-[40px]'></TableHead>
              <TableHead className="w-[35%]">Name</TableHead>
              <TableHead className='w-[140px]'>Length</TableHead>
              <TableHead className='w-[170px]'>Language</TableHead>
              <TableHead className='w-[170px]'>Tags</TableHead>
              <TableHead className='w-[170px] flex items-center gap-1'>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[0,0,0,0,0].map((invoice: any, index: number) => (
              <TableRow key={invoice.invoice} className='hover:bg-[#f9fafb] !h-[60px] cursor-pointer'>
                <TableCell className='w-[40px]'></TableCell>
                <TableCell><SkeletonElement width={160} height={25} className='!rounded-[8px]' /></TableCell>
                <TableCell><SkeletonElement width={90} height={25} className='!rounded-[8px]' /></TableCell>
                <TableCell><SkeletonElement width={110} height={25} className='!rounded-[8px]' /></TableCell>
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