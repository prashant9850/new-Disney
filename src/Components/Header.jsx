import disneylogo from "../assets/disneylogo.webp";
import User from "../assets/User.avif";
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

  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-6 md:px-8 lg:px-12">
      <div className="flex-shrink-0">
        <img
          src={disneylogo}
          alt="Disney Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border rounded-full bg-white object-contain"
        />
      </div>
      <div className="flex-1 mx-4 overflow-x-auto">
        <ul className="flex gap-4 sm:gap-6 md:gap-8 text-white whitespace-nowrap">
          {menu.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="flex items-center gap-1 sm:gap-2 hover:text-blue-400 cursor-pointer transition-colors duration-200"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-shrink-0">
        <img
          src={User}
          alt="User Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

export default Header;
