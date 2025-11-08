import { Cargo } from "../../domain/entities/Cargo";

/**
 * Caso de uso: Crear un nuevo cargo
 */
export class CreateCargoUseCase {
  constructor(cargoRepository) {
    this.cargoRepository = cargoRepository;
  }

  async execute(cargoData) {
    try {
      // Crear entidad
      const cargo = new Cargo(
        null,
        cargoData.nombre,
        cargoData.descripcion,
        cargoData.nomenclatura || "",
        true,
        null,
        null
      );

      // Validar
      if (!cargo.isValid()) {
        throw new Error("Datos de cargo inválidos");
      }

      // Guardar
      return await this.cargoRepository.create(cargo);
    } catch (error) {
      console.error("Error creando cargo:", error);
      throw error;
    }
  }
}
