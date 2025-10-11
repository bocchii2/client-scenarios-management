import React from "react";
import { MdSearch, MdFilterList } from "react-icons/md";
import Input from "../../../../components/ui/form/input/Input";
import SelectInput from "../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../components/ui/form/select/option/OptionInput";

const UsersFilters = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
  resultsCount
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
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
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nombre, apellido o email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Filtro por Rol */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por rol
          </label>
          <SelectInput
            name="roleFilter"
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
          >
            <OptionInput value="all" label="Todos los roles" />
            <OptionInput value="admin" label="Administrador" />
            <OptionInput value="teacher" label="Docente" />
            <OptionInput value="student" label="Estudiante" />
          </SelectInput>
        </div>

        {/* Filtro por Estado */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por estado
          </label>
          <SelectInput
            name="statusFilter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <OptionInput value="all" label="Todos los estados" />
            <OptionInput value="active" label="Activos" />
            <OptionInput value="inactive" label="Inactivos" />
          </SelectInput>
        </div>

        {/* Botón para limpiar filtros */}
        <div className="w-full lg:w-auto">
          <button
            onClick={() => {
              onSearchChange('');
              onRoleChange('all');
              onStatusChange('all');
            }}
            className="w-full lg:w-auto px-4 py-2 text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MdFilterList className="h-4 w-4" />
          <span>
            Mostrando {resultsCount} usuario{resultsCount !== 1 ? 's' : ''}
            {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
              <span className="text-blue-600 font-medium"> (filtrados)</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UsersFilters;