import React from "react";
import Table from "../../../../../components/ui/table/Table";
import Tbody from "../../../../../components/ui/table/Tbody";
import Thead from "../../../../../components/ui/table/Thead";
import formatDate from "../../../../../hooks/useFormatDate";
import OptionInput from "../../../../../components/ui/form/select/option/OptionInput";
import SelectInput from "../../../../../components/ui/form/select/SelectInput";
import Button from "../../../../../components/ui/Button/Button";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";
import NewCargoModal from "../modals/NewCargoModal";
import DeleteCargoModal from "../modals/DeleteCargoModa";


const cargosHeader = [
  "Nombre",
  "Descripción",
  "Fecha de creación",
  "Acciones"
]

const CargosTable = ({ cargos, loading }) => {
  const [isNewCargoModalOpen, setIsNewCargoModalOpen] = React.useState(false);
  const [isDeleteCargoModalOpen, setIsDeleteCargoModalOpen] = React.useState(false);
  const [selectedCargoId, setSelectedCargoId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);

  console.log("Cargos recibidos en CargosTable:", cargos);
  const handleCleanFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const handleViewCargo = (cargoId) => {
    console.log("Ver cargo:", cargoId);
  }
  const handleEditCargo = (cargoId) => {
    console.log("Editar cargo:", cargoId);
    setSelectedCargoId(cargoId);

  }
  const handleDeleteCargo = (cargo) => {
    console.log("Eliminar cargo:", cargo);
    setSelectedCargoId(cargo);
    setIsDeleteCargoModalOpen(true);
  };

  return (
    <React.Fragment>
      <DeleteCargoModal
        isOpen={isDeleteCargoModalOpen}
        onClose={() => setIsDeleteCargoModalOpen(false)}
        cargoId={selectedCargoId}
      />
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, apellido o email..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          {/* Filtro por Estado */}
          {/* Botón para limpiar filtros */}
          <div className="w-full lg:w-auto">
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
      <Table>
        <Thead
          headers={cargosHeader}
        />
        <Tbody>
          {loading ? (
            <tr>
              <td colSpan={cargosHeader.length} className="px-6 py-10 text-center bg-white">
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
            cargos.length === 0 ? (
              <tr>
                <td
                  colSpan={cargosHeader.length}
                  className="px-6 py-10 text-center bg-white"
                >
                  <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                    <p className="font-light italic">No hay cargos para mostrar.</p>
                    <div className="w-full sm:w-auto">
                      <Button
                        onClick={() => setIsNewCargoModalOpen(true)}
                        variant="info"
                        icon={<MdAdd />}
                        size="medium"
                        ariaLabel="Agregar un nuevo cargo"
                        label="Agregar un nuevo cargo"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              cargos.map((cargo) => (
                <tr key={cargo.id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cargo.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cargo.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cargo.createdAt ? formatDate(cargo.createdAt) : "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex text-sm text-gray-500">
                    <Button
                      icon={<MdEdit color="blue" />}
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCargo(cargo.id)}
                      ariaLabel={`Editar cargo ${cargo.name}`}
                      disabled={false}
                      loading={false}
                    />
                    <Button
                      icon={<MdDelete color="red" />}
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCargo(cargo.id)}
                      ariaLabel={`Eliminar cargo ${cargo.name}`}
                      disabled={false}
                      loading={false}
                    />
                  </td>
                </tr>
              )))
          )}
        </Tbody>
      </Table>
      <NewCargoModal
        isOpen={isNewCargoModalOpen}
        onClose={() => setIsNewCargoModalOpen(false)}
      />
    </React.Fragment>
  );
};

export default CargosTable;