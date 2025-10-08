import { create } from "zustand";
//create a zustand state for loading


export const useLoadStore = create((set)=>(
    {
        isLoading: false,
        setIsLoading: (loading) => set({ isLoading: loading }),
    }

));  