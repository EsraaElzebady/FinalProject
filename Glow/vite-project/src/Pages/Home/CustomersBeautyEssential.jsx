import React, { useEffect, useState } from "react";
import Button from "../../Components/UI/Button/Button";
import "./CustomersBeautyEssential.css";
import { getImageUrl } from "../../Store/Functions/getImageUrl";
import { fetchData } from "../../Store/fetchData";

export default function CustomersBeautyEssential() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchData("products", {
          populate: ["product_image", "hoverimage","VariantProduct"],
          pagination: { start: 0, limit: 6 },
        });
        console.log(res.data)
        if (res && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 p-30 sm:p-2 px-20 my-4">
      {/* LEFT HERO */}
      <div className="hero group lg:w-[550px] lg:h-[140vh] bg-cover sm:w-[200px] sm:h-[200px] relative">
        <div
          className="bg-zoom h-[140vh] bg-cover w-[550px] sm:w-[200px] sm:h-[200px]"
          style={{ backgroundImage: "url('/banner-21.webp')" }}
        />
        <div className="shine" />
        <div className="hero-content flex flex-col gap-3 absolute top-0 left-0 p-6">
          <h3 className="text-[32px] font-bold">Empower Yourself</h3>
          <p className="text-[16px] font-normal">Get the skin you want to feel</p>
          <Button
            buttonText="Explore More"
            linkTo="/shop"
            className="mt-4 px-5 py-3 w-fit text-gray-600 hover:text-white hover:bg-[var(--primary-color)] bg-white font-semibold text-md rounded"
          />
        </div>
      </div>
  
      {/* RIGHT PRODUCT GRID */}
      <div className=" flex  mt-7">
        <div className="grid grid-cols-3 grid-rows-2 text-center  h-fit  gap-6 w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden rounded-lg shadow-md bg-white"
            >
              <img
                src={getImageUrl(product.product_image)}
                alt={product.product_name}
                className="w-full h-[250px] object-cover transform transition-transform duration-500 hover:scale-110"
              />
              <div className="p-3 h-[120px] text-black">
                <h4 className="text-lg font-semibold">{product.product_name}</h4>
                <p className="text-sm">{product.totalprice} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}
