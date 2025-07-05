import React, { useState } from "react";
import useForm from "../../../../../core/hooks/useForm";
import Input from "../../../../../../components/ui/form/input/Input";
import Checkbox from "../../../../../../components/ui/form/checkbox/Checkbox";
import Button from "../../../../../../components/ui/Button/Button";
import { login } from "../../../../services/auth/authService";
import { showToastError } from "../../../../../../components/ui/Toast/Toast";
import useRedirection from "../../../../../core/hooks/useRedirection";
import { useCombinedStore } from "../../../../../../store/userInstituteBounded";

const LoginForm = () => {
  const { redirectTo } = useRedirection();
  const { setUser } = useCombinedStore();
  const [generalError, setGeneralError] = useState("");
  const requiredFields = ["email", "password"];
  const {
    formData,
    errors,
    cleanErrors,
    handleChange,
    loading,
    validateRequiredFields,
    setLoading,
  } = useForm(
    {
      email: "",
      password: "",
      rememberMe: false,
    },
    false,
    requiredFields
  );

  const customSubmit = async (e) => {
    e.preventDefault();
    cleanErrors(); // Limpia errores anteriores antes de validar

    try {
      setLoading(true); // Inicia el loading
      setGeneralError(""); // Limpia el error general
      console.log("Iniciando sesión con:", formData);

      // 1. Validar campos requeridos
      const isValid = validateRequiredFields();

      // 4. Si hay errores personalizados o de campos requeridos, detener
      if (!isValid) {
        return;
      }

      // 5. Todo bien, enviar formulario usando loginService
      const response = await login(formData.email, formData.password);
      if (response.success) {
        // 6. Si la respuesta es exitosa, actualizar el estado y redirigir
        console.log("Inicio de sesión exitoso:", response);

        // Asegurar que el usuario esté actualizado en el store
        setUser(response.user);

        // Redirigir según el rol del usuario
        if (response.userRole === "admin") {
          redirectTo("/admin/overview");
        } else {
          redirectTo("/");
        }
      } else {
        // 7. Si hay un error, mostrar mensaje
        console.error("Error de inicio de sesión:", response.message);
        showToastError(response.message);
        setGeneralError(response.message);
        setLoading(false); // Detener el loading
      }
    } catch (error) {
      setLoading(false); // Detener el loading
      setGeneralError(
        "Error al iniciar sesión. Por favor, inténtelo de nuevo."
      );
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <form onSubmit={customSubmit} className="flex flex-col gap-4">
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
        error={errors.rememberMe}
      />
      <div className="flex flex-col gap-4">
        {generalError && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {generalError}
          </p>
        )}
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
        <div className="w-full flex items-center justify-center">
          <Button
            type="button"
            variant="link"
            label="Olvidé mi contraseña"
            size="medium"
            disabled={loading}
            onClick={() => {
              // Aquí puedes manejar la lógica para olvidar contraseña
              console.log("Olvidé mi contraseña");
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
