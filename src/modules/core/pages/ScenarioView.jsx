import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/ui/Button/Button";
import carouselItems from "../models/CarouselItems";
import { PLACES_DATA } from "../services/apiServices/PlacesData";
import Label from "../../../components/ui/label/Label";
import Breadcrum from "../../../components/ui/breadcrums/Breadcrum";
import useBreadcrums from "../hooks/useBreadcrums";
import { FaRuler, FaUserFriends } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "../components/ui/slider/carousel/Carousel";
import Tabs from "../../../components/ui/tabs/Tabs";
import GeneralTabContent from "../components/layout/ScenarioViewTabsContent/GeneralTabContent";
import TechnicalInfoTabContent from "../components/layout/ScenarioViewTabsContent/TechnicalInfoTabContent";
import Separator from "../../../components/ui/separator/Separator";
import imgPlaceholder from "../../../assets/placeholder.svg";
import useModal from "../hooks/useModal";
import RequesRentalForm from "../components/layout/Forms/RequesRentalForm";
import { useEffect } from "react";
import useUserStore from "../../../store/user";
import NoLoginDialog from "../components/ui/dialog/NoLoginDialog";
// import scenarioApi from "../services/apiServices/ScenarioApi";

const ScenarioView = () => {
  const { idScenario } = useParams();
  const {
    closeModal: closeRentalFormModal,
    isOpen: isOpenRentalFormModal,
    openModal: openRentalFormModal,
  } = useModal();
  // const [scenario, setScenario] = useState(null);
  const { loggedIn } = useUserStore((state) => state.user);

  const scenario = PLACES_DATA.find(
    (place) => place.id === parseInt(idScenario)
  );

  useEffect(() => {
    // scroll to top of the page when the component is mounted
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the scenario data from the API
    // This is a placeholder, replace with your actual API call
    /*const fetchScenario = async () => {
      try {
        const response = await scenarioApi.getScenarioById(idScenario);
        setScenario(response.data);
      } catch (error) {
        console.error("Error fetching scenario:", error);
      }
    };
    fetchScenario(); */
  }, []);

  const { arrayOfUriPath, currentLocationLabel } = useBreadcrums(
    window.location.pathname,
    scenario.title
  );

  // convertir el estado del escenario en un texto plano
  const statusScenario =
    scenario.status === "Disponible"
      ? "primary"
      : scenario.status === "En mantenimiento"
      ? "warning"
      : "danger";

  const tabData = [
    {
      label: "General",
      content: <GeneralTabContent scenario={scenario} />,
    },
    {
      label: "Informacion tecnica",
      content: <TechnicalInfoTabContent scenario={scenario} />,
    },
    {
      label: "Galeria",
      content: <Carousel items={carouselItems} />,
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
            {scenario.location ? scenario.location : "Sin ubicacion"}
          </p>
        </div>
        <div className="w-full my-3 md:m-0 md:w-auto">
          <Button
            label={"Crear solicitud de reserva"}
            onClick={openRentalFormModal}
            variant="primary"
          />
          {loggedIn ? (
            <RequesRentalForm
              closeModal={closeRentalFormModal}
              isOpen={isOpenRentalFormModal}
              scenario={scenario}
              title={"Generar solicitud"}
            />
          ) : (
            <NoLoginDialog
              isOpen={isOpenRentalFormModal}
              closeModal={closeRentalFormModal}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col p-3 gap-1 md:gap-3 md:flex-row">
        <div className="flex-1 border border-gray-300 rounded-lg md:flex-1/3">
          <div className="w-full flex-col gap-2 p-5">
            <div>
              {/* <Carousel items={scenario.carouselItems} /> */}
              <picture>
                <img
                  src={imgPlaceholder}
                  alt="placeholder"
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
              {/**
               * El componente de tabs hay que mejorarlo para que se vea mejor
               * seria tedioso contruir componentes separados para para cada tab y pasarlos como prop en los arrays
               * no debe pasarse un array, sino nomas contruir el componente
               **/}
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="p-3 border border-gray-300 rounded-lg">
            <h3 className="text-gray-800 font-bold text-2xl p-2">
              Tarifas de Alquiler
            </h3>
            <p className="text-gray-500 font-light text-sm p-2 md:text-lg">
              Infomarcion actual sobre tarifas de alquiler y disponibilidad
            </p>
            <div>
              <div className="w-full flex gap-2 items-center justify-between p-2">
                <p className="font-semibold text-sm md:text-lg text-gray-600">
                  Tarifa por hora (1h):
                </p>
                <span className="font-bold text-gray-800 text-lg">
                  ${scenario.rates.pricePerHour}
                </span>
              </div>
              <div className="w-full flex gap-2 items-center justify-between p-2">
                <p className="font-semibold text-sm md:text-lg text-gray-600">
                  Tarifa por mitad de dia: (5h):
                </p>
                <span className="font-bold text-gray-800 text-lg">
                  ${scenario.rates.halfDayPrice}
                </span>
              </div>
              <div className="w-full flex gap-2 items-center justify-between p-2">
                <p className="font-semibold text-sm md:text-lg text-gray-600">
                  Tarifa por dia: (8h):
                </p>
                <span className="font-bold text-gray-800 text-lg">
                  ${scenario.rates.fullDayPrice}
                </span>
              </div>
              <div className="w-full flex gap-2 items-center justify-between p-2">
                <p className="font-semibold text-sm md:text-lg text-gray-600">
                  Tarifa por fin de semana:
                </p>
                <span className="font-bold text-gray-800 text-lg">
                  {scenario.rates.weekendDaySurchargePercent}%
                </span>
              </div>
            </div>
            <Separator />
            <div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 md:text-xl p-2">
                  Servicios adicionales
                </h3>
                {scenario.additionalServices.map((service) => (
                  <div className="flex gap-2 items-center justify-between p-2">
                    <p className="font-semibold text-sm md:text-lg text-gray-800">
                      {service.serviceName}:
                    </p>
                    <span className="font-bold text-gray-600">
                      {service.available ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 p-5 rounded-lg m-4">
        <h2 className="text-lg font-bold text-gray-800 md:text-xl">
          Cronograma de reservas
        </h2>
        <p className="text-gray-500 font-light text-sm p-2 md:text-lg">
          Infomarcion actual sobre tarifas de alquiler y disponibilidad
        </p>
        <div className="w-auto h-auto flex gap-2 items-center justify-between p-2">
          <div className="w-full bg-gray-200 rounded-lg p-4 flex items-center justify-center">
            adas
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioView;
