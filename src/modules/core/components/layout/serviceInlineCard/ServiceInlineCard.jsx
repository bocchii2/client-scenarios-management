import React from "react";
import { Link } from "react-router-dom";

const ServiceInlineCard = ({
  serviceTitle,
  imgUrl,
  description,
  imgAlt,
  children,
}) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-500 p-5 gap-2 md:gap-5 lg:gap-10 w-full">
      <div className="flex flex-col md:flex-row gap-2 md:gap-5 lg:gap-10 items-center md:items-start justify-start w-full">
        <picture className="flex items-center justify-center w-[100px] h-[100px] bg-gray-200 rounded-full p-2">
          <img src={imgUrl} alt={imgAlt} className="h-100px w-auto" />
        </picture>
        <div className="flex flex-col gap-2 items-start justify-center">
          <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl text-gray-700">
            {serviceTitle}
          </h3>
          <p className="font-light text-sm">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start justify-center">
        {children}
      </div>
    </div>
  );
};

export default ServiceInlineCard;
