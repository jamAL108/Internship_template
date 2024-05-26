'use client';
import { createClient } from "@supabase/supabase-js";
export const intialOcrCorrection = async (formdata)=>{
  const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  console.log(supabaseurl)
  console.log(supabaseAnonKey)
  const supabase = createClient(supabaseurl,supabaseAnonKey)
  const { data, error } = await supabase
  .from('ocr_correction')
  .insert([
    { paragraph: formdata.paragraph, wrong_text: formdata.wrong_text , corrected_text:formdata.corrected_text , language:formdata.language },
  ])
  .select()
  console.log(data)
  console.log(error)
  return data 
}

export const upsertOcrCorrection = async (formdata)=>{
  const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  console.log(supabaseurl)
  console.log(supabaseAnonKey)
  const supabase = createClient(supabaseurl,supabaseAnonKey)

  const { data, error } = await supabase
  .from('ocr_correction')
  .update({ corrected_text: formdata.text })
  .eq('id', formdata.id)
  .select()
          
  console.log(data)
  console.log(error)
  return data
}