import React from "react";
import AlterDot from "../ui/AlterDot";

const SideMenuElement = ({ alert, isSelect, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-4 text-start w-full rounded-lg cursor-pointer transition-colors flex items-center justify-between 
    ${
      isSelect
        ? "bg-blue-400 text-white hover:bg-blue-500 font-bold cursor-pointer"
        : "hover:bg-gray-200"
    }`}
    >
      {label}
      {alert && <AlterDot />}
    </div>
  );
};

export default SideMenuElement;
