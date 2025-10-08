import React, { useEffect, useState } from "react";
import { useCartStore } from "../../Store/useCartStore";
import { Link } from "react-router";
import { getImageUrl } from "../../Store/Functions/getImageUrl";
import ScrollToTopWithProgress from "../../Components/UI/ScrollProgressCircle";
import Forms from "./Forms.jSX";
import { fetchData } from "../../Store/fetchData";
import ShippingProgress from "./ShippingProgress";
import Breadcrumbs from "../../Components/UI/Breadcrumbs";


export default function CartPage() {
  const { cart , removeFromCart } = useCartStore();
  const [productsData, setProductsData] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = [];
        for (let docId of cart.map(i => i.productId)) {
          const res = await fetchData(`products`, {
              filters: { documentId: { $eq: docId } },
              populate: {
                VariantProduct: {
                  populate: ["product_img"]  
                }}
          });
          if (res.data.length > 0) products.push(res.data[0]);
          console.log(res.data ,"nnnnnnnnnnnnn");
        }
        setProductsData(products);
        console.log(products);
        cart.forEach(item => {
          console.log(item.productId, item.variantIndex);
        });
        
        products.forEach(p => {
          console.log(p.VariantProduct);
        }); 
        

      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    
  
    fetchProducts();
  }, [cart]);
  
  const subtotal = cart.reduce((sum, item) => {
    const product = productsData.find(p => p.documentId === item.productId);
    if (!product) return sum;
    const variant = product.VariantProduct[item.variantIndex];
    const price = parseFloat(variant.price?.replace(/[^0-9.]/g, ""));
    return sum + price * (item.quantity || 1);
  }, 0).toFixed(2);
  if (!cart.length) return (<div className="p-10 py-30">
    <h1 className="  Head-page">Cart</h1>
    <div className="flex flex-col justify-center items-center gap-2">
      <p>your cart is empty ! visit shop</p>
      <Link to="/shop" className="bg-black w-fit text-white rounde-md p-5 py-3">
       Browse products
       </Link>
    </div>
  </div>);
  return (
    <>
    <Breadcrumbs /> 
    <div className="p-20">
      <h1 className="  Head-page">Cart</h1>
      <div className="lg:block md:hidden sm hidden">
      <ShippingProgress subtotal={subtotal}/>
      </div>
      <div className="uppercase hidden justify-between text-[15px] lg:flex   sm:hidden xsm:hidden md:hidden p-2 bg-[#F5F5F5] ">
        <h2 className="text-center ps-10">product</h2>
         <h2>quantity</h2>
         <h2 className="text-semibold pe-20 px-[15px]"> price</h2>
      </div>
      {cart.map((item) => {
        const product = productsData.find(p => p.documentId === item.productId);
        if (!product) return null;
        const variant = product.VariantProduct[item.variantIndex];
        return (
          <div key={item.productId } className=" w-full border-[.9px]  lg:mb-0  sm:mb-2 border-[#F5F5F5] p-4  flex justify-between">
            <div className="flex w-full lg:w-full justify-between md:w-fit lg:mb-0 sm:mb-2  sm:w-fit sm:flex-wrap flex-wrap items-center"> 
            <div className="flex flex-col gap-2 w-70 md:flex-row sm:flex-row">
                  <img
                    src={getImageUrl(variant?.product_img)}
                    className="w-[110px] h-[120px] ps-3 object-cover rounded"
                    alt={product?.product_name}
                  />
                  <div className="flex flex-col justify-start p-3 ">
                    <h3 className="font-semibold">{product?.product_name}</h3>
                    {variant.color && <p className="text-sm capitalize text-gray-500"> color: {variant?.color} </p>}
                    {variant.Product_size && <span className="text-sm capitalize text-gray-500"> size: {variant?.Product_size} </span>}
                    {variant.scent && <span className="text-sm capitalize text-gray-500"> scent: {variant?.scent} </span>}
                  </div>

                </div>
              <div  className="w-50 lg:flex md:hidden "> 
                <p>{item?.quantity}</p> 
              </div>
            
                <div className="flex gap-10">
                <div className=" lg:pe-3  md:px-10">
                <p>{variant.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.productId, item.variantIndex)}>x</button>
                </div>


            </div>
            
          </div>
        );
      })}
      <div className="mt-10">

       <Forms />
      
      </div>

<div>
  <div className="flex justify-between p-5  mt-20 shadow-lg">
    <p className="text-lg font-medium">
      Subtotal: 
      </p>
      <p>
${subtotal}
    </p>
</div>
</div>

      <ScrollToTopWithProgress />


    </div>
    </>
  );
}
