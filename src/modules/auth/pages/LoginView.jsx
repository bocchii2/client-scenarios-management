import React from "react";
import Button from "../../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import Logo from "../../../components/ui/Logo/Logo";
import { FaMicrosoft } from "react-icons/fa6";
import LoginForm from "../components/layout/forms/loginForm/LoginForm";

const LoginView = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
      <Logo color="gray-500" />
      <div className="w-full md:w-[70%] lg:w-1/2 p-5 rounded-lg border border-gray-400 transition-all duration-100">
        <h1 className="text-4xl py-6 text-gray-800 font-bold text-center">
          Iniciar Sesion
        </h1>
        <p className="text-sm text-gray-600 text-center mb-5">
          Bienvenido a la plataforma de reservas de escenarios. Por favor inicia sesión para continuar.
        </p>
        <LoginForm />
        <div className="text-center my-5">
          <p className="text-gray-600 text-sm font-light mb-2">
            Si no tienes una cuenta
          </p>
          <Link
            className="text-gray-700 font-bold hover:underline text-1xl"
            to="/auth/register"
          >
            Registrate
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginView;
