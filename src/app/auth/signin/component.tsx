// 'use client';
// import React, { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Nav from '@/components/commonComponent/nav'
// import { ColorRing } from 'react-loader-spinner'
// import { AlertCircle } from 'lucide-react';
// import { signinWithEmailPassword } from '../../../auth/index'
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
// import Image from 'next/image'

// import { googleAuth } from '@/auth/googleAuth'

// const Signin = () => {
//     const [email, setemail] = useState<string>('')
//     const [password, setpassword] = useState<string>('')
//     const [request, setrequest] = useState<boolean>(false)
//     const [error, seterror] = useState<string>('')
//     const router = useRouter()
//     const handlesubmit = async () => {
//         seterror('')
//         setrequest(true)
//         if (password.length === 0 || email.length === 0) {
//             toast.error('Enter all fields properly', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             })
//             setrequest(false)
//         } else {
//             const formdata = {
//                 email, password
//             }
//             const result: any = await signinWithEmailPassword(formdata)
//             const { error } = JSON.parse(result)
//             console.log(result)
//             if (error?.message) {
//                 toast.error(error.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "colored",
//                 })
//                 setrequest(false)
//             } else {
//                 const userData = JSON.parse(result)
//                 localStorage.setItem('VotumUserDetails', JSON.stringify(userData.data[0]))
//                 router.push('/home/dashboard')
//             }
//         }
//     }
//     return (
//         <div className="bg-[#FAFAFA] dark:bg-transparent  min-h-[100vh]  overflow-x-hidden flex items-center justify-start flex-col md:w-[100%] base:w-[100%]">
//             <Nav />
//             <div className='w-[100%] min-h-[90vh] flex justify-center items-center'>
//                 <Card className='w-[400px]'>
//                     <CardHeader>
//                         <CardTitle>Sign in</CardTitle>
//                         <CardDescription>
//                             Welcome back! Sign in for a personalized experience and exclusive features.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <div className="space-y-1">
//                             <Label htmlFor="Email">Email</Label>
//                             <Input id="Email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='user@example.com' />
//                         </div>
//                         <div className="space-y-1">
//                             <Label htmlFor="Password">Password</Label>
//                             <Input id="Password" type='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='******' />
//                         </div>
//                     </CardContent>
//                     <CardFooter className='flex justify-between mt-[10px]'>
//                         <Button className="gap-1" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={handlesubmit}>
//                             <ColorRing
//                                 visible={request}
//                                 height="30"
//                                 width="30"
//                                 ariaLabel="color-ring-loading"
//                                 wrapperStyle={{}}
//                                 wrapperClass="color-ring-wrapper"
//                                 colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
//                             /> Sign In</Button>

//                             <span className='text-[0.7rem]'>or</span>

//                         <div className='cursor-pointer rounded-[25px] shadow-sm px-[13px] py-[5px] bg-[#f5f5f5] text-black flex justify-center items-center gap-[0.35rem] transition duration-500 ease-in-out hover:shadow-md' onClick={(e)=>googleAuth()}>
//                             <Image src='/images/googleLogo.png' alt='google logo' width={32} height={32} />
//                             <h2 className='text-[0.86rem] font-[600]'>Continue With Google</h2>
//                         </div>
//                     </CardFooter>
//                 </Card>
//             </div>
//         </div>
//     )
// }

// export default Signin

'use client';
import React, { useEffect, useState } from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Nav from '@/components/commonComponent/nav'
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react';
import { signinWithEmailPassword } from '../../../auth/index'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image'

import { googleAuth } from '@/auth/googleAuth'

export default function LoginForm() {

    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [request, setrequest] = useState<boolean>(false)
    const [error, seterror] = useState<string>('')
    const router = useRouter()
    const handlesubmit = async () => {
        seterror('')
        setrequest(true)
        if (password.length === 0 || email.length === 0) {
            toast.error('Enter all fields properly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setrequest(false)
        } else {
            const formdata = {
                email, password
            }
            const result: any = await signinWithEmailPassword(formdata)
            const { error } = JSON.parse(result)
            console.log(result)
            if (error?.message) {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setrequest(false)
            } else {
                const userData = JSON.parse(result)
                localStorage.setItem('VotumUserDetails', JSON.stringify(userData.data[0]))
                router.push('/home/dashboard')
            }
        }
    }

    return (
        <div className='flex w-[100vw] flex-col h-[100vh]'>
            <Nav />
            <div className='w-[100%] min-h-[90vh] flex justify-center items-center'>
                <Card className="mx-auto max-w-sm base:w-[94%] tv:w-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Welcome back! Login for a personalized experience and exclusive features.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email} onChange={(e) => setemail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" required value={password} onChange={(e) => setpassword(e.target.value)} placeholder='******' />
                            </div>
                            <Button type="submit" className="w-full flex justify-center items-center gap-1" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={handlesubmit}>
                                <ColorRing
                                    visible={request}
                                    height="23"
                                    width="23"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                />
                                Login
                            </Button>
                            <Button variant="outline" className="w-full" onClick={(e)=>googleAuth()}>
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm flex items-center justify-center gap-1">
                            Don&apos;t have an account?{" "}
                            <h2 onClick={(e)=>router.push('/auth/signup')} className="underline cursor-pointer">
                                Sign up
                            </h2>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}