import axios from "axios";
import ApiService from "../../core/services/apiServices/api";

class RolesApiService extends ApiService {
  constructor() {
    super("/api/roles");
  }

  async getAllRoles() {
    const response = await this.get("/");
    console.log("Respuesta de getAllRoles:", response);
    return response.data;
  }

  async getRoleById(id) {
    const response = await this.get(`/${id}`);
    return response.data;
  }

  async createRole(data) {
    const response = await this.post("/", data);
    return response.data;
  }

  async updateRole(id, data) {
    const response = await this.put(`/${id}`, data);
    return response.data;
  }

  async deleteRole(id) {
    const response = await this.delete(`/${id}`);
    return response.data;
  }
}

export default RolesApiService;
