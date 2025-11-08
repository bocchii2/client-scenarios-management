import axios from "axios";
import ApiService from "../../../core/services/apiServices/api";
class DepartmentCategoryService extends ApiService {
  constructor() {
    super("/api/categoria_departamentos");
  }

  async getDepartmentCategories() {
    const response = await this.get("/");
    console.log("Response from getDepartmentCategories:", response);
    const dataApi = response && response.data ? response.data : [];
    return dataApi;
  }

  async getDepartmentCategoryById(id) {
    const response = await this.get(`/${id}`);
    const dataApi = response && response.data ? response.data : null;
    return dataApi;
  }

  async createDepartmentCategory(data) {
    const response = await this.post("/", data);
    const dataApi = response && response.data ? response.data : null;
    return dataApi;
  }

  async updateDepartmentCategory(id, data) {
    const response = await this.put(`/${id}`, data);
    const dataApi = response && response.data ? response.data : null;
    return dataApi;
  }

  async deleteDepartmentCategory(id) {
    const response = await this.delete(`/${id}`);
    const dataApi = response && response.data ? response.data : null;
    return dataApi;
  }
}

export default DepartmentCategoryService;
