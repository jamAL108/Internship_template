'use client';
import { createClient } from "@supabase/supabase-js";
const hindiToEnglish = async (formdata)=>{
  const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  console.log(supabaseurl)
  console.log(supabaseAnonKey)
  
  const supabase = createClient(supabaseurl,supabaseAnonKey)

  const { data, error } = await supabase
  .from('correction_hindi_to_english')
  .insert([
    { original: formdata.original, translated: formdata.translated },
  ])
  .select()

  console.log(data)
  console.log(error)
}
 export default hindiToEnglish