'use server';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {

  const requestURL = new URL(request.url)
  const { searchParams } = requestURL
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  const origin ='https://thevotum.com'
  // const origin = 'http://localhost:3000'
  console.log(origin)

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { data, error }: any = await supabase.auth.exchangeCodeForSession(code)
    console.log(data)
    console.log("MEOW")
    if (!error) {        
      const booluuu = true
      const email = data.user.user_metadata.email
      const name = data.user.user_metadata.full_name
      const avatar_url = data.user.user_metadata.avatar_url
      let { data: userFindData, error: userFindError }: any = await supabase
        .from('users')
        .select("*")
        .eq('email', email)
      ///avatar_url
      if (userFindData.length === 0) {
        const { data: userCreatedData, error: userCreatedError } = await supabase
          .from('users')
          .insert([
            { email: email, name: name, avatar_url: avatar_url, google_calender_integrated: true },
          ])
          .select()

        if (userCreatedError === null) {
          const user = userCreatedData[0]
          const redirectUrl = `${origin}/proxyLink?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&google_calender_integrated=${booluuu}&avatar_url=${encodeURIComponent(user.avatar_url)}&id=${encodeURIComponent(user.id)}`;
          return NextResponse.redirect(redirectUrl)
        } else {
          console.log("BAD LUCK")
          return NextResponse.redirect(origin)
        }
      } else {
        const user = userFindData[0]
        if (user.google_calender_integrated === false) {
          const { data, error } = await supabase
            .from('users')
            .update({ google_calender_integrated: true })
            .eq('id', user.id)
            .select()
        }else if(user.avatar_url===null){
          const { data, error } = await supabase
          .from('users')
          .update({ avatar_url: avatar_url })
          .eq('id', user.id)
          .select()
        }
        const redirectUrl = `${origin}/proxyLink?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&google_calender_integrated=${booluuu}&avatar_url=${encodeURIComponent(user.avatar_url)}&id=${encodeURIComponent(user.id)}`;
        return NextResponse.redirect(redirectUrl)
      }
    } else {
      return NextResponse.redirect(`${origin}/auth/signin`)
    }
  }
}