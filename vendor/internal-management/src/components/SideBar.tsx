import React from "react";
import { NavLink } from "react-router-dom";
import { tw } from "twind";

export default function SideBar() {
  return (
    <div className={tw`z-10 h-full w-[300px] max-w-full bg-white shadow`}>
      <nav className={tw`py-4`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? tw`block bg-[#f1f1f1] py-3 px-6 text-sm font-medium text-gray-800`
              : tw`block py-3 px-6 text-sm font-medium text-gray-600 hover:text-gray-800`
          }
        >
          Feature flags
        </NavLink>
      </nav>
    </div>
  );
}
