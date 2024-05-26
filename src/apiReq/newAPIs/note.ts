'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const createNewNote = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)

    const {data , error}: any = await supabase
        .from('votum_notes')
        .insert([
            {  workspace_id: parsedUserDetails.workspace_id, Title:'untitled' },
        ])
        .select()

    if (error === null) {
        return {success:true , data:data[0]}
    } else {
        return {success:false , error:error.message}
    }
}