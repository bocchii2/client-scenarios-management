import React from "react";
import UNIVERSITY_COLORS from "../../../../../constants/colors";

const SideMenuElement = ({ alert, isSelect, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        // Aplicar color institucional cuando el elemento está seleccionado
        ...(isSelect && { backgroundColor: UNIVERSITY_COLORS.primary }),
      }}
      className={`px-4 py-3 text-start w-full rounded-lg cursor-pointer transition-colors flex items-center justify-between text-sm
        
    ${isSelect
          ? "text-white font-medium shadow-sm"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      <span className="truncate">{label}</span>

    </div>
  );
};

export default SideMenuElement;
