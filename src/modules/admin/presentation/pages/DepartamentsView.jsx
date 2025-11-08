import React from "react";
import Button from "../../../../components/ui/Button/Button";
import { MdAdd, MdRefresh } from "react-icons/md";
import DepartamentsTable from "../components/departments/table/DepartmentsTable";
import { de } from "date-fns/locale";
import NewDepartmentModal from "../components/departments/modals/NewDepartmentModal";
import AdminDeparmentsCategoriesModal from "../components/departments/modals/AdminDeparmentsCategoriesModal";
import DepartmentApiService from "../../intrastructure/services/DepartmentsApiService";
import SimpleInfoCard from "../../../../components/ui/card/SimpleInfoCard";

const DepartamentosView = () => {
  const [isNewDepartmentModalOpen, setIsNewDepartmentModalOpen] = React.useState(false);
  const [isAdminCategoriesModalOpen, setIsAdminCategoriesModalOpen] = React.useState(false);
  const [departments, setDepartments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // instancia reutilizable del servicio
  const departmentApiServiceRef = React.useRef(new DepartmentApiService());


  // función de refresco: obtiene datos y actualiza el estado
  const handleRefreshData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await departmentApiServiceRef.current.getDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar los departamentos:", error);
      setError("Error al cargar los departamentos. Por favor, intenta de nuevo.");
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // cargar al montar reutilizando la misma lógica
  React.useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData]);

  const handleAddDepartamento = () => {
    setIsNewDepartmentModalOpen(true);
  };

  console.log("Departamentos cargados:", departments);
  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      <NewDepartmentModal
        isOpen={isNewDepartmentModalOpen}
        onClose={() => setIsNewDepartmentModalOpen(false)}
      />
      <AdminDeparmentsCategoriesModal
        isOpen={isAdminCategoriesModalOpen}
        onClose={() => setIsAdminCategoriesModalOpen(false)}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Departamentos</h1>
          <p className="text-gray-600 mt-1">
            Administra departamentos y su estructura en el sistema
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
            loading={loading}
            disabled={loading}
          />
          <Button
            onClick={handleAddDepartamento}
            variant="success"
            label="Agregar Departamento"
            icon={<MdAdd />}
            size="medium"
            disabled={loading}
          />
          <Button
            onClick={() => { setIsAdminCategoriesModalOpen(true); }}
            variant="secondary"
            label="Gestionar Categorías"
            size="medium"
            icon={<MdAdd />}
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

      <DepartamentsTable departaments={departments} loading={loading} />

    </div>
  );
};

export default DepartamentosView;