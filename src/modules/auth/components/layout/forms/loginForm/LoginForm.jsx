import React, { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import useForm from "../../../../../core/hooks/useForm";
import Input from "../../../../../../components/ui/form/input/Input";
import Checkbox from "../../../../../../components/ui/form/checkbox/Checkbox";
import Button from "../../../../../../components/ui/Button/Button";
import useRedirection from "../../../../../core/hooks/useRedirection";
import AuthService from "../../../../services/auth/authService";
import useAuthGuard from "../../../../../../hooks/useAuthGuard";
import { FaMicrosoft } from "react-icons/fa6";
import { config as ConfigMicrosoft } from "../../../../../../config/ConfigMicrosoft";
import SimpleInfoCard from "../../../../../../components/ui/card/SimpleInfoCard";

const LoginForm = () => {
  const authService = React.useRef(new AuthService());
  const { redirectTo } = useRedirection();
  const { setAuth } = useAuthGuard({ redirectTo: "/", redirectIfAuthenticated: true });
  const [generalError, setGeneralError] = useState("");

  const requiredFields = ["email", "password"];
  const initialFormState = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // ✅ Inicializar MSAL correctamente
  const publicClientApplicationRef = React.useRef(null);


  // 🔹 Extraer cédula desde correo institucional (ej: u1311836587@uleam.edu.ec → 1311836587)
  function extractCedulaFromUsername(username) {
    const parts = username.split("@");
    if (parts.length === 2 && parts[0].length > 1) {
      return parts[0].slice(1);
    }
    return null;
  }

  React.useEffect(() => {
    const initMsal = async () => {
      try {
        const pca = new PublicClientApplication({
          auth: {
            clientId: ConfigMicrosoft.appId,
            authority: ConfigMicrosoft.authority,
            redirectUri: ConfigMicrosoft.redirectUri,
          },
        });
        await pca.initialize();
        publicClientApplicationRef.current = pca;
      } catch (error) {
        console.error("Error initializing MSAL:", error);
      }
    };

    initMsal();
  }, []);

  const {
    formData,
    errors,
    cleanErrors,
    handleChange,
    loading,
    validateRequiredFields,
    setLoading,
  } = useForm(initialFormState, false, requiredFields);

  // ===== LOGIN MANUAL =====
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      cleanErrors();
      setGeneralError("");
      if (!validateRequiredFields()) return;

      setLoading(true);
      const resp = await authService.current.login(
        formData.email,
        formData.password
      );
      setLoading(false);

      if (!resp || resp.success === false) {
        setGeneralError(resp?.message || "Credenciales inválidas");
        return;
      }

      const { user, token } = resp;
      if (!user || !token) {
        setGeneralError("Respuesta inválida desde el servidor.");
        return;
      }

      setAuth(user, token, formData.rememberMe);
      redirectTo("/");
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setGeneralError(
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
      setLoading(false);
    }
  };

  // ===== LOGIN CON MICROSOFT =====
  const handleMicrosoftLogin = async () => {
    try {
      cleanErrors();
      setGeneralError("");
      setLoading(true);

      if (!publicClientApplicationRef.current) {
        setGeneralError("Error al conectar con Microsoft. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      console.log("🔵 Iniciando login con Microsoft...");

      // Abrir popup de login
      const loginResponse = await publicClientApplicationRef.current.loginPopup({
        scopes: ConfigMicrosoft.scopes,
        prompt: "select_account",
      });

      console.log("✅ Respuesta completa de Microsoft:", loginResponse);
      console.log("📧 Email/Username:", loginResponse.account?.username);
      console.log("👤 Nombre:", loginResponse.account?.name);

      const { accessToken, account } = loginResponse;
      const { name, username } = account;

      if (!accessToken || !username) {
        setGeneralError(
          "No se pudo obtener la información de Microsoft. Intenta de nuevo."
        );
        console.error("❌ Error: Faltan datos de Microsoft");
        setLoading(false);
        return;
      }

      // 🔹 Extraer cédula aquí
      const cedula = extractCedulaFromUsername(username);
      console.log("🎓 Cédula extraída:", cedula);

      console.log("🚀 Enviando datos a tu API Laravel");

      const resp = await authService.current.loginWithMicrosoft({
        nombre: name,
        email: username,
        cedula,
      });

      console.log("✅ Respuesta del servidor Laravel:", resp);
      setLoading(false);

      if (!resp || resp.success === false) {
        setGeneralError(
          resp?.message ||
          "Error al autenticar con Microsoft. Verifica tus credenciales."
        );
        console.error("❌ Error en autenticación Laravel:", resp);
        return;
      }

      const { user, token } = resp;

      if (!user || !token) {
        setGeneralError("Respuesta inválida desde el servidor.");
        console.error("❌ Error: Faltan user o token en respuesta");
        return;
      }

      console.log("✅ ¡Login exitoso! Guardando sesión...");
      console.log("👤 Usuario:", user);
      console.log("🔐 Token:", token);

      // ✅ Guardar sesión y redirigir
      setAuth(user, token, true);

      console.log("🚀 Redirigiendo a la pantalla principal...");
      redirectTo("/");
    } catch (error) {
      console.error("❌ Error durante Microsoft login:", error);
      setLoading(false);

      if (error.errorCode === "AADB2C90118") {
        setGeneralError("Debes registrarte primero en Microsoft.");
      } else if (error.errorCode === "user_cancelled") {
        setGeneralError("Cancelaste el login de Microsoft.");
      } else {
        setGeneralError(
          "Ocurrió un error con Microsoft. Por favor, intenta de nuevo."
        );
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Error Card */}
      {generalError && (
        <SimpleInfoCard
          title="Error de autenticación"
          message={generalError}
          variant="error"
          onClose={() => setGeneralError("")}
          showCloseButton={true}
        />
      )}

      <Input
        value={formData.email}
        onChange={handleChange}
        label="Correo Electrónico"
        id="email"
        name="email"
        type="email"
        placeholder="Ingrese su correo electrónico"
        error={errors.email}
        disabled={loading}
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
        disabled={loading}
      />
      <Checkbox
        checked={formData.rememberMe}
        label={"Recordar mi sesión"}
        id="rememberMe"
        name="rememberMe"
        onChange={handleChange}
        value={formData.rememberMe}
        error={errors.rememberMe}
        disabled={loading}
      />

      <div className="flex flex-col gap-4">
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
      </div>

      <div className="relative my-5 w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-600" />
        </div>
        <div className="relative z-10 flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            si eres miembro de la comunidad universitaria
          </span>
        </div>
      </div>

      <div>
        <Button
          label={"Iniciar Sesión con Microsoft365 ULEAM"}
          size="medium"
          variant="primary"
          type="button"
          icon={<FaMicrosoft size={20} className="text-white" />}
          disabled={loading}
          onClick={handleMicrosoftLogin}
        />
      </div>
    </form>
  );
};

export default LoginForm;