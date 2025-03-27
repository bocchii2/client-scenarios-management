import React from "react";

const CardHeader = ({ children, className }) => {
  return (
    <div className={`${className} w-full h-auto container`}>{children}</div>
  );
};

export default CardHeader;

{
  /* <img
        src="/public/carousel-1.svg"
        alt="Auditorio"
        className="w-full h-[200px] object-cover rounded-lg"
      /> */
}
