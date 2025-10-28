const RoleAdapter = {
  toViewRole(data) {
    return {
      id: data.id,
      name: data.nombre,
      description: data.descripcion,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      createdBy: data.created_by,
      updatedBy: data.updated_by,
      permissions: data.permissions || [],
    };
  },
};

export default RoleAdapter;
