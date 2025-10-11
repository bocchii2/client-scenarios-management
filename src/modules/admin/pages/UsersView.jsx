import { useState, useMemo } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../components/ui/Button/Button';
import UsersTable from '../components/users/UsersTable';
import UsersFilters from '../components/users/UsersFilters';
import useFilteredUsers from '../hooks/useFilterUsers';
import NewUserModal from '../components/users/NewUserModal';
import EditUserModal from '../components/users/EdtitUserModal';
import ViewUserModal from '../components/users/ViewUserModal';
import DeleteUserModal from '../components/users/DeleteUserModal';

const UsersView = () => {
  // estado único para modales: { name: 'add' | 'edit' | 'delete' | null, payload: any }
  const [modal, setModal] = useState({ name: null, payload: null });

  const openModal = (name, payload = null) => setModal({ name, payload });
  const closeModal = () => setModal({ name: null, payload: null });


  // Handlers para acciones de la tabla
  const handleEditUser = (user) => {
    console.log('Editar usuario:', user);
    // TODO: Implementar modal de edición
    openModal("edit", user);
  };

  const handleDeleteUser = (user) => {
    console.log('Eliminar usuario:', user);
    // TODO: Implementar confirmación y eliminación
    openModal("delete", user);
  };

  const handleViewUser = (user) => {
    console.log('Ver detalles del usuario:', user);
    // TODO: Implementar modal de detalles
    openModal("view", user);
  };

  const handleAddUser = () => {
    // TODO: Implementar modal de creación
    console.log('Agregar nuevo usuario');
    openModal("add");
  };

  const handleRefreshData = () => {
    console.log('Actualizar datos');
    // TODO: Implementar recarga de datos desde API
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      <NewUserModal
        isOpen={modal.name === "add"}
        onClose={closeModal}
        title="Agregar Nuevo Usuario"
      />
      <EditUserModal
        isOpen={modal.name === "edit"} // Cambiar según la lógica de edición
        user={modal.payload} // Pasar el usuario a editar
        onClose={closeModal}
        title="Editar Usuario"
      />
      <ViewUserModal
        isOpen={modal.name === "view"} // Cambiar según la lógica de visualización
        user={modal.payload} // Pasar el usuario a ver
        onClose={closeModal}
        title="Detalles del Usuario"
      />

      <DeleteUserModal
        isOpen={modal.name === "delete"} // Cambiar según la lógica de eliminación
        user={modal.payload} // Pasar el usuario a eliminar
        onClose={closeModal}
        title="Eliminar Usuario"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            onClick={handleRefreshData}
            variant="info"
            label="Actualizar"
            icon={<MdRefresh />}
            size="medium"
          />
          <Button
            onClick={handleAddUser}
            variant="success"
            label="Agregar Usuario"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        resultsCount={filteredUsers.length}
      />

      {/* Tabla de usuarios */}
      <UsersTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onView={handleViewUser}
      />

    </div>
  );
};

export default UsersView