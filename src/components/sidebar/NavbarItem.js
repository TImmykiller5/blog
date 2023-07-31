import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function NavbarItem({ icon, sizes, User, size, text }) {
  return (
    <div>
      <button className={`navbarItem  transition-all nav-item-i my-2  ${sizes? 'h-10 w-12': 'h-14 w-14'}  mx-0.5  flex items-center justify-center p-2 rounded-full hover:rounded  ease-in-out duration-150 `}>
        {icon ? (
          <img width={size? size : 27} className={`${text} my-1`} src={icon} />
        ) : (
          <div className={`${size? size : 'text-3xl'}`} style={{ color: "#6EEB83" }}>
            {User}
          </div>
        )}

        {/* <span>{text}</span> */}
      </button>
    </div>
  );
}

export default NavbarItem;
