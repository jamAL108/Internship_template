'use server';
import React from 'react'
import Component from './component'
const page = async ({params}:{
    params:{
      cnrNumber:string,
    }
  }) => {
    const {cnrNumber} = params

  return (
    <Component cnrNumber={cnrNumber}/>
  )
}

export default page