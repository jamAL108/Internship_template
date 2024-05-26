'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const last_updated_by = async (id: string) => {
    const supabase = clientConnectionWithSupabase()
    let { data: votum_users, error }:any = await supabase
        .from('votum_users')
        .select("*")
        .eq('id', id)
    if(error===null){
        return {success:true , user:votum_users[0]}
    }else{
        return {success:false , error:"Some issue while fetching data"}
    }
}