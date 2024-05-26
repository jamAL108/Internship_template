'use client';
import React from 'react'

import { motion } from 'framer-motion'

const Features = () => {
  return (
    <div className='text-pop bg-[#F5F5F5] dark:bg-[#080f21] w-[100vw] min-h-[400px] h-auto flex  items-center flex-col mb-[6rem]'>
        <div className='h-[130px] flex justify-center items-center'>
        <h1 className='text-pop text-3xl font-[640] text-center'>Features</h1>
        </div>


        <div className='md:w-[min(85vw,1100px)] base:w-[90vw] h-auto  flex  justify-center items-center'>
            <div className='w-[80%] flex justify-center items-center flex-wrap gap-x-[60px]  gap-y-[35px] mb-[30px]'>

             <motion.div 
             initial={{ opacity: 0 , scale:0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             whileInView={{ opacity: 1,scale:1 }}
              className='md:max-w-[330px] base:max-w-[100%] h-[120px] flex flex-col  gap-3 '>
              <div className='flex items-center gap-5'>
                <img className='w-[29px] h-[29px] transition hover:rotate-[360deg] hover:scale-130 ' src="/images/feature1.png" alt="fbt" />
                <h2 className='base:text-[1rem] mymobile:text-[1.18rem] font-[640] '>No limits on uploads</h2>
              </div>
              <div className='flex'>
                <h2 className='base:text-[0.8rem] text-justify mymobile:text-[0.9rem] font-[500] text-muted-foreground'>Upload files of any size and length. Our software supports them all. Make sure to upload a DOCX/PDF</h2>
              </div>
             </motion.div>


             <motion.div 
                          initial={{ opacity: 0 , scale:0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                          whileInView={{ opacity: 1,scale:1 }}
             
             className='md:max-w-[330px] base:max-w-[100%] h-[120px] flex flex-col  gap-3'>
              <div className='flex items-center gap-5'>
                <img className='w-[29px] h-[29px] transition hover:rotate-[360deg] hover:scale-130 ' src="/images/feature3.png" alt="fbt" />
                <h2 className='base:text-[1rem] mymobile:text-[1.18rem] font-[640] '>Edit translated document</h2>
              </div>
              <div className='flex'>
                <h2 className='base:text-[0.8rem] text-justify mymobile:text-[0.9rem]  font-[500] text-muted-foreground'>Users have the freedom to customize and edit their translated documents according to their requirements.</h2>
              </div>
             </motion.div>


             <motion.div 
                          initial={{ opacity: 0 , scale:0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 }}
                          whileInView={{ opacity: 1,scale:1 }}
             className='md:max-w-[330px] base:max-w-[100%] h-[120px] flex flex-col  gap-3'>
              <div className='flex items-center gap-5'>
                <img className='w-[29px] h-[29px] transition hover:rotate-[360deg] hover:scale-130 ' src="/images/feature4.png" alt="fbt" />
                <h2 className='base:text-[1rem] mymobile:text-[1.18rem] font-[640] '>Multiple Export Formats</h2>
              </div>
              <div className='flex'>
                <h2 className='base:text-[0.8rem] text-justify mymobile:text-[0.9rem]  font-[500] text-muted-foreground'>Choose to export your document as TXT, DOCX, or PDF for user-friendly versatility and seamless cross-format compatibility.</h2>
              </div>
             </motion.div>

             <motion.div 
                  initial={{ opacity: 0 , scale:0 }}
                  viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  whileInView={{ opacity: 1,scale:1 }}
              className='md:max-w-[330px] base:max-w-[100%] h-[120px] flex flex-col  gap-3'>
              <div className='flex items-center gap-5'>
                <img className='w-[29px] h-[29px] transition hover:rotate-[360deg] hover:scale-130 ' src="/images/feature2.png" alt="fbt" />
                <h2 className='base:text-[1rem] mymobile: mymobile:text-[1.18rem] font-[640] '>Security & Confidentiality</h2>
              </div>
              <div className='flex'>
                <h2 className='base:text-[0.8rem] text-justify mymobile:text-[0.9rem]  font-[500] text-muted-foreground'>All translations are secure and confidential. Your documents remain private and protected.</h2>
              </div>
             </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Features