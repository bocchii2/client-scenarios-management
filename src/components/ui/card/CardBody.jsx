import React from "react";

const CardBody = ({ children }) => {
  return (
    <div className="flex-1 container w-full p-2 text-gray-700 text-sm font-light">
      {children}
    </div>
  );
};

export default CardBody;
