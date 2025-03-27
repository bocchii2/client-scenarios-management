import React from "react";

const SimpleCard = ({
  title,
  subtitle,
  description,
  imageAlt,
  imageSrc,
  primaryButtonAction,
  primaryButtonLabel,
}) => {
  return (
    <div className="group w-full md:w-[200px] h-[400px] p-3 rounded bg-[rgb(16,105,165)] hover:bg-[rgb(58,58,58)] md:hover:w-[600px] transition-[width] flex flex-col justify-start duration-300 ease-in-out overflow-hidden">
      <h2 className="text-white text-2xl font-bold">{title}</h2>
      <p className="text-white text-lg font-light">{subtitle}</p>
      <div className="hidden group-hover:flex gap-1 mt-3">
        <p className="text-white text-sm">{description}</p>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="mt-2 rounded w-full max-w-[200px]"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-end gap-2">
        <button
          onClick={primaryButtonAction}
          className="mt-2 px-4 py-2 bg-white text-[rgb(16,105,165)] rounded font-bold hover:bg-gray-300 cursor-pointer"
        >
          {primaryButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default SimpleCard;
