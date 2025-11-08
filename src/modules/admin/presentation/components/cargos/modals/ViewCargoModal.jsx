import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import formatDate from "../../../../../../hooks/useFormatDate";
import CargoDIContainer from "../../../../intrastructure/di/CargoDIContainer";

const ViewCargoModal = ({ isOpen, onClose, cargoId, getCargoByIdUseCase = null }) => {
  // ✅ Inyección de dependencias
  const useCase = getCargoByIdUseCase || CargoDIContainer.getInstance().getGetCargoByIdUseCase();

  const [cargo, setCargo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCargo = async () => {
      if (!isOpen || !cargoId) return;

      setLoading(true);
      setError(null);
      try {
        const result = await useCase.execute(cargoId);
        setCargo(result);
      } catch (err) {
        console.error("Error al obtener cargo:", err);
        setError("No se pudo cargar el cargo");
      } finally {
        setLoading(false);
      }
    };

    fetchCargo();
  }, [isOpen, cargoId, useCase]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Cargo"
      showButtonAction={false}
    >
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
      )}

      {cargo && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Nombre</label>
            <p className="text-lg font-medium text-gray-900">{cargo.nombre}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Descripción</label>
            <p className="text-gray-700 whitespace-pre-wrap">{cargo.descripcion}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Estado</label>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${cargo.activo
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}>
                {cargo.activo ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Fecha de Creación</label>
              <p className="text-gray-700">{formatDate(cargo.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewCargoModal;