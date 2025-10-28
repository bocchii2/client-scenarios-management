import React from "react";
import Table from "../../../../../components/ui/table/Table";
import Thead from "../../../../../components/ui/table/Thead";
import Tbody from "../../../../../components/ui/table/Tbody";
import Tfooter from "../../../../../components/ui/table/Tfooter";
import Input from "../../../../../components/ui/form/input/Input";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";
import formatDate from "../../../../../hooks/useFormatDate";
import Button from "../../../../../components/ui/Button/Button";
import ExpandibleRow from "../../../../../components/ui/table/ExpandibleRow";

const scheduleHeaders = [
  "Nombre",
  "Descripción",
  "Fecha de inicio",
  "Fecha de fin",
  "Acciones"
];

const ScheduleTable = ({ schedules }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);

  React.useEffect(() => {
    const results = schedules.filter(schedule =>
      schedule.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResultsCount(results.length);
  }, [searchTerm, schedules]);

  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          {/* Búsqueda */}
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar departamentos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                disabled={schedules.length === 0}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start sm:items-end lg:items-end">

            {/* Contador de resultados */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdFilterList className="h-4 w-4" />
                <span>
                  Mostrando {searchResultsCount} horarios{searchResultsCount !== 1 ? 's' : ''}
                  {(searchTerm) && (
                    <span className="text-blue-600 font-medium"> (filtrados)</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table>
        <Thead headers={scheduleHeaders} />
        <Tbody>
          {schedules.length === 0 ? (
            <tr className="hover:bg-gray-200">
              <td
                colSpan={scheduleHeaders.length}
                className="px-6 py-10 text-center bg-white"
              >
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay horarios disponibles.</p>
                  <span>
                    Para poder agregar horarios, haz clic en el siguiente botón:
                  </span>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={() => handleAddSchedule()}
                      variant="info"
                      icon={<MdAdd />}
                      size="medium"
                      ariaLabel="Agregar un nuevo horario"
                      label="Agregar un nuevo horario"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            schedules.map((schedule) => (
              <ExpandibleRow key={schedule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {schedule.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {schedule.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(schedule.startDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(schedule.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-1 text-sm text-gray-500">
                  <Button
                    icon={<MdVisibility color="gray" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(permission.id)}
                    ariaLabel={`Ver permiso ${permission.name}`}
                  />
                  <Button
                    icon={<MdEdit color="blue" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(permission.id)}
                    ariaLabel={`Editar permiso ${permission.name}`}
                  />
                  <Button
                    icon={<MdDelete color="red" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(permission.id)}
                    ariaLabel={`Eliminar permiso ${permission.name}`}
                  />
                </td>
              </ExpandibleRow>
            ))
          )}
        </Tbody>
      </Table>
    </React.Fragment>
  );
}

export default ScheduleTable;