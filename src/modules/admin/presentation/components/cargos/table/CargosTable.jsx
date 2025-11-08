import React from "react";
import Table from "../../../../../../components/ui/table/Table";
import Tbody from "../../../../../../components/ui/table/Tbody";
import Thead from "../../../../../../components/ui/table/Thead";
import formatDate from "../../../../../../hooks/useFormatDate";
import SelectInput from "../../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../../components/ui/form/select/option/OptionInput";
import Button from "../../../../../../components/ui/Button/Button";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";
import NewCargoModal from "../modals/NewCargoModal";
import EditCargoModal from "../modals/EditCargoModal";
import ViewCargoModal from "../modals/ViewCargoModal";
import DeleteCargoModal from "../modals/DeleteCargoModa";
import CargoDIContainer from "../../../../intrastructure/di/CargoDIContainer";
const cargosHeader = [
  "Nombre",
  "Descripción",
  "Fecha de creación",
  "Estado",
  "Acciones"
];

const CargosTable = ({ cargos, loading, getCargosUseCase = null, onCargoDeleted = null }) => {
  // ✅ Inyección de dependencias
  const useCase = getCargosUseCase || CargoDIContainer.getInstance().getGetCargosUseCase();

  // Estados de filtros
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);

  // Estados de modales
  const [isNewCargoModalOpen, setIsNewCargoModalOpen] = React.useState(false);
  const [isViewCargoModalOpen, setIsViewCargoModalOpen] = React.useState(false);
  const [isEditCargoModalOpen, setIsEditCargoModalOpen] = React.useState(false);
  const [isDeleteCargoModalOpen, setIsDeleteCargoModalOpen] = React.useState(false);
  const [selectedCargoId, setSelectedCargoId] = React.useState(null);

  // ✅ Filtrar usando el Use Case
  const filteredCargos = React.useMemo(() => {
    if (!Array.isArray(cargos)) return [];

    return useCase.filterCargos(cargos, {
      searchTerm,
      statusFilter,
    });
  }, [cargos, searchTerm, statusFilter, useCase]);

  // Actualizar contador
  React.useEffect(() => {
    setSearchResultsCount(filteredCargos.length);
  }, [filteredCargos]);

  // Handlers
  const handleCleanFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const handleAddCargo = () => {
    setIsNewCargoModalOpen(true);
  };

  const handleViewCargo = (cargoId) => {
    setSelectedCargoId(cargoId);
    setIsViewCargoModalOpen(true);
  };

  const handleEditCargo = (cargoId) => {
    setSelectedCargoId(cargoId);
    setIsEditCargoModalOpen(true);
  };

  const handleDeleteCargo = (cargoId) => {
    setSelectedCargoId(cargoId);
    setIsDeleteCargoModalOpen(true);
  };

  const handleCargoCreated = () => {
    setIsNewCargoModalOpen(false);
    // Notificar al padre para refrescar datos
    onCargoDeleted && onCargoDeleted();
  };

  const handleCargoUpdated = () => {
    setIsEditCargoModalOpen(false);
    onCargoDeleted && onCargoDeleted();
  };

  const handleCargoDeleted = () => {
    setIsDeleteCargoModalOpen(false);
    onCargoDeleted && onCargoDeleted();
  };

  return (
    <React.Fragment>
      {/* Modales */}
      <NewCargoModal
        isOpen={isNewCargoModalOpen}
        onClose={() => setIsNewCargoModalOpen(false)}
        onSave={handleCargoCreated}
      />
      <ViewCargoModal
        isOpen={isViewCargoModalOpen}
        onClose={() => setIsViewCargoModalOpen(false)}
        cargoId={selectedCargoId}
      />
      <EditCargoModal
        isOpen={isEditCargoModalOpen}
        onClose={() => setIsEditCargoModalOpen(false)}
        cargoId={selectedCargoId}
        onSave={handleCargoUpdated}
      />
      <DeleteCargoModal
        isOpen={isDeleteCargoModalOpen}
        onClose={() => setIsDeleteCargoModalOpen(false)}
        cargoId={selectedCargoId}
        onDelete={handleCargoDeleted}
      />

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col gap-4">
          {/* Fila superior: búsqueda + botones */}
          <div className="flex items-end gap-3">
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar cargos
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading}
                  placeholder="Buscar por nombre o descripción..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/*             <Button
              onClick={handleCleanFilters}
              disabled={loading}
              variant="outline"
              size="medium"
              label="Limpiar"
            /> */}

            {/*             <Button
              onClick={handleAddCargo}
              disabled={loading}
              variant="success"
              size="medium"
              icon={<MdAdd />}
              label="Agregar"
            /> */}
          </div>

          {/* Filtro de estado */}
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por estado
            </label>
            <SelectInput
              name="statusFilter"
              value={statusFilter}
              disabled={loading}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <OptionInput value="all" label="Todos los estados" />
              <OptionInput value="active" label="Activos" />
              <OptionInput value="inactive" label="Inactivos" />
            </SelectInput>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} cargo{searchResultsCount !== 1 ? 's' : ''}
              {(searchTerm || statusFilter !== 'all') && (
                <span className="text-blue-600 font-medium"> (filtrados)</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <Table ariaLabel="Tabla de cargos">
        <Thead headers={cargosHeader} />
        <Tbody>
          {loading ? (
            <tr>
              <td colSpan={cargosHeader.length} className="px-6 py-10 text-center bg-white">
                <div className="flex flex-col items-center gap-2">
                  <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">Cargando cargos...</div>
                </div>
              </td>
            </tr>
          ) : filteredCargos.length === 0 ? (
            <tr>
              <td colSpan={cargosHeader.length} className="px-6 py-10 text-center bg-white">
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay cargos disponibles.</p>
                  <Button
                    onClick={handleAddCargo}
                    variant="info"
                    icon={<MdAdd />}
                    size="medium"
                    label="Agregar un nuevo cargo"
                  />
                </div>
              </td>
            </tr>
          ) : (
            filteredCargos.map((cargo) => (
              <tr key={cargo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cargo.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="line-clamp-2">{cargo.descripcion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(cargo.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${cargo.activo
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}>
                    {cargo.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2 text-sm text-gray-500">
                  <Button
                    icon={<MdVisibility color="gray" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCargo(cargo.id)}
                    ariaLabel={`Ver cargo ${cargo.nombre}`}
                    disabled={loading}
                  />
                  <Button
                    icon={<MdEdit color="blue" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCargo(cargo.id)}
                    ariaLabel={`Editar cargo ${cargo.nombre}`}
                    disabled={loading}
                  />
                  <Button
                    icon={<MdDelete color="red" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCargo(cargo.id)}
                    ariaLabel={`Eliminar cargo ${cargo.nombre}`}
                    disabled={loading}
                  />
                </td>
              </tr>
            ))
          )}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default CargosTable;