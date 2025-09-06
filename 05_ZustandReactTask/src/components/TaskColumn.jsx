import { useState } from "react";
import { Badge, Button, Card, Empty, Select, Tag, Tooltip, Modal } from "antd";
import moment from "moment";
import AddTaskButton from "./Buttons/AddTaskButton";
import { Calendar1, Clock } from "lucide-react";

const gradientMap = {
  rose: "bg-gradient-to-br !from-rose-400 !via-pink-600 !to-rose-400",
  indigo: "bg-gradient-to-br !from-indigo-600 !via-sky-400 !to-indigo-600",
  amber: "bg-gradient-to-br !from-amber-400 !via-orange-600 !to-amber-400",
};

const statusColors = {
  pending: "orange",
  inProgress: "blue",
  completed: "green",
};

const TaskColumn = ({
  priority,
  color,
  tasks,
  onStatusChange,
  onDelete,
  onAddTask,
}) => {
  const [expandedTask, setExpandedTask] = useState(null);

  return (
    <div className="lg:h-full lg:min-h-0 flex-1">
      {/* Priority Ribbon */}
      <Badge.Ribbon
        text={priority}
        className={`${gradientMap[color]} !font-medium !z-[4]`}
      />

      {/* Column Box */}
      <div className="shadow-2xl bg-white/80 p-6 space-y-4 rounded-lg h-full min-h-0 overflow-y-auto scrollbar">
        {/* Task List */}
        <div className="flex flex-col gap-5">
          {tasks.length === 0 ? (
            <div className="m-auto h-full w-full flex flex-col gap-5">
              <Empty description="there is no tasks" />
              <AddTaskButton onAddTask={onAddTask} />
            </div>
          ) : (
            tasks.map((task, i) => {
              const isLong = task.description?.split(" ").length > 30;
              const preview = isLong
                ? task.description.split(" ").slice(0, 30).join(" ") + "..."
                : task.description;

              return (
                <Card key={i} hoverable>
                  <Card.Meta
                    title={
                      <h1 className="uppercase text-lg font-bold text-slate-800 truncate tracking-wide">
                        {task.title}
                      </h1>
                    }
                    description={
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {preview}
                        {isLong && (
                          <Button
                            type="link"
                            size="small"
                            className="ml-1 p-0 text-indigo-500"
                            onClick={() => setExpandedTask(task)}
                          >
                            Read More
                          </Button>
                        )}
                      </p>
                    }
                  />

                  {/* Status + Actions */}
                  <div className="mb-4 mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    {/* Status Tag */}
                    <Tag color={statusColors[task.status]}>{task.status}</Tag>

                    {/* Actions + Dropdown */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <Button
                        danger
                        size="small"
                        onClick={() => onDelete(task._id)}
                      >
                        Delete
                      </Button>

                      <Select
                        size="small"
                        value={task.status}
                        onChange={(value) => onStatusChange(task._id, value)}
                        className="w-full sm:w-auto"
                      >
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                    </div>
                  </div>

                  {/* Date + Time */}
                  <Tooltip
                    size="small"
                    title={`${moment(task.createdAt).format(
                      "dddd, DD MMMM YYYY"
                    )}`}
                  >
                    <label className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar1 size={16} className="text-indigo-500" />
                        {moment(task.createdAt).format("ddd, DD MMM YYYY")}
                      </span>

                      <span className="hidden sm:inline text-gray-400">|</span>

                      <span className="flex items-center gap-1">
                        <Clock size={16} className="text-rose-500" />
                        {moment(task.createdAt).format("hh:mm A")}
                      </span>
                    </label>
                  </Tooltip>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Expanded Modal for Long Description */}
      <Modal
        open={!!expandedTask}
        title={expandedTask?.title}
        footer={null}
        onCancel={() => setExpandedTask(null)}
        className="max-w-2xl"
        styles={{
          body: { maxHeight: "70vh", overflowY: "auto" },
        }}
      >
        <p className="whitespace-pre-line leading-relaxed text-slate-700">
          {expandedTask?.description}
        </p>
      </Modal>
    </div>
  );
};

export default TaskColumn;
