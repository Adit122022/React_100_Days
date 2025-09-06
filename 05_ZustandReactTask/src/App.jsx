import { useEffect, useState } from "react";
import "animate.css";
import FormModal from "./components/FormModal";
import NavBar from "./components/NavBar";
import TaskColumn from "./components/TaskColumn";
import Footer from "./components/Footer";

const App = () => {
  const [open, setOpen] = useState(false); // Controls modal visibility
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

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
    console.log("Task Added:", data);
  };

  // Sample tasks (can later be dynamic from API or state)
  const sampleTasks = Array(5).fill({
    title: "Upload new Video",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quae commodi obcaecati beatae officia!",
  });

  return (
    <div className=" h-screen overflow-hidden relative">
      {/* Navbar */}
      <NavBar timer={timer} onAddTask={() => setOpen(true)} />

      {/* Content Area */}
      <section
        className="
          p-6  
          fixed top-[60px] left-0 
          h-[calc(100%-120px)] w-full
         flex justify-between gap-4
          overflow-y-auto scrollbar"
      >
        {/* Highest Priority Column */}
        <TaskColumn
          priority="Highest"
          color="rose"
          tasks={sampleTasks}       
        />

        {/* Medium Priority Column */}
        <TaskColumn
          priority="Medium"
          color="indigo"
          tasks={sampleTasks}   
        />

        {/* Lowest Priority Column */}
        <TaskColumn
          priority="Lowest"
          color="amber"
          tasks={sampleTasks}
        />
      </section>

      {/* Footer */}
      <Footer/>

      {/* Task Form Modal */}
      <FormModal open={open} setOpen={setOpen} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
