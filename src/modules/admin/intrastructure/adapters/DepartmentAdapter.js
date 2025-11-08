const DepartmentAdapter = {
  toDomain: (data) => {
    if (!data) return null;
    return {
      id: data.id,
      // nombre_departamento -> name
      name: data.nombre_departamento || data.name || "",
      // mantiene nomenclatura
      nomenclatura: data.nomenclatura || "",
      // description no viene; mapea desde descripcion si existe
      description: data.descripcion || data.description || "",
      // created_at -> createdAt (mantener el string ISO que proviene de Laravel)
      createdAt: data.created_at || data.createdAt || null,
      activo: typeof data.activo !== "undefined" ? data.activo : null,
      // departamento_padre -> departament_father (recursivo)
      departament_father: data.departamento_padre
        ? DepartmentAdapter.toDomain(data.departamento_padre)
        : null,
      category: data.categoria || data.category || null,
    };
  },
};
export default DepartmentAdapter;
