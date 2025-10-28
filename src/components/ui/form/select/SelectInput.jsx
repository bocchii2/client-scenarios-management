import React from "react";

const SelectInput = ({
  label,
  id,
  name,
  icon,
  placeholder,
  onChange,
  value,
  disabled,
  error,
  isRequired = false,
  children,
  className = "",
  selectClassName = "",
  ...rest
}) => {
  const selectId = id || name;

  return (
    <div className={`flex flex-col w-full gap-1 mb-3 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-gray-700 mb-2 flex gap-1 items-center justify-start"
        >
          {icon && <span className="text-gray-500">{icon}</span>}
          {label}
          {error && (
            <p id={`${selectId}-error`} className="text-red-400 font-semibold text-sm flex items-center justify-center gap-1">
              ⋅ {error.message}
            </p>
          )}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        required={isRequired}
        onChange={onChange}
        value={value ?? ""}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`w-full h-10 bg-white rounded-md text-gray-700 text-sm font-medium
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border border-red-500 focus:ring-red-500 focus:border-red-500" : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
          ${disabled ? "bg-gray-600 cursor-default text-gray-500" : ""}
          ${selectClassName}
        `}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
