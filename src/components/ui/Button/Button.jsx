import React from "react";

const Button = ({ onClick, type = "primary", label, icon, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      w-full py-2 px-4 rounded-md text-white  flex items-center justify-center gap-2
      ${type === "primary" && "bg-[#1069A5] hover:bg-[#37566b]"}
      ${type === "secondary" && "bg-gray-500 hover:bg-gray-600"}
      ${type === "success" && "bg-green-500 hover:bg-green-600"}
      ${type === "danger" && "bg-red-500 hover:bg-red-600"}
      ${
        type === "warning" &&
        "bg-yellow-500 text-yellow-800 hover:bg-yellow-600"
      }
      ${type === "info" && "bg-indigo-500 text-indigo-800 hover:bg-indigo-600"}
      ${disabled && "cursor-default opacity-50"}
      cursor-pointer 
    `}
    >
      {icon && <span>{icon}</span>}
      <p className=" text-center">{label}</p>
    </button>
  );
};

export default Button;
