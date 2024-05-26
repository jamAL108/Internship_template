'use client';
import React, { useEffect, useState } from 'react'
import { BookText, Search, UserRound, Settings, AlignLeft, SquareUser, LogOut } from 'lucide-react';
import NavItems from './navitems'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SignOutServer from '../../auth/signout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import Features from './features'
import * as AccordionRadix from '@radix-ui/react-accordion';
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import MenuLink from './menulink'
import getuserSession from '../../auth/getUserSession'
import { RiMenu2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from '../ui/skeleton';
import FeatureLink from './featurelink'
import { ScrollArea } from '../ui/scroll-area';
import SettingsComponenet from './settings'
const Navbar = () => {
  const [pathname, setpathname] = useState(usePathname())
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)
  const router = useRouter()

  const [userEmail, setuserEmail] = useState<any>('')
  const [userProfile, setUserProfile] = useState<any>('')
  const [loader, setloader] = useState<boolean>(true)

  const [ProfileActive, setProfileActive] = useState<boolean>(false)
  useEffect(() => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
      setuserEmail(parsedUserDetails.email)
      setUserProfile(parsedUserDetails.avatar_url)
      setloader(false)
    }
    console.log(parsedUserDetails)
  }, [])

  const logout = async () => {
    // localStorage.removeItem('VotumUserDetails')
    await SignOutServer()
  }

  return (
    // text-[#46494F]
    <>
      <div className='base:hidden bl:flex flex-col relative w-[min(18%,380px)] h-[94%] bg-transparent  text-[#72727b]'>
        <div className='mt-[-2px] w-full py-[13px] px-[16px] flex justify-between items-center border-b-[2px] border-dotted
         border-b-[#C5C6C8] '>
          <div className='flex justify-center items-center gap-3 select-none'>
            <img src="/images/votumLogo.png" alt="vlogo" className='w-[35px] h-[35px] rounded-[4px]' />
            <h2 className='text-[1.13rem] text-[#0d0c22] font-[630] tracking-[0.4px]'>The Votum</h2>
          </div>
          <BookText size={20} color='black' className='opacity-[0.2]' />
        </div>
        {/* #edeef2 (new) ---------------- #eeefff (old) */}
        <div className='w-full navbarscrollOfHome h-[calc(100vh_-_157px)] pl-[13px] pr-[13px] flex flex-col mt-[4px] pt-[8px] gap-1 text-[#46494F] pb-[20px]'>
          {NavItems.map((navitem, idx) => (
            <MenuLink key={idx} setSheetOpen={setSheetOpen} item={navitem} />
          ))}
          {
            Features.map((feature, idx: number) => (
              <FeatureLink key={idx} setSheetOpen={setSheetOpen} item={feature} />
            ))
          }
        </div>
        <div className='absolute  bottom-[-1vh] flex justify-center items-center border-t-[1px] w-full px-[16px] py-[10px] bg-[#fbfbfb] z-[10]'>
          <DropdownMenu open={ProfileActive} onOpenChange={setProfileActive}>
            <DropdownMenuTrigger asChild>
              <div onClick={(e) => setProfileActive(true)} className={`w-full py-[7px] pl-[4px] cursor-pointer rounded-[6px] flex gap-3 items-center  ${ProfileActive === true ? 'bg-white border-[2px] shadow-sm' : "bg-[#fbfbfb] hover:bg-[#f4f4f5]  border-none shadow-none"}  `}>
                <SquareUser size={20} color='#636F7E' />
                <h2 className='flex items-center gap-3 text-[0.92rem] !font-[500]'>Account</h2>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" max-w-[400px] min-w-[min(16vw,370px)] border-[2px] bg-white z-[10] ">
              <DropdownMenuItem asChild>
                <SettingsComponenet />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className='flex items-center gap-[16px] text-[0.9rem] py-[8px] px-[10px]'>
                <LogOut size={20} color='#344054' />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='base:flex bl:hidden w-full py-[10px] h-[4rem] border-b-[2px]  flex justify-between items-center'>
        <div className='px-[20px] py-[5px] flex justify-center items-center'>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild onClick={(e: any) => setSheetOpen(true)}>
              <RiMenu2Line size={20} color='#6c7290' />
            </SheetTrigger>
            <SheetContent side={'left'} className='z-[100000] base:w-[85vw] md:w-[70vw] py-[30px] px-[20px]'>
              <div className='w-full flex'>
                <div className='flex justify-center items-center gap-3 select-none'>
                  <img src="/images/votumLogo.png" alt="vlogo" className='w-[35px] h-[35px] rounded-[4px]' />
                  <h2 className='text-[1.13rem] text-[#0d0c22] font-[630] tracking-[0.4px]'>The Votum</h2>
                </div>
              </div>
              <div className='w-full flex flex-col mt-[30px] gap-[4px]'>
                {NavItems.map((navitem, idx) => (
                  <MenuLink key={idx} setSheetOpen={setSheetOpen} item={navitem} />
                ))}
                {
                  Features.map((feature, idx: number) => (
                    <FeatureLink key={idx} setSheetOpen={setSheetOpen} item={feature} />
                  ))
                }
              </div>
            </SheetContent >
          </Sheet >
        </div >
        <div className='px-[20px] py-[5px] flex justify-center items-center gap-[10px] '>
          {loader === true ? (
            <Skeleton className=' rounded-full w-[35px] h-[35px]' />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {
                  userProfile === null ? (
                    <div className='bg-[#004D40] text-white rounded-full w-[35px] h-[35px] flex justify-center items-center text-[1.1rem] capitalize cursor-pointer'>
                      <h1>{userEmail ? userEmail[0] : ''}</h1>
                    </div>
                  ) : (
                    <div className='bg-[#004D40] text-white rounded-full w-[35px] h-[35px] flex justify-center items-center text-[1.1rem] capitalize cursor-pointer'>
                      <img src={userProfile} alt="dedefr" className='w-full h-full rounded-full' />
                    </div>
                  )
                }
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[100%] !top-[-40px] !right-[200px]">
                <DropdownMenuItem asChild >
                  <SettingsComponenet />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className='flex items-center gap-[20px] text-[0.9rem] py-[8px] px-[10px]'>
                  <LogOut size={20} color='#344054' />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div >
    </>
  )
}



const AccordionTrigger = React.forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <AccordionRadix.Header className="AccordionHeader">
    <AccordionRadix.Trigger
      className={cn('AccordionTrigger [&[data-state=open]>svg]:rotate-180', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="h-[1.1rem] w-[1.1rem] shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionRadix.Trigger>
  </AccordionRadix.Header>
));



export default Navbar