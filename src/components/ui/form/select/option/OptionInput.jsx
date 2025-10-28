import React from "react";

const OptionInput = ({ value, label, selected }) => {
  return (
    <option value={value} className="text-gray-700 text-sm font-medium" selected={selected}>
      {label}
    </option>
  );
};

export default OptionInput;
