import React from "react";

const Input = ({
  label,
  id,
  name,
  icon,
  placeholder,
  isTextarea = false,
  onChange,
  value,
  disabled,
  type = "text",
  error,
  isRequired = false,
}) => {
  return (
    <div className="flex flex-col w-full gap-1 mb-3">
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 mb-2 flex gap-1 items-center justify-start"
        >
          {icon && <span className="text-gray-500">{icon}</span>}
          {label}
          {error && (
            <p className="text-red-400 font-semibold text-sm flex items-center justify-center gap-1">
              ⋅ {error.message}
            </p>
          )}
        </label>
        <input
          required={isRequired}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
          className={`w-full px-2 h-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-sm font-medium
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }
            ${disabled ? "bg-gray-100 cursor-default" : ""}
            ${isTextarea ? "resize-none h-[40px]" : ""}
            `}
        />
      </div>
    </div>
  );
};

export default Input;
