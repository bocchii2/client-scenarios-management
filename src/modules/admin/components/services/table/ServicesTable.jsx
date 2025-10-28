import React from "react";
import Table from "../../../../../components/ui/table/Table";
import Tbody from "../../../../../components/ui/table/Tbody";
import Thead from "../../../../../components/ui/table/Thead";
import Button from "../../../../../components/ui/Button/Button";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";

const servicesHeader = [
  "Nombre",
  "Descripción",
  "Precio",
  "Acciones"
];

const ServicesTable = ({ services = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);
  const [filteredServices, setFilteredServices] = React.useState([]);

  React.useEffect(() => {
    if (loading) {
      setFilteredServices([]);
      return;
    }
    const results = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results);
  }, [searchTerm, services, loading]);

  React.useEffect(() => {
    setSearchResultsCount(filteredServices.length);
  }, [filteredServices]);

  const handleAddService = () => {
    console.log("Agregar nuevo servicio");
  };

  const handleView = (serviceId) => {
    console.log("Ver servicio con ID:", serviceId);
  };

  const handleEdit = (serviceId) => {
    console.log("Editar servicio con ID:", serviceId);
  };

  const handleDelete = (serviceId) => {
    console.log("Eliminar servicio con ID:", serviceId);
  };

  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar servicios
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
              Mostrando {searchResultsCount} servicio{searchResultsCount !== 1 ? 's' : ''}
              {(searchTerm) && !loading && (
                <span className="text-blue-600 font-medium"> (filtrados)</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <Table>
        <Thead headers={servicesHeader} hasExpand={false} />
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
          ) : services.length === 0 ? (
            <tr className="hover:bg-gray-200">
              <td
                colSpan={servicesHeader.length}
                className="px-6 py-10 text-center bg-white"
              >
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay servicios disponibles.</p>
                  <span>
                    Para poder agregar servicios, haz clic en el siguiente botón:
                  </span>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={() => handleAddService()}
                      variant="info"
                      icon={<MdAdd />}
                      size="medium"
                      ariaLabel="Agregar un nuevo servicio"
                      label="Agregar un nuevo servicio"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            filteredServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${service.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-center gap-2">
                    <Button
                      icon={<MdVisibility color="gray" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleView(service.id)}
                      ariaLabel={`Ver servicio ${service.name}`}
                      disabled={loading}
                      loading={false}
                    />
                    <Button
                      icon={<MdEdit color="blue" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleEdit(service.id)}
                      ariaLabel={`Editar servicio ${service.name}`}
                      disabled={loading}
                      loading={false}
                    />
                    <Button
                      icon={<MdDelete color="red" />}
                      variant="outline"
                      size="small"
                      onClick={() => handleDelete(service.id)}
                      ariaLabel={`Eliminar servicio ${service.name}`}
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

export default ServicesTable;
