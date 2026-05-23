import React, { useState, useEffect } from "react";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');

  const [taskList, setTaskList] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!taskTitle || !taskDesc || !taskDate || !assignTo || !category) {
      alert('Please fill all fields');
      return;
    }

    const newTask = { taskTitle, taskDesc, taskDate, assignTo, category, active: false, newTask: true, failed: false, completed: false };

    setTaskList(prevList => [...prevList, newTask]);

    // Update employee tasks in local storage
    const data = JSON.parse(localStorage.getItem('employees'));
    data.forEach((elem) => {
      if (elem.firstName === assignTo) {
        elem.tasks.push(newTask);
        localStorage.setItem('employees', JSON.stringify(data));
      }
    });

    // Clear form fields
    setTaskTitle('');
    setTaskDesc('');
    setTaskDate('');
    setAssignTo('');
    setCategory('');
  };

  return (
    <div className="p-10 bg-gray-900 mt-7 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-100 mb-6">Create New Task</h2>
      <form onSubmit={submitHandler} className="flex w-full gap-8 items-end">
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block" htmlFor="taskTitle">
              Task Title
            </label>
            <input
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-gray-800 border border-gray-600 focus:ring-1 focus:ring-emerald-500 transition"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-gray-800 border border-gray-600 focus:ring-1 focus:ring-emerald-500 transition"
              type="date"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block" htmlFor="assignTo">
              Assign To
            </label>
            <input
              id="assignTo"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-gray-800 border border-gray-600 focus:ring-1 focus:ring-emerald-500 transition"
              type="text"
              placeholder="Employee Name"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-2 px-3 w-full rounded-lg outline-none bg-gray-800 border border-gray-600 focus:ring-1 focus:ring-emerald-500 transition"
              type="text"
              placeholder="Design, Development, etc."
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="w-full h-44 text-sm py-2 px-3 rounded-lg outline-none bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="Provide a detailed task description"
            ></textarea>
          </div>
          <button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3 px-5 text-sm font-medium transition"
            type="submit"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
