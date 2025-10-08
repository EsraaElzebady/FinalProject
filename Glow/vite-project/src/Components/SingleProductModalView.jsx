import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// import { useWishlistStore } from "../Store/useWishlistStore";
import { useCartStore } from "../Store/useCartStore";
import { fetchData } from "../Store/fetchData";
import { slugString } from "../Store/Store";
import { normalizeVariants } from "../Store/Functions/getImageUrl";
import Loader from "./UI/Loader";

export default function SingleProductModalView({ product: propProduct }) {
  const { slug } = useParams(); // only used in page
  const [product, setProduct] = useState(propProduct || null);
  const [variants, setVariants] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [scents, setScents] = useState([]);
  const [brands, setBrands] = useState([]);
  const [collections, setCollections] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [activeScent, setActiveScent] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(!propProduct); // only load if no prop

  const addToCart = useCartStore((state) => state.addToCart);
//   const { addToWishlist } = useWishlistStore();

  useEffect(() => {
    if (propProduct) {
      // ✅ Already have product from props (modal)
      setupProduct(propProduct);
      return;
    }

    // ✅ Fallback: fetch by slug (page view)
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetchData("products", {
          populate: { product_image: true, VariantProduct: { populate: "*" }, categories: true },
          pagination: { page: 1, pageSize: 400 },
        });

        const data = res.data.find((p) => slugString(p.product_name) === slug);
        if (!data) { setProduct(null); return; }
        setupProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, propProduct]);

  const setupProduct = (data) => {
    setProduct(data);
    const restoredVariants = normalizeVariants(data?.VariantProduct || []);
    setVariants(restoredVariants);

    setCollections(data?.categories?.map(c => c.categoryname) || []);
    setVendor(data.vendor || null);

    setSizes([...new Set(restoredVariants.map(v => v.size).filter(Boolean))]);
    setColors([...new Set(restoredVariants.map(v => v.color?.toLowerCase()).filter(Boolean))]);
    setScents([...new Set(restoredVariants.map(v => v.scent).filter(Boolean))]);
    setBrands(Array.from(new Map(
      restoredVariants.filter(v => v.brand).map(v => [v.brand.toLowerCase(), { name: v.brand, image: v.brand_image }])
    ).values()));

    if (restoredVariants.length) {
      setActiveSize(restoredVariants[0].size || null);
      setActiveColor(restoredVariants[0].color?.toLowerCase() || null);
      setActiveScent(restoredVariants[0].scent || null);
      setActiveBrand(restoredVariants[0].brand || null);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <p>No product found</p>;

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
      {/* --- same UI you had before --- */}
      <div className="flex-1 flex flex-col items-center">
        {selectedVariant?.image ? (
          <img src={selectedVariant.image} alt={product.product_name} className="w-120 h-auto rounded-lg shadow" />
        ) : <p className="text-gray-400">No image available</p>}
      </div>

      <div className="flex-1">
        <p className="text-xl font-semibold">{selectedVariant?.price || product.price}</p>
        <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
        {/* ... sizes, colors, scents, brands ... */}
        <button onClick={handleAddToCart} className="py-3 bg-black text-white rounded w-full">Add to Cart</button>
      </div>
    </div>
  );
}
