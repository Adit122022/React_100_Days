import React from 'react'

const FailedTask = ({task}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between'>
      <div>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-600 text-white text-sm px-3 py-1 rounded-full'>{task.category}</h3>
          <h4 className='text-sm text-gray-500'>{task.date}</h4>
        </div>
        <h2 className='mt-5 text-2xl font-semibold text-gray-800'>{task.title}</h2>
        <p className='text-sm mt-3 text-gray-600'>{task.description}</p>
      </div>
      <div className='mt-5'>
        <button className='bg-red-600 text-white text-sm px-4 py-2 rounded-full w-full'>Failed</button>
      </div>
    </div>
  )
}

export default FailedTask