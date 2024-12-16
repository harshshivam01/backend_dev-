import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Orders</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Menu</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Customers</li>
      </ul>
    </div>
  );
};

export default Sidebar;
