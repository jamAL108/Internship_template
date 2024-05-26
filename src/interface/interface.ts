export interface LandingNavProps{
    flag:boolean
}


export interface CardTranslateProps{
    sourcelang:string,
    targetlang:string ,
    description:string,
    changesourcelang: (str:string) =>void,
    changetargetlang: (str:string)=>void,
    changedescription: (str:string)=>void,
    handlesubmit:()=>void
    removeFile:()=>void,
    request:boolean,
}

export interface propsforobjectitem{
   original:string,
   translated:string,
   dummy:string
}
export interface CorrectionProps{
    targetfile:propsforobjectitem[],
}


export interface votumTaskInterface{
    id:string,
    name:string,
    priority:string,
    status:boolean,
    dueDate:Date,
    user_id:bigint
}

export interface pendingTaskComponentInterface{
    pendingTask:votumTaskInterface[]
}


export interface pendingTaskObject{
    todayDue:votumTaskInterface[],
    overDue:votumTaskInterface[],
    others:votumTaskInterface[]
}

export interface CompletedTaskObject{
    Task:votumTaskInterface
}