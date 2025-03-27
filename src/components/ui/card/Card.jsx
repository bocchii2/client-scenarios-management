import React from "react";

const Card = ({ children, className, height = "400px" }) => {
  return (
    <div
      className={`flex flex-col h-full md:min-w-[400px] w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border-gray-200 hover:border-gray-400 border rounded-lg p-5 transition-all ${className}`}
      style={{ height: height }}
    >
      {children}
    </div>
  );
};

export default Card;
