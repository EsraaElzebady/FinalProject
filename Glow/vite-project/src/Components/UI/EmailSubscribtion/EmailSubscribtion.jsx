import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function EmailSubscription() {
  const [submittedEmail, setSubmittedEmail] = useState("");

  return (
    <div className="flex flex-col items-start justify-center lg:w-140 sm:w-20 md:w-full sm:px-4 lg:px-1 font-[var(--font)] lg:pe-7 lg:mb-11">
      <h5 className="text-5xl font-normal text-center mt-2 mb-4">
        Good emails.
      </h5>
      <p className="lg:w-125 xl:w-125 2xl:w-125 sm:w-fit  text-[var(--footer-links-color)] font-[var(--font)] mb-10">
        Enter your email below to be the first to know about new collections and product launches.
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
           
        })}
        onSubmit={(values, { resetForm }) => {
          setSubmittedEmail(values.email); 
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full sm:p-2 lg:p-0 ">
            <div className="flex items-center ">
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-grow focus:bg-[#E8F0FE] border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black  text-white px-4 py-[10px] rounded hover:bg-[var(--primary-color)] transition"
              >
                Subscribe
              </button>
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </Form>
        )}
      </Formik>

      {submittedEmail && (
        <p className="mt-4 bg-[#D1E7DD]  border-1 border-[var(--primary-color)] text-[var(--primary-color)] p-2 w-full font-[var(--font)] text-[12px] text-center ">
          Thanks for subscribing, <span className="font-bold">{submittedEmail}</span>!
        </p>
      )}
    </div>
  );
}
