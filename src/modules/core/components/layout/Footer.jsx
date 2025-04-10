import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-screen h-auto px-3 bg-[rgb(1,112,185)] text-white flex flex-col justify-around items-center">
      <div>
        <div className="w-screen h-[200px] mt-3 flex items-center justify-between px-[60px]">
          <nav className="flex justify-center items-center gap-2 h-auto ">
            <div className="list-none gap-1 sm:flex md:flex lg:flex hidden">
              <Link
                to="/"
                className="py-2 px-3 bg-transparent text-white hover:underline hover:text-white cursor-pointer transition-all duration-100"
              >
                Inicio
              </Link>
              <Link
                to="/uleam"
                className="py-2 px-3 bg-transparent text-white hover:underline hover:text-white cursor-pointer transition-all duration-100"
              >
                ULEAM
              </Link>

              <Link
                to="/uleam/servicios"
                className="py-2 px-3 bg-transparent text-white hover:underline hover:text-white cursor-pointer transition-all duration-100"
              >
                Servicios
              </Link>

              <Link
                to={"/uleam/cotizaciones"}
                className="py-2 px-3 bg-transparent text-white hover:underline hover:text-white cursor-pointer transition-all duration-100"
              >
                Cotizaciones
              </Link>
            </div>
          </nav>
          <div className="list-none flex gap-5 items-center justify-center">
            <p className="text-white font-bold">Redes sociales</p>
            <a href="">
              <FaInstagram size={25} />
            </a>
            <a href="">
              <FaFacebook size={25} />
            </a>
            <a href="">
              <FaXTwitter size={25} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-[rgb(16,105,165)] w-screen h-[50px] flex items-center justify-center">
        <p className="text-white text-xs">
          © 2024 Dirección de Comunicación e Imagen Institucional ULEAM. Todos
          los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;
