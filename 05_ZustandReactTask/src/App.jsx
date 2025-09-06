import { useEffect, useState } from "react";
import "animate.css";
import FormModal from "./components/FormModal";
import NavBar from "./components/layout/NavBar";
import TaskColumn from "./components/TaskColumn";
import Footer from "./components/layout/Footer";
import { usePlanner } from "./store/usePlanner";

const App = () => {
  const [open, setOpen] = useState(false); // Controls modal visibility
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

  const [activeTab, setActiveTab] = useState("Highest");


   const { tasks ,addTask ,updateTaskStatus, deleteTask } = usePlanner()

  // Update time every second
  useEffect(() => {
    const interval = setInterval(
      () => setTimer(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  
  // Handle form submission from modal
  const handleSubmit = (data) => {
    addTask(data)
  };

  // Sample tasks (can later be dynamic from API or state)
  const sampleTasks = tasks

  return (
    <div className=" h-screen  relative">
      {/* Navbar */}
      <NavBar timer={timer} onAddTask={() => setOpen(true)} />

{/* Desktop / Tablet View */}
<section
  className="
    p-6 hidden md:flex
    fixed top-[60px] left-0
    h-[calc(100%-120px)] w-full
    gap-4 overflow-y-auto scrollbar
  "
>
  <div className="flex-1 min-w-0">
    <TaskColumn
      priority="Highest"
      color="rose"
      tasks={tasks.filter((t) => t.priority === "Highest")}
      onStatusChange={updateTaskStatus}
      onDelete={deleteTask}
      onAddTask={() => setOpen(true)}
    />
  </div>

  <div className="flex-1 min-w-0">
    <TaskColumn
      priority="Medium"
      color="indigo"
      tasks={tasks.filter((t) => t.priority === "Medium")}
      onStatusChange={updateTaskStatus}
      onDelete={deleteTask}
      onAddTask={() => setOpen(true)}
    />
  </div>

  <div className="flex-1 min-w-0">
    <TaskColumn
      priority="Lowest"
      color="amber"
      tasks={tasks.filter((t) => t.priority === "Lowest")}
      onStatusChange={updateTaskStatus}
      onDelete={deleteTask}
      onAddTask={() => setOpen(true)}
    />
  </div>
</section>



{/* Mobile View */}
<div className="md:hidden p-4">
  {/* Sticky Tabs */}
  <div className=" flex justify-around mb-15 bg-white shadow-md py-2 rounded-lg sticky top-[60px] z-20">
    {["Highest", "Medium", "Lowest"].map((level) => (
      <button
        key={level}
        onClick={() => setActiveTab(level)}
        className={`px-4 py-2 rounded-lg font-medium transition 
          ${activeTab === level 
            ? "bg-indigo-600 text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
      >
        {level}
      </button>
    ))}
  </div>

  {/* Show only the selected priority’s tasks */}
  <TaskColumn
    priority={activeTab}
    color={
      activeTab === "Highest"
        ? "rose"
        : activeTab === "Medium"
        ? "indigo"
        : "amber"
    }
    tasks={tasks.filter((t) => t.priority === activeTab)}
    onStatusChange={updateTaskStatus}
    onDelete={deleteTask}
    onAddTask={() => setOpen(true)}
  />
</div>



      {/* Footer */}
      <Footer totalTasks={tasks.length}/>

      {/* Task Form Modal */}
      <FormModal open={open} setOpen={setOpen} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
