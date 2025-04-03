import React from "react";
import { FaRuler, FaToilet, FaUserFriends, FaWifi } from "react-icons/fa";
import { MdAir } from "react-icons/md";

const GeneralTabContent = ({ scenario }) => {
  return (
    <div>
      <p className="text-gray-700 font-semibold text-sm">
        {scenario.description}
      </p>
      <div>
        <h2 className="text-gray-700 font-bold text-lg my-2 border-b border-gray-300">
          Caracteristicas Principales
        </h2>
        {scenario.features.map((feature) => (
          <div>
            <p className="flex gap-2 items-center text-gray-700 text-sm">
              {feature}
            </p>
            <br />
          </div>
        ))}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2">
          <p className="flex gap-2 items-center text-gray-700 text-sm">
            <FaUserFriends />
            <span className="font-semibold">Capacidad:</span>
            {scenario.technicalData.capacity}
          </p>
          <p className="flex gap-2 items-center text-gray-700 text-sm">
            <FaRuler />
            <span className="font-semibold">Area:</span>
            {scenario.area} m²
          </p>
          <p className="flex gap-2 items-center text-gray-700 text-sm">
            <FaWifi />
            <span className="font-semibold">Wifi:</span>
            {scenario.internalServices.wifi ? "Si" : "No"}
          </p>
          <p className="flex gap-2 items-center text-gray-700 text-sm">
            <MdAir />
            <span className="font-semibold">Aire acondicionado:</span>
            {scenario.internalServices.airConditioner ? "Si" : "No"}
          </p>
          <p className="flex gap-1 items-center text-gray-700 text-sm">
            <FaToilet />
            <span className="font-semibold">Baños: </span>
            {scenario.internalServices.bathrooms ? "Si" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralTabContent;
