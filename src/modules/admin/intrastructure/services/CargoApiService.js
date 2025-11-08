import axios from "axios";
import ApiService from "../../../core/services/apiServices/api";
import CargoAdapter from "../adapters/CargoAdapter";

class CargoApiService extends ApiService {
  constructor() {
    super("/api/cargos");
  }

  async getCargos() {
    const response = await this.get("/");
    console.log("Respuesta de getCargos:", response);
    const data = response && response.data ? response.data : [];
    return data.map(CargoAdapter.toCargo);
  }
  async getCargoById(id) {
    const response = await this.get(`/${id}`);
    console.log("Respuesta de getCargoById:", response);
    return CargoAdapter.toCargo(response.data);
  }

  async createCargo(data) {
    const response = await this.post("/", data);
    console.log("Respuesta de createCargo:", response);
    const dataApi = response && response.data ? response.data : null;
    return CargoAdapter.toCargo(dataApi);
  }

  async updateCargo(id, data) {
    const response = await this.put(`/${id}`, data);
    const dataApi = response && response.data ? response.data : null;
    return CargoAdapter.toCargo(dataApi);
  }

  async deleteCargo(id) {
    const response = await this.delete(`/${id}`);
    console.log("Respuesta de deleteCargo:", response);
    // La API solo devuelve un mensaje, no necesita adaptar
    return response;
  }
}

export default CargoApiService;
