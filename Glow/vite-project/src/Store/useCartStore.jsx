// // src/store/useCartStore.js
// import { create } from "zustand";
// import axios from "axios";
// import { getAuthHeaders, getUserId } from "./useWishlistStore";

// export const API_URL = "http://localhost:1337";

// export const useCartStore = create((set, get) => ({
//   cart: [],
//   loading: false,
//   cartCount: 0,

//   // ---------------------------
//   // Fetch cart for logged-in user
//   // ---------------------------


//   fetchCart: async () => {

//     set({ loading: true });
//     try {
//       const userId = getUserId();
//       if (!userId) {
//         set({ cart: [], cartCount: 0, loading: false });
//         return;
//       }

//       const res = await axios.get(`${API_URL}/api/carts`, {
//         headers: getAuthHeaders(),
//         params: {
//           filters: { users_permissions_user: { id: { $eq: userId } } },
//           populate: {
//             products: {
//               populate: ["product_image", "hoverimage", "VariantProduct"],
//             },
//           },
//         },
//       });

//       const items = res.data?.data || [];
//       const products = items[0]?.products || [];
//       res.data.data[0]?.id && console.log("💖 Wishlist ID:", res.data.data[0].id);
//       set({
//         cart: products,
//         cartCount: products.length,
//       });
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   addToCart: async (product) => {
//     try {
//       const userId = getUserId();
//       if (!userId) return;
  
//       // fetch user cart
//       const res = await axios.get(`${API_URL}/api/carts`, {
//         headers: getAuthHeaders(),
//         params: {
//           populate: ["products", "users_permissions_user"],
//           filters: { users_permissions_user: { id: { $eq: userId } } },
          
//         },
//       });
  
//       const items = res.data?.data || [];
//       const cartId = items[0]?.documentId;
//       if (!cartId) return;
  
//       // add product with variantIndex stored in cart item
//       await axios.put(
//         `${API_URL}/api/carts/${cartId}`,
//         {
//           data: {
//             products: {
//               connect: [
//                 {
//                   id: product.documentId,
//                   variantIndex: product.variantIndex,
//                 },
//               ],
//             },
//           },
//         },
//         { headers: getAuthHeaders() }
//       );
  
//       get().fetchCart();
//     } catch (err) {
//       console.error("Error adding to cart:", err.response?.data || err);
//     }
//   },
  
  
//   // ---------------------------
//   // Add product/variant to cart
//   // ---------------------------
//   // addToCart: async (product, quantity = 1) => {
//   //   try {
//   //     const userId = getUserId();
//   //     if (!userId) return;

//   //     const res = await axios.get(`${API_URL}/api/carts`, {
//   //       headers: getAuthHeaders(),
//   //       params: { populate: ["products", "users_permissions_user"],
//   //         filter : { users_permissions_user: { id: { $eq: userId } } }

//   //        },
//   //     });

//   //     const allCarts = res.data?.data || [];
//   //     const cartId = res.data?.data[0]?.documentId;
//   //     console.log("🛍 All carts from API:", allCarts, "Cart ID:", cartId);
//   //     let userCart = allCarts.find(
//   //       (c) => c.users_permissions_user.id === userId
//   //     );
//   //     console.log("🛒 Current cart for user ID", userId, ":", userCart);
//   //     // If user has no cart, create one
//   //     if (!userCart) {
//   //       console.log("🆕 Creating new cart for user ID:", userId);
//   //       const createRes = await axios.post(
//   //         `${API_URL}/api/carts`,
//   //         { data: { users_permissions_user: userId, products: [] } },
//   //         { headers: getAuthHeaders() }
//   //       );
//   //       userCart = createRes.data?.data;
//   //     }

//   //     // Check if product already in cart
//   //     const existingProduct = userCart.products.find(
//   //       (p) => p.id === product.id
//   //     );

//   //     if (existingProduct) {
//   //       console.log("➕ Incrementing quantity for product in cart:", product.id);
//   //       // Update quantity
//   //       await axios.put(
//   //         `${API_URL}/api/carts/${cartId}`,
//   //         {
//   //           data: {
//   //             products: {
//   //               update: [
//   //                 {
//   //                   id: existingProduct.id,
//   //                 },
//   //               ],
//   //             },
//   //           },
//   //         },
//   //         { headers: getAuthHeaders() }
//   //       );
//   //     } else {
//   //       console.log("➕ Adding new product to cart:", product.id);
//   //       // Add new product
//   //       await axios.put(
//   //         `${API_URL}/api/carts/${cartId}`,
//   //         { data: { products: { connect: [{ id: product.id, quantity }] } } },
//   //         { headers: getAuthHeaders() }
//   //       );
//   //     }

//   //     await get().fetchCart();
//   //   } catch (err) {
//   //     console.error("❌ Error adding to cart:", err.response?.data || err.message);
//   //   }
//   // },
//   // ---------------------------
//   // Remove product/variant from cart
//   // ---------------------------
//   removeFromCart: async (productId) => {
//     try {
//       const userId = getUserId();
//       if (!userId) return;

//       const res = await axios.get(`${API_URL}/api/carts`, {
//         headers: getAuthHeaders(),
//         params: { populate: ["products", "users_permissions_user"],
//            filters: { users_permissions_user: { id: { $eq: userId } } } },
//       });

//       const items = res.data?.data || [];
//       console.log("user cart:", items);
//       const cartId = items[0]?.documentId;
//       console.log("💖 Current wishlist ID:", cartId);
//       if (!cartId) return;

//       await axios.put(
//         `${API_URL}/api/carts/${cartId}`,
//         { data: { products: { disconnect: [productId] } } },
//         { headers: getAuthHeaders() }
//       );

//       get().fetchCart();
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//     }
//   },


//   // ---------------------------
//   // Clear cart locally (logout)
//   // ---------------------------
//   clearCart: () => set({ cart: [], cartCount: 0 }),
// }));
import { create } from "zustand";
import axios from "axios";
import { getAuthHeaders, getUserId } from "./useWishlistStore";

export const API_URL = "http://localhost:1337";

export const useCartStore = create((set, get) => ({
  cart: [],
  cartCount: 0,
  loading: false,


  fetchCart: async () => {
    set({ loading: true });
    try {
      const userId = getUserId();
      if (!userId) { set({ cart: [], cartCount: 0, loading: false }); return; }

      const res = await axios.get(`${API_URL}/api/carts`, {
        headers: getAuthHeaders(),
        params: {
          populate: ["cartItem"],
          filters: { users_permissions_user: { id: { $eq: userId } } },
        },
      });
      console.log("🛒 Fetched cart data:", res.data);
      const cartData = res.data?.data[0]?.cartItem || [];
      const normalized = cartData.map(p => ({
        productId: p.productId,
        variantIndex: p.variantIndex,
        quantity: p.quantity,
      }));

      set({ cart: normalized, cartCount: normalized.length });
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (productId, variantIndex, quantity = 1) => {
    try {
      const userId = getUserId();
      if (!userId) return;
  
      const res = await axios.get(`${API_URL}/api/carts`, {
        headers: getAuthHeaders(),
        params: {
          filters: { users_permissions_user: { id: { $eq: userId } } },
          populate: "cartItem",
        },
      });
  
      let cartId = res.data?.data[0]?.documentId;
      let existingProducts = res.data?.data[0]?.cartItem || [];
  
  
      const existingIndex = existingProducts.findIndex(
        (p) => p.productId === productId && p.variantIndex === variantIndex
      );
  
      if (existingIndex !== -1) {
        existingProducts[existingIndex].quantity += quantity;
      } else {
        existingProducts.push({
          productId,
          variantIndex,
          quantity,
        });
      }
  
      // 3. Build payload (🚫 no id here)
      const payloadItems = existingProducts.map((p) => ({
        productId: p.productId,
        variantIndex: p.variantIndex,
        quantity: p.quantity,
      }));
  
      console.log("📦 Payload being sent to Strapi:", payloadItems);
  
      // 4. Update or create cart
      if (cartId) {
        await axios.put(
          `${API_URL}/api/carts/${cartId}`,
          { data: { cartItem: payloadItems } },
          { headers: getAuthHeaders() }
        );
      } else {
        const createRes = await axios.post(
          `${API_URL}/api/carts`,
          { data: { users_permissions_user: userId, cartItem: payloadItems } },
          { headers: getAuthHeaders() }
        );
        cartId = createRes.data?.data?.documentId;
      }
  
      // 5. Refresh local store
      get().fetchCart();
    } catch (err) {
      console.error("❌ Error adding to cart:", err.response?.data || err);
    }
  },
  
  removeFromCart: async (productId, variantIndex) => {
    try {
      const userId = getUserId();
      if (!userId) return;
  
      // 1. Fetch existing cart
      const res = await axios.get(`${API_URL}/api/carts`, {
        headers: getAuthHeaders(),
        params: {
          filters: { users_permissions_user: { id: { $eq: userId } } },
          populate: "cartItem",
        },
      });
  
      const cartData = res.data?.data[0];
      if (!cartData) return;
  
      const cartId = cartData.documentId;
      let existingProducts = cartData.cartItem || [];
  
      console.log("🛒 Existing cart:", existingProducts);
  
      // 2. Remove the selected product
      existingProducts = existingProducts.filter(
        (p) => !(p.productId === productId && p.variantIndex === variantIndex)
      );
  
      // 3. Build payload
      const payloadItems = existingProducts.map((p) => ({
        productId: p.productId,
        variantIndex: p.variantIndex,
        quantity: p.quantity,
      }));
  
      // 4. Update cart
      await axios.put(
        `${API_URL}/api/carts/${cartId}`,
        { data: { cartItem: payloadItems } },
        { headers: getAuthHeaders() }
      );
  
      // 5. Refresh store
      get().fetchCart();
    } catch (err) {
      console.error("❌ Error removing from cart:", err.response?.data || err);
    }
  },
  
  clearCart: async () => {
    try {
      const userId = getUserId();
      if (!userId) return;
  
      // 1. Fetch existing cart
      const res = await axios.get(`${API_URL}/api/carts`, {
        headers: getAuthHeaders(),
        params: {
          filters: { users_permissions_user: { id: { $eq: userId } } },
          populate: "cartItem",
        },
      });
  
      const cartData = res.data?.data[0];
      if (!cartData) return;
  
      const cartId = cartData.documentId;
  
      // 2. Clear all products
      await axios.put(
        `${API_URL}/api/carts/${cartId}`,
        { data: { cartItem: [] } },
        { headers: getAuthHeaders() }
      );
  
      // 3. Update store
      set({ cart: [], cartCount: 0 });
    } catch (err) {
      console.error("❌ Error clearing cart:", err.response?.data || err);
    }
  },
}));  