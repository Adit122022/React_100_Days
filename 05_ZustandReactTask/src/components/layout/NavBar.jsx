import { useState } from "react";
import {  DatePicker, Tooltip, Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined, GithubOutlined, ClockCircleOutlined, PlusCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import AddTaskButton from "../Buttons/AddTaskButton";
import DeleteAllButton from "../Buttons/DeleteAllButton";


const NavBar = ({ timer, onAddTask }) => {
  const [open, setOpen] = useState(false);
 

  return (
    <nav className="bg-[linear-gradient(128deg,_#667eea,_#764ba2)] h-[60px] fixed top-0 left-0 w-full shadow-md z-10">
      <div className="flex w-full h-full px-5 items-center justify-between">
        {/* Logo */}
        <h1 className="font-serif font-bold text-2xl text-white">
          Task<span className="text-gray-200">Forge</span>
        </h1>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-5">
          {/* Calendar Picker */}
          <Tooltip title="Pick a date">
            <DatePicker className="[&>input]:hidden cursor-pointer" />
          </Tooltip>

          {/* Timer */}
       <p className="text-slate-200 border-slate-200 px-3 py-1 border-[0.5px] rounded-xl">{timer}</p>
          {/* Add Task Button */}
          <AddTaskButton onAddTask={onAddTask} />
        {/* Delete All Tasks Button */}
        <DeleteAllButton/>
        </div>

        {/* Mobile Hamburger */}
        <Button
  className="md:!hidden inline-flex items-center justify-center"
  type="text"
  icon={open ? <CloseOutlined /> : <MenuOutlined />}
  onClick={() => setOpen(!open)} // toggle instead of always true
/>

      </div>

      {/* Mobile Drawer */}
      <Drawer

      title={<span className="text-lg font-semibold text-indigo-600">📋 Menu</span>}
      placement="right"
      closable={true}
      onClose={() => setOpen(false)}
      open={open}
      bodyStyle={{ padding: "1.5rem"}}
    >
      <div className="flex flex-col gap-6 ">
        {/* Timer */}
        <div className="flex items-center gap-3 text-lg font-medium text-gray-700">
          <ClockCircleOutlined className="text-indigo-500 text-2xl" />
          <p className="text-slate-500 border-slate-400 px-3 py-1 border-[0.5px] rounded-xl">{timer}</p>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/Adit122022"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-lg !text-gray-700 font-medium hover:text-indigo-600 transition"
        >
          <GithubOutlined className="text-2xl " />
          GitHub
        </a>

        {/* Add Task */}
          <AddTaskButton onAddTask={onAddTask}/>
        {/*Delete All Taks   */}
        <DeleteAllButton/>

        {/* Calendar */}
        <div className="flex items-center gap-3 text-lg text-gray-700 font-medium">
          <CalendarOutlined className="text-2xl text-rose-500" />
          <DatePicker
            className="w-full cursor-pointer rounded-lg"
            popupClassName="rounded-lg"
          />
        </div>
      </div>
    </Drawer>
    </nav>
  );
};

export default NavBar;
