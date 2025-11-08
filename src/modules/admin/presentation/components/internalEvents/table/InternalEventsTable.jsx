import React from "react";
import Table from "../../../../../../components/ui/table/Table";
import Tbody from "../../../../../../components/ui/table/Tbody";
import Thead from "../../../../../../components/ui/table/Thead";
import Button from "../../../../../../components/ui/Button/Button";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";

const internalEventsHeader = [
  "Nombre",
  "Descripción",
  "Fecha",
  "Acciones"
];

const InternalEventsTable = ({ internalEvents = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);
  const [filteredEvents, setFilteredEvents] = React.useState([]);

  React.useEffect(() => {
    if (loading) {
      setFilteredEvents([]);
      return;
    }
    const results = internalEvents.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, internalEvents, loading]);

  React.useEffect(() => {
    setSearchResultsCount(filteredEvents.length);
  }, [filteredEvents]);

  const handleAddEvent = () => {
    console.log("Agregar nuevo evento interno");
  };

  const handleView = (eventId) => {
    console.log("Ver evento con ID:", eventId);
  };

  const handleEdit = (eventId) => {
    console.log("Editar evento con ID:", eventId);
  };

  const handleDelete = (eventId) => {
    console.log("Eliminar evento con ID:", eventId);
  };

  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar eventos
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
                placeholder={loading ? "Cargando..." : "Buscar por nombre"}
                className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} evento{searchResultsCount !== 1 ? 's' : ''}
              {(searchTerm) && !loading && (
                <span className="text-blue-600 font-medium"> (filtrados)</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <Table>
        <Thead headers={internalEventsHeader} hasExpand={false} />
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
                  <div className="h-8 bg-gray-200 rounded w-24" />
                </td>
              </tr>
            ))
          ) : internalEvents.length === 0 ? (
            <tr className="hover:bg-gray-200">
              <td
                colSpan={internalEventsHeader.length}
                className="px-6 py-10 text-center bg-white"
              >
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay eventos internos disponibles.</p>
                  <span>
                    Para poder agregar eventos, haz clic en el siguiente botón:
                  </span>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={() => handleAddEvent()}
                      variant="info"
                      icon={<MdAdd />}
                      size="medium"
                      ariaLabel="Agregar un nuevo evento interno"
                      label="Agregar un nuevo evento"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-center gap-2">
                    <Button
                      icon={<MdVisibility color="gray" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleView(event.id)}
                      ariaLabel={`Ver evento ${event.name}`}
                      disabled={loading}
                      loading={false}
                    />
                    <Button
                      icon={<MdEdit color="blue" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleEdit(event.id)}
                      ariaLabel={`Editar evento ${event.name}`}
                      disabled={loading}
                      loading={false}
                    />
                    <Button
                      icon={<MdDelete color="red" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleDelete(event.id)}
                      ariaLabel={`Eliminar evento ${event.name}`}
                      disabled={loading}
                      loading={false}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default InternalEventsTable;
