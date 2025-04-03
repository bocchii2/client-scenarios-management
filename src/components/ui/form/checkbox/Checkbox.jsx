import React from "react";

const Checkbox = ({
  id,
  name,
  onChange,
  value,
  label,
  checked,
  disabled,
  error,
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 `}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {error && (
        <span className="text-red-500 text-sm ml-2">{error.message}</span>
      )}
    </div>
  );
};

export default Checkbox;
