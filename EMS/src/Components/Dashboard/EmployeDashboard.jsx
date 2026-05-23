import React from 'react'
import Header from '../others/Header'
import TaskListNumber from '../others/TaskListNumber'
import Tasklist from '../TaskList/Tasklist'


const EmployeDashboard = ({ data,changeUser}) => {
  // console.log(data)
  return (
    <div className='p-10 bg-[#1c1c1c] h-screen overflow-y-auto scrollbar-thin px-4 scrollbar-thumb-gray-700 scrollbar-track-gray-800'>
       <Header changeUser={changeUser}/>
       <TaskListNumber data={data}/>
      <Tasklist data={data}/>
        </div>
  )
}

export default EmployeDashboard
