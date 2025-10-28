import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileUser from "./profile/ProfileUserCard";
import Button from "../../../../components/ui/Button/Button";
import { FaX } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import useAuthGuard from "../../../../hooks/useAuthGuard";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthGuard();

  const handleProfileClick = () => {
    navigate('/admin/overview');
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => navigate("/auth/login");
  const handleRegister = () => navigate("/auth/register");

  return (
    <header className="w-full bg-[rgb(16,105,165)] text-white shadow-md">
      <div className="flex items-center justify-between px-4 pt-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Espacios ULEAM</h1>
          <p className="text-sm font-light">El mejor lugar para tus eventos</p>
        </div>
        {isAuthenticated && <ProfileUser onClick={handleProfileClick} />}
      </div>

      <div className="flex items-center justify-between px-4 py-3 md:px-7 md:py-4">
        {/* Menú hamburguesa solo visible en móvil */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaX size={28} /> : <FaBars size={28} />}
        </button>

        {/* Menú de navegación desktop */}
        <nav className="hidden md:flex gap-2 items-center">
          <Link
            to="/"
            className="py-2 px-3 hover:bg-white hover:text-[rgb(16,105,165)] transition-all duration-100"
          >
            Inicio
          </Link>
          <Link
            to="/uleam"
            className="py-2 px-3 hover:bg-white hover:text-[rgb(16,105,165)] transition-all duration-100"
          >
            ULEAM
          </Link>
          <Link
            to="/uleam/servicios"
            className="py-2 px-3 hover:bg-white hover:text-[rgb(16,105,165)] transition-all duration-100"
          >
            Servicios
          </Link>
        </nav>
        {/* Botones Login/Perfil Desktop */}
        <div className="hidden md:flex gap-2 items-center">
          {!isAuthenticated && (
            <>
              <Button
                variant="link"
                label="Iniciar Sesión"
                onClick={handleLogin}
                size="medium"
                type="button"
              />
              <button
                className="py-2 px-3 rounded border border-white hover:bg-white hover:text-[rgb(16,105,165)] transition-all"
                onClick={handleRegister}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div
          className="md:hidden flex flex-col items-center gap-2 px-4 pb-4 
               animate-slide-down transition-all duration-300 ease-out
               overflow-hidden"
        >
          <Link
            to="/"
            className="w-full text-center py-2"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/uleam"
            className="w-full text-center py-2"
            onClick={() => setIsOpen(false)}
          >
            ULEAM
          </Link>
          <Link
            to="/uleam/servicios"
            className="w-full text-center py-2"
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </Link>
          <Link
            to="/uleam/cotizaciones"
            className="w-full text-center py-2"
            onClick={() => setIsOpen(false)}
          >
            Cotizaciones
          </Link>

          {/* Botones Login/Perfil Mobil */}
          {isAuthenticated ? (
            <ProfileUser onClick={handleProfileClick} />
          ) : (
            <>
              <Button
                variant="link"
                label="Iniciar Sesión"
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                size="medium"
                type="button"
              />
              <button
                className="w-full py-2 border border-white rounded hover:bg-white hover:text-[rgb(16,105,165)] transition-all cursor-pointer"
                onClick={() => {
                  handleRegister();
                  setIsOpen(false);
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
