import React from 'react'
import Component from './component'
const page = ({params}:{
  params:{
    audioId:string,
  }
}) => {
  const {audioId} = params
  return (
    <Component audioId={audioId}/>
  )
}

export default page