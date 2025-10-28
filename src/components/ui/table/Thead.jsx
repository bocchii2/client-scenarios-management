import React from "react";

const Thead = ({ headers = [], className = "", sticky = true, hasExpand = false }) => {
  return (
    <thead className={`${sticky ? "sticky top-0 z-10" : ""} bg-white border-b border-gray-200 ${className}`}>
      <tr>
        {hasExpand && <th className="px-6 py-3"></th>}
        {headers.map((header, index) => (
          <th
            key={index}
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px] bg-white"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;