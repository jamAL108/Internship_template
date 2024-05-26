'use client';
import React, { useEffect, useState } from 'react'
import '../sass/main/component.scss'
import Link from 'next/link';
import Image from 'next/image'
import { MoveUpRight, Menu, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from 'next/navigation';
const component = () => {
  const [navopen, setnavopen] = useState<boolean>(false)
  const [screenWidth, setScreenwidth] = useState<number>(0);
  const router = useRouter()
  useEffect(() => {
    setScreenwidth(window.innerWidth)
  }, [])
  return (
    <div className='bg-[#030303] !overflow-x-hidden text-white w-[100%] min-h-[100vh] h-auto flex flex-col items-center'>
      <div className='base:w-[95vw] bl:w-[min(85vw,1220px)]  min-h-[100vh]  flex flex-col items-center'>


        <div className='w-full h-[4.6rem]  flex justify-between items-center'>
          <h1 className='ml-[30px] text-[2rem] tracking-[0.7px] SampleName'>Votum</h1>
          <div className='base:hidden bl:flex mr-[30px] gap-[30px] items-center text-[0.68rem] tracking-widest'>
            <Link href="#">HOME</Link>
            <Link href="#" className='hidden'>ABOUT</Link>
            <Link href="/privacy">PRIVACY</Link>
            <Link href="#" className='hidden'>ALL CASES</Link>
            <Link href="/auth/signup">REGISTER</Link>
          </div>
          <div className='base:flex bl:hidden'>
            {
              navopen === false && <Menu size={30} className='mr-[20px]' onClick={(e) => {
                setnavopen(true)
                document.body.style.overflowY = "hidden"
              }} />
            }
            {
              navopen === true && (
                <div className='text-black w-[100vw] h-[100vh] z-[1000] fixed flex top-0 right-0 items-end bg-[rgba(0,0,0,0.5)] flex-col'>
                  <div className='flex w-[100%] h-[4rem] justify-end items-center'>
                    <X
                      style={{ marginRight: "14px" }}
                      className="ico mr-[20px]"
                      size={30}
                      color="white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setnavopen(false);
                        document.body.style.overflowY = "scroll"
                      }}
                    />
                  </div>
                  <div className='overflow-hidden h-[calc(100vh_-_5rem)] flex-col items-center justify-start bg-white text-[1rem] rounded-l-[5px]' style={screenWidth < 700 ? { width: "90vw" } : { width: "60vw" }}>
                    <div className='relative base:mt-[40px] tv:mt-[50px] overflow-hidden flex flex-col w-[100%] h-full gap-5'>
                      <h2 className='base:h-[30px] tv:h-[50px] w-full base:text-[1.25rem] tv:text-[1.7rem] flex items-center base:ml-[30px] tv:ml-[50px]'>About us</h2>
                      <h2 className='base:h-[30px] tv:h-[50px] w-full base:text-[1.25rem] tv:text-[1.7rem] flex items-center base:ml-[30px] tv:ml-[50px]'>Contact</h2>
                      <Accordion type="single" collapsible className="w-full border-none">
                        <AccordionItem value="item-1" className='border-none'>
                          <AccordionTrigger className='base:h-[30px] tv:h-[50px] font-[400] border-none hover:no-underline w-full base:text-[1.25rem] tv:text-[1.7rem] flex items-center base:ml-[30px] tv:ml-[50px] pr-[25px]'>Features</AccordionTrigger>
                          <AccordionContent className='ml-[80px]'>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <h2 className='base:h-[30px] tv:h-[50px] w-full base:text-[1.25rem] tv:text-[1.7rem] flex items-center base:ml-[30px] tv:ml-[50px]'>Policy</h2>

                      <div className='w-full text-pop absolute bottom-[9vh] text-white py-[30px] flex justify-center items-center'>
                        <Link href={'/auth/signin'} className='base:py-[9px] flex justify-center items-center tv:py-[14px] w-[85%] px-0 rounded-[7px] bg-[#24292F] base:text-[0.94rem] tv:text-[0.98rem] font-[370] tracking-[1px]'>
                          LOGIN 
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className='relative w-[100%] base:h-[600px] tv:h-[650px] bl:h-[520px] flex flex-col justify-center items-center base:gap-[60px] tv-[100px] bl:gap-[40px] '>
          <div className='w-[90%] bl:ml-[30px] base:mt-[100px] tv:mt-[20px] bl:mt-[-50px] flex flex-col  z-1'>
            <h1 className='z-10 base:text-[2.8rem] tv:text-[5.3rem] base:w-[100%] bl:w-auto bl:text-[6.4rem] font-[400] bl:tracking-[7px] logo'>Expert Legal</h1>
            <h1 className='z-10 bl:leading-[110px] base:w-[100%] bl:w-auto base:text-[2.8rem] tv:text-[5.3rem] bl:text-[6.4rem] font-[400] bl:tracking-[7px] logo'>Support & Justice</h1>
          </div>

          <div className='base:w-[90%]  bl:w-[80%] flex base:flex-col tv:justify-between tv:items-center tv:flex-row'>
            <h2 className='z-10 base:w-[90%] tv:w-[250px] bl:w-[220px] capitalize [word-spacing:3px] leading-[26px] logo text-[1.07rem] font-[460] tracking-wider'>Justice is a fundamental right for all people, but with access to the legal system</h2>

            <div className='z-10 base:ml-[70%] tv:ml-auto base:mt-[16%] tv:mt-auto w-[90px] h-[90px] rounded-full border-[1px]  border-white hidden flex-col items-center cursor-pointer justify-center gap-3 mr-[110px]'>
              <Image src='/images/sampleArrow.png' alt='dcmfwk' width={24} height={24} />
              <p className='text-[0.6rem] font-[550] tracking-normal'>See Our Work</p>
            </div>
          </div>

          <video className='absolute base:top-[20%] tv:top-[12%] tv:right-[-50px] bl:top-[-20px] bl:right-[50px] base:right-[-30%]  z-0' loop autoPlay muted id="myVideo" width="500" height="460"  >
            <source src="/blobvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>

        <div className='z-10  mt-[90px] w-full h-auto flex justify-center items-center'>
          <div className='w-[88%] h-auto flex '>
            <div className='base:w-[80%] tv:w-[60%] bl:w-[40%] mt-[-30px] flex '>
              <h2 className='w-full base:text-[1.7rem] mymobile:text-[2rem] tv:text-[2.8rem] logo font-[550] tracking-wider leading-[50px]'>High Quality Legal Consultancy</h2>
            </div>
            <div className='z-10 base:w-[20%] tv:w-[40%] bl:w-[60%] border-t-[1px] border-[#605E5E] flex items-center justify-end min-h-[370px]'>
              <div className='base:mt-[90px] tv:mt-[110px] bl:mt-[0px] base:ml-[-240px] tv:ml-[-300px] bl:ml-auto base:w-[85vw] tv:w-[430px] bl:w-[500px] relative'>
                <h1 className='base:text-[1rem] mymobile:text-[1.2rem] tv:text-[1.45rem] text-pop font-[280] tracking-wider leading-[31px] '>We&apos;re a legal-tech startup focused on building an array of products that combine cutting-edge AI into the legal domain to help common people , lawyers , courts and police in various ways.
                  For common people we&apos;ve built a chatbot that is specifically trained on Indian legal data and can help them understand their basic right and legal remedies for any issues they&apos;re facing.</h1>

                <div className='z-10 w-[90px] h-[90px] rounded-full border-[1px]  border-white hidden flex-col items-center cursor-pointer justify-center gap-3 absolute base:top-[106%] bl:top-[105%] base:left-[15%] bl:left-0'>
                  <Image src='/images/sampleArrow.png' alt='dcmfwk' width={24} height={24} />
                  <p className='text-[0.6rem] font-[550] tracking-normal'>See Our Work</p>
                </div>

              </div>
            </div>
          </div>
        </div>



        <div className='w-full flex justify-center base:mt-[30px] bl:mt-auto'>



          <div className='w-[88%] flex  items-end flex-col gap-4 '>

            <div className='base:w-full bl:w-[96%] flex justify-between items-end h-[100px]'>

              <div className='flex gap-3 items-center justify-center'>
                <div className='bg-white rounded-full w-[39px] h-[39px]'>
                </div>
                <p className='text-[0.8rem] font-[400] font-pop'>ALL CASES</p>
              </div>

              <div className='flex justify-end items-end'>
                <h1 className='mb-[-15px]  logo text-[2.7rem] font-[570]'>About Us</h1>
              </div>

            </div>

            <div className='base:w-full bl:w-[95%] h-[1px] bg-[#605E5E] '>
            </div>

            <div className='base:w-full bl:w-[95%] flex flex-col gap-16 '>




              <div className='base:w-full bl:w-[93%] flex  h-[360px] gap-4'>
                <div className='w-[61%] h-full flex items-end overflow-hidden'>
                  <video className='w-full base:h-[80%] bl:h-[80%] base:object-cover bl:object-contains transform bl:scale-125 base:scale-110 opacity-[0.6] !overflow-hidden' loop autoPlay muted id="myVideo" >
                    <source src="/lawvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className='w-[1px] h-full bg-[#605E5E] '>
                </div>
                <div className='w-[39%] h-full flex flex-col items-start justify-end '>
                  <div className='w-full h-[93%] flex flex-col base:justify-end bl:justify-start bl:items-start base:gap-4 bl:gap-8'>
                    <h1 className='text-[2rem] font-[500] leading-0 logo m-0'>For lawyers</h1>
                    <p className='base:text-[1.27rem] bl:text-[1.4rem] leading-9 font-[400] logo m-0 mt-[-10px] mb-[3px] '>A precedent retrieval system that can help accelerate the research process by finding similar cases by contextual understanding and not just keyword matching.</p>
                    <img className='base:w-[29px] bl:w-[40px] base:h-[29px] bl:h-[40px] ' src='/images/secondArrow.png' alt='dcmfwk' />
                  </div>
                </div>
              </div>


              <div className='base:w-full bl:w-[93%] flex border-t-[1px] border-[#605E5E]  h-[360px] gap-4'>
                <div className='w-[39%] h-full flex flex-col items-start justify-end '>
                  <div className='w-full h-[89%] flex flex-col base:justify-end bl:justify-start items-start gap-3'>
                    <h1 className='text-[2rem] font-[500] leading-0 logo m-0'>For User</h1>
                    <p className='base:text-[1.27rem] bl:text-[1.4rem] leading-9 font-[400] logo m-0 mt-[-10px] mb-[5px] '>Summarizing judgments.
                      Conversing over case documents.
                      Personal paralegal to ask queries for all their personal cases.
                      Drafting notices and agreements.
                      {/* Proofreading contracts. */}
                      {/* Use data analysis to get predictions on case outcome. */}
                    </p>
                    <img className='base:w-[29px] bl:w-[40px] base:h-[29px] bl:h-[40px] ' src='/images/secondArrow.png' alt='dcmfwk' />
                  </div>
                </div>
                <div className='w-[1px] h-full bg-[#605E5E] '>
                </div>
                <div className='w-[61%] h-full flex items-end overflow-hidden'>
                  <img className='w-full h-[85%] object-cover !overflow-hidden' src="/images/samplemask.png" alt="s" />
                </div>
              </div>




              <div className='base:w-full bl:w-[93%] border-t-[1px] border-[#605E5E]  flex  h-[360px] gap-4'>
                <div className='w-[61%] h-full flex items-end'>
                  <img className='w-full h-[85%] object-contains' src="/images/samplecourt.png" alt="s" />
                </div>
                <div className='w-[1px] h-full bg-[#605E5E] '>
                </div>
                <div className='w-[39%] h-full flex flex-col items-start justify-end '>
                  <div className='w-full h-[89%] flex flex-col justify-start items-start gap-3'>
                    <h1 className='text-[2rem] font-[500] leading-0 logo m-0'>For Courts</h1>
                    <p className='base:text-[1.27rem] bl:text-[1.4rem] leading-9 font-[400] logo m-0 mt-[-10px] mb-[px] '>Live transcribing and translating judgment analysis(Hindi or English)
                      Check for procedural flaws in the petition.
                      Help with writing analysis by proving similar case laws.
                      {/* Automate case scheduling. */}
                    </p>
                    <img className='base:w-[29px] bl:w-[40px] base:h-[29px] bl:h-[40px] ' src='/images/secondArrow.png' alt='dcmfwk' />
                  </div>
                </div>
              </div>




            </div>



          </div>


        </div>


        <div className='hidden mt-[120px] w-[100vw] !overflow-x-hidden bg-[#FAF2F2]  flex-col items-center'>
          <div className='w-[min(85vw,1220px)] h-auto flex justify-center'>
            <div className='tv:ml-[20px] w-full flex items-center min-h-[130px]'>
              <h1 className='logo text-5xl font[550] text-black'>All Cases</h1>
            </div>
          </div>
        </div>




        <div className='hidden w-[100vw]  min-h-[400px] !overflow-x-hidden  bg-[#FAF2F2] justify-center items-center border-t-[0.5px] border-[#B4B4B4]'>
          <div className='base:[100vw] bl:w-[min(85vw,1220px)] flex justify-center base:h-auto base:flex-col bl:flex-row   bl:h-[400px]'>



            <div className='base:w-full bl:w-[35%] p-10 base:py-[30px] tv:py-[50px] bl:py-10 base:pl-[40px] tv:pl-[80px] bl:pl-10 bl:h-full  flex flex-col gap-7 text-black'>
              <div className='flex items-center gap-5'>
                <h1 className='logo text-[2.2rem] font-[600]'>Heading Here</h1>
                <MoveUpRight size={30} color='black' />
              </div>
              <div className='base:w-[90%] tv:w-[80%]'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam excepturi minima odio quaerat tempore, similique quidem neque temporibus, perspiciatis aliquid unde? Sunt enim facilis esse placeat laborum magnam cumque nostrum!</p>
              </div>
            </div>

            <div className='bg-[#131313] base:w-full bl:w-[35%] p-10 base:py-[30px] tv:py-[50px] bl:py-10 base:pl-[40px] tv:pl-[80px] bl:pl-10 bl:h-full  flex flex-col gap-7  text-[#FAF2F2]'>
              <div className='flex items-center gap-5'>
                <h1 className='logo text-[2.2rem] font-[600]'>Heading Here</h1>
                <MoveUpRight size={30} color='#FAF2F2' />
              </div >
              <div className='base:w-[90%] tv:w-[80%]'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam excepturi minima odio quaerat tempore, similique quidem neque temporibus, perspiciatis aliquid unde? Sunt enim facilis esse placeat laborum magnam cumque nostrum!</p>
              </div>
            </div>

            <div className='base:w-full bl:w-[35%] p-10 base:py-[30px] tv:py-[50px] bl:py-10 base:pl-[40px] tv:pl-[80px] bl:pl-10 bl:h-full  flex flex-col gap-7 text-black'>
              <div className='flex items-center gap-5'>
                <h1 className='logo text-[2.2rem] font-[600]'>Heading Here</h1>
                <MoveUpRight size={30} color='black' />
              </div>
              <div className='base:w-[90%] tv:w-[80%]'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam excepturi minima odio quaerat tempore, similique quidem ue temporibus, perspiciatis aliquid unde? Sunt enim facilis esse placeat laborum magnam cumque nostrum! neque temporibus, perspic!</p>
              </div>
            </div>
          </div>
        </div>






        <div className='w-[min(85vw,1220px)] relative h-auto flex justify-center items-center'>
          <h1 className='logo base:text-[2.2rem] tv:text-[2.5rem] base:w-[300px] tv:w-[350px] bl:w-[400px] bl:text-[3rem] font-[500] text-center leading-[60px] capitalize w-[400px] my-[77px]'>let us take you
            further than you’ve
            ever been.
          </h1>
          <div className='z-10 w-[80px] h-[80px] rounded-full border-[1px]  border-white hidden flex-col items-center cursor-pointer justify-center gap-3 absolute base:top-[67%] base:left-[75%]  tv:top-[62%] tv:left-[70%] bl:top-[58%] bl:left-[66%]'>
            <Image src='/images/sampleArrow.png' alt='dcmfwk' width={24} height={24} />
            <p className='text-[0.6rem] font-[550] tracking-normal'>Contact us</p>
          </div>
        </div>

        <div className='w-[100vw] h-[0.5px] bg-[#605E5E]'>
        </div>

        <div className='w-[min(85vw,1220px)] flex justify-center items-center'>
          <div className='w-full h-[4.6rem] mb-[50px] mt-[60px] flex flex-col justify-center gap-5 items-center'>
            <h1 className='text-[2rem] tracking-[0.7px] SampleName'>Votum</h1>
            <div className='flex base:gap-[10px] tv:gap-[40px] items-center base:text-[0.65rem] tv:text-[0.69rem] tracking-widest'>
              <Link href="#">HOME</Link>
              <Link href="#"  className='hidden'>ABOUT</Link>
              <Link href="/privacy">PRIVACY</Link>
              <Link href="#"  className='hidden'>ALL CASES</Link>
              <Link href="/auth/signup">REGISTER</Link>
            </div>
          </div>
        </div>

        <div className='w-[100vw] border-t-[1px] border-[#605E5E] flex justify-center items-center'>
          <p className='my-[8px] font-pop base:text-[0.5rem] tv:text-[0.59rem]'>copyright©2024 Company name - Allrightsreserved - Terms & Conditions</p>
        </div>


      </div>
    </div>
  )
}

export default component