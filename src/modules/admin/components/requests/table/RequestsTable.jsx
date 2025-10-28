import React from "react";
import Table from "../../../../../components/ui/table/Table";
import Tbody from "../../../../../components/ui/table/Tbody";
import Thead from "../../../../../components/ui/table/Thead";
import Button from "../../../../../components/ui/Button/Button";
import { MdDelete, MdFilterList, MdSearch, MdVisibility, MdCheckCircle, MdCancelScheduleSend } from "react-icons/md";
import ExpandibleRow from "../../../../../components/ui/table/ExpandibleRow";

const requestsHeader = [
  "Solicitante",
  "Escenario",
  "Fecha Evento",
  "Estado",
  "Acciones"
];

const RequestsTable = ({ requests = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);
  const [filteredRequests, setFilteredRequests] = React.useState([]);

  React.useEffect(() => {
    if (loading) {
      setFilteredRequests([]);
      return;
    }
    const results = requests.filter((request) =>
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.scenarioName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(results);
  }, [searchTerm, requests, loading]);

  React.useEffect(() => {
    setSearchResultsCount(filteredRequests.length);
  }, [filteredRequests]);

  const handleView = (requestId) => {
    console.log("Ver solicitud con ID:", requestId);
  };

  const handleApprove = (requestId) => {
    console.log("Aprobar solicitud con ID:", requestId);
  };

  const handleReject = (requestId) => {
    console.log("Rechazar solicitud con ID:", requestId);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      "pendiente": "bg-yellow-100 text-yellow-800",
      "aprobada": "bg-green-100 text-green-800",
      "rechazada": "bg-red-100 text-red-800",
      "en-revision": "bg-blue-100 text-blue-800"
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar solicitudes
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                disabled={loading}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={loading ? "Cargando..." : "Buscar por solicitante o escenario"}
                className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} solicitud{searchResultsCount !== 1 ? 'es' : ''}
              {(searchTerm) && !loading && (
                <span className="text-blue-600 font-medium"> (filtradas)</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <Table>
        <Thead headers={requestsHeader} hasExpand={true} />
        <Tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={`skeleton-${idx}`} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-8 bg-gray-200 rounded w-24" />
                </td>
              </tr>
            ))
          ) : requests.length === 0 ? (
            <tr className="hover:bg-gray-200">
              <td
                colSpan={requestsHeader.length}
                className="px-6 py-10 text-center bg-white"
              >
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay solicitudes disponibles.</p>
                  <span>
                    Las solicitudes de reserva aparecerán aquí.
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            filteredRequests.map((request) => (
              <ExpandibleRow
                key={request.id}
                detail={
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-900">Email del solicitante:</p>
                      <p className="text-gray-600">{request.email}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-900">Teléfono:</p>
                      <p className="text-gray-600">{request.phone}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-900">Propósito del evento:</p>
                      <p className="text-gray-600">{request.eventPropose}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-900">Descripción:</p>
                      <p className="text-gray-600">{request.description}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-900">Hora inicio - Hora fin:</p>
                      <p className="text-gray-600">{request.startTime} - {request.endTime}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-900">Participantes estimados:</p>
                      <p className="text-gray-600">{request.estimatedParticipants}</p>
                    </div>
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                      <p className="font-medium text-gray-900">Fecha de solicitud:</p>
                      <p className="text-gray-600">{request.requestDate}</p>
                    </div>
                  </div>
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.scenarioName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.eventDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-center gap-2">
                    <Button
                      icon={<MdVisibility color="gray" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleView(request.id)}
                      ariaLabel={`Ver solicitud ${request.id}`}
                      disabled={loading}
                      loading={false}
                    />
                    {request.status === "pendiente" || request.status === "en-revision" ? (
                      <>
                        <Button
                          icon={<MdCheckCircle color="green" />}
                          variant="outline"
                          size="small"
                          onClick={() => handleApprove(request.id)}
                          ariaLabel={`Aprobar solicitud ${request.id}`}
                          disabled={loading}
                          loading={false}
                          title="Aprobar solicitud"
                        />
                        <Button
                          icon={<MdCancelScheduleSend color="red" />}
                          variant="outline"
                          size="small"
                          onClick={() => handleReject(request.id)}
                          ariaLabel={`Rechazar solicitud ${request.id}`}
                          disabled={loading}
                          loading={false}
                          title="Rechazar solicitud"
                        />
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">No disponible</span>
                    )}
                  </div>
                </td>
              </ExpandibleRow>
            ))
          )}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default RequestsTable;
