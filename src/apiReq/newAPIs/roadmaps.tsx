'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";
import { addOneDay, formattedDate } from "@/utils/shirnkDate";
import checkUserAuthClient from '@/auth/getUserSession'
const supabase = clientConnectionWithSupabase()


export const addEvent = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let formattedStartDate = formdata.startDate.replace(".000Z", "+00:00");
    let formattedEndDate = formdata.endDate.replace(".000Z", "+00:00");



    let { data: votum_user_events, error }: any = await supabase
        .from('votum_events')
        .select("*")
        .eq('user_id', parsedUserDetails.id)

    for (var i = 0; i < votum_user_events.length; i++) {
        // if()
    }



    const resultOftaskCreation: any = await supabase
        .from('votum_events')
        .insert([
            { title: formdata.title, startDate: formdata.startDate, endDate: formdata.endDate, user_id: parsedUserDetails.id },
        ])
        .select()
    const usersession: any = await checkUserAuthClient()
    if (parsedUserDetails.google_calender_integrated === true) {
        const event = {
            summary: formdata.title,
            description: "meow",
            start: {
                dateTime: formdata.startDate,
                timeZone: "UTC",
            },
            end: {
                dateTime: formdata.endDate,
                timeZone: "UTC",
            },
        };
        const result = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${usersession.data.session.provider_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })

        const msg = await result.json()
        console.log(msg)

    }

    if (resultOftaskCreation?.error !== null) {
        return resultOftaskCreation
    } else {
        return resultOftaskCreation
    }
}





export const getAlltasks = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return "User session Not Found"
    }
    let { data: userTasks, error }: any = await supabase
        .from('votum_tasks')
        .select("*")
        .eq('workspace_id', parsedUserDetails.workspace_id)

    if (userTasks !== null) {
        const newObjectExtracting = []
        for (var i = 0; i < userTasks.length; i++) {
            const obj = { ...userTasks[i] }
            //    obj.
            obj.start = addOneDay(obj.dueDate.split("+")[0])
            obj.end = addOneDay(obj.dueDate.split("+")[0])
            obj.className = "bg-[#83D17F] tasks min-h-[25px]  !text-white text-[0.75rem] text-[450] "
            obj.allDay = true
            obj.title = obj.name
            obj.type = "tasks"
            newObjectExtracting.push(obj)
        }
        return newObjectExtracting
    } else {
        return "User Data not found , please login again"
    }
}

export const getAllEvents = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return "User session Not Found"
    }
    let { data: userTasks, error }: any = await supabase
        .from('votum_events')
        .select("*")
        .eq('user_id', parsedUserDetails.id)

    if (userTasks !== null) {
        const newObjectExtracting = []
        for (var i = 0; i < userTasks.length; i++) {
            const obj = { ...userTasks[i] }
            let Sdate = new Date(obj.startDate)
            let Edate = new Date(obj.endDate)
            obj.start = Sdate
            obj.end = Edate
            console.log(obj.startDate)
            obj.className = "bg-[#029BE6]  min-h-[30px] text-white hover:bg-[#029BE6] text-[0.8rem] text-[450] "
            obj.allDay = false
            obj.type = "events"
            newObjectExtracting.push(obj)
        }
        return newObjectExtracting
    } else {
        return "User Data not found , please login again"
    }
}

export const changeEvent = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found", success: false }
    }

    const { data, error }: any = await supabase
        .from('votum_events')
        .update({ startDate: formdata.start, endDate: formdata.end })
        .eq('id', formdata.id)
        .select()

    console.log(data)
    console.log(error)

    if (data.length !== 0) {
        const obj = { ...data[0] }
        obj.start = obj.startDate
        obj.end = obj.endDate
        obj.className = "bg-[#029BE6]  min-h-[30px] text-white hover:bg-[#029BE6] text-[0.8rem] text-[450] "
        obj.allDay = false
        obj.type = "events"
        return { obj: obj, success: true }
    } else {
        return { error: "Some issue with the server", success: false }
    }
}



export const getUserDetail = async (email: string) => {
    const supabase = clientConnectionWithSupabase()
    let { data: users, error }: any = await supabase
        .from('users')
        .select("*")
        .eq('email', email)
    return users[0]
}