import React, { useState, useMemo } from 'react';
import { MdAdd, MdDownload, MdRefresh, MdSecurity } from 'react-icons/md';
import Button from '../../../components/ui/Button/Button';
import CargosTable from '../components/cargos/table/CargosTable';
import NewCargoModal from '../components/cargos/modals/NewCargoModal';
import CargoApiService from '../services/CargoApiService';
import CargoAdapter from '../adapters/CargoAdapter';

const CargosView = () => {
  const cargoApiService = React.useRef(new CargoApiService());
  const [isNewCargoModalOpen, setIsNewCargoModalOpen] = useState(false);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefreshData = async () => {
    // llamar a la api para cargar los roles y ponerles en la tabla
    try {
      setLoading(true);
      const data = await cargoApiService.current.getCargos();
      setCargos(data);
    } catch (error) {
      console.error("Error al obtener los cargos:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleRefreshData();
  }, []);

  const handleAddCargo = () => {
    // abrir modal para crear un nuevo cargo
    setIsNewCargoModalOpen(true);
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      <NewCargoModal
        isOpen={isNewCargoModalOpen}
        onClose={() => setIsNewCargoModalOpen(false)}
        onSave={(newCargo) => {
          // Lógica para guardar el nuevo cargo
          setIsNewCargoModalOpen(false);
        }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cargos</h1>
          <p className="text-gray-600 mt-1">
            Administra cargos y su estructura en el sistema
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
          />
          <Button
            onClick={handleAddCargo}
            variant="success"
            label="Agregar Cargo"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>
      <CargosTable cargos={cargos} loading={loading} />

    </div>
  );
};

export default CargosView;