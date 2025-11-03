import React from "react";
import UNIVERSITY_COLORS from "../../../../../constants/colors";

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
    <div 
      className="group w-full md:w-[200px] h-[400px] p-3 rounded transition-all duration-300 ease-in-out 
      flex flex-col justify-start shadow-md hover:shadow-2xl
      md:hover:w-[600px]"
      style={{ 
        backgroundColor: UNIVERSITY_COLORS.primary,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = UNIVERSITY_COLORS.secondary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = UNIVERSITY_COLORS.primary;
      }}
    >
      <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
      <p className="text-white text-lg font-light">{subtitle}</p>
      
      {/* Contenido que aparece en hover */}
      <div className="hidden group-hover:flex flex-col gap-3 mt-3 flex-1 overflow-auto">
        <p className="text-white text-sm">{description}</p>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="mt-2 rounded w-full max-w-[200px] mx-auto object-cover"
        />
      </div>
      
      {/* Botón */}
      <div className="w-full flex flex-col justify-end mt-auto">
        <button
          onClick={primaryButtonAction}
          className="mt-2 px-4 py-2 bg-white rounded font-bold hover:bg-gray-300 cursor-pointer transition-colors"
          style={{ color: UNIVERSITY_COLORS.primary }}
        >
          {primaryButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default SimpleCard;
