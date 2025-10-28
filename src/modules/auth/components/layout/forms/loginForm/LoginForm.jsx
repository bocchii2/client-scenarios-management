import React, { useState } from "react";
import useForm from "../../../../../core/hooks/useForm";
import Input from "../../../../../../components/ui/form/input/Input";
import Checkbox from "../../../../../../components/ui/form/checkbox/Checkbox";
import Button from "../../../../../../components/ui/Button/Button";
import useRedirection from "../../../../../core/hooks/useRedirection";
import AuthService from "../../../../services/auth/authService";
import useAuthGuard from "../../../../../../hooks/useAuthGuard";

const LoginForm = () => {

  const authService = React.useRef(new AuthService());
  const { redirectTo } = useRedirection();
  const [generalError, setGeneralError] = useState("");
  const requiredFields = ["email", "password"];
  let initialFormState = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // proteger página: si ya autenticado redirige al root
  const { setAuth, user: currentUser } = useAuthGuard({ redirectTo: "/", redirectIfAuthenticated: true });

  const {
    formData,
    errors,
    cleanErrors,
    handleChange,
    loading,
    validateRequiredFields,
    setLoading,
  } = useForm(initialFormState, false, requiredFields);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      cleanErrors();
      setGeneralError("");
      if (!validateRequiredFields()) return;

      setLoading(true);
      const resp = await authService.current.login(formData.email, formData.password);
      setLoading(false);

      if (!resp || resp.success === false) {
        setGeneralError(resp?.message || "Credenciales inválidas");
        return;
      }

      // resp contains { success: true, user, token }
      const { user, token } = resp;
      if (!user || !token) {
        setGeneralError("Respuesta inválida desde el servidor.");
        return;
      }

      // guarda sesión (sessionStorage o localStorage según rememberMe)
      setAuth(user, token, formData.rememberMe);

      // redirigir
      redirectTo("/");
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setGeneralError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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