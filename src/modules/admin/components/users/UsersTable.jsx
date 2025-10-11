import React from "react";
import Avatar from "../../../../components/ui/avatar/Avatar";
import Chip from "../../../../components/ui/chip/Chip";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";

const UsersTable = ({ users, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] scrollbar-hide">
        <table className="w-full min-w-max max-h-[600px] overflow-y-auto table-auto">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px] bg-gray-50">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px] bg-gray-50">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] bg-gray-50">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] bg-gray-50">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] bg-gray-50">
                Registro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] bg-gray-50">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => {

              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar size="small" imageUrl={user.avatar} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.nombres_completos}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.documentType}: {user.documentNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.telefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Chip
                      label={user.role ? user.role.label : "N/A"}
                      color={"blue"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Chip
                      label={user.status === "active" ? "Activo" : "Inactivo"}
                      color={"green"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView && onView(user)}
                        className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded"
                        title="Ver detalles"
                      >
                        <MdVisibility size={16} />
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded"
                        title="Editar usuario"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(user)}
                        className="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                        title="Eliminar usuario"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;