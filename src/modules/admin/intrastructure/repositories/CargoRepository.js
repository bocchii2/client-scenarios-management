import CargoApiService from "../services/CargoApiService";
import { ICargoRepository } from "../../domain/repositories/ICargoRepository";
import { Cargo } from "../../domain/entities/Cargo";

/**
 * Implementación del repositorio de Cargos
 * Actúa como puente entre la capa de infraestructura y el dominio
 */
export class CargoRepository extends ICargoRepository {
  constructor(apiService = null) {
    super();
    this.apiService = apiService || new CargoApiService();
  }

  async getAll() {
    try {
      const response = await this.apiService.getCargos();
      // Mapear a entidades del dominio
      return response.map((data) => Cargo.fromAPI(data));
    } catch (error) {
      console.error("Error en CargoRepository.getAll():", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await this.apiService.getCargoById(id);
      return Cargo.fromAPI(response);
    } catch (error) {
      console.error(`Error en CargoRepository.getById(${id}):`, error);
      throw error;
    }
  }

  async create(cargo) {
    try {
      const payload = cargo.toAPI();
      const response = await this.apiService.createCargo(payload);
      return Cargo.fromAPI(response);
    } catch (error) {
      console.error("Error en CargoRepository.create():", error);
      throw error;
    }
  }

  async update(id, cargo) {
    try {
      const payload = cargo.toAPI();
      const response = await this.apiService.updateCargo(id, payload);
      return Cargo.fromAPI(response);
    } catch (error) {
      console.error(`Error en CargoRepository.update(${id}):`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.apiService.deleteCargo(id);
    } catch (error) {
      console.error(`Error en CargoRepository.delete(${id}):`, error);
      throw error;
    }
  }
}
