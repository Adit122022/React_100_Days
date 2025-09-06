import { Badge, Button, DatePicker, Tooltip } from "antd";
import { Calendar, Plus } from "lucide-react";

const NavBar = ({ timer ,onAddTask}) => {
  return (
    <nav className="bg-[linear-gradient(128deg,_#667eea,_#764ba2)] h-[60px] fixed top-0 left-0 w-full shadow-md z-10">
      <div className="flex w-full h-full px-5 items-center justify-between">
        {/* Logo */}
        <h1 className="font-serif font-bold text-2xl text-gray-800">
          Plan<span className="text-gray-500">ner</span>
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Calendar Icon Picker */}
          <Tooltip title="Pick a date">
            {/* // hide input field */}
            <DatePicker className=" [&>input]:hidden cursor-pointer"/> 
          </Tooltip>
          {/* Timer Badge */}
          <Badge>{timer}</Badge>
           {/* Add Task Button */}
        <Button
          onClick={onAddTask}
          className="!bg-gradient-to-br !from-rose-400 !via-pink-600 !to-rose-400 !text-white hover:!border-white transition-all duration-300 hover:scale-105"
        > <Plus size="15" /> <span className="lg:block hidden">Add Task</span> </Button>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
