import {  Button } from "antd";
import {  Plus } from "lucide-react";

const AddTaskButton = ({onAddTask}) => {
  return (
     <Button
          onClick={onAddTask}
          className="!bg-[linear-gradient(128deg,#667eea,#764ba2)] !text-white hover:!border-transparent transition-all duration-300 hover:scale-105"
        > <Plus size="15" /> <span >Add Task</span> </Button>
  )
}

export default AddTaskButton