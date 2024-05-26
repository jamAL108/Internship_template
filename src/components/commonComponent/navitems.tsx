'use client';
import Scroll from '../../utils/scroll'
import { useRouter } from 'next/navigation';
const Navitems = () => {
    const router = useRouter()
    return (
        <ul className='flex items-center justify-center gap-8 !text-[0.85rem]'>
            <li className='cursor-pointer hover:underline' onClick={(e)=>{
                e.preventDefault()
                Scroll("transDiv")
            }}>Our Solutions</li>
            <li className='cursor-pointer hover:underline'>About</li>
            <li className='cursor-pointer hover:underline'>Blogs</li>
            <li className='cursor-pointer hover:underline' onClick={(e)=>{
                e.preventDefault()
                router.push('/privacy')
            }}>Privacy Policy</li>
        </ul>
    )
}

export default Navitems