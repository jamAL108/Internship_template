import React from 'react'
import '../../sass/landingPage/FrontTemplate.scss'
import Image from 'next/image'
import { MoveDown } from 'lucide-react';
const FrontTemplate = () => {
  return (
    <div className="main">
      <div className="heading">
        <h1 className='title'>HIGH QUALITY LEGAL CONSULTANCY</h1>
      </div>
      <div className="down-section">
         <Image src='/images/statue.png' alt='dfg' width={270}height={560} className='statue'/>
         <div className="box">
         <img src="/images/Rectangle.png" alt="d" className='rectangle' />

         <div className="left">
           <MoveDown size={25}/>
           <h2>Specialist family lawyer <br/> and divorce solicitors.</h2>
         </div>
         <div className="right">
           <h2>Family Law is all we do, so whatever your situation, it will be familiar to us. We strive to expand time.</h2>
         </div>

         <div className="circle">
          <img src="/images/circle.png" alt="cdfv" />
         </div>

         <div className="judge">
          <img src="/images/judge.png" alt="vese" />
         </div>
         </div>
          <div className="LAWYER">
          <h1>LAWYER</h1>
         </div>
      </div>
    </div>
  )
}

export default FrontTemplate