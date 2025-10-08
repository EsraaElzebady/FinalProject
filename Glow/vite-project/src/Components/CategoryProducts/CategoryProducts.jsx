import axios from "axios";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
import FilterOffcanvas from "../../Components/FilterOffcanvas/FilterOffcanvas";
import Breadcrumbs from "../UI/Breadcrumbs";
import Pagination from "../UI/Pagination";
import ProductCard from "../ProductCard/ProductCard";

export default function CategoryProducts({ categoryName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid"); 

  const pageSize = 9;
  const API_URL = "http://localhost:1337";

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/products`, {
          params: {
            populate: ["product_image", "hoverimage", "VariantProduct", "categories"],
            filters: {
              categories: {
                categoryname: {
                  $eq: `${categoryName }`, 
                },
              },
            },
            pagination: {
              page: currentPage,
              pageSize: pageSize,
            },
          },
        });

        let items = res.data.data;
        console.log(items);

        items = items.sort((a, b) => {
          const nameA = a.attributes?.product_name?.toLowerCase() || "";
          const nameB = b.attributes?.product_name?.toLowerCase() || "";
          return sortOrder === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });

        setProducts(items);

        const total = res.data.meta?.pagination?.total || items.length;
        setPagesNumber(Math.ceil(total / pageSize));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [categoryName, currentPage, sortOrder]);
  return (
    <div className="min-h-screen   bg-white">
     <div className=" text-center bg-[#F5F5F5] ">
      <Breadcrumbs />   
     </div>
        <h1 className="text-center text-3xl pt-3 pb-1 font-semibold">{categoryName }</h1>
      <div className="container mx-auto  py-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2 text-black">
            <FilterOffcanvas />
            <p className="text-muted p-2">
              We found{" "}
              <span className="text-black font-semibold text-[18px]">
                {products.length}
              </span>{" "}
              products in <b>{categoryName}</b>.
            </p>
          </div>

          {/* 🔹 Actions (Grid/List Toggle + Sort Dropdown) */}
          <div className="flex gap-4 text-black">
            {/* Grid View Button */}
            <button onClick={() => setViewMode("grid")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
                <path d="M14 5h-8c0 0 0 0 0 0-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM13 13h-6v-6h6zM26 5h-8c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM25 13h-6v-6h6zM14 17h-8c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM13 25h-6v-6h6zM26 17h-8c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM25 25h-6v-6h6z"></path>
              </svg>
            </button>

            {/* List View Button */}
            <button onClick={() => setViewMode("list")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
                <path d="M28 16c0 0.552-0.448 1-1 1h-22c-0.552 0-1-0.448-1-1s0.448-1 1-1h22c0.552 0 1 0.448 1 1zM5 9h22c0.552 0 1-0.448 1-1s-0.448-1-1-1h-22c-0.552 0-1 0.448-1 1s0.448 1 1 1zM27 23h-22c-0.552 0-1 0.448-1 1s0.448 1 1 1h22c0.552 0 1-0.448 1-1z"></path>
              </svg>
            </button>

            <DropDownMenu setSortOrder={setSortOrder} />
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <ClipLoader color="gray-500" size={60} />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products in this category.</p>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid grid-rows-1 grid-cols-1 gap-6"
            }
          >
            {products.map((item) => {
              return (
        <ProductCard key={item.id} item={item} viewMode={viewMode} />
                
              );
            })}
          </div>
        )}

        {/* Pagination */}
 <Pagination  totalPages={pagesNumber} />
      </div>
    </div>
  );
}
