import axios from "axios";
import ApiService from "../../core/services/apiServices/api";
import DepartmentAdapter from "../adapters/DepartmentAdapter";

class DepartmentApiService extends ApiService {
  constructor() {
    super("/api/departamentos");
  }

  async getDepartments() {
    const response = await this.get("/");
    const data = response && response.data ? response.data : [];
    // mapear cada elemento al dominio
    console.log("Respuesta de getDepartments:", response);
    return Array.isArray(data) ? data.map(DepartmentAdapter.toDomain) : [];
  }

  async getDepartmentById(departmentId) {
    const response = await this.get(`/${departmentId}`);
    const data = response && response.data ? response.data : null;
    return DepartmentAdapter.toDomain(data);
  }

  async createDepartment(departmentData) {
    return this.post("/", departmentData);
  }

  async updateDepartment(departmentId, departmentData) {
    return this.put(`/${departmentId}`, departmentData);
  }

  async deleteDepartment(departmentId) {
    return this.delete(`/${departmentId}`);
  }

  async getParentDepartment(departmentId) {
    return this.get(`/${departmentId}/departamento_padre`);
  }

  async getUsuariosDepartamento(departmentId) {
    return this.get(`/${departmentId}/usuarios`);
  }
}
export default DepartmentApiService;
