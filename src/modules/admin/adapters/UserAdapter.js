export default function userAdapter(apiUser) {
  if (!apiUser) return null;

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

  // extraer permisos directos + desde roles (si vienen)
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

  return {
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
    activo: !!apiUser.activo,
    createdAt: apiUser.created_at || apiUser.createdAt || null,
    updatedAt: apiUser.updated_at || apiUser.updatedAt || null,
    roles,
    roleSlugs: roles.map((r) => r.slug),
    permissions,
    departamento: apiUser.departamento
      ? {
          id: apiUser.departamento.id,
          name:
            apiUser.departamento.nombre_departamento ||
            apiUser.departamento.name ||
            null,
          nomenclature: apiUser.departamento.nomenclatura || null,
          raw: apiUser.departamento,
        }
      : null,
    cargo: apiUser.cargo
      ? {
          id: apiUser.cargo.id,
          name: apiUser.cargo.nombre_cargo || apiUser.cargo.name || null,
          description:
            apiUser.cargo.descripcion || apiUser.cargo.description || null,
          raw: apiUser.cargo,
        }
      : null,
  };
}
