'use client';
import { createClient } from "@supabase/supabase-js";

const englishToHindi = async (formdata) => {

  const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const supabase = createClient(supabaseurl,supabaseAnonKey)

  console.log(formdata)  /// original and /// Translated




  const { data, error } = await supabase
  .from('correction_english_to_hindi')
  .insert([
    { original: formdata.original, translated: formdata.translated },
  ])
  .select()

  console.log(data)
  console.log(error)
}

export default englishToHindi