import { Field, ErrorMessage } from "formik";
import { Link } from "react-router";

export default function Contact() {
  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h3 className="font-semibold text-[20px] mb-1">Contact</h3>
        <Link to="/signin" className="text-[14px] text-blue-500 underline">
          Sign in
        </Link>
      </div>

      <div className="mb-2">
        <Field
          id="contact"
          name="contact"
          type="text"
          placeholder="Enter email or phone"
          className="border-[.5px] placeholder:text-muted border-[#DEDEDE] rounded px-3 py-2 w-full"
        />
        <ErrorMessage
          name="contact"
          component="div"
          className="text-red-500 text-sm mt-1"
        >This feild is required</ErrorMessage>
      </div>

      {/* Checkbox */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <Field type="checkbox" name="checked" />
          <span>Email me with news and offers</span>
        </label>
      </div>
    </div>
  );
}
