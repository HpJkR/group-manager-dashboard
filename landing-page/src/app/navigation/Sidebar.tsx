"use client";

import React from 'react';
import Link from 'next/link';
import {HomeIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {Divider} from "@mui/material";
import classNames from 'classnames';

const navItems = [
  {href: "/", icon: HomeIcon, label: "Home"},
  {href: "/group-maker", icon: UserGroupIcon, label: "Group"},
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={classNames("bg-[#FE7835] h-screen transition-width duration-300 flex flex-col items-center justify-between", {
        'w-36': isOpen,
        'w-16': !isOpen,
      })}
    >
      <div className="flex flex-col items-center w-full">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white w-full hover:bg-gray-700 flex items-center justify-center"
        >
          {isOpen ? <ChevronLeftIcon className="h-8 w-8 text-white"/> :
            <ChevronRightIcon className="h-8 w-8 text-white"/>}
        </button>
        <div className={`w-full flex flex-col gap-2 mt-4 ${isOpen ? '' : 'items-center'}`}>
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="flex items-center gap-2 w-full hover:bg-gray-700 p-3">
                <item.icon className="h-8 w-8 text-white"/>
                {isOpen && <span className="text-white">{item.label}</span>}
              </div>
            </Link>
          ))}
          <Divider variant="middle"/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;