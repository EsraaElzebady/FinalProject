import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slugString } from "../../Store/Store";
import { useWishlistStore } from "../../Store/useWishlistStore";
import { useCartStore } from "../../Store/useCartStore";

export default function ProductDetails({ product, variants = [] }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist } = useWishlistStore();

  const [activeSize, setActiveSize] = useState(variants[0]?.size || null);
  const [activeColor, setActiveColor] = useState(variants[0]?.color?.toLowerCase() || null);
  const [activeScent, setActiveScent] = useState(variants[0]?.scent || null);
  const [activeBrand, setActiveBrand] = useState(variants[0]?.brand || null);
  const [quantity, setQuantity] = useState(1);

  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))];
  const colors = [...new Set(variants.map(v => v.color?.toLowerCase()).filter(Boolean))];
  const scents = [...new Set(variants.map(v => v.scent).filter(Boolean))];
  const brands = Array.from(
    new Map(variants.filter(v => v.brand).map(v => [v.brand.toLowerCase(), { name: v.brand, image: v.brand_image }])).values()
  );
  

  const selectedVariantIndex = variants.findIndex(v =>
    (!activeSize || v.size === activeSize) &&
    (!activeColor || v.color?.toLowerCase() === activeColor?.toLowerCase()) &&
    (!activeScent || v.scent === activeScent) &&
    (!activeBrand || v.brand === activeBrand)
  );

  const selectedVariant = variants[selectedVariantIndex];

  const handleAddToCart = () => {
    if (selectedVariantIndex === -1) return alert("Select a variant!");
    addToCart(product.documentId, selectedVariantIndex, quantity);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8">
      {/* Left: Images */}
      <div className="flex-1 flex flex-col items-center">
        {selectedVariant?.image ? (
          <img src={selectedVariant.image} alt={product.product_name} className="w-120 h-auto rounded-lg shadow" />
        ) : <p className="text-gray-400">No image available</p>}

        {/* Thumbnails */}
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          {Array.from(new Map(variants.filter(v => v.image).map(v => [v.image, v])).values())
            .map(v => (
              <button key={v.variantid} onClick={() => {
                setActiveSize(v.size || activeSize);
                setActiveColor(v.color?.toLowerCase() || activeColor);
                setActiveScent(v.scent || activeScent);
                setActiveBrand(v.brand || activeBrand);
              }}
                className={`w-20 h-20 border-2 rounded-md ${selectedVariant?.image === v.image ? "border-black scale-105" : "border-gray-300"}`}>
                <img src={v.image} alt={v.sku} className="w-full h-full object-contain rounded-md" />
              </button>
            ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1">
        <p className="text-xl font-semibold">{selectedVariant?.price || product.price}</p>
        <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size: {activeSize}</h3>
            <div className="flex gap-2">
              {sizes.map(size => (
                <button key={size} className={`px-4 py-2 border rounded ${activeSize === size ? "bg-black text-white" : "bg-white"}`} onClick={() => setActiveSize(size)}>{size}</button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color: {activeColor}</h3>
            <div className="flex gap-2">
              {colors.map(color => (
                <button key={color} style={{ backgroundColor: color }} className={`w-7 h-7 rounded-full border-2 ${activeColor === color ? "border-black scale-110" : "border-gray-300"}`} onClick={() => setActiveColor(color)} title={color} />
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border p-2 bg-gray-200 rounded">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-2xl">-</button>
            <span className="px-4 text-2xl">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-2xl">+</button>
          </div>
          <button onClick={handleAddToCart} className="flex-1 py-3 bg-black text-white rounded">Add to Cart</button>
        </div>

        <div className="w-full">
          <button onClick={() => addToWishlist(product.documentId)} className="w-full py-3 bg-black text-white hover:bg-[var(--primary-color)] rounded font-medium">Buy it now</button>
        </div>
      </div>
    </div>
  );
}
