'use client';
import React, { useRef, useState, useEffect } from 'react'
import { ChevronRight, Scale, Search, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from '@/components/ui/scroll-area';
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
const Component: React.FC<any> = (props) => {
    const { precedentData } = props

    const router = useRouter()

    function splitByNewline(inputString: string): string[] {
        // Split the string by the newline character
        const linesArray: string[] = inputString.split('\n');
        return linesArray;
    }

    return (
        <div className='bg-white md:w-[min(88%,1400px)] base:w-[90vw]  overflow-x-hidden MonaSans flex flex-col items-center justify-start relative '>
            <div className='w-full flex py-[16px]'>
                <h2 className='text-[0.9rem] fnot-[450] flex gap-[8px] items-center select-none'>
                    <div className='w-[13px]  rounded-full h-[13px] border-[2.8px]  border-[#ffbeb1]'></div>
                    <div onClick={(e) => {
                        e.preventDefault()
                        router.back()
                    }} className='text-muted-foreground  opacity-[0.8] cursor-pointer '>Retrieval</div>
                    /
                    <p className='!font-[500] select-text'>{precedentData.cnr}</p>
                </h2>
            </div>
            <div className='w-full flex justify-center items-start gap-[30px]'>
                <div className='w-[60%] flex flex-col gap-[40px] '>
                    <div className='w-full flex flex-col mt-[15px]'>
                        <h1 className='text-[1.35rem] font-[600]'>{precedentData.case_name}</h1>
                        <div className='w-full flex items-center gap-[35px]'>
                            <div className='flex justify-center items-center text-[#5b89e9] gap-[7px]'>
                                <Scale size={15} />
                                <h2 className='text-[0.93rem] font-[440] mt-[5px]'> {precedentData.court_name}</h2>

                            </div>
                            <div className='flex justify-center items-center text-[#5b89e9] gap-[7px]'>
                                <CalendarDays size={15} />
                                <h2 className='text-[0.93rem] font-[440] mt-[5px] text-[#5b89e9]'>{precedentData.date_of_decision}</h2>
                            </div>
                        </div>
                    </div>
                    <ScrollArea className='w-auto h-[calc(100vh_-_195px)]  max-w-[700px] rounded-[15px] border-[2px] ml-[30px] mr-[20px] px-[50px] py-[10px]'>
                        <p className='text-[0.85rem] rounded-none'>{splitByNewline(precedentData.pdf_text).map((text: string, idx: number) => (
                            <>
                                <span className='text-justify' key={idx}>{text}</span>
                                <br />
                            </>
                        ))}</p>
                    </ScrollArea>
                </div>


                <ScrollArea className='w-[38%] h-[calc(100vh_-_5rem)]  rounded-[10px] flex flex-col border px-[20px] py-[20px]'>
                    <div className='bg-[rgba(239,239,239,0.5)] border-[1px] base:px-[10px] tv:px-[14px] base:py-[4px] tv:py-[0px] tv:h-full flex justify-between items-center h-[50px]  rounded-[7px]'>
                        <input type="text" className='bg-transparent base:py-[4px] tv:py-[8px] base:min-w-[50px] mymobile:min-w-[80px] tv:min-w-[210px] base:text-[0.85rem] tv:text-[0.92rem] outline-none  placeholder:text-[0.83rem] ClientDataInputField placeholder:select-none' placeholder='Search here ....' />
                        <Search color='#888888' className='cursor-pointer w-4 h-4' />
                    </div>

                    <Accordion type="single" collapsible defaultValue='item-1' className='mt-[15px]'>
                        <AccordionItem value="item-1" className={`!border-none `}>
                            <AccordionTrigger className='h-auto py-[10px] hover:no-underline'>
                                <h1 className='text-[1rem] font-[500] !hover:no-underline'>Case Details:</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-col gap-[8px]'>
                                    <div className='bg-[#f9fafc] border w-full px-[10px] justify-between py-[10px] rounded-[6px] flex items-center text-[#4e6578]'>
                                        <h2 className='text-sm font-[500]'>Judge Name:</h2>
                                        <h2 className='text-sm'>{precedentData.judge_name}</h2>
                                    </div>
                                    <div className='bg-[#f9fafc] border w-full px-[10px] justify-between py-[10px] rounded-[6px] flex items-center text-[#4e6578]'>
                                        <h2 className='text-sm font-[500]'>Status:</h2>
                                        <h2 className='text-sm'>{precedentData.disposal_nature}</h2>
                                    </div>
                                    <div className='bg-[#f9fafc] border w-full px-[10px] justify-between py-[10px] rounded-[6px] flex items-center text-[#4e6578]'>
                                        <h2 className='text-sm font-[500]'>Citation Value:</h2>
                                        <h2 className='text-sm'>{precedentData.citation_value}</h2>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>



                    <Accordion type="single" collapsible defaultValue='item-1'>
                        <AccordionItem value="item-1" className='!border-none'>
                            <AccordionTrigger className='h-auto py-[10px] hover:no-underline'>
                                <h1 className='text-[1rem] font-[500] !hover:no-underline'>Precedents :</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-col gap-[16px]'>
                                    {JSON.parse(precedentData.precedents).map((precedent: any, indx: number) => (
                                        <div key={indx} className='bg-[#f9fafc] border-[2px] w-full px-[10px]  py-[10px] rounded-[6px] flex flex-col gap-[0.55rem] items-center text-[#4e6578]'>
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Case Name:</h2>
                                                <h2 className='text-[0.88rem] w-[75%]'>{precedent.case_name}</h2>
                                            </div>
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Citation:</h2>
                                                <h2 className='text-[0.88rem] w-[75%]'>{precedent.citation}</h2>
                                            </div>
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Context:</h2>
                                                <h2 className='text-[0.88rem] w-[75%]'>{precedent.context}</h2>
                                            </div>
                                            {precedent.quoted_text !== undefined ? (
                                                <div className='w-full flex'>
                                                    <h2 className='text-[0.88rem] w-[25%] font-[500]'>Quotations:</h2>
                                                    <h2 className='text-[0.88rem] w-[75%]'>{precedent.quoted_text}</h2>
                                                </div>
                                            ) : precedent.quotations !== undefined && precedent.quotations.length !== 0 ? (
                                                <div className='w-full flex'>
                                                    <h2 className='text-[0.88rem] w-[25%] font-[500]'>Quotations:</h2>
                                                    <ul className='text-[0.88rem] w-[75%]'>{precedent.quotations.map((section: string, idx: number) => (
                                                        <>
                                                            <li key={idx}>{section}</li>
                                                            <br />
                                                        </>
                                                    ))}</ul>
                                                </div>
                                            ) : (
                                                <div className='w-full flex'>
                                                    <h2 className='text-[0.88rem] w-[25%] font-[500]'>Quotations:</h2>
                                                    <h2 className='text-[0.88rem] w-[75%]'>No context provided</h2>
                                                </div>
                                            )}
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Outcome:</h2>
                                                <h2 className='text-[0.88rem] w-[75%]'>{precedent.outcome}</h2>
                                            </div> 
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Principal Addressed:</h2>
                                                {precedent.principle_or_legal_issue !== undefined ? (
                                                    <h2 className='text-[0.88rem] w-[75%]'>{precedent.principle_or_legal_issue}</h2>
                                                ) : precedent.principle_addressed !== undefined ? (
                                                    <h2 className='text-[0.88rem] w-[75%]'>{precedent.principle_addressed}</h2>
                                                ) : (
                                                    <h2 className='text-[0.88rem] w-[75%]'>No Context Provided</h2>
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className=''>
                        <AccordionItem value="item-1" className='!border-none'>
                            <AccordionTrigger className='h-auto py-[10px] hover:no-underline sticky top-0'>
                                <h1 className='text-[1rem] font-[500] !hover:no-underline'>Statutes :</h1>
                            </AccordionTrigger>
                            <AccordionContent className='mb-[70px]'>
                                <div className='flex flex-col gap-[16px]'>
                                    {JSON.parse(precedentData.statutes).map((statute: any, indx: number) => (
                                        <div key={indx} className='bg-[#f9fafc] border-[2px] w-full px-[10px]  py-[10px] rounded-[6px] flex flex-col gap-2 items-center text-[#4e6578]'>
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Name:</h2>
                                                <h2 className='text-[0.88rem] w-[75%]'>{statute.name}</h2>
                                            </div>
                                            <div className='w-full flex'>
                                                <h2 className='text-[0.88rem] w-[25%] font-[500]'>Context:</h2>
                                                <h2 className='text-[0.88rem] w-[75%]'>{statute.context}</h2>
                                            </div>
                                            {statute.specific_sections_or_clauses !== undefined ? (
                                                <div className='w-full flex'>
                                                    <h2 className='text-[0.88rem] w-[25%] font-[500]'>Sections:</h2>
                                                    {Array.isArray(statute.specific_sections_or_clauses) === true ? (
                                                        statute.specific_sections_or_clauses.length !== 0 ? (
                                                            <h2 className='text-[0.88rem] w-[75%]'>{statute.specific_sections_or_clauses !== undefined && statute.specific_sections_or_clauses.map((section: string, idx: number) => (
                                                                <span>{section} ,</span>
                                                            ))}</h2>

                                                        ) : (
                                                            <h2 className='text-[0.88rem] w-[75%]'>No context provided</h2>
                                                        )

                                                    ) : (
                                                        <h1 className='text-[0.88rem] w-[75%]'>{statute.specific_sections_or_clauses}</h1>
                                                    )}
                                                </div>
                                            ) : statute.specific_sections !== undefined   ? (
                                                <div className='w-full flex'>
                                                    <h2 className='text-[0.88rem] w-[25%] font-[500]'>Sections:</h2>
                                                    <h2 className='text-[0.88rem] w-[75%]'>{statute.specific_sections!==null && statute.specific_sections.map((section: any, idx: number) => (
                                                        <span key={idx}>{section} ,</span>
                                                    ))}</h2>
                                                </div>
                                            ) : (
                                                <div className='w-full flex'>
                                                    <h2 className='text-[0.88rem] w-[25%] font-[500]'>Sections:</h2>
                                                    <h1 className='text-[0.88rem] w-[75%]'>{statute.specific_sections_or_clauses}</h1>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </ScrollArea>

            </div>
        </div >
    )
}

export default Component



const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-visible text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
))