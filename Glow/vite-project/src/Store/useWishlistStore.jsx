import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:1337"; // change when deployed

// helper to get token
export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// helper to get current userId from JWT
export const getUserId = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded.user?.id; // Strapi v4 may nest inside user
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
};

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,
  wishlistCount: 0,

  // -------------------------
  // Fetch wishlist (for logged-in user)
  // -------------------------

  fetchWishlist: async () => {

    set({ loading: true });
    try {
      const userId = getUserId();
      if (!userId) {
        set({ wishlist: [], wishlistCount: 0, loading: false });
        return;
      }

      const res = await axios.get(`${API_URL}/api/wishlists`, {
        headers: getAuthHeaders(),
        params: {
          filters: { user: { id: { $eq: userId } } },
          populate: {
            products: {
              populate: ["product_image", "hoverimage", "VariantProduct"],
            },
          },
        },
      });

      const items = res.data?.data || [];
      const products = items[0]?.products || [];
      console.log ("💖 Wishlist products:", products);
      res.data.data[0]?.id && console.log("💖 Wishlist ID:", res.data.data[0].id);
      set({
        wishlist: products,
        wishlistCount: products.length,
      });
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      set({ loading: false });
    }
  },

  // -------------------------
  // Add product to wishlist
  // -------------------------
  // addToWishlist: async (productId) => {
  //   try {
  //     const userId = getUserId();
  //     if (!userId) return;

  //     // check if wishlist exists for this user
  //     const res = await axios.get(`${API_URL}/api/wishlists`, {
  //       headers: getAuthHeaders(),
  //       params: {
  //         filters: { user: { id: { $eq: userId } } },
  //         populate: {
  //           products: {
  //             populate: ["product_image", "hoverimage", "VariantProduct"],
  //           },
  //         },
  //       },
  //     });


  //     const items = res.data?.data || [];
  //     const wishlistId = res.data?.data[0]?.documentId;
  //     console.log("💖 Current wishlist ID:", wishlistId);console.log(items,"NNNNNNNNN")
  //     const wish = await axios.get(`${API_URL}/api/wishlists/${wishlistId}`, {
  //       headers: getAuthHeaders(),
  //       params: {
  //         populate: {
  //           products: {
  //             populate: ["product_image", "hoverimage", "VariantProduct"],
  //           },
  //         },
  //       },
  //     });
  //     console.log(wish,"","wishhhhhhh")                                                  
  //     const existingProducts = wish.data?.data?.products || [];
  //     if (existingProducts.find((p) => p.id === productId)) {
  //       console.log("Product already in wishlist:", productId);
  //       return; // already in wishlist
  //     }

  //     if (wishlistId) {
  //       await axios.put(
  //         `${API_URL}/api/wishlists/${wishlistId}`,
  //         { data: { products: { connect: [productId] } } },
  //         { headers: getAuthHeaders() }
  //       );
  //     } else {
  //       await axios.post(
  //         `${API_URL}/api/wishlists`,
  //         { data: { user: userId, products: [productId] } },
  //         { headers: getAuthHeaders() }
  //       );
  //     }

  //     get().fetchWishlist();
  //   } catch (err) {
  //     console.error("Error adding to wishlist:", err);
  //   }
  // },

  addToWishlist: async (productId) => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const res = await axios.get(`${API_URL}/api/wishlists`, {
        headers: getAuthHeaders(),
        params: { filters: { user: { id: { $eq: userId } } } },
      });

      const items = res.data?.data || [];
      const wishlistId = items[0]?.documentId;
      console.log("💖 Current wishlist ID:", wishlistId);
      if (!wishlistId) return;

      await axios.put(
        `${API_URL}/api/wishlists/${wishlistId}`,
        { data: { products: { connect: [productId] } } },
        { headers: getAuthHeaders() }
      );

      get().fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  },
  // -------------------------
  // Remove product from wishlist
  // -------------------------
  removeFromWishlist: async (productId) => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const res = await axios.get(`${API_URL}/api/wishlists`, {
        headers: getAuthHeaders(),
        params: { filters: { user: { id: { $eq: userId } } } },
      });

      const items = res.data?.data || [];
      const wishlistId = items[0]?.documentId;
      console.log("💖 Current wishlist ID:", wishlistId);
      if (!wishlistId) return;

      await axios.put(
        `${API_URL}/api/wishlists/${wishlistId}`,
        { data: { products: { disconnect: [productId] } } },
        { headers: getAuthHeaders() }
      );

      get().fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  },

  // -------------------------
  // Clear wishlist (local + API if possible)
  // -------------------------
  clearWishlist: async () => {
    try {
      const userId = getUserId();
      if (userId) {
        const res = await axios.get(`${API_URL}/api/wishlists`, {
          headers: getAuthHeaders(),
          params: { filters: { user: { id: { $eq: userId } } } },
        });

        const items = res.data?.data || [];
        const wishlistId = items[0]?.id;

        if (wishlistId) {
          await axios.put(
            `${API_URL}/api/wishlists/${wishlistId}`,
            { data: { products: [] } },
            { headers: getAuthHeaders() }
          );
        }
      }
    } catch (err) {
      console.error("Error clearing wishlist:", err);
    } finally {
      // ✅ always clear local state
      set({ wishlist: [], wishlistCount: 0 });
    }
  },
}));
