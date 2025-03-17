import React from "react";
import { Link } from "react-router-dom";

const MenuItems = ({ links, currentPage }) => {
  const { to, Icon, name } = links;

  return (
    <div className="relative">
      <Link to={to}>
        <div
          className={`absolute h-full w-1 rounded-l-xl z-20 bg-orange-700 right-0  ${
            currentPage === to ? " block" : " hidden"
          }`}
        ></div>
        <div
          className={`flex gap-5 h-10 px-4 mx-1 rounded-lg font-light items-center item-hover`}
        >
          <h2 className="icons">
            <Icon className="w-6 h-6" />
          </h2>

          <span>{name}</span>
        </div>
      </Link>
    </div>
  );
};

export default MenuItems;
