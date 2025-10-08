
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartStore } from "../../Store/useCartStore";
import {  slugString } from "../../Store/Store";
import { fetchData } from "../../Store/fetchData";
import { extractVariantOptions, normalizeVariants } from "../../Store/Functions/getImageUrl";
import Loader from "../../Components/UI/Loader";
import SelectedOptions from "../../Components/SelectedOptions";
import CheckoutForm from "../Home/Checkout/CheckoutForm.JSX";
import ProductStatusBadge from "../../Components/UI/ProductStatusBadge";

export default function SingleProductShop() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
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
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetchData("products", {
          populate: { product_image: true, VariantProduct: { populate: "*" }, categories: true },
          pagination: { page: 1, pageSize: 400 },
        });
        console.log(res.data)

        const data = res.data.find((p) => slugString(p.product_name) === slug);

        setProduct(data);
        const restoredVariants = normalizeVariants(data?.VariantProduct || []);
        setVariants(restoredVariants);

        setCollections(data?.categories?.map(c => c.categoryname) || []);
        setVendor(data.vendor || null);

        const {sizes ,colors , brands ,scents ,defaults } = extractVariantOptions(restoredVariants);
        setSizes(sizes);
        setColors(colors);
        setBrands(brands);
        setScents(scents);
        setActiveSize(defaults.size);
        setActiveColor(defaults.color);
        setActiveScent(defaults.scent);
        setActiveBrand(defaults.brand);

//make default selected options 
     
   
      } catch (err) { console.error("Error fetching product:", err); }
      finally { setLoading(false); }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <Loader />;
  if (!product) return <p>No product found</p>;

  const selectedVariantIndex = variants.findIndex(v =>
    (!activeSize || v.size === activeSize) &&
    (!activeColor || v.color?.toLowerCase() === activeColor?.toLowerCase()) &&
    (!activeScent || v.scent === activeScent) &&
    (!activeBrand || v.brand === activeBrand)
  );

  const selectedVariant = variants[selectedVariantIndex];

  // const handleAddToCart = () => {
  //   if (selectedVariantIndex === -1) return alert("Select a variant!");
  //   addToCart(product.documentId, selectedVariantIndex, quantity);
  // };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8">
      <div className="flex-1 flex flex-col items-center">
        {selectedVariant?.image ? (
          <img src={selectedVariant.image} alt={product.product_name} className="w-120 h-auto rounded-lg shadow" />
        ) : <p className="text-gray-400">No image available</p>}

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

      <div className="flex-1">
        {product.deletedprice && <del className="line-throught text-muted text-[15px] space-x-5 font-bold"> {product.deletedprice}</del>}
        <span className="text-xl font-semibold ">{selectedVariant?.price}</span>
          {product.product_status && <ProductStatusBadge status={product.product_status} />}
        <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>

        <SelectedOptions options ={sizes} setoption = {setActiveSize} activeOption ={activeSize}  text="size : "/>

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

        {/* Scents */}
        {/* {scents.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Scent: {activeScent}</h3>
            <div className="flex gap-2">
              {scents.map(scent => (
                <button key={scent} className={`px-4 py-2 border rounded ${activeScent === scent ? "bg-black text-white" : "bg-white"}`} onClick={() => setActiveScent(scent)}>{scent}</button>
              ))}
            </div>
          </div>
        )} */}
                <SelectedOptions options ={scents} setoption = {setActiveScent} activeOption ={activeScent}  text="scent : "/>


        {/* Brands */}
        {brands.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Brand: {activeBrand}</h3>
            <div className="flex gap-3">
              {brands.map(b => (
                <button key={b.name} className={`p-1 border rounded ${activeBrand === b.name ? "border-black scale-110" : "border-gray-300"}`} onClick={() => setActiveBrand(b.name)}>
                  {b.image ? <img src={b.image} alt={b.name} className="w-16 h-16 object-contain" /> : <span>{b.name}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

    
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border p-2 bg-gray-200 rounded">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-2xl">-</button>
            <span className="px-4 text-2xl">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-2xl">+</button>
          </div>
          <button onClick={()=> addToCart(product.documentId, selectedVariantIndex, quantity)} className="flex-1 hover:text-white  py-3 bg-white border-[.5px] border-black hover:bg-black text-black rounded">Add to Cart</button>
        </div>

        <Link
              to="/checkout"
              state={{
                productId: product.documentId,
                quantity: quantity,
                selectedVariant: product.VariantProduct[selectedVariantIndex],
              }}
              className="block w-full"
            >
              <div className="py-3 bg-black text-center w-full text-white hover:bg-[var(--primary-color)] rounded font-medium">
                Buy it now
              </div>
            </Link>


        {vendor && <p className="my-5">Vendor: {vendor}</p>}

        {collections.length > 0 && (
          <p className="my-5">Collections: {collections.map(c => <span key={c}><Link to={`/${c.toLowerCase().replace(/\s+/g ,"")}`}>{c}</Link>, </span>)}</p>
        )}
        {selectedVariant.stock> 0 ? <p>Availabitiy : in stock </p>: <p>Ava :out of stock</p>}

        {selectedVariant?.sku && <p>SKU: {selectedVariant.sku}</p>}
      </div>
    </div>
  );
}
