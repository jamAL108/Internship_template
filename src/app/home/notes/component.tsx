'use client';
import React, { useState } from 'react'
import { MoreHorizontal, Search, Plus, Check, Trash2, Pencil, Copy, ExternalLink } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area';
import Tabs from './tabs'
import { createNewNote } from '@/apiReq/dashboardAPIs/note'
import { toast } from 'react-toastify'
import { SyncLoader } from "react-spinners";
import TextareaAutosize from 'react-textarea-autosize';
import Image from 'next/image'
import Editor from '@/components/homeComponent/notes/Editor'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Notes from './notes'
const Component = () => {
  const [activeNote, setActiveNote] = useState<any>(null)
  const [recentNote, setRecentNote] = useState<any>([])
  const [currentActiveNote, setCurrentActiveNode] = useState<any>(null)
  const [notes, setNotes] = useState<any>(Notes)
  const [newNoteLoader, setNewNoteLoader] = useState<boolean>(false)

  function formatDate(created_at: Date): string {
    const now = new Date();
    created_at = new Date(created_at)
    
    const diff = now.getTime() - created_at.getTime();
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (now.getHours() === created_at.getHours()) {
      return "Now";
    } else {
      return created_at.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }
  }

  const AddNewNoteFunction = async () => {
    const result: any = await createNewNote()
    if (result.success === true) {
      let arr = [...notes]
      console.log(result)
      arr.unshift(result.data)
      setNotes(arr)
      let arrRecentNote = [...recentNote]
      const obj = {
        id: result.data.id,
        Title: result.data.Title
      }
      arrRecentNote.unshift(obj)
      setRecentNote(arrRecentNote)
      setCurrentActiveNode(result.data)
      setActiveNote(result.data.id)
      setNewNoteLoader(false)
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
      setNewNoteLoader(false)
    }
  }

  const customizeDateCreated = (currentDate: any, type: string) => {
    const timestamptz: any = new Date(currentDate);
    let year = timestamptz.getFullYear();
    let month = timestamptz.toLocaleString('default', { month: 'long' });
    let date = String(timestamptz.getDate()).padStart(2, '0');
    let hours = timestamptz.getHours();
    let minutes = String(timestamptz.getMinutes()).padStart(2, '0');
    let amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    let dateTimeString = ''
    if (type === 'created_at') {
      dateTimeString = `${year} ${month} ${date} | ${hours}:${minutes} ${amPM}`;
    } else {
      dateTimeString = `${month} ${date}, ${year} at ${hours}:${minutes} ${amPM}`
    }

    return dateTimeString;
  }

  const ChangeCurrentNoteValue = (e: string) => {
    setCurrentActiveNode({ ...currentActiveNote, note: e })
  }

  return (
    <div className='w-full h-full flex flex-col '>
      <div className='w-full px-[25px] py-[20px] tv:h-[70px] base:gap-[10px] tv:gap-auto border-b-[1px] flex base:flex-col tv:flex-row tv:justify-between tv:items-center'>

        <div className=' flex gap-2 items-center'>
          <h1 className='text-[1.5rem] select-none font-[600] tracking-[0.6px]'>Notes</h1>
          <MoreHorizontal size={20} className='cursor-pointer' />
        </div>

        <div className='flex tv:px-[5px] tv:pr-[7px] base:justify-end tv:justify-center items-center base:gap-[12px] tv:gap-[25px]'>
          <div className='bg-[rgba(239,239,239,0.5)] border-[1px] base:px-[10px] tv:px-[14px] base:py-[4px] tv:py-[0px] tv:h-full flex justify-center items-center  rounded-[7px]'>
            <input type="text" className='bg-transparent base:py-[4px] tv:py-[8px] base:min-w-[50px] mymobile:min-w-[80px] tv:min-w-[230px] base:text-[0.85rem] tv:text-[0.92rem] outline-none  placeholder:text-[0.83rem] ClientDataInputField' placeholder='Search by Note name ....' />
            <Search color='#888888' className='cursor-pointer w-4 h-4' />
          </div>
        </div>
      </div>

      <div className='w-full h-[calc(100vh_-_70px)] overflow-hidden flex'>
        <div className='w-[min(33%,400px)] h-full flex flex-col border-r-[1px]'>
          <div className='w-full py-[10px] flex justify-between items-center px-[25px]'>
            <h2 className='text-[0.82rem] text-muted-foreground font-[400]'>Recent Notes</h2>
            <button onClick={(e) => {
              setNewNoteLoader(true)
              AddNewNoteFunction()
            }} className='bg-[#6680ff] transition duration-500 ease-in-out hover:bg-[#004fc5] text-white text-[0.77rem] font-[530] base:px-[10px] tv:px-[13px]  rounded-[20px] flex justify-center items-center gap-2 py-[6px]'>
              <Plus size={18} color='white' />
              NEW NOTE
            </button>
          </div>

          <ScrollArea className='w-full h-[calc(100vh_-_110px)] flex flex-col mb-[20px]'>
            {notes.map((item: any, index: number) => (
              <div onClick={(e: any) => {
                let arr = [...recentNote]
                let idx = recentNote.findIndex((note: any) => note.id === item.id)
                if (idx === -1) {
                  const obj = {
                    id: item.id,
                    Title: item.Title
                  }
                  arr.push(obj)
                }
                setRecentNote(arr)
                setCurrentActiveNode(item)
                setActiveNote(item.id)
              }} key={index} className={`w-full py-[13px] border-b-[1px] px-[25px] cursor-pointer flex flex-col ${item.id === activeNote ? 'bg-[#f4f7ff]' : 'bg-white'} gap-1`}>
                <div className='w-full flex flex-col gap-[1px]'>
                  <p className='text-muted-foreground text-[0.75rem] font-[470]'>{formatDate(item.created_at)}</p>
                  <h1 className='text-[1rem] font-[550]'>{item.Title}</h1>
                </div>
                <h2 className='text-[0.77rem] font-[420]'>{item.Note}
                </h2>
                <div className='w-full flex flex-wrap gap-[10px] mt-[2px]'>
                  {item.tags.map((tag: string, tagindex: number) => (
                    <div key={tagindex} className={`px-[10px] py-[2px]  text-[#5b89e9] rounded-[5px] flex justify-center items-center bg-[#e8effe] `}>
                      <h2 className='text-[0.78rem] font-[440]'>{tag}</h2>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {recentNote.length !== 0 && (
          <div className='w-[max(67%,calc(100%_-_400px))] h-full flex flex-col'>
            <div className='w-full overflow-x-auto NotesTab flex bg-[#e9eaec] h-[40px] gap-[3px]'>
              {recentNote.map((note: any, index: number) => (
                <Tabs notes={notes} setCurrentActiveNode={setCurrentActiveNode} setActiveNote={setActiveNote} note={note} index={index} currentActiveNote={currentActiveNote} recentNote={recentNote} setRecentNote={setRecentNote} activeNote={activeNote} />
              ))}
            </div>
            <div>
              {
                newNoteLoader === true ? (
                  <div className='w-full max-h-[calc(100%_-_40px)] flex justify-center items-center'>
                    <SyncLoader
                      color={"#029BE6"}
                      loading={newNoteLoader}
                      size={14}
                      aria-label="Loading Spinner"
                      data-testid="loadBNS"
                    />
                  </div>
                ) : currentActiveNote !== null && (
                  <ScrollArea className='w-full h-[calc(100vh_-_130px)] flex flex-col px-[30px] pt-[15px]'>
                    <div className='flex w-full justify-between pt-[15px]'>
                      <TextareaAutosize className='!text-3xl !h-[40px] w-[80%] !resize-none overflow-hidden base:text-[1.82rem] tll:text-[2.1rem] bg-transparent font-semibold break-words outline-none text-[#3f3f3f] placeholder:opacity-[0.6]' placeholder='Untitled' value={currentActiveNote.Title} onChange={(e) => {
                        console.log("MEOW")
                      }} />


                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => {
                          e.stopPropagation()
                        }}>
                          <MoreHorizontal size={22} className='cursor-pointer' color='black' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px] px-[10px] py-[10px] relative !right-[30px]">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className='flex items-center gap-[20px] text-[0.88rem] py-[8px] px-[10px]'>
                              <ExternalLink size={19} color='#344054' />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex items-center gap-[20px] text-[0.88rem] py-[8px] px-[10px]'>
                              <Copy size={19} color='#344054' />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation()
                            }} className='flex items-center gap-[20px] text-[0.88rem] py-[8px] px-[10px]'>
                              <Pencil size={19} color='#344054' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation()
                            }} className='flex items-center gap-[20px] text-[0.88rem] py-[8px] px-[10px]'>
                              <Trash2 size={19} color='#344054' />
                              Move to trash
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className='w-full flex flex-col mt-[18px]'>
                      <div className='w-full h-[38px] flex gap-3'>
                        <div className='w-[min(28%,200px)] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                          <Image unoptimized width={17} height={17} src='/images/clockIcon.png' alt="cfv" />
                          <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem]  ttl:text-[0.92rem] font-[450] text-[#777672] '>created At</p>
                        </div>
                        <div className='w-[min(72%,calc(400px))] h-full flex rounded-[5px] text-[#37352f]'>
                          <div className='w-full rounded-[5px] hover:bg-[#efefef] base:text-[0.84rem] ttl:text-[0.91rem] h-full flex items-center pl-[7px]'>
                            <p>{customizeDateCreated(currentActiveNote.created_at, 'created_at')}</p>
                          </div>
                        </div>
                      </div>
                      <div className='w-full h-[38px] flex gap-3'>
                        <div className='w-[min(28%,200px)] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                          <Image unoptimized width={17} height={17} src='/images/clockIcon.png' alt="cfv" />
                          <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem]  ttl:text-[0.92rem] font-[450] text-[#777672] '>Tags</p>
                        </div>
                        <div className='w-[min(72%,calc(400px))] h-full flex rounded-[5px] text-[#37352f]'>
                          <div className='w-full rounded-[5px] hover:bg-[#efefef] base:text-[0.84rem] ttl:text-[0.91rem] h-full flex items-center pl-[7px]'>
                            <p>{customizeDateCreated(currentActiveNote.created_at, 'mewo')}</p>
                          </div>
                        </div>
                      </div>
                      <div className='w-full h-[38px] flex gap-3'>
                        <div className='w-[min(28%,200px)] h-full rounded-[5px] hover:bg-[#efefef] pl-[7px] flex items-center px-[3px] gap-2 font-light'>
                          <Image unoptimized width={17} height={17} src='/images/clockIcon.png' alt="cfv" />
                          <p className='capitalize base:text-[0.84rem] bbl:text-[0.88rem]  ttl:text-[0.92rem] font-[450] text-[#777672] '>Last Updated</p>
                        </div>
                        <div className='w-[min(72%,calc(400px))] h-full flex rounded-[5px] text-[#37352f]'>
                          <div className='w-full rounded-[5px] hover:bg-[#efefef] base:text-[0.84rem] ttl:text-[0.91rem] h-full flex items-center pl-[7px]'>
                            <p>{customizeDateCreated(currentActiveNote.created_at, 'updated')}</p>
                          </div>
                        </div>
                      </div>
                      <div className='w-full mt-[25px] flex VotumUserNotes'>
                        <Editor
                          editable={true}
                          onChange={ChangeCurrentNoteValue}
                          initialContent={currentActiveNote.note}
                        />
                      </div>
                    </div>
                  </ScrollArea>
                )
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Component