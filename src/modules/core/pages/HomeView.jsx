import React from "react";

import SimpleCard from "../components/ui/simpleCard/SimpleCard";

import Carousel from "../components/ui/slider/carousel/Carousel";
import ContactUs from "../components/layout/ContactUs";
const HomeView = () => {
  const ScenarioData = [
    {
      id: 1,
      title: "Centro de Convenciones",
      subtitle: "Centro de Convenciones",
      description:
        "Espacios Adaptables que se ajustan a tus necesidades, con capacidad para grandes eventos.",
      imageAlt: "Centro de Convenciones",
      imageSrc: "/public/carousel-1.svg",
      primaryButtonAction: () => console.log("Centro de Convenciones"),
      primaryButtonLabel: "Más información",
    },
    {
      id: 2,
      title: "Auditorio",
      subtitle: "Auditorio",
      description:
        "Con salones versátiles, tecnología de punta y un servicio excepcional, garantizamos que tu evento será inolvidable.",
      imageAlt: "Auditorio",
      imageSrc: "/public/carousel-2.svg",
      primaryButtonAction: () => console.log("Auditorio"),
      primaryButtonLabel: "Más información",
    },
    {
      id: 3,
      title: "Espacios Abiertos",
      subtitle: "Espacios Abiertos",
      description:
        "Ubicación Estratégica, fácil acceso y estacionamiento amplio, ideal para asistentes locales e internacionales.",
      imageAlt: "Espacios Abiertos",
      imageSrc: "/public/carousel-3.svg",
      primaryButtonAction: () => console.log("Espacios Abiertos"),
      primaryButtonLabel: "Más información",
    },
    {
      id: 4,
      title: "Cine",
      subtitle: "Cine",
      description:
        "¡Tecnología de Vanguardia! Equipamiento audiovisual de última generación y soporte técnico continuo.",
      imageAlt: "Cine",
      imageSrc: "/public/carousel-4.svg",
      primaryButtonAction: () => console.log("Cine"),
      primaryButtonLabel: "Más información",
    },
  ];

  const carouselItems = [
    {
      id: 1,
      title: "Slide 1",
      description: "Descripción del Slide 1",
      imageSrc: "/public/carousel-1.svg",
    },
    {
      id: 2,
      title: "Slide 2",
      description: "Descripción del Slide 2",
      imageSrc: "/public/carousel-2.svg",
    },
    {
      id: 3,
      title: "Slide 3",
      description: "Descripción del Slide 3",
      imageSrc: "/public/carousel-3.svg",
    },
    {
      id: 4,
      title: "Slide 4",
      description: "Descripción del Slide 4",
      imageSrc: "/public/carousel-4.svg",
    },
    {
      id: 5,
      title: "Slide 5",
      description: "Descripción del Slide 5",
      imageSrc: "/public/carousel-5.svg",
    },
  ];

  return (
    <div className="w-auto h-auto p-2 flex flex-col items-center justify-start sm:justify-center sm:flex-col">
      <div className="bg-gray-600 p-[40px] rounded-2xl border-white border mt-5 md:mt-0 md:w-auto">
        <h1 className="text-white text-5xl font-bold text-center">
          Descubre el lugar perfecto para tus eventos
        </h1>
        <p className="font-light text-white my-[50px] text-2xl text-center">
          Espacios Versátiles para Cada Ocasión
        </p>
        <div className="p-5 rounded overflow-hidden relative">
          <iframe
            className="w-full h-[450px] overflow-hidden rounded-2xl"
            src="https://www.youtube.com/embed/yCZTjnlHoPU?si=cQ1WRtAvYEjHOEtk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="flex justify-center items-center gap-2 mt-3"></div>
      </div>

      <div className="py-4 w-full">
        <h1 className="text-[rgb(58,58,58)] my-8 font-bold text-4xl border-b-2 border-[rgb(16,105,165)] w-full text-start p-2">
          ¿Donde comer?
        </h1>
        <div className="w-full p-5 flex flex-col justify-center items-center gap-2 mt-5">
          <div className="md:text-center text-start lg:text-center">
            <h2 className="text-3xl text-[rgb(58,58,58)] font-bold">
              Laboratorio gastronomico
            </h2>
            <p className="font-light text-2xl text-[rgb(25,25,25)]">
              ¡Un pedacito de la gastronomía Manabita al mundo!
            </p>
          </div>
          {/* hay que hacer el componente de slider */}
          {/* <div className="bg-gray-600 w-full p-8 h-[300px] rounded-lg flex items-center justify-center">
            <h4 className="text-white text-3xl text-center">Slider</h4>
          </div> */}
          <div>
            <Carousel items={carouselItems} />
          </div>
        </div>

        <div className="py-4 w-full">
          {/** Places */}
          <h1 className="text-[rgb(58,58,58)] my-8 font-bold text-4xl border-b-2 border-[rgb(16,105,165)] w-full text-start p-2">
            Lugares
          </h1>
          <div className="md:text-center p-5 text-start lg:text-center">
            <h2 className="text-3xl text-[rgb(58,58,58)] font-bold">
              Esparios para todo tipo de eventos
            </h2>
            <p className="font-light text-2xl text-[rgb(25,25,25)]">
              Descubre el lugar perfecto para eventos de gran impacto.
            </p>
          </div>
          <div className="container p-5 flex flex-col md:flex-row gap-1 lg:flex-wrap">
            {ScenarioData.map((scenario) => (
              <SimpleCard
                key={scenario.id}
                title={scenario.title}
                subtitle={scenario.subtitle}
                description={scenario.description}
                imageAlt={scenario.imageAlt}
                imageSrc={scenario.imageSrc}
                primaryButtonAction={scenario.primaryButtonAction}
                primaryButtonLabel={scenario.primaryButtonLabel}
              />
            ))}
          </div>
        </div>

        <div className="py-4 w-full">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
