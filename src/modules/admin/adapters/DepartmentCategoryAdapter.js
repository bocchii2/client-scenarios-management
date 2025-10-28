const DepartmentCategoryAdapter = {
  getCategories: (data) => {
    return {
      id: data.id,
      name: data.nombre_categoria || data.name || "",
      description: data.descripcion || data.description || "",
      active: typeof data.activo !== "undefined" ? data.activo : null,
      createdAt: data.created_at || data.createdAt || null,
      updatedAt: data.updated_at || data.updatedAt || null,
      createdBy: data.created_by || data.createdBy || null,
      updatedBy: data.updated_by || data.updatedBy || null,
      category: data.categoria || data.category || "",
      departmentFather:
        data.departamento_padre || data.departmentFather || null,
    };
  },
};

export default DepartmentCategoryAdapter;
