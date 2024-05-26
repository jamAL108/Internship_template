'use client';
import React, { useEffect, useState } from 'react'
import Component from './component'
import { useRouter } from 'next/navigation';
import Nav from '@/components/commonComponent/nav'
const page = () => {
    const router = useRouter();
    const [precedentData, setPrecedentData] = useState<any>(null)

    useEffect(() => {
        let sessionPrecedentData: any = sessionStorage.getItem('RetrievalData')
        const parsedPrecedentData: any = JSON.parse(sessionPrecedentData)
        if (parsedPrecedentData === null) {
            router.push('/retrieval')
        }
        setPrecedentData(parsedPrecedentData)
    }, []);


    return (
        <div className='w-[100%] h-[100%] flex flex-col items-center overflow-x-hidden'>
            <Nav />
            {precedentData !== null && <Component precedentData={precedentData} />}
        </div>
    )
}

export default page