import { useLocation } from "react-router-dom";
import MenuItems from "./MenuItems";
import { HiSearch } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { menuOptions, menuOptionsTwo } from "../../data/menu";
import bluemedixLogo from "../../assets/blumedix.png";
// import ToggleSwitch from "../switch/ToggleSwitch";

const NavBar = ({ toggleHeader }) => {
  const location = useLocation();
  const currentPage = location.pathname;
  return (
    <nav className="flex md:h-full flex-col overflow-hidden pt-2 w-full m-auto">
      {/* logo */}
      <div className="px-4">
        {toggleHeader ? (
          <></>
        ) : (
          <div className="h-20 gap-2 flex py-[8%] items-center">
            <img alt="logo" src={bluemedixLogo} className="w-60 h-18 z-30" />
            {/* <span className="text-xl font-bold">BlueMedix</span>   */}
          </div>
        )}
        {/* search */}
        <div className="search flex h-10 my-5 px-2 py-1 border shadow rounded-full items-center">
          <h3 className=" cursor-pointer">
            <HiSearch className="w-6 h-6" />
          </h3>
          <span>
            <input
              placeholder="Search"
              type="text"
              className="px-2 bg-transparent w-full overflow-hidden outline-none"
            />
          </span>
        </div>
      </div>
      {/* Grow menu component to flex 1 */}
      <div className="flex flex-col flex-1 overflow-auto overflow-x-hidden  md:justify-between">
        <div className="py-3">
          <MenuItems links={menuOptions[0]} currentPage={currentPage} />
          <MenuItems links={menuOptions[1]} currentPage={currentPage} />
          {/* <MenuItems links={menuOptions[2]} currentPage={currentPage} />
          <MenuItems links={menuOptions[3]} currentPage={currentPage} />
          <MenuItems links={menuOptions[4]} currentPage={currentPage} /> */}
        </div>
        <div className="pb-3">
          <h3 className="py-3 px-3 text-disabled-gray divider text-sm text-left font-bold">
            Support
          </h3>
          <MenuItems links={menuOptionsTwo[0]} currentPage={currentPage} />
          <MenuItems links={menuOptionsTwo[1]} currentPage={currentPage} />
          <MenuItems links={menuOptionsTwo[2]} currentPage={currentPage} />
        </div>
      </div>
      {/* profile */}
      {/* <div className="md:rounded-br-2xl overflow-hidden items-center ">
        <div className="flex divider gap-2 pt-3 pb-2 border-t-2 px-3 items-center ">
          <img
            src={user[0].imgSrc}
            alt="person"
            className="w-10 aspect-square rounded-full"
          />
          <div className="hide-div text-left font-semibold text-xs">
            <h3 className="font-semibold text-sm flex items-center justify-center">
              {user[0].name}
              <span>
                <GoVerified className="ml-2" />
              </span>
            </h3>
            <h2>{user[0].company}</h2>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default NavBar;
