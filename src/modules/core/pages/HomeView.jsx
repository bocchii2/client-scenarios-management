import React from "react";

import SimpleCard from "../components/ui/simpleCard/SimpleCard";

import Carousel from "../components/ui/slider/carousel/Carousel";
import ContactUs from "../components/layout/ContactUs";
import UNIVERSITY_COLORS from "../../../constants/colors";
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
    <div className="w-full h-auto p-2 flex flex-col items-center justify-start sm:justify-center">
      <div className="p-6 sm:p-10 rounded-2xl border-white border mt-5 md:mt-0 w-full max-w-screen-lg" style={{ backgroundColor: UNIVERSITY_COLORS.secondary }}>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          Descubre el lugar perfecto para tus eventos
        </h1>
        <p className="font-light text-white my-6 sm:my-10 text-xl sm:text-2xl text-center">
          Espacios Versátiles para Cada Ocasión
        </p>
        <div className="p-2 sm:p-5 rounded overflow-hidden relative">
          <iframe
            className="w-full h-[200px] sm:h-[300px] md:h-[450px] rounded-2xl"
            src="https://www.youtube.com/embed/yCZTjnlHoPU?si=cQ1WRtAvYEjHOEtk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="py-4 w-full max-w-screen-lg">
        <h1 className="my-6 font-bold text-2xl sm:text-3xl md:text-4xl border-b-2 w-full text-start p-2"
          style={{ 
            color: UNIVERSITY_COLORS.secondary,
            borderColor: UNIVERSITY_COLORS.primary 
          }}
        >
          ¿Dónde comer?
        </h1>

        <div className="w-full p-4 flex flex-col justify-center items-center gap-4 mt-2">
          <div className="text-start sm:text-center">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: UNIVERSITY_COLORS.secondary }}>
              Laboratorio gastronómico
            </h2>
            <p className="font-light text-lg sm:text-xl text-[rgb(25,25,25)]">
              ¡Un pedacito de la gastronomía Manabita al mundo!
            </p>
          </div>

          <div className="w-full">
            <Carousel items={carouselItems} />
          </div>
        </div>

        <div className="py-4 w-full">
          <h1 
            className="my-6 font-bold text-2xl sm:text-3xl md:text-4xl border-b-2 w-full text-start p-2"
            style={{ 
              color: UNIVERSITY_COLORS.secondary,
              borderColor: UNIVERSITY_COLORS.primary 
            }}
          >
            Lugares
          </h1>

          <div className="p-4 text-start sm:text-center">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: UNIVERSITY_COLORS.secondary }}>
              Espacios para todo tipo de eventos
            </h2>
            <p className="font-light text-lg sm:text-xl text-[rgb(25,25,25)]">
              Descubre el lugar perfecto para eventos de gran impacto.
            </p>
          </div>

          <div className="p-4 flex flex-col md:flex-row lg:flex-row gap-4 justify-center items-stretch overflow-x-auto items-center">
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
