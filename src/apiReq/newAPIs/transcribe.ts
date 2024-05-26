'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const getAllTranscribe = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let { data: transcripts, error }: any = await supabase
        .from('votum_transcripts')
        .select("*")
        .eq('user_id', parsedUserDetails.id)
    if (error === null) {
        let audioOfUser: any[] = []
        for (let i = 0; i < transcripts.length; i++) {
            let objectForAudioTranscribe = {
                audio: `https://zrkvvedwycdcjjheewef.supabase.co/storage/v1/object/public/votum-transcribe-audio-file/${parsedUserDetails.id}/${transcripts[i].audio_uuid}.mp3`,
                text: transcripts.text,
                Language: transcripts[i].Language,
                Length: transcripts[i].Length,
                tags: transcripts[i].tags,
                created_at: transcripts[i].created_at,
                Name: transcripts[i].Name,
                id: transcripts[i].id,
                audio_uuid: transcripts[i].audio_uuid
            }
            audioOfUser.push(objectForAudioTranscribe)
        }
        console.log(audioOfUser)
        return { success: true, data: audioOfUser }
    } else {
        return { success: false, error: error.message }
    }
}


export const changeName = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    const { data, error } = await supabase
        .from('votum_transcripts')
        .update({ Name: formdata.Name })
        .eq('id', formdata.id)
        .eq('user_id', parsedUserDetails.id)
        .select()
    if (error === null) {
        return { success: true }
    } else {
        return { success: false, error: error.message }
    }
}

export const deleteAudio = async (audio: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    console.log(audio)
    const { error } = await supabase
        .from('votum_transcripts')
        .delete()
        .eq('id', audio.id)

    if (error === null) {
        const { data, error: err } = await supabase
            .storage
            .from('votum-transcribe-audio-file')
            .remove([`${parsedUserDetails.id}/${audio.audio_uuid}.mp3`])
            console.log(err)
            console.log(data)
        if (err === null) {
            return { success: true }
        } else {
            return { success: false, error: err.message }
        }
    } else {
        return { success: false, error: error.message }
    }
    
}

export const getAudioData = async (audioId:string)=>{
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let { data: transcripts, error }: any = await supabase
        .from('votum_transcripts')
        .select("*")
        .eq('id', audioId)
        .eq('user_id',parsedUserDetails.id)

    if (error === null) {
            let objectForAudioTranscribe = {
                audio: `https://zrkvvedwycdcjjheewef.supabase.co/storage/v1/object/public/votum-transcribe-audio-file/${parsedUserDetails.id}/${transcripts[0].audio_uuid}.mp3`,
                text: transcripts[0].text,
                Language: transcripts[0].Language,
                Length: transcripts[0].Length,
                tags: transcripts[0].tags,
                created_at: transcripts[0].created_at,
                Name: transcripts[0].Name,
                id: transcripts[0].id,
                audio_uuid: transcripts[0].audio_uuid
            }
        return { success: true, data: objectForAudioTranscribe }
    } else {
        return { success: false, error: error.message }
    }
}