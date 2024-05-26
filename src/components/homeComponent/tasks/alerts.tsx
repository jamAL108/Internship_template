import React from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
import { Trash2, CheckCheck, Undo } from 'lucide-react'

const Alerts: React.FC<any> = (props) => {
    const { name, markFunction, DeleteFunction , unselectFunction } = props;

    return (
        <div className='flex justify-center items-center gap-2'>
            <Button className=' flex justify-center items-center gap-1 ' variant="outline" onClick={(e)=>{
                e.preventDefault()
                unselectFunction(name)
            }} >
                <Undo size={16} className='opacity-[0.6]' />
                <h2 className='font-[400]'>unselect all</h2>
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className=' flex justify-center items-center gap-1 ' variant="outline">
                        <CheckCheck size={16} className='opacity-[0.9]' color={name === 'Completed' ? '#67CAE7' : "#FC979F"} />
                        <h2 className='font-[400]'>{`Mark as ${name}`}</h2>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={markFunction}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className=' flex justify-center items-center gap-1' variant="outline" >
                        <Trash2 size={16} className='opacity-[0.9]' color='#FC979F' />
                        <h2 className='text-[#FC979F]'>Delete</h2>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={DeleteFunction}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default Alerts