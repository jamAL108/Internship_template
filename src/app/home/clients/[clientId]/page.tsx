'use server';
import React from 'react'
import Component from './component'
import { sendItToSignup } from '@/auth/tokencheckServer';
const page = async ({params}:{
  params:{
    clientId:string,
  }
}) => {
  const {clientId} = params
  // await sendItToSignup()
  return (
    <Component clientId={clientId} />
  )
}

export default page