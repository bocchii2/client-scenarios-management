import React from "react";

const Tfooter = ({ children, className = "" }) => {
  return <tfoot className={`bg-gray-50 border-t border-gray-200 ${className}`}>{children}</tfoot>;
};

export default Tfooter;
