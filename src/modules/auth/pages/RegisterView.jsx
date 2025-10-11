import React from "react";
import Logo from "../../../components/ui/Logo/Logo";
import SimpleDialog from "../../../components/ui/dialog/SimpleDialog";
import RegisterForm from "../components/layout/forms/RegisterForm/RegisterForm";
const RegisterView = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
      <Logo color="gray-500" />
      <div className="w-full md:w-[70%] lg:w-1/2 p-5 rounded-lg border border-gray-400 transition-all duration-100">
        <h1 className="text-2xl text-gray-800 font-bold text-center">
          Registrarse
        </h1>
        <p className="text-sm text-gray-600 text-center mb-5">
          Bienvenido a la plataforma de reservas de escenarios. Para poder acceder a la plataforma, es necesario que te registres.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterView;
