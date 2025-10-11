import React from "react";

const Chip = ({
  label,
  variant = "default",
  color = "gray",
  size = "small",
  className = ""
}) => {
  const variants = {
    default: "px-2 py-1 rounded-full text-xs font-medium",
    outlined: "px-2 py-1 rounded-full text-xs font-medium border-2",
    filled: "px-3 py-1.5 rounded-full text-sm font-semibold"
  };

  const colors = {
    gray: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-300"
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300"
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-300"
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300"
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-300"
    }
  };

  const colorConfig = colors[color] || colors.gray;
  const variantClass = variants[variant] || variants.default;

  const chipClasses = `
    ${variantClass} 
    ${variant === 'outlined' ? colorConfig.border : colorConfig.bg} 
    ${colorConfig.text} 
    ${className}
  `.trim();

  return (
    <span className={chipClasses}>
      {label}
    </span>
  );
};

export default Chip;