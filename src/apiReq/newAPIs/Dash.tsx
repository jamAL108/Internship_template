'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";
import { addOneDay, formattedDate } from "@/utils/shirnkDate";


export const getTodaySession = async (user_id: string, workspace_id: string) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const supabase = clientConnectionWithSupabase()
    let { data: userTasks, error }: any = await supabase
        .from('votum_tasks')
        .select("*")
        .eq('workspace_id', workspace_id)
        .neq('status', 2)

    console.log(error)
    if (error !== null) {
        console.log(error)
        return { success: false }
    }

    console.log(userTasks)
    let TodaysList = []
    for (var i = 0; i < userTasks.length; i++) {
        if (isTodayTask(userTasks[i].dueDate)) {
            TodaysList.push(userTasks[i])
        }
    }

    let { data: userEvent, error: Eventerror }: any = await supabase
        .from('votum_events')
        .select("*")
        .eq('user_id', user_id)
    console.log(userEvent)
    let TodaysEvent = []
    for (var i = 0; i < userEvent.length; i++) {
        console.log(userEvent[i])
        if (isTodayEvent(userEvent[i].endDate) === true) {
            TodaysEvent.push(userEvent[i])
        }
    }

    if (Eventerror !== null) {
        return { success: false }
    }

    console.log(TodaysEvent)

    return { success: true, tasks: TodaysList, events: TodaysEvent }

}


function isTodayTask(timestamp: string): boolean {
    const timestampDate = new Date(timestamp)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return timestampDate.toDateString() === today.toDateString()
}


function isTodayEvent(timestamp: string): boolean {
    const today = new Date()
    const todayString = today.toISOString().split('T')[0]
    const dateFromTimestamp = timestamp.split('T')[0]
    return dateFromTimestamp === todayString
}