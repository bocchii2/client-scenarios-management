import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import DepartmentApiService from "../../../../intrastructure/services/DepartmentsApiService";
import formatDate from "../../../../../../hooks/useFormatDate";

const ViewDepartmentModal = ({ isOpen, onClose, departmentId }) => {
  const [departmentData, setDepartmentData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const departmentApiServiceRef = React.useRef(new DepartmentApiService());

  React.useEffect(() => {
    const fetchDepartmentDetails = async () => {
      if (!departmentId) {
        setDepartmentData(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await departmentApiServiceRef.current.getDepartmentById(departmentId);
        setDepartmentData(data);
      } catch (err) {
        console.error("Error al obtener los detalles del departamento:", err);
        setError(err);
        setDepartmentData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentDetails();
  }, [departmentId]);

  const handleClose = () => {
    onClose();
  };

  const renderParentChain = (dept) => {
    if (!dept) return null;
    const chain = [];
    let current = dept.departament_father || null;
    while (current) {
      chain.push(`${current.name} ${current.nomenclatura ? `(${current.nomenclatura})` : ""}`);
      current = current.departament_father || null;
    }
    return chain.length ? chain.join(" ← ") : null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Detalles del Departamento"
      showButtonAction={false}
    >
      {loading && <p className="text-sm text-gray-600">Cargando detalles...</p>}
      {error && <p className="text-sm text-red-600">Error al cargar los detalles del departamento.</p>}

      {!loading && !error && !departmentData && (
        <p className="text-sm text-gray-600">Selecciona un departamento para ver sus detalles.</p>
      )}

      {departmentData && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{departmentData.name}</h3>
            <p className="text-sm text-gray-500">Nomenclatura: {departmentData.nomenclatura || "-"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Descripción</h4>
            <p className="text-sm text-gray-600">{departmentData.description || <span className="italic text-gray-400">Sin descripción</span>}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Estado</h4>
              <span className={`px-2 py-1 rounded text-sm ${departmentData.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {departmentData.activo ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Creado</h4>
              <p className="text-sm text-gray-600">{formatDate(departmentData.createdAt)}</p>
            </div>
          </div>

          <div className="mt-7">
            <h4 className="text-sm text-gray-700 font-bold">Departamento al que pertenece</h4>
            {departmentData.departament_father ? (
              <div className="text-sm text-gray-600">
                <div className="font-medium">{departmentData.departament_father.name} {departmentData.departament_father.nomenclatura ? `(${departmentData.departament_father.nomenclatura})` : ""}</div>
                <div className="text-xs text-gray-500">Creado: {formatDate(departmentData.departament_father.createdAt)}</div>
                {renderParentChain(departmentData) && (
                  <div className="mt-2 text-xs text-gray-500">Ancestros: {renderParentChain(departmentData)}</div>
                )}
              </div>
            ) : (
              <p className="text-sm italic text-gray-500">No tiene departamento padre</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewDepartmentModal;