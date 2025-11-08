import React from "react";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";
import Table from "../../../../../../components/ui/table/Table";
import Tbody from "../../../../../../components/ui/table/Tbody";
import Thead from "../../../../../../components/ui/table/Thead";
import formatDate from "../../../../../../hooks/useFormatDate";
import Button from "../../../../../../components/ui/Button/Button";
import ViewDepartmentModal from "../modals/ViewDeparamentModal";
import DeleteDepartmentModal from "../modals/DeleteDepartmentModal";
import EditDepartmentModal from "../modals/EditDepartmentModal";
import SelectInput from "../../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../../components/ui/form/select/option/OptionInput";
import NewDepartmentModal from "../modals/NewDepartmentModal";
import DepartmentCategoryService from "../../../../intrastructure/services/DepartmentCategoryApiService";
const departamentsHeader = [
  "Nombre",
  "Nomenclatura",
  "Categoria",
  "Fecha de creación",
  "Acciones"
]


const DepartamentsTable = ({ departaments, loading }) => {
  const [selectedDepartmentId, setSelectedDepartmentId] = React.useState(null);
  const [showViewModal, setShowViewModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);
  const [isOpenNewDepartmentModal, setIsOpenNewDepartmentModal] = React.useState(false);
  const [departmentCategories, setDepartmentCategories] = React.useState([]);

  const departmentCategoryServiceRef = React.useRef(new DepartmentCategoryService());

  const fetchDepartmentCategories = React.useCallback(async () => {
    try {
      const data = await departmentCategoryServiceRef.current.getDepartmentCategories();
      setDepartmentCategories(data);
      console.log("Categorías de departamentos cargadas:", data);
    } catch (error) {
      console.error("Error al cargar las categorías de departamentos:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchDepartmentCategories();
  }, [fetchDepartmentCategories]);

  const handleCleanFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const handleDeleteDepartament = (departamentId) => {
    setSelectedDepartmentId(departamentId);
    setShowDeleteModal(true);
  }

  const handleEditDepartament = (departamentId) => {
    setSelectedDepartmentId(departamentId);
    setShowEditModal(true);
  }

  const handleVerDepartament = (departamentId) => {
    setSelectedDepartmentId(departamentId);
    setShowViewModal(true);
  }

  const handleNewDepartament = () => {
    setIsOpenNewDepartmentModal(true);
  }
  // Filtrado derivado
  const filteredDepartments = React.useMemo(() => {
    if (!Array.isArray(departaments)) return [];
    const term = (searchTerm || "").trim().toLowerCase();
    return departaments.filter((d) => {
      const matchesSearch = !term || (d.name || "").toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? d.activo === true : d.activo === false);
      const matchesCategory =
        categoryFilter === "all" ||
        (d.category && String(d.category.id) === String(categoryFilter));
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [departaments, searchTerm, statusFilter, categoryFilter]);

  // actualizar contador de resultados
  React.useEffect(() => {
    setSearchResultsCount(filteredDepartments.length);
  }, [filteredDepartments]);

  return (
    <React.Fragment>
      <NewDepartmentModal
        isOpen={isOpenNewDepartmentModal}
        onClose={() => setIsOpenNewDepartmentModal(false)}
      />
      <ViewDepartmentModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        departmentId={selectedDepartmentId}
      />
      <DeleteDepartmentModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        departmentId={selectedDepartmentId}
      />
      <EditDepartmentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        departmentId={selectedDepartmentId}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          {/* Búsqueda */}
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar departamentos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre"
                disabled={!!loading}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
          </div>

        </div>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start sm:items-end lg:items-end">
          {/* Filtro de estado */}
          <SelectInput
            value={statusFilter}
            label={"Filtrar por estado"}
            placeholder={"Sleccionar"}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={!!loading}
          >
            <OptionInput value={"all"} label={"Todos"} />
            <OptionInput value={"active"} label={"Activos"} />
            <OptionInput value={"inactive"} label={"Inactivos"} />
          </SelectInput>
          <SelectInput
            placeholder={"Seleccionar"}
            label={"Filtrar por categoria"}
            disabled={!!loading}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <OptionInput value={"all"} label={"Todos"} />
            {departmentCategories.map((category) => (
              <OptionInput
                key={category.id}
                value={String(category.id)}
                label={category.nombre}
              />
            ))}
          </SelectInput>
        </div>
        {/* Contador de resultados */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} departamento{searchResultsCount !== 1 ? 's' : ''}
              {(searchTerm || statusFilter !== 'all') && (
                <span className="text-blue-600 font-medium"> (filtrados)</span>
              )}
            </span>
            {/* Limpia filtros */}
            <button
              onClick={handleCleanFilters}
              disabled={loading}
              className="ml-4 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Limpiar filtros"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      <Table>
        <Thead
          headers={departamentsHeader}
        />
        <Tbody>
          {loading ? (
            // estado de carga: placeholder único
            <tr>
              <td colSpan={departamentsHeader.length} className="px-6 py-10 text-center bg-white">
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
          ) : filteredDepartments.length === 0 ? (
            <tr className="hover:bg-gray-200">
              <td
                colSpan={departamentsHeader.length}
                className="px-6 py-10 text-center bg-white"
              >
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay departamentos disponibles.</p>
                  <span>
                    Para poder agregar departamentos, haz clic en el siguiente botón:
                  </span>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={() => handleNewDepartament()}
                      variant="info"
                      icon={<MdAdd />}
                      size="medium"
                      ariaLabel="Agregar un nuevo departamento"
                      label="Agregar un nuevo departamento"
                    />
                  </div>
                </div>
              </td>
            </tr>

          ) : (
            filteredDepartments.map((departament) => (
              <tr key={departament.id} className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    {departament.name}
                  </div>
                  <div>
                    {departament.departament_father ? (<span className="text-xs text-gray-500">Pertenece a: {departament.departament_father.name}</span>) : (<span className="text-xs text-gray-500 italic">No tiene departamento padre</span>)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{departament.nomenclatura}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{departament.category?.nombre || "Sin categoría"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(departament.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap flex text-sm text-gray-500">
                  <Button
                    icon={<MdVisibility color="green" size={20} />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerDepartament(departament.id)}
                    ariaLabel={`Ver departamento ${departament.name}`}
                    disabled={loading}
                    loading={false}
                  />
                  <Button
                    icon={<MdEdit color="blue" size={20} />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDepartament(departament.id)}
                    ariaLabel={`Editar departamento ${departament.name}`}
                    disabled={loading}
                    loading={false}
                  />
                  <Button
                    icon={<MdDelete color="red" size={20} />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteDepartament(departament.id)}
                    ariaLabel={`Eliminar departamento ${departament.name}`}
                    disabled={loading}
                    loading={false}
                  />
                </td>
              </tr>
            ))
          )}
        </Tbody>
      </Table>

    </React.Fragment>
  )
}

export default DepartamentsTable;