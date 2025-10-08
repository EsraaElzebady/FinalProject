// src/pages/WishlistPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../Store/useWishlistStore";
import Loader from "../Components/UI/Loader";
import ProductCard from "../Components/ProductCard/ProductCard";
import Breadcrumbs from "../Components/UI/Breadcrumbs";

const API_URL = "http://localhost:1337"; // change if deployed

export default function Wishlist() {
  const {
    wishlist,
    fetchWishlist,
    loading,
  } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
     <Loader/>
      </div>
    );
  }

  // empty state
  if (!wishlist || wishlist.length === 0) {
    return (

      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <Link
          to="/shop"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // wishlist content
  return (
    <>
    <Breadcrumbs />
    
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h3 className="Head-page">wishlist</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {wishlist.map((item) => {
     

          return (
        <ProductCard item={item} viewMode="grid" />
          );
        })}
      </div>
    </div>
    </>
  );
}
