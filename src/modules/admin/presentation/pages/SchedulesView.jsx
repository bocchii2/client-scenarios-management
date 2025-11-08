import React from "react";
import Button from "../../../../components/ui/Button/Button";
import { MdAdd, MdRefresh } from "react-icons/md";
import SchedulesTable from "../components/schedules/table/SchedulesTable";

const SchedulesView = () => {
  const [schedules] = React.useState([]);
  const [loading] = React.useState(false);

  const handleRefreshData = React.useCallback(() => {
    console.log("Actualizar horarios y tarifas");
  }, []);

  const handleAddSchedule = () => {
    console.log("Agregar nuevo horario");
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Horarios y Tarifas</h1>
          <p className="text-gray-600 mt-1">
            Administra horarios disponibles y tarifas del sistema
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
            onClick={handleAddSchedule}
            variant="success"
            label="Agregar Horario"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>

      <SchedulesTable schedules={schedules} loading={loading} />
    </div>
  );
};

export default SchedulesView;
