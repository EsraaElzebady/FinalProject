// src/pages/Auth/LoginPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../Store/AuthStore";
import { useWishlistStore } from "../../Store/useWishlistStore";

export default function LoginPage() {
  const API_URL = "http://localhost:1337/api/auth/local";
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { fetchWishlist } = useWishlistStore();

  const from = location.state?.from?.pathname || "/"; // 👈 go back where user came from

  const initialValues = { identifier: "", password: "" };

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post(API_URL, {
        identifier: values.identifier,
        password: values.password,
      });

      // save JWT & user in auth store
      login(res.data);

      // ✅ fetch wishlist for this user right after login
      await fetchWishlist();
      

      // ✅ navigate back to intended page or fallback to "/"
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setErrors({ identifier: "Invalid email or password" });
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-20 bg-white font-[var(--font)]">
      {/* Wrapper */}
      <div className="flex gap-10 w-[900px]">
        {/* Left - Login */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6">Log In</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                {/* Email */}
                <div>
                  <Field
                    type="email"
                    name="identifier"
                    placeholder="Email"
                    className="w-full bg-[#F5F5F5] p-2 focus:outline-black rounded"
                  />
                  <ErrorMessage
                    name="identifier"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-[#F5F5F5] p-2 focus:outline-black rounded"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Forgot password */}
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Forgot your password?
                </Link>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--primary-color)] text-white py-3 rounded hover:bg-black transition"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right - New Customer */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">New Customer</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out, click unsubscribe in our emails.
          </p>
          <Link
            to="/register"
            className="bg-[var(--primary-color)] text-white px-6 py-2 rounded hover:bg-black transition inline-block"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
