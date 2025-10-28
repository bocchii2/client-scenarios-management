import ApiService from "../../../core/services/apiServices/api";

class AuthService extends ApiService {
  constructor() {
    super("/api/auth");
  }

  /**
   * Retorna { success: boolean, user?, token?, message? }
   * NO persiste en localStorage/sessionStorage para dejar esa responsabilidad al hook useAuthGuard
   */
  async login(email, password) {
    try {
      const payload = {
        correo_electronico: email,
        password,
      };
      const resp = await this.post("/login", payload);
      const data = resp && resp.data ? resp.data : resp;

      // Normalizar posibles formas de respuesta
      const user = data.user || data.usuario || data.data?.user || null;
      const token =
        data.token ||
        data.access_token ||
        data.accessToken ||
        data.data?.token ||
        null;

      return { success: true, user, token, raw: data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
        error,
      };
    }
  }

  async logout() {
    try {
      await this.post("/logout");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Logout failed",
      };
    }
  }

  async register(email, password) {
    try {
      const resp = await this.post("/register", { email, password });
      const data = resp && resp.data ? resp.data : resp;
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  }
}

export default AuthService;
