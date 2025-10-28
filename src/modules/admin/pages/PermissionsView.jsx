import React, { useState, useMemo } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../components/ui/Button/Button';
import PermissionsTable from '../components/permissons/table/PermissonsTable';
import NewPermissionModal from '../components/permissons/modal/CreatPermissionModal';
import PermissionApiService from '../services/PermissionApiService';


const PermissionsView = () => {
  const [isNewPermissionModalOpen, setIsNewPermissionModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // instancia reutilizable del servicio
  const permissionApiService = React.useRef(new PermissionApiService());

  // función de refresco: obtiene datos y actualiza el estado
  const handleRefreshData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await permissionApiService.current.getPermissions();
      setPermissions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      if (error.status === 401) {
        // manejar error de autorización si es necesario
        console.error("Unauthorized access - perhaps you need to log in?");
      }
    } finally {
      setLoading(false);
    }
  }, []);


  // cargar al montar reutilizando la misma lógica
  React.useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData]);


  const handleAddPermission = () => {
    // abrir modal para crear un nuevo permiso
    setIsNewPermissionModalOpen(true);
  }


  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
      <NewPermissionModal
        isOpen={isNewPermissionModalOpen}
        onClose={() => setIsNewPermissionModalOpen(false)}
      />
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Permisos</h1>
          <p className="text-gray-600 mt-1">
            Administra permisos del sistema y revisa su uso en roles
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
            disabled={true}
          />
          <Button
            onClick={handleAddPermission}
            variant="success"
            label="Agregar Permiso"
            icon={<MdAdd />}
            size="medium"
            disabled={true}
          />
        </div>
      </div>

      {/** Tabla de permisos */}
      <PermissionsTable permissions={permissions} loading={loading} />

    </div>
  );
};

export default PermissionsView;