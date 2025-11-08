import ApiService from "../../../core/services/apiServices/api";
import userAdapter from "../adapters/UserAdapter";

class UserApiService extends ApiService {
  constructor() {
    super("/api/usuarios");
  }

  async getUsers() {
    try {
      // ApiService.get() ya devuelve response.data
      const response = await this.get("/");
      console.log("========== getUsers response completo ==========");
      console.log("response:", response);
      console.log("typeof response:", typeof response);
      console.log("Array.isArray(response):", Array.isArray(response));
      console.log("========== FIN getUsers response ==========");

      // response ya es response.data, así que verificar directamente
      const users = Array.isArray(response)
        ? response
        : response?.data || response?.usuarios || [];

      console.log("users después de verificar:", users);
      console.log("users.length:", users.length);

      // Adaptar cada usuario del array
      const adaptedUsers = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`Adaptando usuario ${i}:`, user);
        const adapted = userAdapter(user);
        console.log(`Usuario ${i} adaptado:`, adapted);
        adaptedUsers.push(adapted);
      }

      console.log("Total de usuarios adaptados:", adaptedUsers.length);
      console.log("Usuarios adaptados en getUsers:", adaptedUsers);
      return adaptedUsers;
    } catch (error) {
      console.error("Error en getUsers:", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const response = await this.get(`/${id}`);
      return userAdapter(response.data);
    } catch (error) {
      console.error("Error en getUserById:", error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const response = await this.post("/", userData);
      return userAdapter(response.data);
    } catch (error) {
      console.error("Error en createUser:", error);
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await this.put(`/${id}`, userData);
      return userAdapter(response.data);
    } catch (error) {
      console.error("Error en updateUser:", error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await this.delete(`/${id}`);
    } catch (error) {
      console.error("Error en deleteUser:", error);
      throw error;
    }
  }

  async updateProfilePicture(id, file) {
    try {
      const formData = new FormData();
      formData.append("profile_image", file);
      const response = await this.post(`/${id}/upload-profile-image`, formData);
      return response;
    } catch (error) {
      console.error("Error en updateProfilePicture:", error);
      throw error;
    }
  }
}

export default UserApiService;
