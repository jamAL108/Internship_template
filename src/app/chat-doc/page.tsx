'use client';
import React from 'react'

const ChatPage = () => {
  return (
    <div className='w-[100vw] h-[100vh] relative'>
    <iframe
      title="Document QA"
      src="https://single-doc.thevotum.com/"
      frameBorder="0"
      className='w-[100%] h-[100%} absolute'
      allowFullScreen
    ></iframe>
  </div>
)
}

export default ChatPage;