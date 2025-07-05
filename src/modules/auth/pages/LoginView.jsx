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
        <h1 className="text-2xl text-gray-800 font-bold text-center">
          Iniciar Sesion
        </h1>
        <p className="text-sm text-gray-600 text-center mb-5">
          Bienvenido a la plataforma de reservas de escenarios ULEAM. Por favor
          inicia sesión para continuar.
        </p>
        <LoginForm />
        <div className="text-center my-5">
          <p className="text-gray-600 text-sm font-bold">
            Si no tienes una cuenta y no eres miembro de la comunidad
            universitaria
          </p>
          <Link
            className="text-gray-700 font-bold hover:underline"
            to="/auth/register"
          >
            Registrate
          </Link>
        </div>
        <div className="relative my-5 w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative z-10 flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              si eres miembro de la comunidad universitaria
            </span>
          </div>
        </div>
        <div>
          <Button
            label={"Iniciar Sesión con Office365"}
            variant="secondary"
            size="medium"
            type="button"
            icon={<FaMicrosoft size={20} className="text-white" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
