import React from "react";
import { FaHotel } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="w-full flex items-center justify-center mb-5 gap-2">
      <FaHotel size={40} className="text-gray-600" />
      <h2 className="text-xl font-semibold text-gray-600 text-center">
        Escenarios ULEAM
      </h2>
    </div>
  );
};
export default Logo;
