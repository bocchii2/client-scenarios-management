import React, { useState, useMemo } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../components/ui/Button/Button';

const PermissionsView = () => {
  const handleRefreshData = () => {
    // llamar a la api para cargar los permisos y ponerles en la tabla
  }
  const handleAddPermission = () => {
    // abrir modal para crear un nuevo permiso
  }

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
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
          />
          <Button
            onClick={handleAddPermission}
            variant="success"
            label="Agregar Permiso"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>


    </div>
  );
};

export default PermissionsView;