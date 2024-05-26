'use client';
import React, { useEffect, useState } from 'react'
import { getCase } from '@/apiReq/newAPIs/cases'
import { toast } from 'react-toastify'
import { getCaseFromBackend } from '@/apiReq/newAPIs/cases'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft } from 'lucide-react'
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Timeline from './timeline';
import { addCase } from '@/apiReq/newAPIs/cases'
import { ColorRing } from 'react-loader-spinner'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Component: React.FC<any> = (props) => {
    const { caseId } = props
    const router = useRouter()
    const [caseData, setCaseDetail] = useState<any>({})
    const [loader, setloader] = useState<boolean>(true)
    const [historyData, setHistoryData] = useState<any>([])
    useEffect(() => {
        getCaseInfo()
    }, [])

    const getCaseInfo = async () => {
        const result: any = await getCase(caseId)
        if (result.success === true) {
            setCaseDetail(result.data[0])
            filterHistoryData(result.data[0].History)
            setloader(true)
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

    const filterHistoryData = (history: any) => {
        setHistoryData(history)
    }

    const cnrShrinker = (cnr: any) => {
        let cnrString = new String(cnr)
        return cnrString.substring(0, 16)
    }

    return (
        <div className='flex w-full h-full justify-center'>
            <div className='w-[min(1300px,100%)] h-full base:overflow-y-auto tv:overflow-y-hidden flex base:flex-col tv:flex-row'>
                <div className='base:w-full  h-full flex flex-col'>
                    <div className='w-full flex justify-between items-center base:pl-[20px] tv:pl-[30px] py-[20px] pr-[30px]'>
                        <div className='flex items-center gap-[0.8rem]'>
                            <div onClick={(e) => router.push('/home/cases')} className='rounded-full cursor-pointer bg-[#e8effe] w-[28px] h-[28px] flex justify-center items-center'>
                                <ArrowLeft size={21} color='#5b89e9' />
                            </div>
                            <h2 className='text-[0.95rem] font-[500] select-none'>Case details</h2>
                        </div>
                        {/* <div className='flex items-center'>
                            <button onClick={addToWorkspace} disabled={saveLoader} style={saveLoader === true ? { opacity: 0.67 } : { opacity: 1 }} className='px-[20px] py-[8px] rounded-[10px] text-[0.88rem] font-[500] text-white bg-[#6680ff] transition duration-300 ease-in hover:bg-[#004fc5] '>
                                <ColorRing
                                    visible={saveLoader}
                                    height="30"
                                    width="30"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                />
                                Add to workspace</button>
                        </div> */}
                    </div>

                    <div className='w-full flex pt-[15px] base:pl-[20px] tv:pl-[30px] pr-[15px]'>
                        <div className='w-[60%] ADDcaseInofComponent flex flex-col pt-[20px] gap-[10px] overflow-y-auto max-h-[85vh]'>

                            <div className='w-full'>
                                <h1 className='text-2xl pr-[30px] font-[500]'>{caseData.parties}</h1>
                                <h2 className='text-[0.92rem] mt-[4px] font-[470]'>Forum: District Court</h2>
                                <div className='flex items-center mt-[2px] gap-[10px] text-[0.8rem] font-[400]'>
                                    <p>Maharashtra</p>
                                    <div className='bg-[#e8effe] flex justify-center items-center w-[15px] h-[15px] rounded-full'>
                                        <ChevronRight color='#5b89e9' size={15} />
                                    </div>
                                    <p>Mumbai</p>
                                    <div className='bg-[#e8effe] flex justify-center items-center  w-[15px] h-[15px] rounded-full'>
                                        <ChevronRight color='#5b89e9' size={15} />
                                    </div>
                                    <p>Sewri High court</p>


                                    {/* /// OG Data */}
                                    {/* <p>{caseMoreDetails.searchedData.state}</p>
                                    <div className='bg-[#e8effe] flex justify-center items-center w-[20px] h-[20px] rounded-full'>
                                        <ChevronRight color='#5b89e9' size={18}/>
                                    </div>
                                    <p>{caseMoreDetails.searchedData.district}</p>
                                    <div className='bg-[#e8effe] flex justify-center items-center  w-[20px] h-[20px] rounded-full'>
                                        <ChevronRight color='#5b89e9' size={18}/>
                                    </div>
                                    <p>{caseMoreDetails.searchedData.courtComplex}</p> */}
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5 mt-[10px]">
                                <Label htmlFor="name">Case type</Label>
                                <div className='border-[1.9px] w-[80%] rounded-[6px] flex items-center flex-col'>
                                    <div className='w-full py-[7px] px-[12px] flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Type</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Case Type']}</h2>
                                    </div>
                                    <Separator className='w-[95%] h-[1px]' />
                                    <div className='w-full py-[7px] px-[12px]  flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Status</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Case Status']}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5 mt-[10px]">
                                <Label htmlFor="name">Parties</Label>
                                <div className='border-[1.9px] w-[80%] rounded-[6px] flex items-center flex-col'>
                                    <div className='w-full py-[7px] px-[12px] flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Petitioner and Advocate</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Petitioner and Advocate']}</h2>
                                    </div>
                                    <Separator className='w-[95%] h-[1px]' />
                                    <div className='w-full py-[7px] px-[12px]  flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Respondent and Advocate</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Respondent and Advocate']}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5 mt-[10px]">
                                <Label htmlFor="name">Case details</Label>
                                <div className='border-[1.9px] w-[80%] rounded-[6px] flex items-center flex-col'>
                                    <div className='w-full py-[7px] px-[12px] flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>CNR Number</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{cnrShrinker(caseData['CNR Number'])}</h2>
                                    </div>
                                    <Separator className='w-[95%] h-[1px]' />
                                    <div className='w-full py-[7px] px-[12px]  flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Filing Number</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Filing Number']}</h2>
                                    </div>
                                    <Separator className='w-[95%] h-[1px]' />
                                    <div className='w-full py-[7px] px-[12px]  flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Registration  Number</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Registration Number']}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5 mt-[10px]">
                                <Label htmlFor="name">Major events</Label>
                                <div className='border-[1.9px] w-[80%] rounded-[6px] flex items-center flex-col'>
                                    <div className='w-full py-[7px] px-[12px] flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>First Hearing Date</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['First Hearing Date']}</h2>
                                    </div>
                                    <Separator className='w-[95%] h-[1px]' />
                                    <div className='w-full py-[7px] px-[12px]  flex justify-between items-center'>
                                        <h2 className='text-[0.9rem] text-muted-foreground'>Decision Date</h2>
                                        <h2 className='text-[0.91rem] text-right font-[500]'>{caseData['Decision Date']}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[40%] mt-[20px] pr-[5px] overflow-y-auto max-h-[85vh] flex flex-col items-center verticalTimeComponent !pb-[40px] '>
                            <Button className='bg-[#e8effe] text-[#5c89e9] text-[0.88rem] font-[509] focus:bg-[#e8effe] hover:bg-[#e8effe] active:bg-[#e8effe] cursor-default'>Timeline</Button>
                            <VerticalTimeline lineColor='#a250ff' className='verticalTimelineMain'>
                                {historyData !== null && historyData.length !== 0 && historyData.map((item: any, index: number) => (
                                    <Timeline key={index} item={item} />
                                ))}
                            </VerticalTimeline>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component