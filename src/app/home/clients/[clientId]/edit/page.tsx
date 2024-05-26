'use server';
import React from 'react'
import Component from './component'
import { sendItToSignup } from '@/auth/tokencheckServer';
const page = async ({params}:{
  params:{
    clientId:string,
  }
}) => {
  // await sendItToSignup()
  const {clientId} = params
  return (
    <Component clientId={clientId}/>
  )
}

export default page