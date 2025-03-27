import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Contenedor de los botones de Tabs */}
      <div className="flex w-full justify-around items-center bg-gray-200 p-1 rounded">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium focus:outline-none transition w-full rounded h-full ${
              activeIndex === index
                ? "bg-white text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del Tab Activo */}
      <div className="p-4">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tabs;
