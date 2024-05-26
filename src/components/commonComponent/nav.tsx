'use client';
import React, { useEffect, useState } from 'react'
import Navitems from './navitems'
import getuserSession from '../../auth/getUserSession'
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SignOutServer from '../../auth/signout'
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link'
const Nav = () => {
  const router = useRouter()
  const [flag, setflag] = useState<boolean>(false)
  const [userEmail, setuserEmail] = useState<string | undefined>('')
  useEffect(() => {
    const getSessionOfUser = async () => {
      const result = await getuserSession()
      const { error } = result;
      if (error) {
        setflag(false)
      } else {
        const { data } = result;
        if (data) {
          if (data?.session?.user) {
            setuserEmail(data.session.user.email)
            setflag(true)
          }
        }
      }
    }
    getSessionOfUser()
  }, [])

  const logout = async () => {
    await SignOutServer()
  }
  return (
    <div className='w-[100vw] min-w-[100vw] h-[4rem] flex justify-center items-center border-solid border-[1px] overflow-x-hidden'>
      <div className='w-[min(95vw,1900px)]  h-full flex justify-between items-center overflow-x-hidden'>
        <div className='h-full gap-20 pl-10 base:hidden md:flex items-center'>
          <Link href={'/home/dashboard'} className='scroll-m-20 smallLogofont cursor-pointer'>Votum</Link>
          {flag === false ? (
            <Navitems />
          ) : (
            <ul className='flex items-center justify-center gap-8 !text-[0.93rem]'>
               <li className='cursor-pointer'
                onClick={(e) => router.push('/home/dashboard')}>Workspace</li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='cursor-pointer flex justify-center items-center gap-[1px]'>
                    <li>Features</li>
                    <ChevronDown size={17}/>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="shadow-[0px_-1px_11px_-3px_rgba(0,0,0,0.1)] w-[615px] gap-5 ml-[32%] mt-[2%] flex flex-wrap p-4 rounded-2xl">
                    <DropdownMenuItem onClick={(e)=>router.push("/translate")} className='w-[280px] cursor-pointer  h-[100px] flex justify-center items-center gap-2'>
                       <div className='w-[50px] h-full flex justify-center items-center'>
                          <img className='w-[27px] h-[29px] rounded-[3px]' src="/images/translateNavLogo.png" alt="dfv" />
                       </div>
                       <div className='w-[calc(100%_-_50px)] h-full flex flex-col justify-center  gap-1'>
                       <h1 className='font-[660] text-[1.15rem]'>Translate Document</h1>
                        <p className='text-[0.82rem] text-justify text-muted-foreground'>Convert Document English-Hindi</p>
                       </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={(e)=>router.push("/chat-doc")} className='w-[280px] cursor-pointer  h-[100px] flex justify-center items-center gap-2'>
                       <div className='w-[50px] h-full flex justify-center items-center'>
                          <img className='w-[27px] h-[29px] rounded-[3px]' src="/images/transcribeNavLogo.png" alt="dfv" />
                       </div>
                       <div className='w-[calc(100%_-_50px)] h-full flex flex-col justify-center  gap-1'>
                        <h1 className='font-[660] text-[1.15rem]'>Document QA</h1>
                        <p className='text-[0.82rem] text-justify text-muted-foreground'>Lorem ipsum dolor sit amet</p>
                       </div>
                    </DropdownMenuItem>


                    <DropdownMenuItem onClick={(e)=>router.push("/transcribe")} className='w-[280px] cursor-pointer  h-[100px] flex justify-center items-center gap-2 mt-[-1.15rem]'>
                       <div className='w-[50px] h-full flex justify-center items-center'>
                          <img className='w-[27px] h-[29px] rounded-[3px]' src="/images/transcribeNavLogo.png" alt="dfv" />
                       </div>
                       <div className='w-[calc(100%_-_50px)] h-full flex flex-col justify-center  gap-1'>
                        <h1 className='font-[660] text-[1.15rem]'>Transcriptions</h1>
                        <p className='text-[0.82rem] text-justify text-muted-foreground'>Convert Your Audio to Text</p>
                       </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={(e)=>router.push("/ipc-bot")} className='w-[280px] cursor-pointer h-[100px] flex justify-center items-center gap-2 mt-[-1.15rem]'>
                       <div className='w-[50px] h-full flex justify-center items-center'>
                          <img className='w-[27px] h-[29px] rounded-[3px]' src="/images/transcribeNavLogo.png" alt="dfv" />
                       </div>
                       <div className='w-[calc(100%_-_50px)] h-full flex flex-col justify-center  gap-1'>
                        <h1 className='font-[660] text-[1.15rem]'>IPC Bot</h1>
                        <p className='text-[0.82rem] text-justify text-muted-foreground'>Lorem ipsum dolor sit amet</p>
                       </div>
                    </DropdownMenuItem>


                </DropdownMenuContent>
              </DropdownMenu>
              {/* <li className='cursor-pointer hover:underline' 
                      onClick={(e)=>router.push("/translate")}>Features</li> */}

              <li className='cursor-pointer' onClick={(e) => {
                e.preventDefault()
                router.push("/about")
              }}>About us</li>
              <li className='cursor-pointer'
                onClick={(e) => router.push('/contact')}>Contact</li>

            </ul>
          )}
        </div>
        <div className='flex justify-center items-center gap-6'>
          {flag === false ? (
            <Button variant='outline' onClick={(e) => router.push('/auth/signin')}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='bg-[#004D40] text-white rounded-full w-[35px] h-[35px] flex justify-center items-center text-[1.1rem] capitalize cursor-pointer'>
                  <h1>{userEmail ? userEmail[0] : ''}</h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}
export default Nav