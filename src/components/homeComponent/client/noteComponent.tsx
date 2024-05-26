import React, { useState } from 'react'
import { Trash2, Pencil } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import { deleteNotes } from '@/apiReq/newAPIs/client'
  import { toast } from 'react-toastify';

const NoteComponent: React.FC<any> = (props) => {
    const { note, index , setClientInfo , clientInfo } = props;
    const [hover, setHover] = useState<boolean>(false)
    const [ deleteAlert , setDeleteAlert ] = useState<boolean>(false)
    function formatDateString(dateString: string): string {
        const date: Date = new Date(dateString);
        const day: string = (date.getDate() < 10 ? '0' : '') + date.getDate();
        const month: string = date.toLocaleString('en-US', { month: 'short' });
        const year: number = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const deleteNoteFunction = async () =>{
       const result = await deleteNotes(note.id)
       if(result.success===true){
        let arr =[...clientInfo.notes]
        arr.splice(index,1)
        setClientInfo({...clientInfo , notes:arr})
        toast.success("Note Deleted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
       }else{
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
        <div onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)} className='relative w-full border flex flex-col gap-[10px] px-[20px] py-[15px] bg-[#f5f6f8] rounded-[8px] notesViewMode'>
            <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
                <AlertDialogContent className='w-[400px]'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm to delete the Note</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the selected note? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <button className='border-[2px] hover:bg-[#ededed] tracking-wide text-[0.8rem] font-[450] px-[10px] py-[2px] rounded-[4px] ' onClick={(e) => setDeleteAlert(false)}>Cancel</button>
                        <button className='hover:bg-[#e5484d] text-[0.8rem] tracking-wide font-[450] px-[10px] py-[2px] flex justify-center items-center rounded-[4px]  text-[#e5484d] hover:text-white border-[#e5484d] border' onClick={(e) => {
                            setDeleteAlert(false)
                            deleteNoteFunction()
                        }}>Delete</button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <h2 className='text-[0.9rem] mb-[22.5px] font-[500]'>{note.title}</h2>
            <div className='flex items-center  w-full gap-[8px] absolute bottom-[7.5px]'>
                <h2 className='text-[#5b89e9] text-[0.78rem] cursor-pointer font-[500]'>... Read more</h2>
                <p className='text-[0.78rem] font-[400] text-muted-foreground'>•</p>
                <p className='text-[0.78rem] font-[400] text-muted-foreground'>{formatDateString(note.created_at)}</p>
            </div>

            {hover &&
                <div className="absolute top-[15px] right-[10px] flex justify-center items-center gap-[3px]">
                    <div className='p-[7px] rounded-full flex justify-center hover:bg-[#efefef] items-center cursor-pointer'>
                        <Pencil size={16} color='#5b89e9' />
                    </div>
                    <div className='p-[7px] flex rounded-full justify-center hover:bg-[#efefef] items-center cursor-pointer' onClick={(e)=>setDeleteAlert(true)}>
                        <Trash2 size={16} color='#e5484d' />
                    </div>
                </div>
            }
        </div>
    )
}

export default NoteComponent