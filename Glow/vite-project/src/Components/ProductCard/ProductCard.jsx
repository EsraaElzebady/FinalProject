import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../Store/Functions/getImageUrl";
import { slugString } from "../../Store/Store";
import ProductStatusBadge from "../UI/ProductStatusBadge";
import { FiEye } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { MdCompareArrows } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { useWishlistStore } from "../../Store/useWishlistStore";
import Modal from "../UI/Modal";
import SingleProductShop from "../../Pages/Shop/SingleProductShop";
import SingleProductModalView from "../SingleProductModalView";
export default function ProductCard({ item, viewMode }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const product = item.attributes || item;
  const [showModal ,setShowModal]= useState(false)

  const isInWishlist = wishlist?.some((w) => w.documentId === product.documentId);

  const toggleWishlist = (e) => {
    e.preventDefault(); 
    if (isInWishlist) {
      removeFromWishlist(product.documentId);
    } else {
      addToWishlist(product.documentId);
    }
  };

  return (
    <>
    <Link
      key={item.id}
      to={`/shop/${slugString(product.product_name)}`}
      className={`block bg-white  overflow-hidden transition ${
        viewMode === "list" ? "flex items-center w-full" : "text-center pb-6"
      }`}
    >
      <div
        className={`relative group h-contain ${
          viewMode === "list" ? "w-40 h-40" : "w-full h-100"
        } bg-no-repeat bg-contain`}
        style={{
          backgroundImage: `url(${getImageUrl(product.product_image)})`,
        }}
        onMouseEnter={(e)=>{
          if (product.hoverimage) {
            e.currentTarget.style.backgroundImage = `url(${getImageUrl(product.hoverimage)})`;
          }

        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.backgroundImage = `url(${getImageUrl(product.product_image)})`;
        }}
      >
        {product.product_status && <ProductStatusBadge status={product.product_status} />}

        {/* Hover icons */}
        <div
          className={`absolute left-0 bottom-8 z-20 ${
            viewMode === "list" ? "hidden" : "flex"
          } opacity-0 w-full justify-center gap-6 flex transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out`}
        >
          <div
            style={{ "--animate-duration": "2s", "--animate-delay": "0.5s" }}
            className="cursor-pointer animate__animated animate__fadeInUp"
          >
            <GrCart className="w-8 h-8 p-1 text-[20px] bg-white rounded-full text-black/80 hover:bg-black hover:text-white transition-all" />
          </div>

          <button         onClick={(e) =>{
            e.preventDefault();
             setShowModal(true);
             }}>
          <div
            style={{ "--animate-duration": "2s", "--animate-delay": "1s" }}
            className="cursor-pointer animate__animated animate__fadeInUp"
          >
            <FiEye className="w-8 h-8 p-1 text-[20px] bg-white rounded-full text-black/80 hover:bg-black hover:text-white transition-all" />
          </div>
          </button>
      

          <button onClick={toggleWishlist}>
            <div
              style={{ "--animate-duration": "2s", "--animate-delay": "1.5s" }}
              className="cursor-pointer animate__animated animate__fadeInUp"
            >
              <FaRegStar
                className={`w-8 h-8 p-1 text-[20px] rounded-full transition-all ${
                  isInWishlist
                    ? "bg-black text-white"
                    : "bg-white text-black/80 hover:bg-black hover:text-white"
                }`}
              />
            </div>
          </button>

          <div
            style={{ "--animate-duration": "2s", "--animate-delay": "2s" }}
            className="cursor-pointer animate__animated animate__fadeInUp"
          >
            <MdCompareArrows className="w-8 h-8 p-1 text-[20px] bg-white rounded-full text-black/80 hover:bg-black hover:text-white transition-all" />
          </div>
        </div>
      </div>

      <div className={`${viewMode === "list" ? "w-2/3" : "p-2"}`}>
      {product.deletedprice && <span className="line-through pe-2 text-gray-500  text-[14px]">{product.deletedprice }</span>}
                            <span className="product-price  text-[15px] font-semibold">{product.totalprice }</span>
                            <h3 className="product-name font-semibold text-[16px] ">{product.product_name}</h3>
      </div>
    </Link>
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
<SingleProductModalView product={product } />    
    <button
      onClick={() => setShowModal(false)}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Close
    </button>
  </Modal>
    </>
  );
}
