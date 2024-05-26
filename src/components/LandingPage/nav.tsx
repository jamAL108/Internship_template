'use client'
import React, { useEffect, useState  , useRef } from 'react'
import '../../sass/landingPage/nav.scss'
import Link from 'next/link'
import { AlignJustify, X } from 'lucide-react';
import { LandingNavProps } from '@/interface/interface';

const Nav:React.FC<LandingNavProps> = (props) => {
  const { flag } = props;
  const [widthh, setwidthh] = useState<boolean>(false);
  const [nav, setnav] = useState<boolean>(false);
  const sideElem = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.innerWidth <= 700) {
      setwidthh(true);
    } else {
      setwidthh(false);
    }
  }, []);

  useEffect(()=>{
    if(nav===true  && sideElem.current){
      sideElem.current.style.position='fixed';
    }
  },[nav])

  return (
    <div className='overflow-x-hidden nav'>

      <h1 className='logofont'>Votum</h1>

      <div className="nav-content">
        <Link href='#'><h1>HOME</h1></Link>
        <Link href='#'><h1>ABOUT</h1></Link>
        <Link href='#'><h1>TERMS</h1></Link>
        <Link href='#'><h1>CONTACT</h1></Link>
      </div>

      {flag === true ? (
        <div className="contentbutton">
          <img src="/images/newbutton.png" alt="dvf" />
          <h2>GET STARTED</h2>
        </div>
      ) : (
        <div className="creator">
          <h2>© 2023 / Designed by <span>Lamarr</span></h2>
          <h2>Powered by <span>Lamarr</span></h2>
        </div>
      )}
      {widthh === true && nav === false && (
        <AlignJustify
          size={25}
          style={{marginRight:'15px'}}
          className='icon'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setnav(true);
          }}
        />
      )}

      {widthh === true && nav === true && (
        <div ref={sideElem} className="sidebar">
          <div className="sideup">
            <X
              color='white'
              size={30}
              style={{marginRight:'15px'}}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if(nav===true  && sideElem.current){
                  sideElem.current.style.position='absolute';
                }
                setnav(false);
              }}
            />
          </div>
          <div className="sidelower" style={ {transform:"translateX(0%)" , transition:'transform 2s ease-in-out'}}>

              <div className="navitems">
              <Link href='#'><h1>HOME</h1></Link>
             <Link href='#'><h1>ABOUT</h1></Link>
             <Link href='#'><h1>TERMS</h1></Link>
            <Link href='#'><h1>CONTACT</h1></Link>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav