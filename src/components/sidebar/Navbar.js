import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import { logout } from "../../redux/actions/userActions";
import { NavLink } from "react-router-dom";

function Navbar() {
  const user = useSelector((state) => state.userLogin.user);
  const userInit = user?.username[0]?.toUpperCase();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="nav-outer-cont nav ">
      <div className="nav-top ">
      
        <NavLink to={"/profile"}>
          <div className="nav-user nav-item  p-1.5">
            <div>
              {userInit?<NavbarItem User={userInit}/> : <NavbarItem icon="/images/user.svg" text="login"/> }
            </div>
          </div>
        </NavLink>
        <NavLink to={"/"}>
        <div className="nav-item p-1.5">
          <NavbarItem size="60"  icon="/images/home.svg" text="home" />
        </div>
        </NavLink>
        <div className="nav-item p-1.5">
          <NavbarItem icon="/images/search.svg" text="search" />
        </div>
        <div className="nav-item nav-trending p-1.5">
          <NavbarItem icon="/images/trending.svg"  text="trending" />
        </div>
        <NavLink to={"/newpost"}>
        <div className="nav-item p-1.5">
          <NavbarItem  icon="/images/create.svg" text="create" />
        </div>
        </NavLink>
      </div>
      
      <div className="nav-bottom">
        <div onClick={logoutHandler} className="nav-item p-1.5">
          <NavbarItem icon="/images/exit.svg" text="logout" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
