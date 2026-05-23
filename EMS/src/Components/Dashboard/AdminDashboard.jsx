import React, { useState } from "react";
import Header from "../others/Header";
import CreateTask from "../others/CreateTask";
import AllTasks from "../others/AllTasks";

const AdminDashboard = ({changeUser}) => {
  return (
    <div className=" w-full p-7 h-screen overflow-y-auto scrollbar-thin px-4 scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      <Header changeUser={changeUser} />
<CreateTask/>
<AllTasks/>
   
    </div>
  );
};

export default AdminDashboard;


