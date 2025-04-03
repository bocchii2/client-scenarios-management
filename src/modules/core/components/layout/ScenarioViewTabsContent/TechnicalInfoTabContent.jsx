import React from "react";
import { useNotification } from "../../../../../hooks/useNotificaction";
import {
  FaCar,
  FaFilePdf,
  FaMedkit,
  FaRuler,
  FaStar,
  FaToilet,
  FaUserFriends,
  FaWifi,
} from "react-icons/fa";
import { MdAir } from "react-icons/md";
import { FaDisplay, FaSliders } from "react-icons/fa6";
import Button from "../../../../../components/ui/Button/Button";

const TechnicalInfoTabContent = ({ scenario }) => {
  const { showNotification } = useNotification();
  return (
    <div>
      <div>
        <h2 className="text-gray-700 font-bold text-lg my-2 border-b border-gray-300">
          Caracteristicas Tecnicas
        </h2>
      </div>
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
          <FaSliders />
          <span className="font-semibold">Sistema de sonido: </span>
          {scenario.internalServices.soundSystem ? "Si" : "No"}
        </p>
        <p className="flex gap-1 items-center text-gray-700 text-sm">
          <FaDisplay />
          <span className="font-semibold">Pantalla: </span>
          {scenario.internalServices.display ? "Si" : "No"}
        </p>
        <p className="flex gap-1 items-center text-gray-700 text-sm">
          <FaStar />
          <span className="font-semibold">Seguridad: </span>
          {scenario.internalServices.security ? "Si" : "No"}
        </p>
        <p className="flex gap-1 items-center text-gray-700 text-sm">
          <FaMedkit />
          <span className="font-semibold">Atencion Medica: </span>
          {scenario.internalServices.medicalAtention ? "Si" : "No"}
        </p>
        <p className="flex gap-1 items-center text-gray-700 text-sm">
          <FaCar />
          <span className="font-semibold">Parqueadero: </span>
          {scenario.internalServices.parking ? "Si" : "No"}
        </p>
        <p className="flex gap-1 items-center text-gray-700 text-sm">
          <FaToilet />
          <span className="font-semibold">Baños: </span>
          {scenario.internalServices.bathrooms ? "Si" : "No"}
        </p>
        <div className="w-full flex items-center justify-start my-2">
          <Button
            label={"Descargar ficha tecnica"}
            variant="secondary"
            onClick={() =>
              showNotification("Descargar ficha tecnica", "success")
            }
            icon={<FaFilePdf />}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalInfoTabContent;
