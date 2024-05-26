'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const addClient = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let custom_fields: any = {}
    for (var i = 0; i < formdata.customFieldKey.length; i++) {
        let key = formdata.customFieldKey[i]
        custom_fields[key] = formdata.customFieldValue[i]
    }
    console.log(custom_fields)
    custom_fields = JSON.stringify(custom_fields)

    let tags = []
    for (var i = 0; i < formdata.customTag.length; i++) {
        if (formdata.customTag[i].selected === true) {
            tags.push(formdata.customTag[i].name)
        }
    }
    console.log(tags)
    const result = await supabase
        .from('votum_clients')
        .insert([
            {
                ...formdata.clientDetail,
                custom_fields, workspace_id: parsedUserDetails.workspace_id, tags, last_updated_by: parsedUserDetails.id
            },
        ])
        .select()
    return result
}

export const updateClientDetail = async ({ formdata, clientId, tags }: any) => {
    console.log("HELWWW")
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let custom_fields: any = {}
    for (var i = 0; i < formdata.customFieldKey.length; i++) {
        let key = formdata.customFieldKey[i]
        custom_fields[key] = formdata.customFieldValue[i]
    }
    console.log(tags)
    console.log(custom_fields)
    custom_fields = JSON.stringify(custom_fields)
    const new_other_fields = {
        Salutation: formdata.clientInfo.Salutation,
        Name: formdata.clientInfo.Name,
        Company: formdata.clientInfo.Company,
        Group: formdata.clientInfo.Group,
        Email: formdata.clientInfo.Email,
        Contact: formdata.clientInfo.Contact,
        GSTIN: formdata.clientInfo.GSTIN,
        Address: formdata.clientInfo.Address,
    }
    console.log(clientId)
    const { data, error } = await supabase
        .from('votum_clients')
        .update({ ...new_other_fields, custom_fields, tags })
        .eq('id', clientId)
        .select()
    console.log(error)
    console.log(data)
    if (error !== null) {
        return { success: false, error: error.message }
    } else {
        return { success: true }
    }
}


export const getAllClient = async (workspace_id: string) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let { data: votum_user_clients, error } = await supabase
        .from('votum_clients')
        .select(`* , votum_users(
            name,id
            )`)
        .eq('workspace_id', workspace_id)
        .order('created_at')
    return votum_user_clients
}

export const getClientDetail = async (clientId: string) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let { data: votum_user_client, error }: any = await supabase
        .from('votum_clients')
        .select("*")
        .eq('workspace_id', parsedUserDetails.workspace_id)
        .eq('id', clientId)

    let { data: votum_user_client_notes, error: votum_client_notes_error } = await supabase
        .from('votum_client_notes')
        .select("*")
        .eq('client_id', clientId)
        .eq('workspace_id', parsedUserDetails.workspace_id)

    const client_object = {
        ...votum_user_client[0],
        notes: votum_user_client_notes
    }

    if (error !== null) {
        return { success: false, error: "unable to fetch" }
    }
    if (votum_user_client.length === 0) {
        return { success: false, error: "client doesn't exists" }
    } else {
        return { success: true, data: client_object }
    }
}


export const addNote = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    const { data, error } = await supabase
        .from('votum_client_notes')
        .insert([
            { ...formdata, workspace_id: parsedUserDetails.workspace_id },
        ])
        .select()
    if (error !== null) {
        return { success: false, error: error.message }
    } else {
        return { success: true, data: data[0] }
    }
}

export const updateNotes = async (note: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    const { data, error } = await supabase
        .from('votum_client_notes')
        .update({ ...note })
        .eq('id', note.id)
        .select()
    if (error !== null) {
        return { success: false, error: error.message }
    } else {
        return { success: true, data: data[0] }
    }
}

export const deleteNotes = async (notesID: string) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    const { error } = await supabase
        .from('votum_client_notes')
        .delete()
        .eq('id', notesID)
    if (error === null) {
        return { success: true }
    } else {
        return { success: false, error: error.message }
    }
}


export const deleteClient = async (clientID: string) => {
    const supabase = clientConnectionWithSupabase()
    const { error } = await supabase
        .from('votum_clients')
        .delete()
        .eq('id', clientID)
    const { error: client_notes_delete } = await supabase
        .from('votum_client_notes')
        .delete()
        .eq('client_id', clientID)
    if (error === null) {
        return { success: true }
    } else {
        return { success: false, error: error.message }
    }
}