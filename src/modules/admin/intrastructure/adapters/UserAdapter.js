export default function userAdapter(apiUser) {
  console.log("userAdapter recibió:", apiUser);

  if (!apiUser) {
    console.log("userAdapter: apiUser es null/undefined");
    return null;
  }

  try {
    // Adaptar roles
    const roles = Array.isArray(apiUser.roles)
      ? apiUser.roles.map((r) => ({
          id: r.id,
          name: r.nombre || r.name,
          description: r.descripcion || r.description,
          slug: r.slug,
          createdAt: r.created_at || r.createdAt,
          raw: r,
        }))
      : [];

    // Adaptar cargos (puede venir como array)
    const cargos = Array.isArray(apiUser.cargos)
      ? apiUser.cargos.map((c) => ({
          id: c.id,
          name: c.nombre_cargo || c.name,
          description: c.descripcion || c.description,
          createdAt: c.created_at || c.createdAt,
          raw: c,
        }))
      : [];

    // Extraer permisos directos + desde roles
    const directPermissions = Array.isArray(apiUser.permissions)
      ? apiUser.permissions
      : [];
    const rolePermissions = roles.flatMap((r) =>
      Array.isArray(r.raw?.permissions) ? r.raw.permissions : []
    );
    const allPermissions = [...directPermissions, ...rolePermissions];
    const permsMap = new Map();
    allPermissions.forEach((p) => {
      if (!p) return;
      const key = p.id ?? p.fullname ?? p.code ?? JSON.stringify(p);
      if (!permsMap.has(key)) {
        permsMap.set(key, {
          id: p.id ?? null,
          name: p.nombre || p.name || p.fullname || null,
          action: p.action || null,
          code: p.code || null,
          raw: p,
        });
      }
    });
    const permissions = Array.from(permsMap.values());

    // Obtener primer cargo si existe
    const primerCargo = cargos.length > 0 ? cargos[0] : null;

    const adapted = {
      raw: apiUser,
      id: apiUser.id,
      fullName:
        apiUser.nombres_completos ||
        `${apiUser.nombre || ""} ${apiUser.apellido || ""}`.trim() ||
        null,
      email: apiUser.correo_electronico || apiUser.email || null,
      identificationType: apiUser.tipo_identificacion || null,
      identification: apiUser.identificacion || null,
      phone: apiUser.telefono || null,
      profileImage: apiUser.profile_image || null,
      activo: !!apiUser.activo,
      createdAt: apiUser.created_at || apiUser.createdAt || null,
      updatedAt: apiUser.updated_at || apiUser.updatedAt || null,
      roles,
      roleSlugs: roles.map((r) => r.slug),
      permissions,
      cargos,
      // Cargo principal (para compatibilidad)
      cargo: primerCargo
        ? {
            id: primerCargo.id,
            name: primerCargo.name,
            description: primerCargo.description,
            raw: primerCargo.raw,
          }
        : {
            id: null,
            name: "Sin cargo asignado",
            description: null,
            raw: null,
          },
      departamento: apiUser.departamento
        ? {
            id: apiUser.departamento.id,
            name:
              apiUser.departamento.nombre_departamento ||
              apiUser.departamento.name ||
              null,
            nomenclature:
              apiUser.departamento.nomenclatura ||
              apiUser.departamento.nomenclature ||
              null,
            raw: apiUser.departamento,
          }
        : {
            id: null,
            name: "Sin departamento asignado",
            nomenclature: "N/A",
            raw: null,
          },
    };

    console.log("userAdapter retorna:", adapted);
    return adapted;
  } catch (error) {
    console.error("Error en userAdapter:", error);
    throw error;
  }
}
