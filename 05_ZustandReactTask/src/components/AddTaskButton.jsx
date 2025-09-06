import {  Button } from "antd";
import {  Plus } from "lucide-react";

const AddTaskButton = ({onAddTask}) => {
  return (
     <Button
          onClick={onAddTask}
          className="!bg-gradient-to-br !from-rose-400 !via-pink-600 !to-rose-400 !text-white hover:!border-white transition-all duration-300 hover:scale-105"
        > <Plus size="15" /> <span >Add Task</span> </Button>
  )
}

export default AddTaskButton