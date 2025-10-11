import React, { useState, useMemo } from 'react';
import { MdAdd, MdDownload, MdRefresh, MdSecurity } from 'react-icons/md';
import Button from '../../../components/ui/Button/Button';

const RolesView = () => {
  const handleRefreshData = () => {
    // llamar a la api para cargar los roles y ponerles en la tabla
  };

  const handleAddRole = () => {
    // abrir modal para crear un nuevo rol
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
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
          />
          <Button
            onClick={handleAddRole}
            variant="success"
            label="Agregar Rol"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>


    </div>
  );
};

export default RolesView;