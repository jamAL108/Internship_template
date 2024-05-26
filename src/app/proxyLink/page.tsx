'use client';
import React , {useEffect} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter()
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const email = queryParams.get('email')
        const name = queryParams.get('name')
        const avatar_url = queryParams.get('avatar_url')
        const id = queryParams.get('id')
        const google_calender_integrated = Boolean(queryParams.get('google_calender_integrated'))
        const obj ={
            email:email,
            name:name,
            avatar_url:avatar_url,
            id:id,
            google_calender_integrated:google_calender_integrated
        }
        localStorage.setItem('VotumUserDetails',JSON.stringify(obj))
        const Code:any = localStorage.getItem('VotumRedirectToCalender')
        const RedirectToCalender:any = JSON.parse(Code)
        if(RedirectToCalender===null){
            router.replace('/home/dashboard')
        }else{
            if( RedirectToCalender.code==='QWERTY&*^(%RFV'){
                localStorage.removeItem('VotumRedirectToCalender')
                router.replace('/home/calender')
            }else{
                localStorage.removeItem('VotumRedirectToCalender')
                router.replace('/home/dashboard')
            }
        }
      }, []); 
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <ClipLoader
            color={"#5B0888"}
            loading={true}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        </div>
    )
}

export default page