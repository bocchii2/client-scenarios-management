import React from "react";

const Button = ({
  onClick,
  variant = "primary",
  type = "button",
  label,
  icon,
  disabled = false,
  size = "medium",
  loading = false,
  onContextMenu,
}) => {
  return (
    <button
      onContextMenu={onContextMenu}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
      w-auto py-2 px-4 rounded-md text-white  flex items-center justify-center gap-2
      ${loading && "cursor-default bg-gray-400 text-white hover:bg-gray-400"}
      ${disabled && "cursor-default opacity-50"}
      ${size === "small" && "text-sm"}
      ${size === "medium" && "text-base"}
      ${size === "large" && "text-lg"}
      ${size === "xlarge" && "text-xl"}
      ${variant === "primary" && "bg-[#1069A5] hover:bg-[#37566b]"}
      ${variant === "secondary" && "bg-gray-500 hover:bg-gray-600"}
      ${variant === "success" && "bg-green-500 hover:bg-green-600"}
      ${variant === "danger" && "bg-red-500 hover:bg-red-600"}
      ${
        variant === "warning" &&
        "bg-yellow-500 text-yellow-800 hover:bg-yellow-600"
      }
      ${
        variant === "info" &&
        "bg-indigo-500 text-indigo-800 hover:bg-indigo-600"
      }
      ${disabled && "cursor-default opacity-50"}
      cursor-pointer 
    `}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8.009 8.009 0 0 1 12 20Z"
            />
          </svg>
          <span className="text-sm">Cargando...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <p className=" text-center">{label}</p>
        </>
      )}
    </button>
  );
};

export default Button;
