import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { addNote , updateNotes } from '@/apiReq/newAPIs/client';
import Markdown from 'react-markdown'
import { toast } from 'react-toastify';
import TextareaAutosize from 'react-textarea-autosize';
import { Pencil, Trash2 } from 'lucide-react'
import NoteComponent from './noteComponent'
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const Notes: React.FC<any> = (props) => {
  const { clientId: client_id, setClientInfo, clientInfo } = props;
  const [notes, setNotes] = useState('');
  const [title, setTitle] = useState<string>("")
  const [currentActiveNote, setCurrentActiveNote] = useState<any>({
    client_id: client_id,
    title: "",
    notes: ''
  })
  const [newNoteView, setNewNoteView] = useState<boolean>(false)

  useEffect(() => {
    setNotes('')
  }, [])

  const addNoteFunction = async () => {
    const result: any = await addNote(currentActiveNote);
    if (result.success === false) {
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
    } else {
      console.log(result.data)
      setCurrentActiveNote(result.data)
      toast.success('Note added successfully', {
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


  const updateNoteFunction = async () => {
    const result: any = await updateNotes(currentActiveNote);
    if (result.success === false) {
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
    } else {
      console.log(result.data)
      setCurrentActiveNote(result.data)
      toast.success('Note updated', {
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
    <div className='w-full flex flex-col  gap-[20px] overflow-y-auto overflow-x-hidden ClientDetailsNotes max-h-[90vh]'>
      {
        newNoteView === false ? (
          <>
            <div className='flex px-[10px] justify-between items-center'>
              <h1 className='text-[1.07rem] font-[580]'>Notes</h1>
              <Button className='px-[16px] bg-[#0063FB] hover:bg-[#004fc5]' onClick={(e) => setNewNoteView(true)}>Add Note</Button>
            </div>
            {clientInfo.notes.length !== 0 ? (
              <div className='w-full px-[10px] flex flex-col gap-[10px]'>
                {clientInfo.notes.map((note: any, index: number) => (
                  <NoteComponent clientInfo={clientInfo} setClientInfo={setClientInfo} key={index} index={index} note={note} />
                ))}
              </div>
            ) : (
              <div className='w-full px-[20px] flex flex-col justify-center items-center py-[30px]'>
                <h2 className='text-[0.93rem] font-[500] text-muted-foreground'>No Notes yet</h2>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-[10px]">
            <div className='w-full flex justify-end items-center gap-[10px]'>
              <Button className='text-[0.82rem] border-[#0063FB]' onClick={(e) => {
                e.preventDefault()
                setNotes('')
                setNewNoteView(false)
              }} variant='outline'>Cancel</Button>
              <Button disabled={currentActiveNote.title.length === 0 ? true : false} onClick={(e) => {
                if (currentActiveNote.id === undefined) {
                  addNoteFunction()
                } else {
                  updateNoteFunction()
                }
              }} className='px-[16px] text-[0.82rem] bg-[#0063FB] hover:bg-[#004fc5]'>Save changes</Button>
            </div>
            <TextareaAutosize placeholder='Untitled' value={currentActiveNote.title} onChange={(e) => {
              setCurrentActiveNote({ ...currentActiveNote, title: e.target.value })
            }} className='w-full !resize-none text-[1.3rem] bg-transparent font-[560] break-words outline-none text-[#3f3f3f] placeholder:opacity-[0.6]' />
            <ReactQuill theme="snow" modules={modules} value={currentActiveNote.notes} onChange={(e) => {
              console.log(e)
              setCurrentActiveNote({ ...currentActiveNote, notes: e })
            }} />
          </div>
        )
      }
    </div>
  )
}

export default Notes