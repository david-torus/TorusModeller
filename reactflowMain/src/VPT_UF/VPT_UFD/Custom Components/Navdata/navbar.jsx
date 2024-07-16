import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import Logbutton from "./button";

const NavigationBar = () => {
  const navBarItem = ["Home", "ContactUs", "About us", "Services", "More"];

  return (
    <React.Fragment>
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "100%" }}
      >
        <Navbar
          style={{ height: "100%" }}
          className="flex justify-center items-center bg-[#3769BB] rounded-md shadow-lg shadow-indigo-500/50"
        >
          <NavbarBrand className="text-white font-bold">
            <span>L O G O</span>
          </NavbarBrand>
          <NavbarContent className="flex justify-center items-center">
            {navBarItem && navBarItem.length > 0 && navBarItem.map((item) => (
              <NavbarItem className="list-none flex justify-center items-center">
                <Link className="px-2 py-5 text-white font-semibold" href="#">
                  {item}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <div className="profile_tag">
            <div className="flex justify-center items-center">
              <Logbutton />
            </div>
          </div>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default NavigationBar;
