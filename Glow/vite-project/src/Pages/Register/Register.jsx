import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Store/AuthStore";

export default function Register() {
  const API_URL = "http://localhost:1337/api/auth/local/register";
  const navigate = useNavigate();
  const { login } = useAuth(); 

  return (
    <div className="flex font-[var(--font)] gap-15 justify-center py-30">
      <div>
        <h5 className="text-center mb-7 text-3xl">Register</h5>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().min(3).required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6).required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await axios.post(API_URL, {
                username: values.username || values.firstName,
                email: values.email,
                password: values.password,
              });

              // ✅ Save to Zustand (user + jwt)
              login(res.data);

              // Redirect after register
              navigate("/");

              resetForm();
            } catch (err) {
              console.error("Registration failed:", err.response?.data || err);
              alert("Registration failed. Try another email.");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form flex flex-col gap-3">
              {/* First + Last Name */}
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="p-2 w-100 mb-5 bg-[#F5F5F5] input-field"
              />
              <ErrorMessage name="firstName" component="div" className="error" />

              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="p-2 w-100 mb-5 bg-[#F5F5F5] input-field"
              />
              <ErrorMessage name="lastName" component="div" className="error" />

              {/* Username */}
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="p-2 w-100 mb-5 bg-[#F5F5F5] input-field"
              />
              <ErrorMessage name="username" component="div" className="error" />

              {/* Email */}
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="p-2 w-100 mb-5 bg-[#F5F5F5] input-field"
              />
              <ErrorMessage name="email" component="div" className="error" />

              {/* Password */}
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 w-100 mb-5 bg-[#F5F5F5] input-field"
              />
              <ErrorMessage name="password" component="div" className="error" />

              {/* Info text */}
              <p className="w-100 mb-2 p-1 text-[14px] text-[var(--primary-color)]">
                Sign up for early Sale access plus tailored new arrivals, trends
                and promotions. To opt out, click unsubscribe in our emails.
              </p>

              {/* Register button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn cursor-pointer font-semibold text-[14px] text-white hover:bg-[black] p-3 w-full rounded bg-[var(--primary-color)] capitalize"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              {/* Login link */}
              <a
                href="/login"
                className="btn-outline-[var(--primary-color)] border-2 mt-3 cursor-pointer font-semibold text-[14px] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white p-3 w-full rounded capitalize text-center block"
              >
                Log In
              </a>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
