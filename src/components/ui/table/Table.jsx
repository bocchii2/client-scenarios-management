import React from "react";

const Table = ({
  className = "",
  containerClassName = "",
  children,
  caption,
  ariaLabel,
  showCaption = false,
}) => {
  return (
    <div className={`w-full max-h-[600px] overflow-y-auto overflow-x-auto rounded-md border border-gray-200 ${containerClassName}`}>
      <table
        className={`w-full min-w-max table-auto ${className}`}
        aria-label={ariaLabel || (typeof caption === "string" ? caption : undefined)}
      >
        {caption ? (
          <caption className={showCaption ? "text-left text-sm text-gray-600 px-2 py-1" : "sr-only"}>
            {caption}
          </caption>
        ) : null}
        {children}
      </table>
    </div>
  );
};

Table.Header = ({ children, className = "", sticky = true }) => {
  return (
    <thead className={`${sticky ? "sticky top-0 z-10" : ""} bg-gray-50 border-b border-gray-200 ${className}`}>
      {children}
    </thead>
  );
};

Table.Body = ({ children, className = "" }) => {
  return <tbody className={`divide-y divide-gray-200 ${className}`}>{children}</tbody>;
};

Table.Footer = ({ children, className = "" }) => {
  return <tfoot className={`bg-gray-50 border-t border-gray-200 ${className}`}>{children}</tfoot>;
};

export default Table;