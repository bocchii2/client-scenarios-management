import { useState, useMemo, useEffect } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../../components/ui/Button/Button';
import NewUserModal from '../components/users/modal/CreateUserModal';
import UserTable from '../components/users/table/UserTable';
import UserApiService from '../../intrastructure/services/UserApiService';
import { useRef } from 'react';
import SimpleInfoCard from '../../../../components/ui/card/SimpleInfoCard';

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const userApiServiceRef = useRef(new UserApiService());
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  // estado único para modales: { name: 'add' | 'edit' | 'delete' | null, payload: any }
  const [modal, setModal] = useState({ name: null, payload: null });

  const openModal = (name, payload = null) => setModal({ name, payload });
  const closeModal = () => setModal({ name: null, payload: null });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    handleRefreshData();
  }, []);

  const handleAddUser = () => {
    openModal("add");
  };

  const handleRefreshData = async () => {
    try {
      setLoading(true);
      const response = await userApiServiceRef.current.getUsers();
      console.log('Usuarios actualizados:', response);
      setUsers(response || []);
      setGeneralError(null);
    } catch (error) {
      setGeneralError("Error al actualizar datos");
      console.error('Error al actualizar datos:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      <NewUserModal
        isOpen={modal.name === "add"}
        onClose={closeModal}
        title="Agregar Nuevo Usuario"
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
            disabled={loading}
            loading={loading}
          />
          <Button
            onClick={handleAddUser}
            variant="success"
            label="Agregar Usuario"
            icon={<MdAdd />}
            size="medium"
            disabled={loading}
          />
        </div>
      </div>
      {generalError && (
        <SimpleInfoCard
          title="Error al cargar datos"
          message={generalError}
          variant="error"
          onClose={() => setGeneralError("")}
          showCloseButton={true}
        />
      )}
      <UserTable users={users} loading={loading} />
    </div>
  );
};

export default UsersView