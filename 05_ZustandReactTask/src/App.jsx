import React, { useEffect, useState } from "react";
import "animate.css";
import { Badge, Button, Card, Select, Tag } from "antd";
import { Plus }from "lucide-react"
import FormModal from "./components/FormModal"
import NavBar from "./components/NavBar";
const App = () => {
   const [open,setOpen] =useState(false)
    const [timer,setTimer] = useState(new Date().toLocaleTimeString())

   useEffect(() => {
   const interval = setInterval(()=>{ setTimer(new Date().toLocaleTimeString())},1000) 
   return ()=>{
    clearInterval(interval)
   }
   }, [])

   const handleSubmit =(data)=>{
  console.log("Task Added:", data);
   }
  return (
    <div className="bg-gray-400 h-screen overflow-hidden relative">
      {/* Navbar */}
     <NavBar timer={timer}/>

      {/* Content Area */}
      <section
        className="
          p-6  
          fixed top-[60px] left-0 
          h-[calc(100%-120px)] w-full
          grid gap-6 sm:grid-cols-2 lg:grid-cols-3
          overflow-y-auto scrollbar">        
          
          {/* main dib */}
      <div className="h-ful min-h-0">
            <Badge.Ribbon
              text="Highest"
              className=" bg-gradient-to-br !from-rose-400 !via-pink-600 !to-rose-400 !font-medium"/>
      <div className="shadow-blue-400 shadow-2xl  bg-white p-6 space-y-2.5 rounded-lg h-full min-h-0 overflow-y-scroll scrollbar">
        <Button
           onClick={() => setOpen(!open)}
         className="!bg-gradient-to-br !from-rose-400 !via-pink-600 !to-rose-400  !text-white hover:!border-white transition-all duration-300 hover:scale-105">
          <Plus size="15"/> <span>Add Tasks</span>
        </Button>
        {/* content */}
                <div className=" space-y-4 h-full">
              {
                Array(5).fill(0).map((_,i)=>(
                  <Card hoverable>
                    <Card.Meta 
                    title="Upload new Video"
                    description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga quae commodi obcaecati beatae officia! Qui omnis quaerat repudiandae reiciendis cumque.">
                    </Card.Meta>
                      <div className="mt-4 flex justify-between items-center">
                     <div>
                       <Button >pending</Button>
                      <Button color="danger" danger="true" >Delete</Button>
                     </div>
                    <Select size="medium" placeholder="change status">
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">inProgress</Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                      </div>
                  </Card>
                ))
              }  
           
                </div>            
      </div>
    </div>
          {/* main dib */}
      <div className="h-ful min-h-0">
            <Badge.Ribbon
              text="Meadium"
              className=" bg-gradient-to-br !from-indigo-600 !via-sky-400 !to-indigo-600 !font-medium"/>
      <div className="shadow-blue-400 shadow-2xl  bg-white p-6 space-y-2.5 rounded-lg h-full min-h-0 overflow-y-scroll scrollbar">
        {/* content */}
               <div className=" bg-red-500">
                 <h1 className="text-gray-800 text-2xl font-bold font-serif">Heading</h1>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus id natus beatae necessitatibus suscipit voluptatum, ullam recusandae quo sequi? Porro.
                </p>
                {/*   */}
                <div className="flex  w-full justify-between">
                {/* Buttons */}
                 <div className="space-x-2">
                   <button className="border px-4 py-1 rounded-md hover:bg-gray-500 hover:text-white">Pending</button>
                  <button className="px-4 py-1 rounded-md hover:bg-red-600 hover:text-white text-white bg-pink-500">Delete</button>
                 </div>
                 {/* change status */}
                 <div className="px-4 py-[2px] border-1 rounded-2xl">
                  change status ›
                 </div>
                </div>
                <p>05 Sep 2025 04:55 PM</p>
                </div>              
      </div>
    </div>
          {/* main dib */}
      <div className="h-ful min-h-0">
            <Badge.Ribbon
              text="Lowest"
              className=" bg-gradient-to-br !from-amber-400 !via-orange-600 !to-amber-400 !font-medium"/>
      <div className="shadow-blue-400 shadow-2xl  bg-white p-6 space-y-2.5 rounded-lg h-full min-h-0 overflow-y-scroll scrollbar">
        {/* content */}
               <div className=" bg-red-500">
                 <h1 className="text-gray-800 text-2xl font-bold font-serif">Heading</h1>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus id natus beatae necessitatibus suscipit voluptatum, ullam recusandae quo sequi? Porro.
                </p>
                {/*   */}
                <div className="flex  w-full justify-between">
                {/* Buttons */}
                 <div className="space-x-2">
                   <button className="border px-4 py-1 rounded-md hover:bg-gray-500 hover:text-white">Pending</button>
                  <button className="px-4 py-1 rounded-md hover:bg-red-600 hover:text-white text-white bg-pink-500">Delete</button>
                 </div>
                 {/* change status */}
                 <div className="px-4 py-[2px] border-1 rounded-2xl">
                  change status ›
                 </div>
                </div>
                <p>05 Sep 2025 04:55 PM</p>
                </div>              
      </div>
    </div>
           
       
      </section>

      {/* Footer */}
      <footer className="bg-white h-[60px] fixed bottom-0 left-0 w-full shadow-inner"></footer>

       {/* ✅ FormModal here */}
      <FormModal open={open} setOpen={setOpen}
      onSubmit={handleSubmit}  />
    </div>
  );
};

export default App;
