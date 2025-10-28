import React from "react";
import Button from "../../../components/ui/Button/Button";
import { MdRefresh } from "react-icons/md";
import RequestsTable from "../components/requests/table/RequestsTable";

const RequestsView = () => {
  const [requests] = React.useState([]);
  const [loading] = React.useState(false);

  const handleRefreshData = React.useCallback(() => {
    console.log("Actualizar solicitudes");
  }, []);

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Solicitudes</h1>
          <p className="text-gray-600 mt-1">
            Administra y revisa todas las solicitudes de reserva de espacios
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
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de solicitudes</p>
              <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
            </div>
            <div className="text-4xl text-gray-300">📋</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {requests.filter(r => r.status === "pendiente").length}
              </p>
            </div>
            <div className="text-4xl text-yellow-300">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aprobadas</p>
              <p className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === "aprobada").length}
              </p>
            </div>
            <div className="text-4xl text-green-300">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rechazadas</p>
              <p className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === "rechazada").length}
              </p>
            </div>
            <div className="text-4xl text-red-300">❌</div>
          </div>
        </div>
      </div>

      <RequestsTable requests={requests} loading={loading} />
    </div>
  );
};

export default RequestsView;
