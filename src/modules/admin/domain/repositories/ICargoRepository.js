/**
 * Interface para el repositorio de Cargos
 * Define el contrato que debe cumplir cualquier implementación
 */
export class ICargoRepository {
  async getAll() {
    throw new Error("getAll() must be implemented");
  }

  async getById(id) {
    throw new Error("getById() must be implemented");
  }

  async create(cargo) {
    throw new Error("create() must be implemented");
  }

  async update(id, cargo) {
    throw new Error("update() must be implemented");
  }

  async delete(id) {
    throw new Error("delete() must be implemented");
  }
}
