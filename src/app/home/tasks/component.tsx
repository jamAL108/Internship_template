'use client';
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/homeComponent/navbar';
import { MoreHorizontal, KanbanSquare, ListTodo } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import NewTask from '@/components/homeComponent/tasks/newTask'
import { votumTaskInterface, pendingTaskObject } from '@/interface/interface';
import { getTasks } from '@/apiReq/newAPIs/Task';
import SkeletonComponentForTaskView from '@/components/homeComponent/tasks/skeleton'
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners'


import BoardComponent from '@/components/homeComponent/tasks/kanban/Board'
// import ListViewComponent from '@/components/homeComponent/tasks/lists/list'k

import NewListViewComponent from '@/components/homeComponent/tasks/newlistview/component'

const Component = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('list')
  const [skeletonShow, setSkeletonShow] = useState<boolean>(true)


  const [listViewSelected, setListViewSelected] = useState<any>([])

  const [bigAPIrequest, setBigAPIrequest] = useState(false)

  const [ListTasks, setListTasks] = useState<any>([])
  const [boardTasks, setBoardTasks] = useState<any>({})

  const [skeletonLoaderForTable , setSkeletonLoaderForTable] = useState<boolean>(false)


  useEffect(() => {
    getTaskFromSupabase()
  }, [])

  const getTaskFromSupabase = async () => {
    const result: any = await getTasks()
    if (result.success === true) {
      setListTasks(result.listTasks)
      setBoardTasks(result.boardTasks)
    } else {
      toast({
        variant: "destructive",
        title: "SERVER ERROR",
        description: "Please Try again !",
      });
    }
    setSkeletonShow(false)
  }

  // F6F8FA (old) -----------  f7f8fc (new)
  return (
    <>
      {bigAPIrequest === true && (
        <div className='absolute z-[100000] w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
          <SyncLoader
            color={"#f7f8fc"}
            loading={true}
            size={13}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className='w-full pt-[15px] flex flex-col gap-2 h-full'>

        <div className='px-[25px] flex pt-[4px] gap-2 items-center'>
          <h1 className='text-[1.5rem] font-[600] tracking-[0.6px]'>Tasks</h1>
          <MoreHorizontal size={20} className='cursor-pointer' />
        </div>

        <div className='w-full'>
          <NewTask bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} listViewSelected={listViewSelected} setListViewSelected={setListViewSelected} setListTasks={setListTasks} ListTasks={ListTasks} boardTasks={boardTasks} setBoardTasks={setBoardTasks} dummyPropToAvoidBug={true} />
          <Tabs defaultValue="list" className="mt-[-2.37rem] w-full h-[calc(100vh_-_30px)] overflow-hidden">
            <TabsList className='pl-[20px] bg-transparent' >
              <TabsTrigger className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#6680ff] data-[state=active]:border-b-[2px] data-[state=active]:border-[#6680ff] flex justify-center items-center gap-[0.37rem] p-[6px] px-[15px] text-[0.9rem] font-[520]' value="list" onClick={(e) => setActiveTab('list')}>
                <ListTodo style={activeTab === 'list' ? { color: "#6680ff" } : { color: '#636f7e' }} size={15} />
                List</TabsTrigger>
              <TabsTrigger className='rounded-[0px] data-[state=active]:bg-none data-[state=inactive]:opacity-[0.6] data-[state=active]:shadow-none data-[state=active]:text-[#6680ff] data-[state=active]:border-b-[2px] data-[state=active]:border-[#6680ff] flex justify-center items-center gap-[0.37rem]  p-[6px] px-[15px] text-[0.9rem] font-[520]' value="board" onClick={(e) => setActiveTab('board')}>
                <KanbanSquare style={activeTab === 'board' ? { color: "#6680ff" } : { color: '#636f7e' }} size={15} />
                Board
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              {skeletonShow === true ? (
                <SkeletonComponentForTaskView />
              ) : (
                ListTasks.length === 0  ? (
                  <div className='w-full flex justify-center items-center py-[100px] max-h-[500px] flex-col gap-3'>
                    <h1 className='text-center text-2xl font-[600]'>No task Found</h1>
                    <h2 className='w-[330px] text-center text-[0.87rem]'>Track tasks to better manage your firm’s productivity.</h2>
                    <Button className='flex bg-[#6680ff] hover:bg-[#004FC5] justify-center items-center gap-1 h-[70%]'
                      onClick={(e) => {
                        e.preventDefault()
                        const createNewtaskAlert: any = document.querySelector('.createNewTaskButtonTaskSection');
                        if (createNewtaskAlert) {
                          createNewtaskAlert.click()
                        }
                      }}
                    >Create New task</Button>
                  </div>
                ) : (
                  // <ListViewComponent bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} ListTasks={ListTasks} setListTasks={setListTasks} setBoardTasks={setBoardTasks} selectedBoxes={listViewSelected} boardTasks={boardTasks} setSelectedBoxes={setListViewSelected} />
                  <NewListViewComponent bigAPIrequest={bigAPIrequest} setBigAPIrequest={setBigAPIrequest} ListTasks={ListTasks} setListTasks={setListTasks} setBoardTasks={setBoardTasks} selectedBoxes={listViewSelected} boardTasks={boardTasks} setSelectedBoxes={setListViewSelected} skeletonLoaderForTable={skeletonLoaderForTable} setSkeletonLoaderForTable={setSkeletonLoaderForTable} />
                )
              )}
            </TabsContent>
            <TabsContent value="board" className='h-[calc(100%_-_100px)]'>
              <BoardComponent boardTasks={boardTasks} setBoardTasks={setBoardTasks} ListTasks={ListTasks} setListTasks={setListTasks}  />
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </>
  )
}

export default Component