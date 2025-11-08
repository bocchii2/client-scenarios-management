/**
 * Caso de uso: Eliminar un cargo
 */
export class DeleteCargoUseCase {
  constructor(cargoRepository) {
    this.cargoRepository = cargoRepository;
  }

  async execute(cargoId) {
    try {
      return await this.cargoRepository.delete(cargoId);
    } catch (error) {
      console.error(`Error eliminando cargo ${cargoId}:`, error);
      throw error;
    }
  }
}
