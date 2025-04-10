import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../../store/user";
import ProfileUser from "./profile/ProfileUser";
import Button from "../../../../components/ui/Button/Button";

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn } = useUserStore((state) => state.user);
  const handleLogin = () => {
    navigate("/auth/login");
  };
  const handleRegister = () => {
    navigate("/auth/register");
  };
  return (
    <div className="w-screen h-auto px-3 bg-[rgb(16,105,165)] text-white flex flex-col justify-around items-center">
      <div className="py-5 text-center">
        <h1 className="font-bold text-white text-3xl">Manta Convenciones</h1>
        <p className="font-light text-sm text-center text-white">
          El mejor lugar para tus eventos
        </p>
      </div>
      <div className="w-screen mt-3 flex items-center justify-between px-7 py-2">
        <nav className="flex justify-center items-center gap-2 h-auto ">
          <div className="list-none flex gap-1">
            <Link
              to="/"
              className="py-2 px-3 bg-transparent text-white border-1 border-transparent hover:bg-white hover:text-[rgb(16,105,165)] cursor-pointer transition-all duration-100 focus-within:outline-none "
            >
              Inicio
            </Link>
            <Link
              to="/uleam"
              className="py-2 px-3 bg-transparent text-white border-1 border-transparent hover:bg-white hover:text-[rgb(16,105,165)] cursor-pointer transition-all duration-100 focus-within:outline-none "
            >
              ULEAM
            </Link>

            <Link
              to="/uleam/servicios"
              className="py-2 px-3 bg-transparent text-white border-1 border-transparent hover:bg-white hover:text-[rgb(16,105,165)] cursor-pointer transition-all duration-100 focus-within:outline-none "
            >
              Servicios
            </Link>

            <Link
              className="py-2 px-3 bg-transparent text-white border-1 border-transparent hover:bg-white hover:text-[rgb(16,105,165)] cursor-pointer transition-all duration-100 focus-within:outline-none "
              to="/uleam/cotizaciones"
            >
              Cotizaciones
            </Link>
          </div>
        </nav>
        <div className="list-none flex gap-2 items-center justify-center">
          {loggedIn ? (
            <ProfileUser />
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <Button
                variant="link"
                label="Iniciar Sesion"
                onClick={handleLogin}
                size="medium"
                type="button"
              />
              <button
                className="py-2 px-3 bg-transparent text-white rounded border-1 border-white hover:bg-white hover:text-[rgb(16,105,165)] cursor-pointer transition-all duration-100 focus-within:outline-none "
                onClick={handleRegister}
                type="button"
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
