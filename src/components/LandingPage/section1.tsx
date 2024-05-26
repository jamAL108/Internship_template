import React from 'react'
import '../../sass/landingPage/section1.scss'
const Section1 = () => {
  return (
    <div className="overflow-x-hidden section1">
       <div className="headingsection">
        <h1>MEET OUR MOST TALENTED AND QUALIFIED ATTORNEYS</h1>
       </div>
       <img className='order' src="/images/order.png" alt="sdce" />

       <div className="container">
        <div className="conatinertext">
           <h1>
            Lead Council <br/> verified Attorneys
           </h1>
           <p>We offer a wide range of service to our customer and im jamal my name is kw a the wq  a wide range of service to our customer and im ja
           </p>
           <div className="btns">
           <button>learn more
           </button>
           </div>
        </div>

        <div className="ladyimage">
          <img className='mainimage' src="/images/ladylawyer.png" alt="sdsfv" />
          <img className='card' id='c1' src="/images/card.png" alt="dcf" />
          <img className='card' id='c2' src="/images/card2.png" alt="dcf" />
          <img className='card' id='c3' src="/images/card3.png" alt="dcf" />
        </div>
       </div>
    </div>
  )
}

export default Section1