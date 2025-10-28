import React from "react";

const Tbody = ({ children, className = "" }) => {
  return <tbody className={`divide-y divide-gray-200 ${className}`}>{children}</tbody>;
};

export default Tbody;
