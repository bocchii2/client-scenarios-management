/**
 * Entidad Cargo - Representa un cargo en el dominio de negocio
 */
export class Cargo {
  constructor(
    id,
    nombre,
    descripcion,
    nomenclatura,
    activo,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.nomenclatura = nomenclatura;
    this.activo = activo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Mapea datos de API a entidad
   */
  static fromAPI(data) {
    return new Cargo(
      data.id,
      data.name || data.nombre_cargo,
      data.description || data.descripcion,
      data.nomenclatura,
      data.activo !== false,
      data.createdAt || data.created_at,
      data.updatedAt || data.updated_at
    );
  }

  /**
   * Convierte la entidad a formato API
   */
  toAPI() {
    return {
      nombre_cargo: this.nombre,
      descripcion: this.descripcion,
      nomenclatura: this.nomenclatura,
      activo: this.activo,
    };
  }

  /**
   * Validación básica
   */
  isValid() {
    return (
      this.nombre &&
      this.nombre.trim().length > 0 &&
      this.descripcion &&
      this.descripcion.trim().length > 0
    );
  }
}
