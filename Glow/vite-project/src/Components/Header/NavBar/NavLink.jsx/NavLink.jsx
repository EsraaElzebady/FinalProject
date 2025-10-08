import { NavLink } from "react-router-dom";

export default function NavItem({ ref, linkText, className }) {
  return (
    <NavLink
      to={ref}
      className={({ isActive }) =>
        `text-[var(--navlink-color)] uppercase pb-[.5px] w-36 text-[13px] font-semibold hover:border-b-2 ${
          isActive ? "border-b-2" : ""
        } ${className}`
      }
    >
      {linkText}
    </NavLink>
  );
}
