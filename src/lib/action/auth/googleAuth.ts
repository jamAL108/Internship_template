'use client';
import { createBrowserClient } from '@supabase/ssr'
export const googleAuth = async() => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      console.log(location.origin)
    const URL ='https://thevotum.com'
    // const URL ='http://localhost:3000'
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: "https://www.googleapis.com/auth/calendar",
            redirectTo:`${URL}/auth/callback`
        },
    })
    console.log(data)
    console.log(error)
}