'use server';
import React from 'react'
import Component from './component'

const page = ({params}:{
  params:{
    taskId:string,
  }
}) => {
  const {taskId} = params
  return (
    <Component taskId={taskId}/>
  )
}

export default page