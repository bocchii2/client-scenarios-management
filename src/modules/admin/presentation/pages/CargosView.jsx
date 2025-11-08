import React, { useState, useEffect, useRef } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../../components/ui/Button/Button';
import CargosTable from '../components/cargos/table/CargosTable';
import SimpleInfoCard from '../../../../components/ui/card/SimpleInfoCard';
import NewCargoModal from '../components/cargos/modals/NewCargoModal';
import CargoDIContainer from '../../intrastructure/di/CargoDIContainer';

const CargosView = () => {
  // ✅ Inyección de dependencias
  const getCargosUseCase = CargoDIContainer.getInstance().getGetCargosUseCase();

  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  // Estado único para modales: { name: 'add' | 'edit' | 'delete' | null, payload: any }
  const [modal, setModal] = useState({ name: null, payload: null });

  const openModal = (name, payload = null) => setModal({ name, payload });
  const closeModal = () => setModal({ name: null, payload: null });

  const handleAddCargo = () => {
    openModal("add");
  };

  const handleRefreshData = async () => {
    try {
      setLoading(true);
      setGeneralError(null);
      const data = await getCargosUseCase.getAll();
      setCargos(data);
    } catch (error) {
      console.error("Error al obtener los cargos:", error);
      setGeneralError("Error al cargar los cargos. Por favor, intenta de nuevo.");
      setCargos([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar
  useEffect(() => {
    handleRefreshData();
  }, []);

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      <NewCargoModal
        isOpen={modal.name === "add"}
        onClose={closeModal}
        title="Agregar Nuevo Cargo"
      />

      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cargos</h1>
          <p className="text-gray-600 mt-1">
            Administra los cargos y su estructura en el sistema
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
            disabled={loading}
            loading={loading}
          />
          <Button
            onClick={handleAddCargo}
            variant="success"
            label="Agregar Cargo"
            icon={<MdAdd />}
            size="medium"
            disabled={loading}
          />
        </div>
      </div>

      {/* Error Card */}
      {generalError && (
        <SimpleInfoCard
          title="Error al cargar datos"
          message={generalError}
          variant="error"
          onClose={() => setGeneralError(null)}
          showCloseButton={true}
        />
      )}

      {/* Tabla con modales */}
      <CargosTable
        cargos={cargos}
        loading={loading}
        getCargosUseCase={getCargosUseCase}
        onCargoDeleted={handleRefreshData}
      />
    </div>
  );
};

export default CargosView;