import React from 'react'
import Component from './component'
const page = ({params}:{
    params:{
      caseId:string,
    }
  }) => {
    const {caseId} = params
  return (
    <Component caseId={caseId}/>
  )
}

export default page