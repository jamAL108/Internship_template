'use server';
import React from 'react'
import Component from './component';
import { sendItToSignup } from '@/auth/tokencheckServer';
const Evaluate = async () => {
  await sendItToSignup()
  return (
    <Component/>
  )
}


export default Evaluate