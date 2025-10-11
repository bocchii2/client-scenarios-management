import React from "react";
import AlterDot from "../../ui/AlterDot";

const SideMenuElement = ({ alert, isSelect, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 text-start w-full rounded-lg cursor-pointer transition-colors flex items-center justify-between text-sm
        
    ${isSelect
          ? "bg-[#1069A5] text-white font-medium shadow-sm"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      <span className="truncate">{label}</span>
      {alert && <AlterDot />}
    </div>
  );
};

export default SideMenuElement;
