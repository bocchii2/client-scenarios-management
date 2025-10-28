const PermissionsAdapter = {
  toViewPermissions(permissionData) {
    return {
      id: permissionData.id,
      entity: permissionData.entidad,
      action: permissionData.accion,
      fullname: permissionData.nombre_completo,
      createdAt: new Date(permissionData.created_at),
      updatedAt: new Date(permissionData.updated_at),
    };
  },
};

export default PermissionsAdapter;
