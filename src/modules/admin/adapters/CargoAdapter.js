const CargoAdapter = {
  toCargo: (data) => {
    return {
      id: data.id,
      name: data.nombre_cargo || data.name || "",
      description: data.descripcion || data.description || "",
      createdAt: data.created_at || data.createdAt || null,
      activo: typeof data.activo !== "undefined" ? data.activo : null,
      updatedAt: data.updated_at || data.updatedAt || null,
      createdBy: data.created_by || data.createdBy || null,
      updatedBy: data.updated_by || data.updatedBy || null,
    };
  },
};

export default CargoAdapter;
