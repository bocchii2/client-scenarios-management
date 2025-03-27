import React from "react";
import { useParams } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import Button from "../../../components/ui/Button/Button";
import { getScenarioById } from "../services/apiServices/ScenarioApi";
import { useEffect } from "react";
import carouselItems from "../models/CarouselItems";
import { PLACES_DATA } from "../services/apiServices/PlacesData";
import Label from "../../../components/ui/label/Label";
import Breadcrum from "../../../components/ui/breadcrums/Breadcrum";
import useBreadcrums from "../hooks/useBreadcrums";
import {
  FaCar,
  FaMedkit,
  FaRuler,
  FaStar,
  FaToilet,
  FaUserFriends,
  FaWifi,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "../components/ui/slider/carousel/Carousel";
import Tabs from "../../../components/ui/tabs/Tabs";
import { FaDisplay, FaSliders } from "react-icons/fa6";
import { MdAir } from "react-icons/md";

const ScenarioView = () => {
  const { idScenario } = useParams();
  const { showNotification } = useNotification();

  // simular una llamada a una API
  const scenario = PLACES_DATA.find(
    (place) => place.id === parseInt(idScenario)
  );

  const { arrayOfUriPath, currentLocationLabel } = useBreadcrums(
    window.location.pathname,
    scenario.title
  );
  const NOT_LOCATION_PLACEHOLDER = "No location";
  const handleReserve = () => {
    showNotification("Reservar", "success");
  };
  const statusScenario =
    scenario.status === "Disponible"
      ? "primary"
      : scenario.status === "En mantenimiento"
      ? "warning"
      : "danger";

  const tabData = [
    {
      label: "General",
      content: (
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
                {scenario.services.wifi ? "Si" : "No"}
              </p>
              <p className="flex gap-2 items-center text-gray-700 text-sm">
                <MdAir />
                <span className="font-semibold">Aire acondicionado:</span>
                {scenario.services.airConditioner ? "Si" : "No"}
              </p>
              <p className="flex gap-1 items-center text-gray-700 text-sm">
                <FaToilet />
                <span className="font-semibold">Baños: </span>
                {scenario.services.bathrooms ? "Si" : "No"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Informacion tecnica",
      content: (
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
              {scenario.services.wifi ? "Si" : "No"}
            </p>
            <p className="flex gap-2 items-center text-gray-700 text-sm">
              <MdAir />
              <span className="font-semibold">Aire acondicionado:</span>
              {scenario.services.airConditioner ? "Si" : "No"}
            </p>
            <p className="flex gap-1 items-center text-gray-700 text-sm">
              <FaSliders />
              <span className="font-semibold">Sistema de sonido: </span>
              {scenario.services.soundSystem ? "Si" : "No"}
            </p>
            <p className="flex gap-1 items-center text-gray-700 text-sm">
              <FaDisplay />
              <span className="font-semibold">Pantalla: </span>
              {scenario.services.display ? "Si" : "No"}
            </p>
            <p className="flex gap-1 items-center text-gray-700 text-sm">
              <FaStar />
              <span className="font-semibold">Seguridad: </span>
              {scenario.services.security ? "Si" : "No"}
            </p>
            <p className="flex gap-1 items-center text-gray-700 text-sm">
              <FaMedkit />
              <span className="font-semibold">Atencion Medica: </span>
              {scenario.services.medicalAtention ? "Si" : "No"}
            </p>
            <p className="flex gap-1 items-center text-gray-700 text-sm">
              <FaCar />
              <span className="font-semibold">Parqueadero: </span>
              {scenario.services.parking ? "Si" : "No"}
            </p>
            <p className="flex gap-1 items-center text-gray-700 text-sm">
              <FaToilet />
              <span className="font-semibold">Baños: </span>
              {scenario.services.bathrooms ? "Si" : "No"}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Galeria",
      content: (
        <div>
          <Carousel items={carouselItems} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex gap-1 my-2 bg-white border-b border-gray-200 p-5">
        <Breadcrum
          arrayOfUriPath={arrayOfUriPath}
          currentLocationLabel={currentLocationLabel}
        />
      </div>
      <div className="p-5 flex flex-col md:flex-row md:justify-between items-center gap-2">
        <div>
          <h1 className="text-2xl text-gray-700 font-bold">{scenario.name}</h1>
          <p className="text-xl text-gray-700 font-light flex gap-1 items-center justify-start">
            <CiLocationOn />
            {scenario.location ? scenario.location : NOT_LOCATION_PLACEHOLDER}
          </p>
        </div>
        <div className="w-full my-3 md:m-0 md:w-auto">
          <Button
            label={"Crear solicitud de reserva"}
            onClick={handleReserve}
            type="primary"
          />
        </div>
      </div>
      <div className="flex-col p-3 gap-1 md:gap-3 md:flex md:flex-row sm:flex">
        <div className="flex-1 border border-gray-300 rounded-lg sm:flex-1/3 lg:flex-1">
          <div className="w-full flex-col gap-2 p-5">
            <div>
              {/* <Carousel items={scenario.carouselItems} /> */}
              <picture>
                <img
                  src="/public/placeholder.svg"
                  alt=""
                  className="w-full max-h-[300px] md:max-h-[500px] h-auto object-cover rounded-lg"
                />
              </picture>
            </div>
            <div className="flex gap-1 my-3">
              <Label
                type="default-ligth"
                label={`Area: ${scenario.area} m²`}
                icon={<FaRuler />}
              />
              <Label
                type="default-ligth"
                label={`Capacidad: ${scenario.technicalData.capacity}`}
                icon={<FaUserFriends />}
              />
              <Label type={statusScenario} label={scenario.status} />
            </div>
            <div className="w-full p-2">
              <Tabs tabs={tabData} />
            </div>
          </div>
        </div>
        <div className="flex-1 border border-gray-300 rounded-lg"> asdsd </div>
      </div>
    </div>
  );
};

export default ScenarioView;
