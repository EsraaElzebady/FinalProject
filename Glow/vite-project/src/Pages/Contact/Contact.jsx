import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ScrollToTopWithProgress from '../../Components/UI/ScrollProgressCircle';
import Breadcrumbs from '../../Components/UI/Breadcrumbs';

export default function Contact() {
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <>
    <Breadcrumbs />
    <div className="px-6 md:px-20 lg:px-20 py-10 md:py-20">
    
      <div className="text-center mx-auto mb-2 max-w-3xl">
        <h1 className="Head-page ">Keep In Touch with Us</h1>
        <p className="text-gray-600 mt-[-15px] mb-8">
          We're talking about clean beauty gift sets, of course - and we've got a bouquet of beauties for yourself or someone you love.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto p-4 py:0 md:p-10">
        <div className="flex gap-5 items-center justify-center text-center md:text-left">
          <div className="text-3xl  flex justify-start lg:justify-start md:justify-start w-10">
            <IoLocationOutline className=' text-[var(--primary-color)]' />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Address</h3>
            <p>3245 Abbot Kinney BLVD - PH Venice, CA 124</p>
            <p>76 East Houston Street New York City</p>
          </div>
        </div>

        <div className="flex gap-5 items-center justify-center text-center md:text-left">
          <div className="text-3xl flex justify-center md:justify-start w-10">
            <FiPhoneCall className=' text-[var(--primary-color)]' />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">
              Contact
              </h3>
            <p>
              <span className="font-medium">
              Mobile:
              </span> 
              068 26589 996</p>
            <p>
              <span className="font-medium">
                Hotline:
                </span> 
                1900 26886
                </p>
            <p>
              <span className="font-medium">
                E-mail:
                </span> 
                hello@grace.com
              </p>
          </div>
        </div>

        <div className="flex gap-5 items-center justify-center text-center md:text-left">
          <div className="text-3xl flex justify-center md:justify-start w-10">
            <CiClock2  className=' text-[var(--primary-color)]' />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Hour of Operation</h3>
            <p>
              <span className="font-medium">Mon - Fri:</span>
             08:30 - 20:00
             </p>
            <p>
              <span className="font-medium">Sat & Sun:</span>09:30 - 21:30
              </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[350px] sm:h-[450px] md:h-[500px] p-4 md:p-10 rounded-xl overflow-hidden">
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093743!2d144.9537363159048!3d-37.816279742021224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5778f9e3ed17ab9!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1616038161491!5m2!1sen!2sau"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>

      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Submitted:", values);
          resetForm();
        }}
      >
        
          <Form className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full sm:w-1/2">
                <Field type="text" name="name"
                  placeholder="Name"
                  className="bg-[#F5F5F5]  p-3 rounded focus:outline-none focus:ring focus:ring-gray-300"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/2">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-[#F5F5F5]  p-3 rounded focus:outline-none focus:ring focus:ring-gray-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col">
              <Field
                as="textarea"
                name="message"
                placeholder="Message"
                rows="5"
                className=" p-3 rounded bg-[#F5F5F5] focus:outline-none focus:ring focus:ring-gray-300"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white w-fit p-3 rounded hover:bg-[var(--primary-color)] mx-auto transition-colors"
            >
              Submit
            </button>
          </Form>
      
      </Formik>
    </div>
    <ScrollToTopWithProgress/>
    </>
  );
}
