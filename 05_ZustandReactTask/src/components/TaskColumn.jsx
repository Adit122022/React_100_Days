import { Badge, Button, Card, Select } from 'antd';
import { Plus } from 'lucide-react';
import React from 'react'


const gradientMap = {
  rose: "bg-gradient-to-br !from-rose-400 !via-pink-600 !to-rose-400",
  indigo: "bg-gradient-to-br !from-indigo-600 !via-sky-400 !to-indigo-600",
  amber: "bg-gradient-to-br !from-amber-400 !via-orange-600 !to-amber-400",
};
const TaskColumn = ({ priority, color, tasks}) => {
  return (
    <div className="lg:h-full lg:min-h-0">
      {/* Priority Ribbon */}
      <Badge.Ribbon
        text={priority}
        className={`${gradientMap[color]} !font-medium !z-[99]`}
      />

      {/* Column Box */}
      <div className="shadow-2xl bg-white/80 p-6 space-y-2.5 rounded-lg h-full min-h-0 overflow-y-scroll scrollbar">
       
        {/* Task List */}
        <div className="flex flex-col gap-5 h-[calc(100%-2.5rem)] min-h-0 overflow-y-scroll scrollbar">
          {tasks.map((task, i) => (
            <Card  key={i} hoverable>
              <Card.Meta title={task.title} description={task.description} />
              <div className="mt-4 flex justify-between items-center">
                {/* Actions */}
                <div className="space-x-2">
                  <Button size="small">Pending</Button>
                  <Button danger size="small">
                    Delete
                  </Button>
                </div>

                {/* Status Dropdown */}
                <Select size="small" placeholder="Change status">
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="inProgress">In Progress</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                </Select>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn