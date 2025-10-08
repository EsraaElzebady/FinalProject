import React, { useEffect } from "react";
import FilterOffcanvas from "../../Components/FilterOffcanvas/FilterOffcanvas";
import DropDownMenu from "../../Components/DropDownMenu/DropDownMenu";
import Pagination from "../../Components/UI/Pagination";
import { useLoadStore } from "../../Store/useLoadStore";
import { usePaginationStore } from "../../Store/Store";
import { setApiRes } from "../../Store/setApiRes";
import { fetchData } from "../../Store/fetchData";
import {
  extractColorFromVariant,
  getVariantArray,
  normalizeColor,
} from "../../Store/Functions/getImageUrl";
import { sortProducts } from "../../Store/Functions/sortProducts";
import ScrollToTopWithProgress from "../../Components/UI/ScrollProgressCircle";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loader from "../../Components/UI/Loader";

export default function ShopProducts() {
  const { isLoading, setIsLoading } = useLoadStore();
  const { currentPage } = usePaginationStore();
  const {
    products,
    setProducts,
    availableColors,
    setAvailableColors,
    selectedColor,
    setSelectedColor,
    pagesNumber,
    setPagesNumber,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode,
  } = setApiRes();

  const pageSize = 9;

  // Fetch paginated products
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetchData("products", {
          populate: ["product_image", "hoverimage", "VariantProduct"],
          pagination: { page: currentPage, pageSize },
        });
        let items = res.data;
        items = sortProducts(items, sortOrder);
        setProducts(items);
        const total = items.length;
        setPagesNumber(Math.ceil(total / pageSize));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [currentPage, setIsLoading, setPagesNumber, setProducts, sortOrder]);

  // Fetch all colors for filter
  useEffect(() => {
    const getAllColors = async () => {
      try {
        const res = await fetchData("products", {
          populate: ["VariantProduct"],
          pagination: { page: 1, pageSize: 1000 },
        });
        const items = res.data || [];
        const colorSet = new Set();

        items.forEach((p) => {
          const variants = getVariantArray(p);
          variants.forEach((v) => {
            const color = extractColorFromVariant(v);
            if (color) colorSet.add(color);
          });
        });
        console.log(colorSet)
        const colorObjs = Array.from(colorSet).map((label) => ({
          label,
          value: normalizeColor(label),
        }));

        setAvailableColors(colorObjs);
      } catch (err) {
        console.error("Error fetching colors:", err);
      }
    };
    getAllColors();
  }, [setAvailableColors]);

  // Filtered products
  const filteredProducts = selectedColor
    ? products.filter((p) =>
        getVariantArray(p).some(
          (v) => extractColorFromVariant(v) === selectedColor
        )
      )
    : products;

  return (
    <div className="min-h-screen relative bg-white">
      <div className=" mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex gap-2 items-center">
            <FilterOffcanvas
              colors={availableColors}
              onColorSelect={(selected) =>
                setSelectedColor(selected )
              }
            />
            <p className="text-muted p-2">
              We found{" "}
              <span className="text-black font-semibold text-[18px]">
                {filteredProducts.length}
              </span>{" "}
              products available for you.
            </p>
          </div>

          <div className="flex gap-4 text-black">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 hover:opacity-100 ${
                viewMode === "grid" ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* grid icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
                <path d="M14 5h-8c0 0 0 0 0 0-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM13 13h-6v-6h6zM26 5h-8c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM25 13h-6v-6h6zM14 17h-8c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM13 25h-6v-6h6zM26 17h-8c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h8c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1zM25 25h-6v-6h6z"></path>
              </svg>
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-1 hover:opacity-100 ${
                viewMode === "list" ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* list icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32">
                <path d="M28 16c0 0.552-0.448 1-1 1h-22c-0.552 0-1-0.448-1-1s0.448-1 1-1h22c0.552 0 1 0.448 1 1zM5 9h22c0.552 0 1-0.448 1-1s-0.448-1-1-1h-22c-0.552 0-1 0.448-1 1s0.448 1 1 1zM27 23h-22c-0.552 0-1 0.448-1 1s0.448 1 1 1h22c0.552 0 1-0.448 1-1z"></path>
              </svg>
            </button>

            <DropDownMenu setSortOrder={setSortOrder} />
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid grid-rows-1 grid-cols-1 gap-6"
            }
          >
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination totalPages={pagesNumber} />
      </div>

      <ScrollToTopWithProgress />
    </div>
  );
}
