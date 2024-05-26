'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import jsonData from '@/utils/pairs.json'
import { ColorRing } from 'react-loader-spinner'

const Component = () => {
    const [ipc, setipc] = useState<string>('')
    const [output, setOutput] = useState<any>([])
    const [loader, setLoader] = useState<boolean>(false)

    const extractNumberFromIPCString = (ipcString: string) => {
        const match = ipcString.match(/IPC_(\d+)/);
        console.log(match)
        if (match) {
            const numberPart = match[1];
            const number = parseInt(numberPart, 10);
            return number.toString();
        } else {
            console.error(`No match found in the input string: ${ipcString}`);
            return null;
        }
    };

    const convertToBNS = (ipc: string) => {
        setLoader(true)
        setOutput([])
        const ipc_list = ipc.split(",");
        console.log(ipc_list)
        var bns_list: any[] = [];
        for (const i of ipc_list) {
            console.log(i);
            if (i.toLowerCase().includes("ipc")) {
                console.log(i)
                const ipc_num = extractNumberFromIPCString(i);
                console.log(ipc_num);
                const a = jsonData.find((item) => item.ipc.split("_")[1] == ipc_num);
                if (a !== undefined) {
                    bns_list.push(a.bns);
                } else {
                    console.error(`Item with IPC ${i} not found in jsonData.`);
                }
            } else {
                bns_list.push(i);
            }
        }
        setTimeout(() => {
            setLoader(false)
            setOutput(bns_list)
        }, 2000)
    };

    return (
        <div className='w-full h-full flex gap-[50px] justify-center items-center px-[30px] py-[30px]'>
            <div className='w-[300px] mt-[-150px] flex flex-col  justify-center items-center'>
                <div className='flex w-full flex-col  justify-center items-center gap-2'>
                    <h1 className='text-4xl font-[600]'>IPC-bot</h1>
                    <h2 className='text-[1rem] font-[500] text-muted-foreground'>Enter an IPC number to convert to BNS.</h2>
                    <input value={ipc} onChange={(e) => setipc(e.target.value)} type="text" placeholder='Enter IPC Number' className='px-[10px] outline-none active:border-[#0064FF] focus:border-[#0064FF] mt-[10px] border py-[10px] rounded-[8px] w-full' />
                    <div className='flex gap-[5px] mt-[5px] flex-col'>
                        <p className='text-[0.76rem] text-muted-foreground font-[420]'>Mention the IPC fully, for example:- IPC_420</p>
                        <p className='text-[0.76rem]  text-muted-foreground  font-[420]'>Type multiple IPC and mention comma between each IPCs</p>
                    </div>
                    <Button disabled={loader} style={loader === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={(e) => {
                        convertToBNS(ipc)
                    }} className='bg-[#0064FF] mt-[10px]  w-full hover:bg-[#004fc5]'>
                        <ColorRing
                            visible={loader}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        />
                        Convert to BNS</Button>
                </div>
            </div>
            <div className='w-[300px] min-h-[300px] mt-[-150px] flex justify-center items-center'>
                {output.length !== 0 && (
                    <div className='w-full min-h-[100px] flex-col bg-[#f5f5f8] border-2 rounded-md'>
                        <div className='flex w-full px-[20px] py-[10px] flex-col gap-2'>
                            <h1 className='text-lg font-[500] w-[100px]'>Results:</h1>
                            {
                                output.map((bns: string, index: number) => (
                                    <h2 key={index} className='text-[0.86rem] font-[500]'>{bns}</h2>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Component