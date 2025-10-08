// src/hooks/useCategoryProducts.js
import { useEffect, useState } from "react";
import axios from "axios";

export const API_URL = "http://localhost:1337";

export default function useCategoryProducts(categoryName, pageSize = 9) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/products`, {
          params: {
            populate: ["product_image", "hoverimage", "VariantProduct", "categories"],
            filters: {
              categories: {
                categoryname: { $eq: categoryName },
              },
            },
            pagination: { page: currentPage, pageSize },
            sort: [`name:${sortOrder}`],
          },
        });

        const items = res.data.data || [];
        const meta = res.data.meta?.pagination;

        setProducts(items);
        setPagesNumber(meta?.pageCount || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryName) getProducts();
  }, [categoryName, currentPage, pageSize, sortOrder]);

  return {
    isLoading,
    products,
    currentPage,
    setCurrentPage,
    pagesNumber,
    sortOrder,
    setSortOrder,
  };
}
