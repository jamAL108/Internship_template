'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";
import { addOneDay, formattedDate } from "@/utils/shirnkDate";


export const getTodaySession = async () => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return { success: false }
    }
    const supabase = clientConnectionWithSupabase()
    let { data: userTasks, Taskerror }: any = await supabase
        .from('votum_user_tasks')
        .select("*")
        .eq('user_id', parsedUserDetails.id)
        .neq('status', 2)

    console.log(userTasks)
    let TodaysList = []
    for (var i = 0; i < userTasks.length; i++) {
        if (isTodayTask(userTasks[i].dueDate)) {
            TodaysList.push(userTasks[i])
        }
    }

    let { data: userEvent, Eventerror }: any = await supabase
        .from('votum_user_events')
        .select("*")
        .eq('user_id', parsedUserDetails.id)
    console.log(userEvent)
    let TodaysEvent = []
    for (var i = 0; i < userEvent.length; i++) {
        console.log(userEvent[i])
        if (isTodayEvent(userEvent[i].endDate)===true) {
            TodaysEvent.push(userEvent[i])
        }
    }

    console.log(TodaysEvent)

    return {success:true , tasks:TodaysList , events:TodaysEvent , user:parsedUserDetails}

}


function isTodayTask(timestamp: string): boolean {
    const timestampDate = new Date(timestamp)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return timestampDate.toDateString() === today.toDateString()
}


function isTodayEvent(timestamp:string):boolean {
    const today = new Date()
    const todayString = today.toISOString().split('T')[0]
    const dateFromTimestamp = timestamp.split('T')[0]
    return dateFromTimestamp === todayString
}