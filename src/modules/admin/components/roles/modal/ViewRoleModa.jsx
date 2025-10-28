import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import RoleApiService from "../../../services/RolesApiService";
import formatDate from "../../../../../hooks/useFormatDate";
import RoleAdapter from "../../../adapters/RoleAdapter";

const ViewRoleModal = ({ isOpen, onClose, roleId }) => {
  const [roleData, setRoleData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const roleApiServiceRef = React.useRef(new RoleApiService());
  React.useEffect(() => {
    const fetchRoleDetails = async () => {
      if (!roleId) {
        return;
      }
      setLoading(true);
      try {
        const role = await roleApiServiceRef.current.getRoleById(roleId);
        setRoleData(RoleAdapter.toViewRole(role));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleDetails();
  }, [roleId]);

  const handleClose = () => {
    onClose();
  };
  console.log("Datos del rol en ViewRoleModal:", roleData);
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Detalles del Rol"
      showButtonAction={false}
    >
      {loading && <p className="text-sm text-gray-600">Cargando detalles...</p>}
      {error && <p className="text-sm text-red-600">Error al cargar los detalles del rol.</p>}
      {roleData && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">Información del Rol</h3>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Nombre:</strong> {roleData.name}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Descripción:</strong> {roleData.description}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Fecha de Creación:</strong> {formatDate(roleData.createdAt)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Permisos:</strong>
            <ul className="list-disc list-inside">
              {roleData.permissions.map((perm) => (
                <li key={perm.id}>{perm.entidad} - {perm.accion}</li>
              ))}
            </ul>
          </p>

          <p className="mt-4 text-sm text-gray-500">
            <strong>Creado por:</strong> {roleData.createdBy || "No disponible"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <strong>Última actualización:</strong> {roleData.updatedAt ? formatDate(roleData.updatedAt) : "No disponible"}
          </p>
        </div>
      )}
    </Modal>
  );
};
export default ViewRoleModal;