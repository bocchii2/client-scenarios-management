import { Cargo } from "../../domain/entities/Cargo";
/**
 * Caso de uso: Actualizar un cargo
 */
export class UpdateCargoUseCase {
  constructor(cargoRepository) {
    this.cargoRepository = cargoRepository;
  }

  async execute(cargoId, cargoData) {
    try {
      // Crear entidad
      const cargo = new Cargo(
        cargoId,
        cargoData.nombre,
        cargoData.descripcion,
        cargoData.nomenclatura || "",
        cargoData.activo !== false,
        null,
        null
      );

      // Validar
      if (!cargo.isValid()) {
        throw new Error("Datos de cargo inválidos");
      }

      // Actualizar
      return await this.cargoRepository.update(cargoId, cargo);
    } catch (error) {
      console.error(`Error actualizando cargo ${cargoId}:`, error);
      throw error;
    }
  }
}
