import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlanner = create(
  persist(
    (set) => ({
      tasks: [],

      // Add a new task
      addTask: (payload) =>
        set((state) => ({
          tasks: [...state.tasks, { ...payload, _id: Date.now() ,createdAt:Date.now()}],
        })),

      // Update a task's status by ID
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? { ...task, status } : task
          ),
        })),

      // Delete a task by ID
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        })),
    }),
    { name: "planner" }
  )
);
