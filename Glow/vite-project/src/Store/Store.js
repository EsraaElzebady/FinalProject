import { create } from "zustand";

export const useQuantityCounter = create((set) => ({
    quantity:1,
    handleInc : () => set((state) => ({quantity : state.quantity + 1})),
}))


export  const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
export const slugString = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");


export const usePaginationStore = create((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

