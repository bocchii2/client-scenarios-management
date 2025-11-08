import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import DepartmentApiService from "../../../../intrastructure/services/DepartmentsApiService";
import formatDate from "../../../../../../hooks/useFormatDate";
const DeleteDepartmentModal = ({ isOpen, onClose, departmentId }) => {
  const departmentApiServiceRef = React.useRef(new DepartmentApiService());
  const [department, setDepartment] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        if (!departmentId) {
          setDepartment(null);
          return;
        }
        const fetchedDepartment = await departmentApiServiceRef.current.getDepartmentById(departmentId);
        setDepartment(fetchedDepartment);
      } catch (error) {
        console.error("Error al obtener el departamento:", error);
      } finally {
        setLoading(false);
      }

    };
    fetchDepartment();
  }, [departmentId]);
  const handleDelete = async () => {
    if (!departmentId) return;
    try {
      await departmentApiServiceRef.current.deleteDepartment(departmentId);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el departamento:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Departamento"
      showButtonAction={true}
      labelActionButton="Eliminar"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={handleDelete}
      onActionSecondButton={onClose}
      loadingActionButton={loading}
    >
      <p className="text-sm text-gray-600">¿Estás seguro de que deseas eliminar este departamento?</p>
      {loading && (<p className="text-sm text-gray-600 mt-2">Cargando información del departamento...</p>)}
      {department && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h4 className="text-sm font-medium text-red-800">Departamento a eliminar:</h4>
          <p className="text-sm text-gray-600">{department.name}</p>
          <p className="text-sm text-gray-600">{department.nomenclatura}</p>
          <p className="text-sm text-gray-600">Fecha de creación: {formatDate(department.createdAt)}</p>
        </div>
      )}
    </Modal>
  );
}

export default DeleteDepartmentModal;