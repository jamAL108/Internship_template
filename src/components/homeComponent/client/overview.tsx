import React from 'react'

const Overview: React.FC<any> = (props) => {
    const { setActiveNav, notes } = props
    return (
        <div className='w-full flex flex-col'>
            <div className='bg-[#f5f6f8] rounded-lg w-full px-[23px] flex flex-col !gap-3 py-[20px]'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='text-[1.05rem] select-none font-[580]'>Recent Notes</h2>
                    <h3 onClick={(e) => setActiveNav('Notes')} className={` ${notes.length===0 ? 'hidden' : 'flex'} text-[0.82rem] cursor-pointer font-[450] text-[#5b89e9]`}>Show all</h3>
                </div>
                <div className='w-full flex flex-col gap-[10px]'>
                    {
                        notes.length !== 0 && notes.slice(0, 3).map((note: any, index: number) => (
                            <div className='w-full px-[10px] py-[8px] flex items-center bg-white rounded-[md shadow-sm'>
                                <h2 className='text-sm font-[470]'>{note.title}</h2>
                            </div>
                        ))
                    }
                    {notes.length === 0 && (
                        <div className='w-full flex pt-[10px] items-center justify-center'>
                           <h2 className='text-[0.82rem] font-[400] text-muted-foreground'>No Notes to display</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Overview