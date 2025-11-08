/**
 * Caso de uso: Obtener todos los cargos
 */
export class GetCargosUseCase {
  constructor(cargoRepository) {
    this.cargoRepository = cargoRepository;
  }

  /**
   * Obtiene todos los cargos
   */
  async getAll() {
    try {
      return await this.cargoRepository.getAll();
    } catch (error) {
      console.error("Error obteniendo cargos:", error);
      throw error;
    }
  }

  /**
   * Filtra cargos por criterios
   */
  filterCargos(cargos, criteria) {
    const { searchTerm, statusFilter } = criteria;

    return cargos.filter((cargo) => {
      const matchesSearch =
        !searchTerm ||
        (cargo.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cargo.descripcion || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active"
          ? cargo.activo === true
          : cargo.activo === false);

      return matchesSearch && matchesStatus;
    });
  }
}
