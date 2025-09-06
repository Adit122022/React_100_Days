import { Delete } from "lucide-react";
import { usePlanner } from "../../store/usePlanner";
import { Button, Popconfirm } from "antd";

const DeleteAllButton = () => {
     const { deleteAll }= usePlanner()
  return (
     <Popconfirm onConfirm={()=>deleteAll} title="This Action Can't Be Undone!!">
            <Button
          className="md:!bg-transparent !bg-rose-400 !text-white hover:!border-transparent hover:!bg-rose-400 transition-all duration-300 hover:scale-104"
        > <Delete size="15" /> <span >Add Task</span> </Button>
         </Popconfirm>
  )
}

export default DeleteAllButton