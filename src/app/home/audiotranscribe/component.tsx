'use client'
import React, { useEffect, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
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
import { getAllTranscribe, changeName } from '@/apiReq/newAPIs/transcribe'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react';
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'
import Skeleton from './Skeleton'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ExternalLink, Trash2, Pencil, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { truncate } from 'fs/promises'
import { deleteAudio } from '@/apiReq/newAPIs/transcribe'
import AudioComponent from './audiotable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
const Component = () => {
  const router = useRouter()
  const [recentPostAtTop, setRecentPostAtTop] = useState<boolean>(true)
  const [audioList, setAudioList] = useState<any>([])
  const [loader, setLoader] = useState<any>(true)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [checkList, setCheckList] = useState<any>([])
  const [renameAlert, setRenameAlert] = useState<boolean>(false)
  const [renameData, setRenameData] = useState<any>({})
  const [renameLoader, setRenameLoader] = useState<boolean>(false)

  const [deleteAlert, setDeleteAlert] = useState<boolean>(false)
  const [deleteLoader, setDeleteloader] = useState<boolean>(false)
  const [deleteData, setDeleteData] = useState<any>({})

  useEffect(() => {
    userAudios()
  }, [])

  const userAudios = async () => {
    const result: any = await getAllTranscribe()
    if (result.success === true) {
      setAudioList(result.data)
      let arr: any = new Array(result.data.length)
      setCheckList(arr)
      setLoader(false)
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
      setLoader(false)
    }
  }

  function convertISOToCustomFormat(isoString: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  }

  function formatSeconds(seconds: number): string {
    if (seconds < 60) {
      return `${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      if (remainingSeconds === 0) {
        return `${minutes}m`;
      } else {
        return `${minutes}m ${remainingSeconds}s`;
      }
    }
  }

  const renameName = async () => {
    let idx = audioList.findIndex((audio: any) => audio.id === renameData.id)
    if (audioList[idx].Name !== renameData.Name) {
      setRenameLoader(true)
      const obj = {
        Name: renameData.Name,
        id: renameData.id
      }
      const result = await changeName(obj)
      if (result.success === true) {
        let arr = [...audioList]
        arr[idx].Name = renameData.Name
        setAudioList(arr)
        setRenameLoader(false)
        setRenameAlert(false)
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
        setRenameLoader(false)
        setRenameAlert(false)
      }
    }
  }


  const deleteFunction = async () => {
    setDeleteloader(true)
    const result: any = await deleteAudio(audioList[deleteData])
    if (result.success === true) {
      let arr: any = [...audioList]
      arr.splice(deleteData, 1)
      setAudioList(arr)
      setDeleteData({})
      setDeleteAlert(false)
      setDeleteloader(false)
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
      setDeleteData({})
      setDeleteAlert(false)
      setDeleteloader(false)
    }
  }

  if (loader === true) {
    return <Skeleton />
  }

  return (
    <div className='w-full h-full flex flex-col overflow-hidden'>
      <div className='w-full px-[25px] base:py-[15px] tv:py-[18px] flex justify-between items-center topComponentOfAddClient'>

        <Dialog open={renameAlert} onOpenChange={(e) => {
          setRenameAlert(false)
          setRenameData({})
        }}>
          <DialogContent className="sm:max-w-[425px] w-[380px] h-[240px] !rounded-[17px]">
            <DialogHeader>
              <DialogTitle>Rename</DialogTitle>
              <DialogDescription>
                Change the Name of the file
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={renameData.Name} onChange={(e) => setRenameData({ ...renameData, Name: e.target.value })} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={renameLoader} style={renameLoader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => renameName()} className='bg-[#0064FF] flex items-center justify-center gap-2 hover:bg-[#004fc5]'>
                <ColorRing
                  visible={renameLoader}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
                save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteAlert} onOpenChange={(e) => {
          setDeleteAlert(false)
          setDeleteData({})
        }}>
          <AlertDialogContent className='base:w-[90vw] tv:w-[400px] base:rounded-[10px] pb-[28px] !pt-[23px]'>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm to delete the Transcribe data</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this Audio file
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='base:flex-row tv:flex-row base:justify-end base:gap-[10px]'>
              <button className='border-[2px] hover:bg-[#ededed] tracking-wide text-[0.8rem] font-[450] px-[10px] py-[2px] rounded-[4px] min-h-[10px]' onClick={(e) => setDeleteAlert(false)}>Cancel</button>
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




        <div className=' flex gap-2 items-center'>
          <h1 className='text-[1.4rem] font-[600] tracking-[0.6px]'>Transcription</h1>
          <MoreHorizontal size={20} className='cursor-pointer' />
        </div>
        <Link href={'/transcribe'} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white base:px-[13px] tv:px-[15px]  rounded-[7px] flex justify-center items-center gap-[0.54rem] addClientButton select-none addTransButton'>
          <Plus color='white' size={20} />
          <h2 className='base:py-[9.5px] tracking-wide tv:py-[9.5px] base:text-[0.73rem] mymobile:text-[0.85rem] tv:text-[0.9rem] font-[500]'>Create</h2>
        </Link>
      </div>

      <div className='w-full base:px-[15px] tv:px-[25px] base:py-[10px] tv:py-[20px] mt-[3px]'>
        {
          audioList.length === 0 ? (
            <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3'>
              <h1 className='text-center text-2xl font-[600]'>No Transcribe Found</h1>
              <h2 className='base:w-[90%] tv:w-[360px] text-center text-[0.87rem]'>Our Votum-Transcribe app merges advanced AI with expert review, delivering swift, precise, and reliable Audio to Text converison in just 4 Steps.</h2>
              <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
                onClick={(e) => {
                  e.preventDefault()
                  const addTransButton: any = document.querySelector('.addTransButton');
                  if (addTransButton) {
                    addTransButton.click()
                  }
                }}
              >Add Transcription</Button>
            </div>
          ) : (
            <ScrollArea className='w-full !h-[calc(100vh_-_140px)] tv:!pr-[15px]'>
              <Table>
                <TableCaption>A list of your recent Audio Transcriptions.</TableCaption>
                <TableHeader className='hover:bg-white bg-white !z-[10]'>
                  <TableRow className='hover:bg-white'>
                    <TableHead className='base:w-[30px] tv:w-[40px]'>
                      <div className='base:w-[30px] tv:w-[40px] flex justify-center items-center base:h-[30px] tv:h-[40px] rounded-full hover:bg-[#eef4ff]'>
                        <Checkbox checked={checkAll} onCheckedChange={(e) => {
                          if (checkAll === false) {
                            setCheckList(checkList.fill(true))
                          } else {
                            setCheckList(checkList.fill(false))
                          }
                          setCheckAll(!checkAll)

                        }} className='border-[#657FFE] data-[state=checked]:bg-[#657FFE]' id="terms" />
                      </div>
                    </TableHead>
                    <TableHead className="base:min-w-[140px] tv:w-[35%]">Name</TableHead>
                    <TableHead className='base:min-w-[130px] tv:w-[140px]'>Length</TableHead>
                    <TableHead className='base:min-w-[140px] tv:w-[170px]'>Language</TableHead>
                    <TableHead className='base:min-w-[160px] tv:w-[200px]'>Tags</TableHead>
                    <TableHead className='base:min-w-[140px] tv:w-[170px] flex items-center gap-1'>Created
                      {
                        recentPostAtTop === true ? (
                          <ArrowDown onClick={(e) => setRecentPostAtTop(false)} className='cursor-pointer' size={17} />
                        ) : (
                          <ArrowUp onClick={(e) => setRecentPostAtTop(true)} className='cursor-pointer' size={17} />
                        )
                      }</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audioList.map((audio: any, index: number) => (
                    <AudioComponent checkList={checkList} setCheckList={setCheckList} audio={audio} index={index} setRenameAlert={setRenameAlert} setRenameData={setRenameData} setDeleteData={setDeleteData} setDeleteAlert={setDeleteAlert} />
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )
        }
      </div >
    </div >
  )
}

export default Component

