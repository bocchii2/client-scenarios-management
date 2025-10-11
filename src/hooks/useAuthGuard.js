import { useEffect } from "react";
import { useUserStore } from "../store/userSlice";
import useRedirection from "../modules/core/hooks/useRedirection";

const useAuthGuard = () => {
  const { user, setUser, logout } = useUserStore();
  const { redirectTo } = useRedirection();

  // Guardar usuario en localStorage
  const saveUserToStorage = (userData) => {
    try {
      localStorage.setItem(
        "user_session",
        JSON.stringify({
          ...userData,
          loggedIn: true,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  // Obtener usuario de localStorage
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user_session");
      if (storedUser) {
        const userData = JSON.parse(storedUser);

        // Verificar si la sesión no ha expirado (opcional: 24 horas)
        const isExpired = Date.now() - userData.timestamp > 24 * 60 * 60 * 1000;

        if (isExpired) {
          clearUserFromStorage();
          return null;
        }

        return userData;
      }
      return null;
    } catch (error) {
      console.error("Error getting user from localStorage:", error);
      clearUserFromStorage();
      return null;
    }
  };

  // Limpiar usuario de localStorage
  const clearUserFromStorage = () => {
    try {
      localStorage.removeItem("user_session");
    } catch (error) {
      console.error("Error clearing user from localStorage:", error);
    }
  };

  // Login: actualizar estado y localStorage
  const login = (userData) => {
    const userWithLogin = { ...userData, loggedIn: true };
    setUser(userWithLogin);
    saveUserToStorage(userWithLogin);
  };

  // Logout: limpiar estado y localStorage
  const handleLogout = () => {
    logout();
    clearUserFromStorage();
    redirectTo("/auth/login");
  };

  // Verificar autenticación al cargar el hook
  const checkAuthentication = () => {
    const storedUser = getUserFromStorage();

    if (storedUser) {
      // Usuario encontrado en localStorage, actualizar estado
      setUser(storedUser);
      return true;
    } else {
      // No hay usuario, redirigir al login
      redirectTo("/auth/login");
      return false;
    }
  };

  // Auto-verificación cuando el componente se monta
  useEffect(() => {
    // Solo verificar si el usuario no está logueado en el estado
    if (!user?.loggedIn) {
      checkAuthentication();
    }
  }, []);

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return user?.loggedIn || getUserFromStorage() !== null;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout: handleLogout,
    checkAuthentication,
    saveUserToStorage,
    clearUserFromStorage,
  };
};

export default useAuthGuard;
