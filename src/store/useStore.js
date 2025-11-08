import { create } from "zustand";
import axios from "axios";
import userAdapter from "../modules/admin/intrastructure/adapters/UserAdapter";

/* ...existing code... */
// Claves de storage
const KEY_USER = "APP_AUTH_USER";
const KEY_TOKEN = "APP_AUTH_TOKEN";

// Leer almacenado (localStorage preferido sobre sessionStorage)
const readStorage = () => {
  const userJson =
    localStorage.getItem(KEY_USER) || sessionStorage.getItem(KEY_USER);
  const token =
    localStorage.getItem(KEY_TOKEN) || sessionStorage.getItem(KEY_TOKEN);
  return {
    user: userJson ? JSON.parse(userJson) : null,
    token: token || null,
    remember: !!localStorage.getItem(KEY_TOKEN),
  };
};

// Escribir según remember
const writeStorage = (user, token, remember) => {
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  if (user) target.setItem(KEY_USER, JSON.stringify(user));
  if (token) target.setItem(KEY_TOKEN, token);
  other.removeItem(KEY_USER);
  other.removeItem(KEY_TOKEN);
};

// Limpiar ambos
const clearStorage = () => {
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_TOKEN);
  sessionStorage.removeItem(KEY_USER);
  sessionStorage.removeItem(KEY_TOKEN);
};

export const useAuthStore = create((set, get) => {
  const stored = readStorage();
  // si hay token almacenado, aplicarlo a axios
  if (stored.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${stored.token}`;

  return {
    user: stored.user ?? null,
    token: stored.token ?? null,
    remember: stored.remember ?? false,
    isAuthenticated: !!stored.user,
    // establece auth a partir de user normalizado y token
    setAuth: (user, token, remember = false) => {
      if (!user || !token) return;
      writeStorage(user, token, remember);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ user, token, remember, isAuthenticated: true });
    },
    // recibe la respuesta del login y normaliza automáticamente
    setAuthFromResponse: (loginResponse, remember = false) => {
      if (!loginResponse) return;
      // posibles claves: access_token / token / accessToken
      const token =
        loginResponse.access_token ||
        loginResponse.token ||
        loginResponse.accessToken ||
        (loginResponse.data &&
          (loginResponse.data.access_token || loginResponse.data.token)) ||
        null;
      const apiUser =
        loginResponse.user ||
        loginResponse.usuario ||
        loginResponse.data?.user ||
        loginResponse.data?.usuario ||
        loginResponse.user_data ||
        null;
      const user = userAdapter(apiUser);
      if (!user || !token) return;
      writeStorage(user, token, remember);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ user, token, remember, isAuthenticated: true });
    },
    // actualizar campos del usuario en el store (por ejemplo después de editar perfil)
    updateUser: (patch) => {
      const current = get().user;
      if (!current) return;
      const updated = { ...current, ...patch };
      // mantener raw si el patch incluye raw modificaciones es responsabilidad del caller
      writeStorage(updated, get().token, get().remember);
      set({ user: updated });
    },
    clearAuth: () => {
      clearStorage();
      delete axios.defaults.headers.common["Authorization"];
      set({ user: null, token: null, remember: false, isAuthenticated: false });
    },
    // utilitarios
    hasRole: (slug) => {
      const u = get().user;
      if (!u) return false;
      return (u.roleSlugs || []).includes(slug);
    },
    hasAnyRole: (slugs = []) => {
      const u = get().user;
      if (!u) return false;
      return slugs.some((s) => (u.roleSlugs || []).includes(s));
    },
    // inicializa desde storage si es necesario (p. ej. en entrypoint)
    initFromStorage: () => {
      const s = readStorage();
      if (s.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${s.token}`;
      set({
        user: s.user,
        token: s.token,
        remember: !!s.token && !!localStorage.getItem(KEY_TOKEN),
        isAuthenticated: !!s.user,
      });
    },
    isLoggedIn: () => {
      return get().isAuthenticated;
    },
  };
});
/* ...existing code... */
// ejemplo de uso:
// const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
// comprobar isAuthenticated, llamar a setAuth(user, token, remember) al loguear, clearAuth() al desloguear
// const isLoggedIn = useAuthStore((s) => s.isAuthenticated);
// const loggedIn = useAuthStore((s) => s.isLoggedIn());
