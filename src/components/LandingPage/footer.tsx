'use client';
import React,{useState , useEffect} from 'react'
import '../../sass/landingPage/footer.scss'
import Nav from './nav'
const Footer = () => {
    const [widthh, setwidthh] = useState<boolean>(true);
    useEffect(() => {
        if (window.innerWidth <= 700) {
          setwidthh(true);
        } else {
          setwidthh(false);
        }
      }, []);
    return (
        <div className="overflow-x-hidden footer">
            <div className="footercontent">
                <h1 className='f1'>WANT A LAWYER?</h1>
                <div className="context">
                <div className="contentbutton">  
                <img src="/images/contactbutton.png" alt="dvf" />
                 <h2>CONTACT</h2>
                </div>
                <div className="arrow">
                    <img src="/images/arrow.png" alt="dgvb" />
                </div>
                <h1 className='f2'>LET&apos;S TALK</h1>
                </div>
                <h1 className='f3'>HELLO@SOMETH.CO</h1>
            </div>
            <div className="line"></div>
            <div className="footerend">
                {widthh===false ? (
                 <Nav flag={false}/>
                ) : (
                   <h1>hjdfyugu</h1>
                )}
            </div>
        </div>
    )
}

export default Footer