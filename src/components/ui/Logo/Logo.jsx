import React from "react";
import { FaHotel } from "react-icons/fa";

const Logo = ({ size = "medium", color = "white" }) => {
  return (
    <div
      className={`w-full flex items-center justify-center mb-5 gap-2
        ${size === "small" ? "h-10" : size === "medium" ? "h-16" : "h-20"}`}
    >
      <FaHotel
        size={size === "small" ? 30 : size === "medium" ? 40 : 50}
        className={`text-${color}`}
      />
      <h2
        className={
          `font-semibold text-${color} text-center` +
          (size === "small"
            ? "text-lg"
            : size === "medium"
            ? "text-2xl"
            : "text-3xl") +
          " font-bold"
        }
      >
        Escenarios ULEAM
      </h2>
    </div>
  );
};
export default Logo;
