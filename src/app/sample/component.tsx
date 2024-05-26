import Image from 'next/image'
import styles from './page.module.css'
import Nav from '@/components/LandingPage/nav'
import FrontTemplate from '@/components/LandingPage/front-template'
import Boxes from '@/components/LandingPage/boxes'
import Section1 from '@/components/LandingPage/section1'
import Section2 from '@/components/LandingPage/section2'
import Footer from '@/components/LandingPage/footer'
export default function Home() {
  return (
    <div className='w-[100vw] text-black dark:text-black flex items-center justify-start !overflow-x-hidden flex-col bg-[#F4EEE4] max-w-[100vw] landing'>
      <Nav flag={true}/>
      <FrontTemplate/>
      <Boxes/>
      <Section1/>
      <Section2/>
      <Footer/>
    </div>
  )
}