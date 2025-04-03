import React from "react";
import ServiceInlineCard from "../components/layout/serviceInlineCard/ServiceInlineCard";
import { servicesData } from "../services/apiServices/ServicesData";
import { Link } from "react-router-dom";
const ServiciosView = () => {
  return (
    <div className="w-full flex flex-col gap-2 p-5">
      <div className="w-full flex items-center justify-center bg-gray-600 h-[200px] md:h-[400px] rounded-lg transition-all duration-200 ease-in-out">
        <h1 className="font-semibold text-lg md:text-xl md:font-bold lg:text-3xl text-white">
          Todo lo que Necesitas para un Evento Perfecto
        </h1>
      </div>
      <div className="flex-col w-full">
        <div className="flex flex-col gap-2 md:flex-row md:gap-5 lg:gap-10 justify-around items-center">
          <div className="flex flex-col w-full px-6">
            {servicesData.map((service) => (
              <ServiceInlineCard
                key={service.id}
                serviceTitle={service.title}
                imgUrl={service.imageSrc}
                description={service.description}
                imgAlt={service.imageAlt}
              >
                <Link
                  to={`/servicios/${service.id}`}
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  Ver más
                </Link>
              </ServiceInlineCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiciosView;
