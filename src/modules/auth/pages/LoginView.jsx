import React from "react";
import { FaHotel, FaMicrosoft } from "react-icons/fa";
import Input from "../../../components/ui/form/input/Input";
import useForm from "../../core/hooks/useForm";
import Button from "../../../components/ui/Button/Button";
import Checkbox from "../../../components/ui/form/checkbox/Checkbox";
import { Link } from "react-router-dom";
const LoginView = () => {
  const { formData, errors, handleSubmit, handleChange, loading } = useForm(
    {
      email: "",
      password: "",
      rememberMe: false,
    },
    true
  );
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full flex items-center justify-center mb-5 gap-2">
        <FaHotel size={40} className="text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-600 text-center">
          Escenarios ULEAM
        </h2>
      </div>
      <div className="w-full md:w-[70%] lg:w-1/2 p-5 rounded-lg border border-gray-400 transition-all duration-100">
        <h1 className="text-2xl text-gray-800 font-bold text-center">
          Iniciar Sesion
        </h1>
        <p className="text-sm text-gray-600 text-center mb-5">
          Bienvenido a la plataforma de reservas de escenarios ULEAM. Por favor
          inicia sesión para continuar.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            value={formData.email}
            onChange={handleChange}
            label="Correo Electrónico"
            id="email"
            name="email"
            type="email"
            placeholder="Ingrese su correo electrónico"
            error={errors.email}
          />
          <Input
            value={formData.password}
            onChange={handleChange}
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            placeholder="Ingrese su contraseña"
            error={errors.password}
          />
          <Checkbox
            checked={formData.rememberMe}
            label={"Recordar mi sesión"}
            id="rememberMe"
            name="rememberMe"
            onChange={handleChange}
            value={formData.rememberMe}
          />
          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              variant="primary"
              label="Iniciar Sesión"
              loading={loading}
              size="medium"
              disabled={loading}
            />
          </div>
        </form>
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
            loading={loading}
            disabled={loading}
            icon={<FaMicrosoft size={20} className="text-white" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
