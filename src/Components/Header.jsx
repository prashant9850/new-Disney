import { useEffect, useRef, useState } from "react";
import disneylogo from "../assets/images/disneylogo.png";
import User from "../assets/images/User.avif";
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
  HiTv,
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";

function Header() {
  const menu = [
    { name: "HOME", icon: HiHome },
    { name: "SEARCH", icon: HiMagnifyingGlass },
    { name: "WATCHLIST", icon: HiPlus },
    { name: "ORIGINALS", icon: HiStar },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-0">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-1 sm:px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={disneylogo}
            alt="Disney Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border rounded-full object-contain mr-4"
          />
        </div>

        {/* Menu */}
        <div className="flex-1 mx-4 overflow-x-auto pb-1 whitespace-nowrap custom-scrollbar">
          <ul className="flex gap-6 sm:gap-8 md:gap-10 text-white items-center">
            {/* First 3 menu items */}
            {menu.slice(0, 3).map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={index}
                  className="relative flex items-center gap-1 sm:gap-2 cursor-pointer group"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline text-sm relative pb-1">
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </li>
              );
            })}

            {/* Dots icon for small screen */}
            <li className="sm:hidden relative" ref={toggleRef}>
              <HiDotsVertical
                className="w-5 h-5 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
            </li>

            {/* Remaining items for large screen */}
            {menu.slice(3).map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={index}
                  className="hidden sm:flex relative items-center gap-1 cursor-pointer group"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="pb-1 hidden sm:inline text-sm relative">
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Profile */}
        <div className="flex-shrink-0">
          <img
            src={User}
            alt="User Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Dropdown menu for small screen */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="sm:hidden absolute mt-2 left-4 right-4 max-w-[180px] mx-auto bg-white/10 backdrop-blur-md text-white shadow-md rounded-md z-50 px-4 py-3 flex flex-col gap-2"
        >
          {menu.slice(3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-2 py-1 hover:bg-white/20 rounded cursor-pointer"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Header;
