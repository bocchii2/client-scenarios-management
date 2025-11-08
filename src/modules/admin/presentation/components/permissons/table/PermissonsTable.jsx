import React from "react";
import Table from "../../../../../../components/ui/table/Table";
import Tbody from "../../../../../../components/ui/table/Tbody";
import Thead from "../../../../../../components/ui/table/Thead";
import formatDate from "../../../../../../hooks/useFormatDate";
import Button from "../../../../../../components/ui/Button/Button";
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch, MdVisibility } from "react-icons/md";
import ExpandibleRow from "../../../../../../components/ui/table/ExpandibleRow";
import SelectInput from "../../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../../components/ui/form/select/option/OptionInput";

const permissionsHeader = [
  "Nombre de entidad",
  "Accion",
  "Código",
  "Fecha de creación",
  "Acciones"
];
const RESOURCES = [
  { value: "usuarios", label: "Usuarios" },
  { value: "roles", label: "Roles" },
  { value: "solicitudes", label: "Solicitudes" },
  { value: "departamentos", label: "Departamentos" },
  { value: "cargos", label: "Cargos" },
  { value: "espacios", label: "Espacios" },
  { value: "horarios", label: "Horarios" },
  { value: "tarifas", label: "Tarifas" },
  { value: "servicios", label: "Servicios" },
  { value: "equipamiento", label: "Equipamiento" },
  { value: "eventos_internos", label: "Eventos internos" },
];
const PermissionsTable = ({ permissions = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedResource, setSelectedResource] = React.useState(""); // usar string para controlado
  const [selectedAction, setSelectedAction] = React.useState("");
  const [searchResultsCount, setSearchResultsCount] = React.useState(0);

  const handleAddPermission = () => {
    // abrir modal para crear un nuevo permiso
  };


  // handlers compatibles con SelectInput que emite event o value
  const handleChangeResourceFilter = (eOrValue) => {
    const value = eOrValue && eOrValue.target ? eOrValue.target.value : eOrValue;
    setSelectedResource(value || "");
  }

  const handleChangeActionFilter = (eOrValue) => {
    const value = eOrValue && eOrValue.target ? eOrValue.target.value : eOrValue;
    setSelectedAction(value || "");
  }

  const filteredPermissions = React.useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    const resource = selectedResource;
    const action = selectedAction;

    if (!Array.isArray(permissions)) return [];
    if (!term && !resource && !action) return permissions;
    return permissions.filter((p) => {
      const haystack = [
        p.entity,
        p.action,
        p.fullname,
        p.name,
        p.description,
        p.code
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesTerm = haystack.includes(term);
      const matchesResource = !resource || (p.entity === resource);
      const matchesAction = !action || (p.action === action);

      return matchesTerm && matchesResource && matchesAction;
    });
  }, [permissions, searchTerm, selectedResource, selectedAction]); // <- dependencias actualizadas

  React.useEffect(() => {
    setSearchResultsCount(filteredPermissions.length);
  }, [filteredPermissions]);

  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 items-start lg:items-end">
          <div className="flex-1 min-w-0 items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar permisos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por entidad, acción o código"
                disabled={!!loading}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex items-center justify-centers gap-4">
              <div className="w-1/2 py-3">
                <SelectInput
                  placeholder={"Todos los recursos"}
                  label={"Filtrar por recurso"}
                  onChange={handleChangeResourceFilter}
                  value={selectedResource} // controlado
                >
                  <OptionInput value={""} label={"Todos los recursos"} />
                  {RESOURCES.map((resource) => (
                    <OptionInput
                      key={resource.value}
                      value={resource.value}
                      label={resource.label}
                    />
                  ))}
                </SelectInput>
              </div>
              <div className="w-1/2 py-3">
                <SelectInput
                  placeholder={"Todas las acciones"}
                  label={"Filtrar por acción"}
                  onChange={handleChangeActionFilter}
                  value={selectedAction} // controlado
                >
                  <OptionInput value={""} label={"Todas las acciones"} />
                  <OptionInput value={"crear"} label={"Crear"} />
                  <OptionInput value={"ver"} label={"Leer"} />
                  <OptionInput value={"editar"} label={"Actualizar"} />
                  <OptionInput value={"eliminar"} label={"Eliminar"} />
                </SelectInput>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdFilterList className="h-4 w-4" />
            <span>
              Mostrando {searchResultsCount} permiso{searchResultsCount !== 1 ? "s" : ""}
              {(searchTerm) && <span className="text-blue-600 font-medium"> (filtrados)</span>}
            </span>
            <span
              className="ml-auto hover:underline cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setSelectedResource("");
                setSelectedAction("");
              }}
            >
              Limpiar filtros
            </span>

          </div>
        </div>
      </div>

      <Table>
        <Thead headers={permissionsHeader} hasExpand={true} />
        <Tbody>
          {loading ? (
            <tr>
              <td colSpan={permissionsHeader.length} className="px-6 py-10 text-center bg-white">
                <div className="flex flex-col items-center gap-2">
                  <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <div className="text-sm text-gray-700">Cargando permisos...</div>
                </div>
              </td>
            </tr>
          ) : filteredPermissions.length === 0 ? (
            <tr className="hover:bg-gray-200">
              <td colSpan={permissionsHeader.length} className="px-6 py-10 text-center bg-white">
                <div className="mx-auto max-w-md flex flex-col items-center gap-4 text-gray-500">
                  <p className="font-light italic">No hay permisos disponibles.</p>
                  <span>Para poder agregar permisos, haz clic en el siguiente botón:</span>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={handleAddPermission}
                      variant="info"
                      icon={<MdAdd />}
                      size="medium"
                      ariaLabel="Agregar un nuevo permiso"
                      label="Agregar un nuevo permiso"
                      disabled={loading}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            filteredPermissions.map((permission) => (
              <ExpandibleRow
                key={permission.id}
                detail={
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="font-medium text-gray-900">Entidad</p>
                      <p className="text-gray-600">{permission.entity || permission.name || "—"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Acción</p>
                      <p className="text-gray-600">{permission.action || permission.fullname || "—"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-medium text-gray-900">Creado</p>
                      <p className="text-gray-600">
                        {permission.createdAt ? formatDate(permission.createdAt, "datetime") : "—"}
                      </p>
                    </div>
                  </div>
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permission.entity || permission.name || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permission.action || permission.fullname || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {permission.fullname ? <span className="text-gray-900">{permission.fullname}</span> : (permission.code ? <span className="text-gray-900">{permission.code}</span> : <span className="text-gray-500">Sin código</span>)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {permission.createdAt ? formatDate(permission.createdAt) : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-1 text-sm text-gray-500">
                  <Button
                    icon={<MdVisibility color="gray" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(permission.id)}
                    ariaLabel={`Ver permiso ${permission.entity || permission.name}`}
                    disabled={loading}
                  />
                  <Button
                    icon={<MdEdit color="blue" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(permission.id)}
                    ariaLabel={`Editar permiso ${permission.entity || permission.name}`}
                    disabled={loading}
                  />
                  <Button
                    icon={<MdDelete color="red" />}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(permission.id)}
                    ariaLabel={`Eliminar permiso ${permission.entity || permission.name}`}
                    disabled={loading}
                  />
                </td>
              </ExpandibleRow>
            ))
          )}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default PermissionsTable;