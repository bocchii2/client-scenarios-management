import React from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../../components/ui/Button/Button';
import RolesTable from '../components/roles/table/RolesTable';
import NewRoleModal from '../components/roles/modal/NewRoleModal';
import SimpleInfoCard from '../../../../components/ui/card/SimpleInfoCard';
import RolesApiService from '../../intrastructure/services/RolesApiService';

const RolesView = () => {
  const rolesApiService = React.useRef(new RolesApiService());
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleRefreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await rolesApiService.current.getAllRoles();
      setRoles(response);
    } catch (error) {
      console.error("Error al obtener roles:", error);
      setError("Error al cargar los roles. Por favor, intenta de nuevo.");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await handleRefreshData();
    };
    fetchData();
  }, []);

  const handleAddRole = () => {
    setIsNewRoleModalOpen(true);
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
      <NewRoleModal
        isOpen={isNewRoleModalOpen}
        onClose={() => setIsNewRoleModalOpen(false)}
      />
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Roles</h1>
          <p className="text-gray-600 mt-1">
            Administra roles, permisos y accesos del sistema
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
            onClick={handleAddRole}
            variant="success"
            label="Agregar Rol"
            icon={<MdAdd />}
            size="medium"
            disabled={loading}
          />
        </div>
      </div>

      {/* Error Card */}
      {error && (
        <SimpleInfoCard
          title="Error al cargar datos"
          message={error}
          variant="error"
          onClose={() => setError(null)}
          showCloseButton={true}
        />
      )}

      <RolesTable roles={roles} loading={loading} />
    </div>
  );
};

export default RolesView;