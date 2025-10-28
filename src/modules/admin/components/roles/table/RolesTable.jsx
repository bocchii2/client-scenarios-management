import React from "react";
import Table from "../../../../../components/ui/table/Table";
import Tbody from "../../../../../components/ui/table/Tbody";
import Tfooter from "../../../../../components/ui/table/Tfooter";
import Thead from "../../../../../components/ui/table/Thead";
import Button from "../../../../../components/ui/Button/Button";
import formatDate from "../../../../../hooks/useFormatDate";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdFilterListAlt, MdSearch, MdVisibility } from "react-icons/md";
import Input from "../../../../../components/ui/form/input/Input";
import RoleAdapter from "../../../adapters/RoleAdapter";
import ExpandibleRow from "../../../../../components/ui/table/ExpandibleRow";
import ViewRoleModal from "../modal/ViewRoleModa";
import DeleteRoleModal from "../modal/DeleteRoleModal";
import NewRoleModal from "../modal/NewRoleModal";

const rolesHeader = [
  "Nombre",
  "Descripción",
  "Fecha de creación",
  "Acciones"
];

const RolesTable = ({ roles, loading }) => {
  const adaptedRoles = React.useMemo(
    () => roles.map(RoleAdapter.toViewRole),
    [roles]
  );
  console.log("Roles adaptados en RolesTable:", adaptedRoles);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);
  const [filteredRoles, setFilteredRoles] = React.useState(adaptedRoles);
  const [selectedRoleId, setSelectedRoleId] = React.useState(null);
  const [isViewRoleModalOpen, setIsViewRoleModalOpen] = React.useState(false);
  const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = React.useState(false);
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = React.useState(false);
  React.useEffect(() => {
    const results = adaptedRoles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(results);
  }, [searchTerm, adaptedRoles]);

  const handleNewRoleModal = () => {
    setIsNewRoleModalOpen(true);
  }

  React.useEffect(() => {
    setSearchResultsCount(filteredRoles.length);
  }, [filteredRoles]);

  const handleAddRole = () => {
    // abrir modal para crear un nuevo rol
    console.log("Agregar nuevo rol");
  }

  const handleView = (roleId) => {
    // abrir modal para ver los detalles del rol
    console.log("Ver rol con ID:", roleId);
    setSelectedRoleId(roleId);
    setIsViewRoleModalOpen(true);
  }

  const handleEdit = (roleId) => {
    // abrir modal para editar el rol
    console.log("Editar rol con ID:", roleId);
  }

  const handleDelete = (roleId) => {
    // abrir modal de confirmación para eliminar el rol
    console.log("Eliminar rol con ID:", roleId);
    setSelectedRoleId(roleId);
    setIsDeleteRoleModalOpen(true);
  };

  return (
    <React.Fragment>
      <NewRoleModal
        isOpen={isNewRoleModalOpen}
        onClose={() => setIsNewRoleModalOpen(false)}

      />
      <ViewRoleModal
        isOpen={isViewRoleModalOpen}
        onClose={() => setIsViewRoleModalOpen(false)}
        roleId={selectedRoleId}
      />
      <DeleteRoleModal
        isOpen={isDeleteRoleModalOpen}
        onClose={() => setIsDeleteRoleModalOpen(false)}
        roleId={selectedRoleId}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          {/* Búsqueda */}
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar departamentos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                disabled={false}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start sm:items-end lg:items-end"></div>

        {/* Contador de resultados */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} departamento{searchResultsCount !== 1 ? 's' : ''}
              {(searchTerm) && (
                <span className="text-blue-600 font-medium"> (filtrados)</span>
              )}
            </span>
          </div>
        </div>
      </div>
      <Table>
        <Thead headers={rolesHeader} hasExpand={true} />
        <Tbody>
          {loading ? (
            // estado de carga: placeholder único
            <tr>
              <td colSpan={rolesHeader.length} className="px-6 py-10 text-center bg-white">
                <div className="flex flex-col items-center gap-2">
                  {/* spinner simple */}
                  <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">Cargando departamentos...</div>
                </div>
              </td>
            </tr>
          ) : (
            roles.length === 0 ? (
              <tr className="hover:bg-gray-200">
                <td
                  colSpan={rolesHeader.length}
                  className="px-6 py-10 text-center bg-white"
                >
                  <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                    <p className="font-light italic">No hay roles disponibles.</p>
                    <span>
                      Para poder agregar roles, haz clic en el siguiente botón:
                    </span>
                    <div className="w-full sm:w-auto">
                      <Button
                        onClick={() => handleNewRoleModal()}
                        variant="info"
                        icon={<MdAdd />}
                        size="medium"
                        ariaLabel="Agregar un nuevo rol"
                        label="Agregar un nuevo rol"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredRoles.map((role) => (
                <ExpandibleRow
                  key={role.id}
                  detail={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                      {role.permissions.length === 0 ? (
                        <p className="italic text-gray-500">No hay permisos asignados a este rol.</p>
                      ) : (
                        role.permissions.map((permission) => (
                          <div key={permission.id} className="flex flex-col">
                            <p className="font-medium text-gray-900">Permiso en {permission.entidad || "—"}:</p>
                            <p className="text-gray-600">{permission.entidad || "—"} - {permission.accion || "—"} </p>
                          </div>
                        ))
                      )}
                    </div>
                  }

                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(role.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex justify-center gap-2">
                      <Button
                        icon={<MdVisibility color="gray" />}
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(role.id)}
                        ariaLabel={`Ver rol ${role.name}`}
                        disabled={false}
                        loading={false}
                      />
                      <Button
                        icon={<MdEdit color="blue" />}
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(role.id)}
                        ariaLabel={`Editar rol ${role.name}`}
                        disabled={false}
                        loading={false}
                      />
                      <Button
                        icon={<MdDelete color="red" />}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(role.id)}
                        ariaLabel={`Eliminar rol ${role.name}`}
                        disabled={false}
                        loading={false}
                      />
                    </div>
                  </td>
                </ExpandibleRow>
              ))
            )
          )}

        </Tbody>
      </Table>
    </React.Fragment>
  )

}

export default RolesTable;