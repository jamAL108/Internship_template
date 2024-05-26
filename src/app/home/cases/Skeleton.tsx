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
{/* <SkeletonElement width={200} height={40} className='!rounded-[8px]' />
<SkeletonElement width={130} height={40} className='!rounded-[8px]' /> */}
const Skeleton = () => {
  return (
    <div className='w-full h-full flex flex-col base:overflow-y-auto bl:overflow-hidden'>
      <div className='w-full px-[25px] py-[20px] tv:h-[80px] base:gap-[20px] tv:gap-auto border-b-[1px] flex base:flex-col tv:flex-row tv:justify-between tv:items-center'>

        <div className='w-full flex gap-2 justify-between items-center'>
          <SkeletonElement width={200} height={40} className='!rounded-[8px]' />
          <div className='flex justify-center items-center gap-3'>
            <SkeletonElement width={250} height={40} className='!rounded-[8px]' />
            <SkeletonElement width={90} height={40} className='rounded-[7px] ' />
            <SkeletonElement width={70} height={40} className='rounded-[7px] ' />
          </div>

        </div>
      </div>

      <div className="w-full tv:px-[25px] base:mb-[70px] tv:mb-[0px] tv:overflow-hidden flex gap-[20px] flex-col">
        <div className="w-full base:hidden tv:flex py-[20px] gap-[24px]">
          <SkeletonElement width={140} height={80} className='!rounded-[10px]' />
          <SkeletonElement width={140} height={80} className='!rounded-[10px] ' />
          <SkeletonElement width={140} height={80} className='!rounded-[10px] ' />
        </div>

        <div className='w-full pb-[10px]'>
          <Table>
            {/* <TableCaption>A list of your recent Audio Transcriptions.</TableCaption> */}
            <TableHeader className='hover:bg-white'>
              <TableRow className='hover:bg-white'>
                <TableHead >Type</TableHead>
                <TableHead >Case Number</TableHead>
                <TableHead >Petitioner and Advocate</TableHead>
                <TableHead >Respondent and Advocate</TableHead>
                <TableHead >Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 0, 0, 0, 0].map((invoice: any, index: number) => (
                <TableRow key={invoice.invoice} className='hover:bg-[#f9fafb] !h-[60px] cursor-pointer'>
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
    </div>
  )
}

export default Skeleton