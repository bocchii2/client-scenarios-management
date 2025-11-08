import React from "react";
import Avatar from "../../../../../../components/ui/avatar/Avatar";
import Chip from "../../../../../../components/ui/chip/Chip";
import formatDate from "../../../../../../hooks/useFormatDate";
import { getStorageUrl } from "../../../../../../config/storage";
import { MdInfo } from "react-icons/md";

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
        <Avatar size="medium" draggable={false} src={getStorageUrl(user.profileImage)} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate" title={user.fullName}>
              {user.fullName}
            </h3>
            <Chip label={user.activo ? "Activo" : "Inactivo"} variant={user.activo ? "success" : "error"} />
          </div>
          <div className="text-sm text-gray-600 break-all">{user.email}</div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {field("Identificación", user.identification)}
          {field("Tipo de Identificación", user.identificationType)}
          {field("Teléfono", user.phone)}
          {field("Departamento", user.departamento?.name)}
        </div>
        <div className="space-y-4">
          {field("Nomenclatura", user.departamento?.nomenclature)}
          {field("Cargo Principal", user.cargo?.name)}
          {field("Descripción del Cargo", user.cargo?.description)}
          {field("Total de Cargos", user.cargos?.length ?? 0)}
        </div>
      </div>

      {/* Cargos */}
      {user.cargos && user.cargos.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Cargos Asignados</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {user.cargos.map((cargo) => (
              <div key={cargo.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="font-medium text-gray-900">{cargo.name}</div>
                <div className="text-sm text-gray-600">{cargo.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roles */}
      {user.roles && user.roles.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Roles Asignados</h4>
          <div className="flex flex-wrap gap-2">
            {user.roles.map((role) => (
              <Chip key={role.id} label={role.name} variant="info" />
            ))}
          </div>
        </div>
      )}

      {user.roles && user.roles.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800"><MdInfo /> No tiene roles asignados</p>
        </div>
      )}

      {/* Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
        {field("Fecha de creación", user.createdAt ? formatDate(user.createdAt) : undefined)}
        {field("Última actualización", user.updatedAt ? formatDate(user.updatedAt) : undefined)}
      </div>
    </div>
  );
};

export default UserDetails;
