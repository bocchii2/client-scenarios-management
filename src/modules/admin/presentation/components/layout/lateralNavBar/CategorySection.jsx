import React from "react";
import { CategoryIcons } from "../../../constants/CategoryIcons";

const CategorySection = ({ title, children }) => {
  const IconComponent = CategoryIcons[title];

  return (
    <div className={`mb-6 w-full p-2`}>
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          {IconComponent && (
            <IconComponent className="w-4 h-4 text-gray-600" />
          )}
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <div className="w-full h-px bg-gray-200"></div>
      </div>
      <div className="space-y-1 bg-white rounded-lg p-2">
        {children}
      </div>
    </div>
  );
};

export default CategorySection;