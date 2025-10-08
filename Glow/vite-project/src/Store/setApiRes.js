// Store: src/Store/useShopStore.js
import { create } from "zustand";

export const setApiRes = create((set) => ({
  products: [],
  availableColors: [],
  selectedColor: null,
  currentPage: 1,
  pagesNumber: 1,
  sortOrder: "asc",
  viewMode: "grid",

  setProducts: (data) => set({ products: data }),
  setAvailableColors: (data) => set({ availableColors: data }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPagesNumber: (n) => set({ pagesNumber: n }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
