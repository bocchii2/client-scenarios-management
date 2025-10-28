import React from "react";
import Avatar from "../../../../../components/ui/avatar/Avatar";
import Chip from "../../../../../components/ui/chip/Chip";
import formatDate from "../../../../../hooks/useFormatDate";

const field = (label, value) => (
  <div>
    <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
    <div className="text-sm text-gray-900 break-all">{value ?? "—"}</div>
  </div>
);



const UserDetails = ({ user }) => {
  if (!user) {
    return (
      <div className="text-center text-gray-500 py-6">Selecciona un usuario para ver sus detalles.</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar size="medium" draggable={false} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate" title={user.name}>{user.name}</h3>
            <Chip label={user.status ?? "Sin estado"} variant="default" />
          </div>
          <div className="text-sm text-gray-600 break-all">{user.email}</div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {field("Identificación", user.identificacion)}
          {field("Tipo de Identificación", user.tipoIdentificacion)}
          {field("Rol", user.role?.name)}
          {field("Descripción del Rol", user.role?.description)}
        </div>
        <div className="space-y-4">
          {field("Cargo", user.cargo?.name)}
          {field("Descripción del Cargo", user.cargo?.description)}
          {field("Departamento", user.departamento?.name)}
          {field("Nomenclatura del Departamento", user.departamento?.nomenclatura)}
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {field("Estado", user.status)}
        {field("Fecha de creación", user.createdAt ? formatDate(user.createdAt) : undefined)}
      </div>
    </div>
  );
};

export default UserDetails;
