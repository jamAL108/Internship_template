'use client';
import * as React from "react"
import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardTranslateProps } from '../../interface/interface'
import { ColorRing } from 'react-loader-spinner'

const CardWithForm: React.FC<CardTranslateProps> = (props) => {
  const { sourcelang, targetlang, description, changesourcelang, changetargetlang, changedescription, handlesubmit, removeFile, request } = props;
  return (
    <Card className="base:w-[100%] mymobile:w-[380px] h-auto">
      <CardHeader>
        <CardTitle>Translate Documents</CardTitle>
        <CardDescription>Enter all required fields properly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="  grid w-full items-center gap-4">

            <div className=" flex flex-col space-y-1.5 ">
              <Label htmlFor="framework">Enter Source Language <span className="span">*</span></Label>
              <Select disabled={request} value={sourcelang}
                onValueChange={(e: string) => {
                  changesourcelang(e)
                }}>
                <SelectTrigger id="framework" className="translateSelect" >
                  <SelectValue placeholder="Source Language" />
                </SelectTrigger>
                <SelectContent position="popper" className='noscrollbar'>
                  <SelectItem value="eng_Latn">English</SelectItem>
                  <SelectItem value="hin_Deva">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Enter Target Language <span className="span">*</span></Label>
              <Select disabled={request} value={targetlang}
                onValueChange={(e: string) => {
                  changetargetlang(e)
                }}
              >
                <SelectTrigger id="framework" className="translateSelect">
                  <SelectValue placeholder="Target Language" />
                </SelectTrigger>
                <SelectContent position="popper" >
                  <SelectItem value="eng_Latn">English</SelectItem>
                  <SelectItem value="hin_Deva">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter file description</Label>
              <Input disabled={request} id="name" autoComplete="off" placeholder="Enter your file decription here (optional)" value={description} onChange={(e) => {
                console.log(e.target.value)
                changedescription(e.target.value)
              }} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={(e) => {
          e.preventDefault()
          changedescription('')
          changesourcelang('')
          changetargetlang('')
          removeFile()
        }} variant="outline">Cancel</Button>
       
       {/* type 1 */}
        <Button className="gap-1" disabled={request} style={request===true ? {opacity:0.67} : {opacity:1}} onClick={(e) => {
          handlesubmit();
        }}> <ColorRing
                visible={request}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />
             Translate</Button>

             {/* type 2  */}
             {/* {request===false ? (
                 <ColorRing 
                 visible={true}
                 height="50"
                 width="50"
                 ariaLabel="color-ring-loading"
                 wrapperStyle={{}}
                 wrapperClass="color-ring-wrapper"
                //  colors={['#6D28D9', '#6D28D9', '#6D28D9', '#6D28D9', '#6D28D9']}
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
               />
             ) : (
              <Button onClick={(e) => {
                handlesubmit();
              }}> Translate</Button>
             )} */}

      </CardFooter>
    </Card>
  )
}

export default CardWithForm
