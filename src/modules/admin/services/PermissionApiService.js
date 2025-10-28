import axios from "axios";
import ApiService from "../../core/services/apiServices/api";
import PermissionsAdapter from "../adapters/PermissionsAdapter";

class PermissionApiService extends ApiService {
  constructor() {
    super("/api/permisos");
  }

  async getPermissions() {
    const response = await this.get("/");
    const data = response && response.data ? response.data : [];
    console.log("Fetched permissions data:", data);
    return Array.isArray(data)
      ? data.map(PermissionsAdapter.toViewPermissions)
      : [];
  }
  async getPermissionById(id) {
    const response = await this.get(`/${id}`);
    const data = response && response.data ? response.data : null;
    return PermissionsAdapter.toViewPermissions(data);
  }

  async createPermission(data) {
    return this.post("/", data);
  }

  async updatePermission(id, data) {
    return this.put(`/${id}`, data);
  }

  async deletePermission(id) {
    return this.delete(`/${id}`);
  }

  async getPermissionByEntity(entityType) {
    const response = await this.get(`/entidad/${entityType}`);
    const data = response && response.data ? response.data : null;
    console.log("Fetched permissions for entity data:", data);
    return data;
  }
}

export default PermissionApiService;
