'use client';
import React, { useState } from 'react'
import { X } from 'lucide-react';
const Tabs: React.FC<any> = (props) => {
    const { setCurrentActiveNode, setActiveNote, note, index, currentActiveNote, recentNote, notes, setRecentNote, activeNote } = props
    const [isHovered, setIsHovered] = useState<boolean>(false)

    function shrinkText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength) + "...";
        }
    }

    return (
        <div
            onMouseEnter={(e) => setIsHovered(true)}
            onMouseLeave={(e) => setIsHovered(false)}
            onClick={(e) => {
                let idx = notes.findIndex((item: any) => item.id === note.id)
                if (idx !== -1) {
                    setCurrentActiveNode(notes[idx])
                    setActiveNote(note.id)
                }
            }} className={`flex gap-1 !max-w-[220px] cursor-pointer items-center pl-[17px] pr-[15px] py-[7px] ${currentActiveNote.id === note.id ? 'bg-white' : 'bg-[#eeeff1]'} ${index === 0 ? 'rounded-l-[0px] rounded-tr-[9px]' : 'rounded-tl-[9px] rounded-tr-[9px]'}`}>
            <h2 className='text-[0.82rem] font-[520]'>{shrinkText(note.Title, 13)}</h2>
            <div className='w-[10px]'>
                {isHovered && <X size={14} onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    let arr = [...recentNote]
                    let idx = arr.findIndex((item: any) => item.id === note.id)
                    if (idx !== -1 && activeNote === note.id) {
                        if (idx === 0) {
                            if (recentNote.length === 1) {
                                arr.splice(idx, 1)
                                setCurrentActiveNode(null)
                                setActiveNote(null)
                            } else {
                                let idOfPrev = recentNote[idx + 1].id
                                let newidx = notes.findIndex((item: any) => item.id === idOfPrev)
                                setCurrentActiveNode(notes[newidx])
                                setActiveNote(idOfPrev)
                                arr.splice(idx, 1)
                            }
                        } else {
                            let idOfPrev = recentNote[idx - 1].id
                            let newidx = notes.findIndex((item: any) => item.id === idOfPrev)
                            setCurrentActiveNode(notes[newidx])
                            setActiveNote(idOfPrev)
                            arr.splice(idx, 1)
                        }
                        setRecentNote(arr)
                    } else if (idx !== -1 && activeNote !== note.id) {
                        arr.splice(idx, 1)
                        setRecentNote(arr)
                    }
                }} color='black' />}
            </div>
        </div>
    )
}

export default Tabs