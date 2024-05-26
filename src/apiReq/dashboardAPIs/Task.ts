'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";
const supabase = clientConnectionWithSupabase()

export const createNewTask = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)

    const resultOftaskCreation: any = await supabase
        .from('votum_user_tasks')
        .insert([
            { name: formdata.name, priority: formdata.priority, startDate: formdata.startDate, dueDate: formdata.dueDate, status: false, user_id: parsedUserDetails.id },
        ])
        .select()

    if (resultOftaskCreation?.error !== null) {
        return resultOftaskCreation
    } else {
        return resultOftaskCreation
    }
}


export const newCreateNewTask = async (formdata: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)

    const resultOftaskCreation: any = await supabase
        .from('votum_user_tasks')
        .insert([
            { ...formdata, user_id: parsedUserDetails.id },
        ])
        .select()

    if (resultOftaskCreation?.error !== null) {
        console.log(resultOftaskCreation)
        return { success: false, resultOftaskCreation }
    } else {
        return { success: true, resultOftaskCreation }
    }
}



export const getTasks = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return "User session Not Found"
    }
    let { data: userTasks, error }: any = await supabase
        .from('votum_user_tasks')
        .select("*")
        .eq('user_id', parsedUserDetails.id)
        .order('created_at')

    if (userTasks !== null) {
        const todayDate = new Date();
        const formattedTodayDate = todayDate.toDateString();

        // let listTasks: any = {
        //     todayDue: [],
        //     overDue: [],
        //     others: [],
        //     done: []
        // }
        
        let listTasks = [...userTasks]
        
        let boardTasks: any = {
            todo: [],
            onprogress: [],
            done: []
        }
        for (var i = 0; i < userTasks.length; i++) {
            if (userTasks[i].status !== 2) {
                const givenDate = new Date(userTasks[i].dueDate)
                const givenDateInString = givenDate.toDateString();
                console.log(todayDate < givenDate)
                // if (formattedTodayDate === givenDateInString) {
                //     listTasks.todayDue.push(userTasks[i])
                // } else if (todayDate > givenDate) {
                //     listTasks.overDue.push(userTasks[i])
                // } else {
                //     listTasks.others.push(userTasks[i]);
                // }
                if (userTasks[i].status === 0) {
                    boardTasks.todo.push(userTasks[i])
                } else if (userTasks[i].status === 1) {
                    boardTasks.onprogress.push(userTasks[i])
                }
            } else if (userTasks[i].status === 2) {
                // listTasks.done.push(userTasks[i])
                boardTasks.done.push(userTasks[i])
            }
        }
        return { success: true, listTasks, boardTasks }
    } else {
        return { success: false, error: error.message }
    }
}


export const makeDuplicate = async (duplicatetask: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {

        const { data, error }: any = await supabase
            .from('votum_user_tasks')
            .insert([
                { name: duplicatetask.name, priority: duplicatetask.priority, startDate: duplicatetask.startDate, dueDate: duplicatetask.dueDate, status: duplicatetask.status, user_id: parsedUserDetails.id, sub_tasks: duplicatetask.sub_tasks, taskContent: duplicatetask.taskContent },
            ])
            .select()

        if (error === null) {
            return { success: true, data }
        } else {
            return { success: false, error: error.message }
        }
    } else {
        return "User Data not found , please login again"
    }
}

export const markASComplete = async (TaskObj: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        const result = await supabase
            .from('votum_user_tasks')
            .update({ status: true })
            .eq('id', TaskObj.id)
            .select()
        console.log(result)
        return result
    } else {
        return "User Data not found , please login again"
    }
}

export const deleteTask = async (TaskObj: any) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {

        const { error } = await supabase
            .from('votum_user_tasks')
            .delete()
            .eq('id', TaskObj.id)
        console.log(error)
        return error
    } else {
        return "User Data not found , please login again"
    }
}

export const markAsPendingAPI = async (TaskObj: any) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        const result = await supabase
            .from('votum_user_tasks')
            .update({ status: false })
            .eq('id', TaskObj.id)
            .select()
        console.log(result)
        return result
    } else {
        return "User Data not found , please login again"
    }
}


export const markAsPendingBulk = async (selectedList: any) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        for (var i = 0; i < selectedList.length; i++) {
            const result = await supabase
                .from('votum_user_tasks')
                .update({ status: false })
                .eq('id', selectedList[i].id)
                .select()
        }
    } else {
        return "User Data not found , please login again"
    }
}

export const markAsCompletedBulk = async (selectedList: any, completedTask: any, pendingTask: any) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        for (var i = 0; i < selectedList.length; i++) {
            const result = await supabase
                .from('votum_user_tasks')
                .update({ status: true })
                .eq('id', selectedList[i].id)
                .select()
            console.log(result)
        }
    } else {
        return { success: false, message: "User Data not found , please login again" }
    }
}


export const deleteBulk = async (selectedList: any) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        for (var i = 0; i < selectedList.length; i++) {
            const { error } = await supabase
                .from('votum_user_tasks')
                .delete()
                .eq('id', selectedList[i].id)
        }
    } else {
        return "User Data not found , please login again"
    }
}



export const getAllTask = async () => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        const { data: userTask, error }: any = await supabase
            .from('votum_user_tasks')
            .select()
            .eq('user_id', parsedUserDetails.id)

        console.log(userTask)
        return { success: true, userTask }
    } else {
        return { success: false, message: "User Data not found , please login again" }
    }
}


export const getTaskInfo = async (taskID: string) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails !== null) {
        const { data: TaskInfo, error }: any = await supabase
            .from('votum_user_tasks')
            .select()
            .eq('user_id', parsedUserDetails.id)
            .eq('id', taskID)

        console.log(TaskInfo)
        if (error !== null) {
            return { success: false, error: error.message }
        } else {
            return { success: true, TaskInfo: TaskInfo[0] }
        }
    } else {
        return { success: false, message: "User Data not found , please login again" }
    }
}

export const updateTask = async (task:any,id:string) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return "User session Not Found"
    }
    const {data , error}:any = await supabase
        .from('votum_user_tasks')
        .update({ ...task })
        .eq('id',id)
        .select()
        // console.log(data[0])
    if(error===null){
        return {success:true , data:data[0] }
    }else {
        return {success:false , error:error.message}
    }
}










////// Status

export const markAsTodo = async (TaskID: string) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return { success: false, error: "user data not available please try login again" }
    } else {
        const { data, error } = await supabase
            .from('votum_user_tasks')
            .update({ status: 0 })
            .eq('id', TaskID)
            .select()
        console.log(error)
        if (error === null) {
            return { success: true }
        } else {
            return { success: false, error: error.message }
        }
    }
}

export const markAsOnprogress = async (TaskID: string) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return { success: false, error: "user data not available please try login again" }
    } else {
        const { data, error } = await supabase
            .from('votum_user_tasks')
            .update({ status: 1 })
            .eq('id', TaskID)
            .select()
        if (error === null) {
            return { success: true }
        } else {
            return { success: false, error: error.message }
        }
    }
}

export const markAsDone = async (TaskID: string) => {
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    if (parsedUserDetails === null) {
        return { success: false, error: "user data not available please try login again" }
    } else {
        const { data, error } = await supabase
            .from('votum_user_tasks')
            .update({ status: 2 })
            .eq('id', TaskID)
            .select()
        if (error === null) {
            return { success: true }
        } else {
            return { success: false, error: error.message }
        }
    }
}