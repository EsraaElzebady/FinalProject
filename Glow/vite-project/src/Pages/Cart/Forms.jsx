import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router';
import { useCartStore } from '../../Store/useCartStore';

export default function Forms() {
 const {clearCart} = useCartStore();
    return (
    <Formik
    className ="mt-5 "
      initialValues={{ cobon: '' }}
      onSubmit={(values) => {
        console.log('Coupon submitted:', values.cobon);
      }}
    >
      <Form className="flex gap-2 justify-between items-center">
        <div className='flex  gap-5'>
        <Field
          type="text"
          name="cobon"
          placeholder="Enter discount code here"
          className="bg-[#F5F5F5] p-3 px-4 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="text-center p-2 text-white bg-black px-5 font-semibold rounded hover:bg-[var(--primary-color)] transition"
        >
          Save Coupon
        </button>
        </div>
        <div className='flex gap-5'>
            <Link className="text-black border-black hover:bg-black p-5  py-3  bg-white tex-black hover:text-white ">
                Continue Shopping
            </Link>
            <button className='border-b-1  border-b-black ' onClick={()=>clearCart()}>

        
                Clear Shopping Cart
                </button>
        
        </div>
      </Form>
    </Formik>
  );
}
