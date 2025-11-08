/**
 * Caso de uso: Obtener un cargo por ID
 */
export class GetCargoByIdUseCase {
  constructor(cargoRepository) {
    this.cargoRepository = cargoRepository;
  }

  async execute(cargoId) {
    try {
      return await this.cargoRepository.getById(cargoId);
    } catch (error) {
      console.error(`Error obteniendo cargo ${cargoId}:`, error);
      throw error;
    }
  }
}
