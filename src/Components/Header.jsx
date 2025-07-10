import disneylogo from "../assets/disneylogo.webp";
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
    { name: "WATCH LIST", icon: HiPlus },
    { name: "ORIGINALS", icon: HiStar },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
  ];

  return (
    <div className="mt-4 flex items-center gap-6 px-4 justify-center">
      <img
        src={disneylogo}
        alt="Disney Logo"
        className="w-[30px] sm:w-[40px] md:w-[60px] lg:w-[80px] border rounded-full"
      />

      <ul className="flex gap-4 text-black">
        {menu.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={index}
              className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
