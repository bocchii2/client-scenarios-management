import React from "react";
import Button from "../../../../components/ui/Button/Button";
import { MdAdd, MdRefresh } from "react-icons/md";
import EquipmentTable from "../components/equipment/table/EquipmentTable";

const EquipmentView = () => {
  const [equipment] = React.useState([]);
  const [loading] = React.useState(false);

  const handleRefreshData = React.useCallback(() => {
    console.log("Actualizar equipamiento");
  }, []);

  const handleAddEquipment = () => {
    console.log("Agregar nuevo equipamiento");
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Equipamiento</h1>
          <p className="text-gray-600 mt-1">
            Administra el equipamiento disponible en la organización
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
            onClick={handleAddEquipment}
            variant="success"
            label="Agregar Equipamiento"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>

      <EquipmentTable equipment={equipment} loading={loading} />
    </div>
  );
};

export default EquipmentView;
