import React from "react";

const OptionInput = ({ value, label }) => {
  return (
    <option value={value} className="text-gray-700 text-sm font-medium">
      {label}
    </option>
  );
};

export default OptionInput;
