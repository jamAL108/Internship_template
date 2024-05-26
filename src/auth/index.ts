'use server';

import createSupabaseServerClient from '../lib/supabase/server'
import { v4 as uuidv4 } from 'uuid';
export const signupWithEmailPassword = async (formdata: any) => {
    const supabase = await createSupabaseServerClient()


    let uuid: string = '';
    let exists: boolean;

    if (formdata.createworkspace === true) {
        do {
            // Generate a new UUID
            uuid = uuidv4();
            // Check if the UUID exists in the database
            let { data: votum_workspace, error }: any = await supabase
                .from('votum_workspace')
                .select("*")
                .eq('id', uuid)
            if (error !== null) {
                return { success: false, message: "Server Error" }
            } else if (votum_workspace.length !== 0) {
                exists = true
            } else {
                exists = false
            }

        } while (exists);
    }


    const result: any = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
        options: {
            data: {
                name: formdata.name,
                workspace_id: formdata.createworkspace === true ? uuid : formdata.workspaceDetailForInvite.id
            },
        },
    })
    const User = result.data;
    if (result.data.user !== null) {
        let workspaceData = null
        let role = ''
        if (formdata.createworkspace === true) {
            console.log('create')
            const { data, error } = await supabase
                .from('votum_workspace')
                .insert([
                    { id: uuid, name: formdata.Workspacename, email: formdata.email, invite_code: generateRandomString(15), accept_other_users: true },
                ])
                .select()

            if (error !== null) {
                console.log("CREATE_ERROR")
                return JSON.stringify({ success: false, error: error.message })
            } else {
                console.log("CREATE_STORE")
                workspaceData = data[0]
                role = 'owner'
            }

        } else {
            console.log("JOIN_STORE")
            role = 'user'
            workspaceData = formdata.workspaceDetailForInvite
        }

        const userData: any = await supabase
            .from('votum_users')
            .insert([
                { id: User.user.id, email: formdata.email, name: formdata.name, workspace_id: workspaceData.id, role: role },
            ])
            .select()
        console.log("JOIN_SUCCESS || CREATE_SUCESS")
        console.log(userData.data)
        console.log(userData.error)
        return JSON.stringify({ success: true, data: userData.data[0] })
    } else if (result.data.user === null) {
        return JSON.stringify({ success: false, error: result.error.message })
    }
}

function generateRandomString(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const signinWithEmailPassword = async (formdata: any) => {
    const supabase = await createSupabaseServerClient()
    const result = await supabase.auth.signInWithPassword({
        email: formdata.email,
        password: formdata.password
    })
    if (result.error !== null) {
        return JSON.stringify(result)
    } else if (result.data !== null) {
        let userData: any = await supabase
            .from('votum_users')
            .select("*")
            .eq('email', formdata.email)
        console.log(userData)
        return JSON.stringify(userData)
    }
}