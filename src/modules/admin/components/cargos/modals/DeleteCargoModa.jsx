import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import CargoApiService from "../../../services/CargoApiService";
import formatDate from "../../../../../hooks/useFormatDate";

const DeleteCargoModal = ({ isOpen, onClose, cargoId }) => {
  const cargoApiServiceRef = React.useRef(new CargoApiService());
  const [cargo, setCargo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCargo = async () => {
      setLoading(true);
      try {
        const data = await cargoApiServiceRef.current.getCargoById(cargoId);
        setCargo(data);
      } catch (error) {
        console.error("Error al obtener el cargo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && cargoId) {
      fetchCargo();
    }
  }, [isOpen, cargoId]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await cargoApiServiceRef.current.deleteCargo(cargoId);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el cargo:", error);
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
      disableActionButton={loading}
      loadingActionButton={loading}
      onActionButton={handleDelete}
    >
      <div>
        {loading && (<p className="text-sm text-gray-600 mt-2">Cargando información del cargo...</p>)}
        {cargo && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <h4 className="text-sm font-medium text-red-800">Cargo a eliminar:</h4>
            <p className="text-sm text-gray-600">{cargo.name}</p>
            <p className="text-sm text-gray-600">{cargo.nomenclatura}</p>
            <p className="text-sm text-gray-600">Fecha de creación: {formatDate(cargo.createdAt)}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeleteCargoModal;
