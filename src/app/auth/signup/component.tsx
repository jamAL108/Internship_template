'use client';
import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react';
import { signupWithEmailPassword } from '../../../auth/index'
import Nav from '@/components/commonComponent/nav'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { checkEmail, checkInvitecode } from '@/apiReq/newAPIs/signup'
import { Image, ImageMinus } from 'lucide-react'

const Signup = () => {
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [name, setname] = useState<string>("")
    const [confirmPassword, setconfirmPassword] = useState<string>('')
    const [request, setrequest] = useState<boolean>(false)
    const [emailrequest, setemailrequest] = useState<boolean>(false)
    const [slide, setslide] = useState<number>(0)
    const [Workspacename, setWorkSpaceName] = useState<string>('')
    const [inviteCode, setInviteCode] = useState<string>('')
    const [createworkspace, setcreateworkspace] = useState<boolean>(false)
    const router = useRouter()
    const [image, setImage] = useState<File | null>(null);

    const [workspaceDetailForInvite, setWorkspaceDetailForInvite] = useState<any>(null)

    const inputRef = useRef<HTMLInputElement>(null);

    const handleParentClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };


    const checkEmailFunction = async () => {
        setemailrequest(true)
        if (email.length === 0 || name.length === 0) {
            toast.error('Enter all fields properly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setemailrequest(false)
            return
        }
        const result = await checkEmail(email)
        if (result.success === true) {
            if (result.newUser === true) {
                setslide(1)
                setemailrequest(false)
            } else {
                toast.error('email Already exists', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setemailrequest(false)
            }
        } else {
            toast.error(result.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const handlesubmit = async () => {
        setrequest(true)
        if (password.length === 0 || email.length === 0 || confirmPassword.length === 0 || name.length === 0) {
            toast.error('Enter all fields properly', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (password !== confirmPassword) {
            toast.error("Password and Confirm Password not matching", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            const formdata = {
                email, password, name , createworkspace , workspaceDetailForInvite,  Workspacename
            }
            const result: any = await signupWithEmailPassword(formdata)
            const res: any = JSON.parse(result)
            console.log(result)
            if (res.success === false) {
                console.log("KAW")
                toast.error(res.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setrequest(false)
            } else {
                console.log("KAWWW")
                console.log(res)
                localStorage.setItem('VotumUserDetails', JSON.stringify(res.data))
                router.push('/home/dashboard')
                console.log("KAWWW")
            }
        }
    }

    const checkInvitecodeFunction = async () => {
        setemailrequest(true)
        if (inviteCode.length === 0) {
            toast.error('Enter invite code please', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        const result: any = await checkInvitecode(inviteCode)
        console.log(result)
        if (result.success === false) {
            toast.error(result.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setemailrequest(false)
        } else {
            setWorkspaceDetailForInvite(result.data)
            setslide(3)
            setemailrequest(false)
        }
    }

    return (
        <div className="bg-[#FAFAFA] dark:bg-transparent  min-h-[100vh]  overflow-x-hidden flex items-center justify-start flex-col md:w-[100%] base:w-[100%]">
            <Nav />
            <div className='w-[100%] min-h-[90vh] flex justify-center items-center'>
                {slide === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Votum</CardTitle>
                            <CardDescription>
                                Register Now , to unlock some extraordinary features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="Email">What should we call you ?</Label>
                                <Input id="Name" value={name} onChange={(e) => setname(e.target.value)} placeholder='John Doe' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="Email">Email</Label>
                                <Input id="Email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='user@example.com' />
                            </div>
                        </CardContent>
                        <CardFooter className='flex justify-between' >
                            <p className='text-[0.8rem] font-[500]'>Already a user ? <span className='text-[#029BE6] underline cursor-pointer' onClick={(e) => router.push('/auth/signin')}>login</span></p>
                            <Button className="gap-1" disabled={emailrequest} style={emailrequest === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={checkEmailFunction}>
                                <ColorRing
                                    visible={emailrequest}
                                    height="20"
                                    width="20"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                />
                                Next</Button>
                        </CardFooter>
                    </Card>
                ) : slide === 1 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Votum</CardTitle>
                            <CardDescription>
                                Register Now , to unlock some extraordinary features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-[20px] items-center">
                            <Button variant='outline' className='w-[200px] border-[#0064FF] text-[#0064FF] hover:bg-[#0064FF] hover:text-white' onClick={(e) => {
                                setslide(2)
                                setcreateworkspace(true)
                            }}>Create a Workspace</Button>
                            <Button variant='outline' className='w-[200px] border-[#0064FF] text-[#0064FF] hover:bg-[#0064FF] hover:text-white' onClick={(e) => {
                                setslide(2)
                                setcreateworkspace(false)
                            }}>Join  Workspace</Button>
                        </CardContent>
                        <CardFooter className='flex justify-between' >
                            <Button variant='outline' className="gap-1" onClick={(e) => setslide(0)}>
                                back</Button>
                        </CardFooter>
                    </Card>
                ) : slide === 2 ? (
                    createworkspace === true ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome to Votum</CardTitle>
                                <CardDescription>
                                    Register Now , to unlock some extraordinary features
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-1">
                                    <Label htmlFor="Email">Workspace Name</Label>
                                    <Input id="Name" value={Workspacename} onChange={(e) => setWorkSpaceName(e.target.value)} placeholder='Google' />
                                </div>
                                <div className='flex flex-col  gap-2 mb-[20px]'>
                                    <Label htmlFor="Profile">Workspace Profile :</Label>
                                    {
                                        image === null && (
                                            <div onClick={handleParentClick} className='border-[2px] border-black rounded-[7px] hover:border-[#a0c1f6] bg-[#f3f4f6] px-[20px] py-[30px] flex justify-center items-center flex-col w-[200px] cursor-pointer gap-2'>
                                                <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                                                <Image size={22} />
                                                <h2 className='text-[0.9rem] font-[500]'>Click to uplaod Logo</h2>
                                            </div>
                                        )
                                    }
                                    {image && (
                                        <div className='flex justify-between py-[10px] min-w-[180px]'>
                                            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '140px', maxHeight: '140px' }} />
                                            <button className='hover:bg-[#f05656] max-h-[40px] flex justify-center items-center gap-2 text-md font-[500] bg-[#EF4444] text-white w-auto px-[8px] py-[8px] rounded-[6px]' onClick={handleRemoveImage}><ImageMinus size={22} color='white' /> Remove Image</button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className='flex justify-between' >
                                <Button variant='outline' className="gap-1" onClick={(e) => setslide(1)}>
                                    back</Button>
                                <Button className="gap-1" onClick={(e) => setslide(3)}>
                                    Next</Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome to Votum</CardTitle>
                                <CardDescription>
                                    Register Now , to unlock some extraordinary features
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="Email">Enter Invite Code</Label>
                                    <Input disabled={emailrequest} id="Name" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder='***' />
                                </div>
                            </CardContent>
                            <CardFooter className='flex justify-between' >
                                <Button disabled={emailrequest} variant='outline' className="gap-1" onClick={(e) => setslide(1)}>
                                    back</Button>
                                <Button className="gap-1" onClick={(e) => checkInvitecodeFunction()}
                                    disabled={emailrequest} style={emailrequest === true ? { opacity: 0.67 } : { opacity: 1 }}>
                                    <ColorRing
                                        visible={emailrequest}
                                        height="20"
                                        width="20"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                    />
                                    Next</Button>
                            </CardFooter>
                        </Card>
                    )
                ) : (
                    <Card className='min-w-[380px]'>
                        <CardHeader>
                            <CardTitle>Welcome to Votum</CardTitle>
                            <CardDescription>
                                Add Password and confirm password
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="Email">Password</Label>
                                <Input id="Name" type='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='*****' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="Email">confirm Password</Label>
                                <Input id="Email" type='password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder='*****' />
                            </div>
                        </CardContent>
                        <CardFooter className='flex justify-between' >
                            <Button variant='outline' className="gap-1" onClick={(e) => setslide(1)}>
                                Back</Button>
                            <Button className="gap-1" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={handlesubmit}>
                                <ColorRing
                                    visible={request}
                                    height="30"
                                    width="30"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                /> Finish</Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Signup