import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const AllTasks = () => {
  const authdata = useContext(AuthContext);
  // console.log(authdata.employees);

  return (
    <div className="bg-gray-900 p-6 mt-8 rounded-lg h-[60vh] overflow-hidden shadow-lg">
      <div className="bg-gray-800 mb-4 py-3 px-6 flex justify-between items-center rounded-lg text-gray-300 text-sm font-semibold uppercase">
        <h2 className="w-1/5 text-center font-semibold font-mono text-base">Employee Name</h2>
        <h3 className="w-1/5 text-center font-semibold font-mono text-base text-blue-400">New Tasks</h3>
        <h3 className="w-1/5 text-center font-semibold font-mono text-base text-yellow-400">Active Tasks</h3>
        <h3 className="w-1/5 text-center font-semibold font-mono text-base text-green-400">Completed</h3>
        <h3 className="w-1/5 text-center font-semibold font-mono text-base text-red-600">Failed</h3>
      </div>
      <div className="h-[80%] overflow-y-auto scrollbar-thin px-4 scrollbar-thumb-gray-700 scrollbar-track-gray-800 ">
      {authdata.employees &&
     authdata.employees.map((employee, id) => {
    // Count tasks by status
    const activeTasks = employee.tasks.filter(task => task.active).length;
    const newTasks = employee.tasks.filter(task => task.newTask).length;
    const completedTasks = employee.tasks.filter(task => task.completed).length;
    const failedTasks = employee.tasks.filter(task => task.failed).length;

    return (
      <div
        key={id}
        className="bg-gray-800 mb-3 py-3 px-5 flex justify-between items-center rounded-lg text-gray-200 hover:bg-gray-700 transition-colors duration-200"
      >
        <h2 className="w-1/5 text-center text-white font-bold font-serif">{employee.firstName}</h2>
        <h5 className="w-1/5 text-center font-semibold font-mono text-blue-400">{newTasks}</h5>
        <h5 className="w-1/5 text-center font-semibold font-mono text-yellow-300">{activeTasks}</h5>
        <h5 className="w-1/5 text-center font-semibold font-mono text-green-300">{completedTasks}</h5>
        <h5 className="w-1/5 text-center font-semibold font-mono text-red-500">{failedTasks}</h5>
      </div>
    );
  })}

      </div>
    </div>
  );
};

export default AllTasks;
