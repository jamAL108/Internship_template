'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const checkEmail = async (email: string) => {
    const supabase = clientConnectionWithSupabase()
    let { data: votum_users, error }: any = await supabase
        .from('votum_users')
        .select("*")
        .eq('email', email)
    if (error === null) {
        if (votum_users.length !== 0) {
            return { success: true, newUser: false }
        } else {
            return { success: true, newUser: true }
        }
    } else {
        return { success: false, error: error.message }
    }
}


export const checkInvitecode = async (code: string) => {
    const supabase = clientConnectionWithSupabase()
    let { data: votum_workspace, error }: any = await supabase
        .from('votum_workspace')
        .select("*")
        .eq('invite_code', code)

    if (error !== null) {
        return { success: false, error: error.message }
    } else {
        if (votum_workspace.length === 0) {
            return { success: false, error: 'Workspace Not Found' }
        } else {
            if (votum_workspace[0].accept_other_users === true) {
                return { success: true, data: votum_workspace[0] }
            } else {
                return { success: false, error: 'This workspace is not accepting any users ' }
            }
        }
    }
}