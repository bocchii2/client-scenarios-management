import React from "react";

const Label = ({ type = "info", label, icon }) => {
  return (
    <div
      className={`border rounded-2xl w-auto px-2 py-1 flex items-center justify-center  max-w-[150px] font-semibold
        ${icon && "gap-1"}
        ${type === "primary" && "text-blue-900 bg-blue-100 border-blue-200"}
        ${type === "secondary" && "text-gray-900 bg-gray-100 border-gray-200"}
        ${type === "success" && "text-green-900 bg-green-100 border-green-200"}
        ${type === "danger" && "text-red-900 bg-red-100 border-red-200"}
        ${
          type === "default-stroke" &&
          "text-gray-100 bg-gray-800 border-gray-800"
        }
        ${
          type === "default-ligth" &&
          "text-gray-800 bg-gray-100 border-gray-800"
        }
        ${
          type === "warning" &&
          "text-yellow-900 bg-yellow-100 border-yellow-200"
        }
        ${type === "info" && "text-indigo-900 bg-indigo-100 border-indigo-200"}
      `}
    >
      <span>{icon}</span>
      <p className={`text-sm font-semibold text-center`}>{label}</p>
    </div>
  );
};

export default Label;
