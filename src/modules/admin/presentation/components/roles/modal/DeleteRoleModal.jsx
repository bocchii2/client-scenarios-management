import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import RolesApiService from "../../../../intrastructure/services/RolesApiService";
import formatDate from "../../../../../../hooks/useFormatDate";

const DeleteRoleModal = ({ isOpen, onClose, roleId }) => {
  const roleApiServiceRef = React.useRef(new RolesApiService());
  const [role, setRole] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchRole = async () => {
      try {
        setLoading(true);
        if (!roleId) {
          setRole(null);
          return;
        }
        const fetchedRole = await roleApiServiceRef.current.getRoleById(roleId);
        setRole(fetchedRole);
      } catch (error) {
        console.error("Error al obtener el rol:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [roleId]);
  const handleDelete = async () => {
    if (!roleId) return;
    try {
      await roleApiServiceRef.current.deleteRole(roleId);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el rol:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Rol"
      showButtonAction={true}
      labelActionButton={roleId === 1 ? "No se puede eliminar" : "Eliminar"}
      disableActionButton={roleId === 1}
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={roleId === 1 ? null : handleDelete}
      onActionSecondButton={onClose}
      loadingActionButton={loading}
    >
      {loading && <p className="text-sm text-gray-600">Cargando...</p>}
      {role && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h4 className="text-sm font-medium text-red-800">Rol a eliminar:</h4>
          <p className="text-sm text-gray-800 font-bold">{role.nombre}</p>
          <p className="text-sm text-gray-600">{role.descripcion}</p>
          <p className="text-sm text-gray-600">Fecha de creación: {formatDate(role.created_at)}</p>
          <p className="text-sm text-gray-600">Fecha de actualización: {formatDate(role.updated_at)}</p>
          <p className="text-sm text-gray-600">Creado por: {role.created_by || "Desconocido"}</p>
        </div>
      )}
    </Modal>
  );
};

export default DeleteRoleModal;