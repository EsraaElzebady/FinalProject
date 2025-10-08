import {  Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import Contact from "./contact";
import Ship from "./Ship";
import { fetchData } from "../../../Store/fetchData";
import { useLocation } from "react-router";
import { getImageUrl } from "../../../Store/Functions/getImageUrl";
import Badge from "../../../Components/Header/NavBar/Badge";
import { estimatedTaxes } from "../../../Data/Data";

const validationSchema = Yup.object({
  contact: Yup.string()
    .required("Email or phone is required")
});

export default function CheckoutForm() {
 
    const [ product, setProduct] = useState()
    const [setLoading]= useState(false)
    const { state } = useLocation();
    const { productId, quantity, selectedVariant } = state || {}; 
  console.log(selectedVariant)
    const [active, setActive] = useState("ship"); 
   const variantPrice = parseFloat(selectedVariant.price.replace("$", ""));

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const res = await fetchData("products", {
            populate: { product_image: true, VariantProduct: { populate: "*" }, categories: true },
            filters: { documentId: { $eq: productId } }
          });
          console.log(res.data, "checkeddata");
          setProduct(res.data[0]);
        } catch (err) { 
          console.error("Error fetching product:", err); 
        } finally { 
          setLoading(false); 
        }
      };
  
      if (productId) fetchProduct();
    }, [productId, setLoading]);


  return (
    <div className='flex w-full '> 
           <div className="lg:w-[50%] border-[#DEDEDE]     ps-50 border bg-white sm:w-full p-6">
      <Formik
        initialValues={{ contact: "", checked: false }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted values:", values);
        }}
      >
        {() => (
          <Form>
          <Contact />

            
            

            <div className="mb-2">
            <div className="space-y-6">
      <h3 className="font-semibold text-[20px] capitalize"> delivery</h3>

      <div className="flex  flex-col">
        
        <button
          onClick={() => setActive("ship")}
          className={`flex items-center justify-between gap-2 w-100 px-4 py-2 rounded border ${
            active === "ship"
                 ? " border-[.5px] placeholder:text-muted  border-blue-500  "
              : "border-[.5px] placeholder:text-text-muted border-[#DEDEDE]"
          }`}
        >
            <div className="flex gap-2 text-center ">
            <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              active === "ship" 
              ? "border-blue-500 bg-blue-500" : "border-gray-400"
            }`}
          >
            {active === "ship" && (
              <span className="w-2 h-2 bg-white rounded-full" />
            )}
          </span>
          <span>ship</span>
                </div>
      
          <div> <LiaShippingFastSolid />
          </div>
        </button>

        {/* Option 2 Button */}
        <button
          onClick={() => setActive("pickup")}
          className={`flex items-center justify-between gap-2 w-100 px-4 py-2 rounded border ${
            active === "pickup"
              ? " border-[.5px] placeholder:text-[#DEDEDE] border-blue-500  "
              : "border-[.5px] placeholder:text-[#DEDEDE] border-[#DEDEDE]"
          }`}
        >
            <div className="flex gap-2 text-center ">
            <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              active === "pickup" ? "border-blue-500 bg-blue-500" : "border-gray-400"
            }`}
          >
            {active === "pickup" && (
              <span className="w-2 h-2 bg-white rounded-full" />
            )}
          </span>
          <span>pickup</span>
                </div>
      
          <div> <LiaShippingFastSolid />
          </div>
        </button>
      </div>

      {/* Dynamic content based on choice */}
      <div className="">
        {active === "ship" ? 
        <Ship />
 : (
<p>
  option error
  </p>        )}
      </div>
    </div>
             
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    <div className="bg-[#F5F5F5] w-full sticky  text-sans px-30 py-10" >
        <div className="flex w-full   justify-between mb-5">
            <div className="flex gap-7 justify-center items-center  ">
                <div className="relative shadow-md border-white rounded-md px-3 border-1  text-black ">
                    <img src={getImageUrl(selectedVariant.product_img)} className="   w-[60px] h-[80px] "   />
                    <Badge count={quantity} className={`top-[-7px] right-[-7px] font-bold w-[20px] absolute rounded-md  h-[20px]`}></Badge> 
                </div>
                <div className="felx flex-col">
                  <p className="text-[17px] font-sans ">{product?.product_name}</p>
                  <p className="text-muted capitalize font-sans text-[14px]">{selectedVariant.color} </p>
                </div>
            </div>
            <div >
              <p>$ {variantPrice * quantity} </p>

            </div>
        </div>
        <div className="flex w-full justify-between mb-3">
          <p>subtotal</p>
          <p className="text-[16px]"> $ {variantPrice * quantity} </p>

        </div>
        <div className="flex w-full justify-between mb-3">
          <p>Shipping</p>
          { active == 'ship' ?
                    <p className="text-[16px]"> Free </p>
                    : 
                    <p>Enter shipping address</p>

          }


        </div>
        <div className="flex w-full justify-between mb-3">
          <p className="capitalize">Estimated Taxes</p>
          { active == 'ship' ?
                    <p className="text-[16px]"> ${estimatedTaxes} </p>
                    : 
                    <p>${estimatedTaxes}</p>

          }
          

        </div>
        <div className="flex w-full justify-between mb-3">
          <p className="capitalize text-bold" >Total</p>
          <p> <span className="text-muted uppercase text-sm"> usd</span> ${(variantPrice * quantity) + estimatedTaxes }</p>

          
          

        </div>
      

    </div>

    </div>

  );
}
