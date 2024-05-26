'use client';
import React, { useState } from 'react'
import { Scale } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
const CaseCard: React.FC<any> = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const { item , searchedData } = props
    const router = useRouter()

    function splitAndShrink(str: string): string[] {
        const splitArray = str.split('\n')

        if (splitArray.length !== 0) {
            let firstElement = splitArray[0].substring(0, 28)
            let lastElement = splitArray[2].substring(0, 28)

            if (splitArray[0].length > 28) {
                firstElement += '...'
            }
            if (splitArray[2].length > 28) {
                lastElement += '...'
            }
            return [firstElement, ' Vs ', lastElement]
        }
        return splitArray
    }

    return (
        <div onClick={(e)=>{
            localStorage.setItem('votumaddCaseStorage' , JSON.stringify({...item ,searchedData}))
            router.push(`/home/cases/addcase/${item.cnrNumber}`)
        }} className={`relative w-[310px] bg-[#f5f6f8] hover:bg-[#e8effe] cursor-pointer h-[120px] border-[1px] rounded-[12px] shadow-sm flex flex-col  overflow-hidden py-[10px] transition duration-300 ease  `}>
            <a className='px-[10px] text-[0.85rem] font-[500]' data-tooltip-place='bottom' data-tooltip-id={`my-tooltip-${item.cnrNumber}`} data-tooltip-content={item.parties}>
                {splitAndShrink(item.parties).map((element, index) => (
                    <span key={index}>{element}</span>
                ))}
            </a>
            <Tooltip style={{width:"260px" , height:"auto" , zIndex:"1000000" , fontSize:"0.6rem" , borderRadius:"6px"}}  id={`my-tooltip-${item.cnrNumber}`} data-tooltip-place='bottom'  />
            <h2 className="px-[10px] text-[0.7rem] font-[490] absolute bottom-[35px]">{item.advocate}</h2>
            <div className="w-full  px-[10px] flex justify-between items-center absolute bottom-[8px]">
                <div className="flex justify-center items-center gap-[0.4rem]">
                    <Scale size={14} color='#6680ff' />
                    <h2 className={`text-[0.8rem] font-[400] text-[#6680ff]`}>{item.caseDetails}</h2>
                </div>
                <p className="text-[0.75rem] font-[400] text-muted-foregorund">{item.cnrNumber}</p>
            </div>
        </div>
    )
}

export default CaseCard




///// Blue Background card

{/* <div className={`relative w-[310px] cursor-pointer h-[120px] border-[1px] rounded-[12px] shadow-sm flex flex-col  overflow-hidden py-[10px] transition duration-300 ease ${isHovered === true ? "bg-[#6680ff] text-white" : "text-black bg-[#f5f6f8]"} `} onMouseEnter={(e) => setIsHovered(true)}
onMouseLeave={(e) => setIsHovered(false)}>
<p className="px-[10px] text-[0.85rem] font-[500]">{splitAndShrink(item.parties).map((element, index) => (
    <span key={index}>{element}</span>
))}</p>
<h2 className="px-[10px] text-[0.7rem] font-[490] absolute bottom-[35px]">{item.advocate}</h2>
<div className="w-full  px-[10px] flex justify-between items-center absolute bottom-[8px]">
    <div className="flex justify-center items-center gap-[0.4rem]">
        <Scale size={14} color={isHovered === false ? "#6680ff" : "#f5f6f8"} />
        <h2 className={`text-[0.8rem] font-[400] ${isHovered === false ? 'text-[#6680ff]' : "text-white"} `}>{item.caseDetails}</h2>
    </div>
    <p className="text-[0.75rem] font-[400] text-muted-foregorund">{item.cnrNumber}</p>
</div>
</div> */}