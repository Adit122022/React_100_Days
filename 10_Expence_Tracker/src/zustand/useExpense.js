import { create } from 'zustand'
import {persist} from 'zustand/middleware'

export const useExpense = create(persist(
    (set) => ({
    expenses:[],
    setExpenses:(payload)=>set((state)=>({ expenses:[...state.expenses,payload ]})) ,
    deleteExpenses:(deleteid)=>set((state)=>({expenses:state.expenses.filter((items, id)=>id!==deleteid)}))
}),{name:'expenses'} ))
