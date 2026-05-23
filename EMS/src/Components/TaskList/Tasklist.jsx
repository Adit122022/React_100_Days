import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const Tasklist = ({data}) => {
  return (
    <div id='tasklist' className='overflow-x-auto overflow-y-hidden  h-[55%] flex items-center justify-start gap-5 flex-nowrap rounded-xl py-5 w-full  mt-10'>
{data.tasks.map((task ,id)=>{
if(task.active){ return <AcceptTask task={task} key={id}/> }
if(task.newTask){ return <NewTask task={task} key={id}/> }
if(task.completed){ return <CompleteTask task={task} key={id}/> }
if(task.failed){ return <FailedTask task={task} key={id}/> }
 
})}
</div>
  )
}

export default Tasklist