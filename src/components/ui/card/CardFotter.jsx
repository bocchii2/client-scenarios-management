import React from "react";

const CardFotter = ({ children }) => {
  return (
    <div className="flex gap-2 justify-center items-center w-full h-auto">
      {children}
    </div>
  );
};

export default CardFotter;
