"use client";
import {useState} from 'react';
import {PencilIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-800 h-screen transition-width duration-300 ${isOpen ? 'w-24' : 'w-8'}`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 text-white"
      >
        {isOpen ? '<' : '>'}
      </button>
      <div className="flex flex-col items-center mt-4 space-y-4">
        <div className="flex items-center space-x-2">
          <PencilIcon className="h-6 w-6 text-white"/>
          {isOpen && <span className="text-white">Home</span>}
        </div>
        <div className="flex items-center space-x-2">
          <PencilIcon className="h-6 w-6 text-white"/>
          {isOpen && <span className="text-white">Profile</span>}
        </div>
        <div className="flex items-center space-x-2">
          <PencilIcon className="h-6 w-6 text-white"/>
          {isOpen && <span className="text-white">Settings</span>}
        </div>
        <Link href={"/group-manager"}>Group</Link>
      </div>
    </div>
  );
};

export default Sidebar;
