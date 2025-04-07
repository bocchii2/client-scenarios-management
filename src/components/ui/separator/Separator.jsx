import React from "react";

const Separator = ({ doted, color, height = "1px" }) => {
  return (
    <div
      className={`
        ${doted ? "border-dotted" : "border-solid"}
        ${color ? `bg-[${color}]` : "bg-gray-600"}
        ${height ? `h-[${height}]` : "h-1"}
    w-full h-[1px] bg-gray-300 my-2`}
    ></div>
  );
};

export default Separator;
