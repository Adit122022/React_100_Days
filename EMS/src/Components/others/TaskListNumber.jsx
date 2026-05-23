import React from 'react';

const TaskListNumber = ({ data }) => {
  const activeTasks = data.tasks.filter((task) => task.active).length;
  const newTasks = data.tasks.filter((task) => task.newTask).length;
  const completedTasks = data.tasks.filter((task) => task.completed).length;
  const failedTasks = data.tasks.filter((task) => task.failed).length;

  const taskData = [
    { count: activeTasks, label: 'Active Tasks', bg: 'bg-emerald-700', icon: '🟢' },
    { count: newTasks, label: 'New Tasks', bg: 'bg-blue-700', icon: '🆕' },
    { count: completedTasks, label: 'Completed Tasks', bg: 'bg-green-700', icon: '✅' },
    { count: failedTasks, label: 'Failed Tasks', bg: 'bg-red-700', icon: '❌' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {taskData.map((task, index) => (
        <div
          key={index}
          className={`${task.bg} text-white flex flex-col items-center justify-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
        >
          <span className="text-4xl">{task.icon}</span>
          <h2 className="text-4xl font-bold mt-2">{task.count}</h2>
          <h3 className="text-xl font-medium mt-1">{task.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumber;
