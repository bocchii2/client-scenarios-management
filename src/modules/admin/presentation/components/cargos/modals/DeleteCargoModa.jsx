import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import formatDate from "../../../../../../hooks/useFormatDate";
import CargoDIContainer from "../../../../intrastructure/di/CargoDIContainer";

const DeleteCargoModal = ({ isOpen, onClose, cargoId, onDelete, getCargoByIdUseCase = null, deleteCargoUseCase = null }) => {
  // ✅ Inyección de dependencias
  const getByIdUseCase = getCargoByIdUseCase || CargoDIContainer.getInstance().getGetCargoByIdUseCase();
  const deleteUseCase = deleteCargoUseCase || CargoDIContainer.getInstance().getDeleteCargoUseCase();

  const [cargo, setCargo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCargo = async () => {
      if (!isOpen || !cargoId) return;

      setLoading(true);
      setError(null);
      try {
        const result = await getByIdUseCase.execute(cargoId);
        setCargo(result);
      } catch (err) {
        console.error("Error al obtener cargo:", err);
        setError("No se pudo cargar la información del cargo");
      } finally {
        setLoading(false);
      }
    };

    fetchCargo();
  }, [isOpen, cargoId]);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUseCase.execute(cargoId);
      onDelete && onDelete();
      onClose();
    } catch (err) {
      console.error("Error eliminando cargo:", err);
      setError("Error al eliminar el cargo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Cargo"
      showButtonAction={true}
      labelActionButton="Eliminar"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={handleDelete}
      onActionSecondButton={onClose}
      disableActionButton={loading}
      loadingActionButton={loading}
    >
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm mb-4">
          {error}
        </div>
      )}

      {cargo && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h4 className="text-sm font-semibold text-red-800 mb-2">Cargo a eliminar:</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Nombre:</span> {cargo.nombre}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Descripción:</span> {cargo.descripcion}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Fecha de creación:</span> {formatDate(cargo.createdAt)}
            </p>
          </div>
          <p className="text-xs text-red-700 mt-3 font-semibold">
            ⚠️ Esta acción no se puede deshacer
          </p>
        </div>
      )}
    </Modal>
  );
};

export default DeleteCargoModal;