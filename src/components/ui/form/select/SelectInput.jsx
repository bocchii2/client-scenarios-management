import React from "react";

const SelectInput = ({ id, name, onChange, children }) => {
  return (
    <select
      id={id}
      name={name}
      onChange={onChange}
      className="w-full h-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-sm font-medium"
    >
      {children}
    </select>
  );
};

export default SelectInput;
