import Card from "../../../components/ui/card/Card";
import CardHeader from "../../../components/ui/card/CardHeader";
import CardBody from "../../../components/ui/card/CardBody";
import CardFotter from "../../../components/ui/card/CardFotter";
import Label from "../../../components/ui/label/Label";
import { FaCheck } from "react-icons/fa";
import Button from "../../../components/ui/Button/Button";
import { FaX } from "react-icons/fa6";
import { PLACES_DATA } from "../services/apiServices/PlacesData";
import ContactUs from "../components/layout/ContactUs";
import useRedirection from "../hooks/useRedirection";
import Breadcrum from "../../../components/ui/breadcrums/Breadcrum";
import useBreadcrums from "../hooks/useBreadcrums";

const ScenariosMainView = () => {
  const { redirectToWithId } = useRedirection();
  const { arrayOfUriPath } = useBreadcrums(window.location.pathname);
  return (
    <div className="w-auto h-auto p-2 flex flex-col items-center justify-start sm:justify-center sm:flex-col">
      {/*       <div className="flex gap-1 my-2 bg-white border-b border-gray-200 p-5 w-full">
        <Breadcrum arrayOfUriPath={arrayOfUriPath} />
      </div>
      <div className="bg-gray-600 p-[40px] rounded-2xl border-white border mt-5 md:mt-0 md:w-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-white font-bold text-center text-xl sm:text-4xl">
            Espacios perfectos para tus eventos con alcance internacional.
          </h1>
          <p className="font-light text-white my-2 sm:my-[50px] text-2xl text-center">
            Conoce más aquí
          </p>
          <video
            src="/public/PROMO ULEAM.mp4"
            controls
            className="w-full h-[450px] rounded-2xl mt-5"
            autoPlay
            muted
          >
            <source src="/public/PROMO ULEAM.mp4" type="video/mp4" />
          </video>
          {/*           <iframe
            src="https://www.youtube.com/embed/0qn5Hajrd5c?si=zduYCnzqm6ft2EIk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="w-full h-[450px] rounded-2xl mt-5"
          ></iframe> 
        </div>
      </div> */}

      <div className="py-4 w-full">
        <h1 className="text-gray-700 font-bold text-center text-xl sm:text-4xl">
          Auditorios, Salas y Plazas.
        </h1>
        <p className="text-gray-700 font-light text-center text-lg sm:text-2xl">
          Espacios para cada ocasión, escoge el lugar perfecto según tú
          necesidad.
        </p>
        <div className=" mx-auto mt-5 flex flex-wrap gap-1 md:gap-5 justify-center">
          {PLACES_DATA.map((place) => (
            <Card
              key={place.id}
              className={"flex flex-col gap-2"}
              height="auto"
            >
              <CardHeader>
                <img
                  src={place.imgUrl}
                  alt={place.title}
                  className="w-full object-cover rounded-lg h-[200px] md:h-auto"
                />
                <div className="flex items-center justify-between my-2">
                  <h1 className="font-bold text-2xl text-gray-700 ">
                    {place.title}
                  </h1>
                  <Label
                    label={place.status}
                    type={place.available ? "success" : "danger"}
                    icon={place.available ? <FaCheck /> : <FaX />}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <div className="w-full h-auto">
                  <h3 className="text-lg font-semibold text-gray-600">
                    {place.subtitle}
                  </h3>
                  <p>{place.description}</p>
                </div>
              </CardBody>
              <CardFotter className="flex items-center justify-between">
                <Button
                  label={"Mas informacion"}
                  onClick={() => redirectToWithId("/uleam", place.id)}
                  variant="primary"
                />
              </CardFotter>
            </Card>
          ))}
        </div>
        <div className="py-4 w-full">
          <h1 className="text-gray-700 font-bold text-center text-xl sm:text-4xl">
            Centro de Convenciones del Pacifico
          </h1>
          <div className="w-full flex h-auto p-3 rounded overflow-hidden">
            <div className="w-1/3 h-auto bg-gray-800 flex flex-col items-start justify-between p-5 rounded ">
              <h2 className="text-2xl font-bold text-white">
                Tu evento a Otro Nivel
              </h2>
              <p className="font-semibold text-lg text-white">
                Espacios versátiles para actividades de capacitación,
                aprendizaje, difusión y desarrollo productivo internacional.
              </p>
              <div className="mt-5 w-full flex items-center justify-center">
                <Button
                  label={"Mas informacion"}
                  onClick={() => alert("button clicked")}
                  variant="primary"
                />
              </div>
            </div>
            <div className=" flex gap-2w-full h-auto">
              <img
                src="/public/cconvencionArtboard-2-copy-7-709x1024.png"
                alt="centro de convenciones del pacifico"
                className="w-1/3 h-auto object-cover"
              />
              <img
                src="/public/cconvencionArtboard-2-copy-8-709x1024.png"
                alt="centro de convenciones del pacifico"
                className="w-1/3 h-auto object-cover"
              />
              <img
                src="/public/cconvencionArtboard-2-copy-9.png"
                alt="centro de convenciones del pacifico"
                className="w-1/3 h-auto object-cover"
              />
            </div>
          </div>
        </div>
        <div className="py-4 w-full">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default ScenariosMainView;
