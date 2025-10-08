// src/store/useShopStore.js
import { create } from "zustand";
import axios from "axios";

export const API_URL = "http://localhost:1337";
const pageSize = 9;

// -------------------------
// Helpers
// -------------------------
// const getVariantArray = (product) => {
//   const p = product?.attributes ? product.attributes : product;
//   const maybe = p?.VariantProduct ;
//   if (!maybe) return [];
//   if (Array.isArray(maybe)) return maybe;
//   if (maybe?.data && Array.isArray(maybe.data)) return maybe.data;
//   if (typeof maybe === "object") {
//     const arr = Object.keys(maybe)
//       .filter((k) => !isNaN(parseInt(k)))
//       .map((k) => maybe[k]);
//     if (arr.length) return arr;
//   }
//   return [];
// };
const getVariantArray = (product)=>{
  const p = product;
  const v = p.VariantProduct ;
  if(Array.isArray(v))return v;
  if(v?.data && v.data.isArray)return v.data;
  return [];
}

const extractColorFromVariant = (variant) => {
  const v = variant?.attributes ? variant.attributes : variant;
  if (!v) return null;
  let color = v.color || v.color_name || v.colorName || v.variant_color || v.hex || v.colorHex || v.name;
  if (color && typeof color === "object") {
    const nested = color.data?.attributes || color.attributes;
    color = nested?.name || nested?.value || nested?.hex || nested?.color || nested?.label || null;
  }
  if (!color) {
    const keys = ["color", "name", "label", "value"];
    for (const k of keys) {
      const maybe = v[k];
      if (maybe && typeof maybe === "string") {
        color = maybe;
        break;
      }
      if (maybe && typeof maybe === "object") {
        const nested = maybe?.data?.attributes || maybe?.attributes;
        if (nested) {
          color = nested?.name || nested?.value || nested?.hex || nested?.label || null;
          if (color) break;
        }
      }
    }
  }
  if (!color || typeof color !== "string") return null;
  return color.trim();
};

const normalizeColor = (c) => (c ? c.trim().toLowerCase() : null);

// -------------------------
// Store
// -------------------------
export const useShopStore = create((set, get) => ({
  // States
  isLoading: false,
  products: [],
  availableColors: [],
  selectedColor: null,
  currentPage: 1,
  pagesNumber: 1,
  sortOrder: "asc",
  viewMode: "grid",

  // Actions
  setSelectedColor: (color) => set({ selectedColor: color }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setCurrentPage: (page) => set({ currentPage: page }),

  // Fetch paginated products
  fetchProducts: async () => {
    const { currentPage, sortOrder } = get();
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: {
          populate: ["product_image", "hoverimage", "VariantProduct"],
          pagination: { page: currentPage, pageSize },
        },
      });
      let items = res.data?.data || [];
      items = items.sort((a, b) => {
        const nameA = (a.attributes?.product_name || "").toLowerCase();
        const nameB = (b.attributes?.product_name || "").toLowerCase();
        return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
      const total = res.data?.meta?.pagination?.total || items.length;
      set({
        products: items,
        pagesNumber: Math.ceil(total / pageSize),
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch all colors
  fetchAllColors: async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: { populate: ["VariantProduct"], pagination: { page: 1, pageSize: 1000 } },
      });
      const items = res.data?.data || [];
      const colorSet = new Set();
      items.forEach((p) => {
        const variants = getVariantArray(p);
        variants.forEach((v) => {
          const color = extractColorFromVariant(v);
          if (color) colorSet.add(color);
        });
      });
      const colorObjs = Array.from(colorSet).map((label) => ({
        label,
        value: normalizeColor(label),
      }));
      set({ availableColors: colorObjs });
    } catch (err) {
      console.error("Error fetching colors:", err);
    }
  },

  // Derived / computed state
  filteredProducts: [],
}));

// Keep filteredProducts in sync when products or selectedColor changes
useShopStore.subscribe((state) => {
  const { products, selectedColor } = state;
  let filtered = products;
  if (selectedColor) {
    filtered = products.filter((p) => {
      const variants = getVariantArray(p);
      return variants.some((v) => normalizeColor(extractColorFromVariant(v)) === selectedColor);
    });
  }
  if (filtered !== state.filteredProducts) {
    useShopStore.setState({ filteredProducts: filtered });
  }
});
