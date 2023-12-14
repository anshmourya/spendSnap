"use client";
import React, { useMemo, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import { Button } from "../ui/button";
import ImageAnalysis from "../categorizeData";
import Goals from "../goal/indesx";

const NavBar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const menuItems = useMemo(
    () => [
      // { id: 1, text: "Home", href: "home" },
      // { id: 3, text: "Know us", href: "whoWeAre" },
      // { id: 4, text: "Service", href: "service" },
      // { id: 5, text: "Contact Us", href: "contactUs" },
      // { id: 6, text: "About Us", href: "aboutUs" },
    ],
    []
  );

  return (
    <header className="flex items-center justify-between w-full p-2 bg-transparent border-b">
      <div className="logo">
        <h1 className="text-[35px]">
          spend<span className="text-green-400">Snap</span>
        </h1>
      </div>
      <div className="grid w-full m-5 text-2xl text-white place-items-end md:hidden">
        <Button onClick={() => setOpenNav(!openNav)}>
          <RxHamburgerMenu />
        </Button>
      </div>
      <div
        id="hamburger"
        className={`absolute w-full h-full top-0 transition-opacity duration-300 z-10 ${openNav ? "block" : "hidden"
          }`}
      >
        <div className="w-full bg-white mobile-list">
          <ul className="relative flex flex-col items-center justify-center gap-7 p-14">
            <Button
              variant="ghost"
              className="absolute text-2xl text-black right-10 top-4"
              onClick={() => setOpenNav(!openNav)}
            >
              <GiSplitCross />
            </Button>
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.text}
              </li>
            ))}
            <li><ImageAnalysis /></li>
            <li><Goals /></li>
          </ul>
        </div>
      </div>
      <div className="navlist">
        <ul className="items-center justify-around hidden gap-5 md:flex">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.text}
            </li>
          ))}
          <li><ImageAnalysis /></li>
          <li><Goals /></li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;