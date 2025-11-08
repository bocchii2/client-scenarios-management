import React from "react";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdRemoveRedEye, MdSearch, MdVisibility } from "react-icons/md";
import Table from "../../../../../../components/ui/table/Table"
import Tbody from "../../../../../../components/ui/table/Tbody";
import Thead from "../../../../../../components/ui/table/Thead";
import formatDate from "../../../../../../hooks/useFormatDate";
import Button from "../../../../../../components/ui/Button/Button";
import Avatar from "../../../../../../components/ui/avatar/Avatar";
import DeleteUserModal from "../modal/DeleteUserModal";
import ViewUserModal from "../modal/ViewUserModal";
import EditUserModal from "../modal/EdtitUserModal";
import { useState } from "react";
import SelectInput from "../../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../../components/ui/form/select/option/OptionInput";
import NewUserModal from "../modal/CreateUserModal";
import { getStorageUrl } from "../../../../../../config/storage";

const userHeader = [
  "Nombre",
  "Email",
  "Rol",
  "Departamento",
  "Cargo",
  "Estado",
  "Fecha de Creación",
  "Ultima Modificación",
  "Acciones"
];

const UserTable = ({ users, loading }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modal, setModal] = useState({ name: null, payload: null });

  const openModal = (name, payload = null) => setModal({ name, payload });
  const closeModal = () => setModal({ name: null, payload: null });

  const handleAddUser = () => {
    // TODO: Implementar modal de creación
    console.log('Agregar nuevo usuario');
    openModal("add");
  };


  const handleCleanFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  // Filtrado derivado con useMemo
  const filteredUsers = React.useMemo(() => {
    if (!Array.isArray(users)) return [];
    const term = (searchTerm || "").trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = !term ||
        (user.nombres_completos || "").toLowerCase().includes(term) ||
        (user.correo_electronico || "").toLowerCase().includes(term) ||
        (user.identificacion || "").includes(term);

      const matchesRole = roleFilter === "all" ||
        (user.roles && Array.isArray(user.roles) && user.roles.some(r => r.nombre?.toLowerCase() === roleFilter));

      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "active" ? user.activo === true : user.activo === false);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Actualizar contador de resultados
  React.useEffect(() => {
    setSearchResultsCount(filteredUsers.length);
  }, [filteredUsers]);
  const handleVerUser = (user) => {
    console.log("Ver usuario", user);

    setSelectedUser(user);
    setIsViewModalOpen(true);
  }

  const handleEditUser = (user) => {
    console.log("Editar usuario", user);

    setSelectedUser(user);
    setIsEditModalOpen(true);
  }

  const handleDeleteUser = (user) => {
    console.log("Eliminar usuario", user);

    setSelectedUser(user);
    setIsDeleteModalOpen(true);

  }



  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        {/* Contenedor filtros */}
        <div className="flex flex-col gap-4">
          {/* Fila superior: Input + botón a la derecha */}
          <div className="flex items-end gap-3">
            {/* Búsqueda */}
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar usuarios
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={!!loading}
                  placeholder="Buscar por nombre, email o cédula..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Botón limpiar a la derecha del input */}
            <div className="shrink-0">
              <button
                onClick={handleCleanFilters}
                disabled={loading}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Limpiar filtros"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {/* Fila inferior: Selects debajo del input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Filtro por Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por rol
              </label>
              <SelectInput
                name="roleFilter"
                value={roleFilter}
                disabled={!!loading}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <OptionInput value="all" label="Todos los roles" />
              </SelectInput>
            </div>

            {/* Filtro por Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por estado
              </label>
              <SelectInput
                name="statusFilter"
                value={statusFilter}
                disabled={!!loading}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <OptionInput value="all" label="Todos los estados" />
                <OptionInput value="active" label="Activos" />
                <OptionInput value="inactive" label="Inactivos" />
              </SelectInput>
            </div>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} usuario{searchResultsCount !== 1 ? 's' : ''}
              {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
                <span className="text-blue-600 font-medium"> (filtrados)</span>
              )}
            </span>
          </div>
        </div>
      </div>
      <Table
        ariaLabel={"Tabla de usuarios"}
      >
        <Thead headers={userHeader} className="text-center" />
        <Tbody>
          {loading ? (
            // Estado de carga
            <tr>
              <td colSpan={userHeader.length} className="px-6 py-10 text-center bg-white">
                <div className="flex flex-col items-center gap-2">
                  <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">Cargando usuarios...</div>
                </div>
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            // Estado vacío
            <tr className="hover:bg-gray-200">
              <td
                colSpan={userHeader.length}
                className="px-6 py-10 text-center bg-white"
              >
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay usuarios disponibles.</p>
                  <span>
                    Para poder agregar usuarios, primero debes crear roles y departamentos en sus respectivas secciones.
                  </span>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={() => handleAddUser()}
                      variant="info"
                      icon={<MdAdd />}
                      size="medium"
                      ariaLabel="Agregar un nuevo usuario"
                      label="Agregar un nuevo usuario"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            // Usuarios filtrados
            filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <Avatar
                      draggable={false}
                      size="small"
                      src={getStorageUrl(user.profileImage)}
                    />
                    <div className="inline-block ml-2 align-middle">
                      {user.fullName}
                      <div className="text-xs text-gray-400">{user.identification} - {user.identificationType}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{user.email}</div>
                    <div className="text-xs text-gray-400">{user.identification}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles && user.roles.length > 0 ? user.roles.map(r => r.name).join(", ") : "Sin rol"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.departamento?.name || "Sin departamento"}
                  <div className="text-xs text-gray-400">{user.departamento?.nomenclature || "N/A"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.cargo?.name || "Sin cargo"}
                  <div className="text-xs text-gray-400">{user.cargo?.description || "N/A"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.updatedAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap flex text-sm text-gray-500">
                  <Button
                    icon={<MdVisibility color="gray" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerUser(user)}
                    ariaLabel={`Ver usuario ${user.fullName}`}
                    disabled={loading}
                    loading={false}
                  />
                  <Button
                    icon={<MdEdit color="blue" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                    ariaLabel={`Editar usuario ${user.fullName}`}
                    disabled={loading}
                    loading={false}
                  />
                  <Button
                    icon={<MdDelete color="red" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user)}
                    ariaLabel={`Eliminar usuario ${user.fullName}`}
                    disabled={loading}
                    loading={false}
                  />
                </td>
              </tr>
            ))
          )}
        </Tbody>
      </Table>
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
        title={"Detalles del usuario"}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        title={"Editar usuario"}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
        title={"Eliminar usuario"}
      />
      <NewUserModal
        isOpen={modal.name === "add"}
        onClose={closeModal}
        title="Agregar Nuevo Usuario"
      />
    </React.Fragment>

  )
}

export default UserTable;