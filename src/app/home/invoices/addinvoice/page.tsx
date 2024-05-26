'use client';
import React from 'react'
import Component from './component'
import { sendItToSignup } from '@/auth/tokencheckServer';
const page = () => {
  // await sendItToSignup()
  return (
    <Component/>
  )
}

export default page