'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MdUpdate } from "react-icons/md";
import { last_updated_by } from '@/apiReq/newAPIs/lastUpdated'
const Last_updated: React.FC<any> = (props) => {
    const { time, id, currentUser } = props
    const [user, setUser] = useState<any>(null)
    let error = ''
    useEffect(() => {
        const getUser = async () => {
            if (currentUser.id !== id) {
                const result: any = await last_updated_by(id)
                if (result.success === true) {
                    setUser(result.user)
                } else {
                    error = "Some issue while fetching data"
                }
            } else {
                setUser(currentUser)
            }
        }
        getUser()
    }, [id])

    const customizeDateCreated = (currentDate: any) => {
        const timestamptz: any = new Date(currentDate);
        let year = timestamptz.getFullYear();
        let month = timestamptz.toLocaleString('default', { month: 'long' });
        let date = String(timestamptz.getDate()).padStart(2, '0');
        let hours = timestamptz.getHours();
        let minutes = String(timestamptz.getMinutes()).padStart(2, '0');
        let amPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        hours = String(hours).padStart(2, '0');

        let dateTimeString = `${year} ${month} ${date} | ${hours}:${minutes} ${amPM}`;

        return dateTimeString;
    }

    return (
        <Dialog>
            <DialogTrigger className='flex items-center gap-[20px] text-[0.85rem] w-full h-full py-[8px] px-[9px]'>
                <MdUpdate size={16} color='#344054' />
                Last updated by
            </DialogTrigger>
            <DialogContent className='base:w-[90%] tv:w-[350px] bl:w-[350px] rounded-[8px] py-[20px] px-[20px]'>
                <DialogHeader>
                    <DialogTitle className='!text-md'>Last Updated !</DialogTitle>
                </DialogHeader>
                {error === '' && user === null ? (
                    <p>Loading....</p>
                ) : error.length !== 0 ? (
                    <h1>{error}</h1>
                ) : user !== null && (
                    <div className='w-full flex py-[10px] flex-col gap-2 items-center justify-center'>
                        <div className="flex items-center w-[100%]  text-sm">
                            <dt className="text-muted-foreground w-[30%]">Time :</dt>
                            <dd>{customizeDateCreated(time)}</dd>
                        </div>
                        <div className="flex items-center w-[100%]  text-sm">
                            <dt className="text-muted-foreground w-[30%]">Member :</dt>
                            <dd>{user.name}{id === currentUser.id ? ' (you)' : ''}</dd>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default Last_updated