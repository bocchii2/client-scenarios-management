import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import Input from "../../../../../../components/ui/form/input/Input";
import useForm from "../../../../../core/hooks/useForm";
import PermissionApiService from "../../../../intrastructure/services/PermissionApiService";
import RolesApiService from "../../../../intrastructure/services/RolesApiService";
// Permisos de ejemplo (después puedes obtenerlos desde una API)

// Recursos del sistema
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
  { value: "categoria_espacios", label: "Categorías de Espacios" }
];
const NewRoleModal = ({ isOpen, onClose }) => {
  const [permissions, setPermissions] = React.useState([]);
  const permissionService = React.useRef(new PermissionApiService());
  const roleService = React.useRef(new RolesApiService());
  React.useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const perms = await permissionService.current.getPermissions();
        setPermissions(perms);
      } catch (error) {
        console.error("Error al obtener permisos:", error);
      }
    }
    fetchPermissions();
  }, []);

  const {
    formData,
    handleChange,
    errors,
    loading,
    setLoading,
    handleSubmit,
    cleanErrors,
    cleanForm
  } = useForm(
    {
      nombre: "",
      descripcion: "",
      slug: ""
    },
    true // todos los campos son requeridos
  );

  const [selectedPermissions, setSelectedPermissions] = React.useState([]);

  console.log("Permisos cargados:", permissions);
  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions((prevSelected) => {
      if (prevSelected.includes(permissionId)) {
        return prevSelected.filter((id) => id !== permissionId);
      } else {
        return [...prevSelected, permissionId];
      }
    });
  }
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Construir el objeto en el formato que espera el backend
      const roleData = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        slug: data.slug,
        permissions: selectedPermissions,
      };

      console.log("Datos del rol a enviar:", roleData);

      // Llamar a la API
      const response = await roleService.current.createRole(roleData);
      console.log("Rol creado exitosamente:", response);

      // Limpiar y cerrar
      cleanForm();
      cleanErrors();
      setSelectedPermissions([]);
      onClose();
    } catch (error) {
      console.error("Error al crear el rol:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      cleanForm();
      cleanErrors();
      setSelectedPermissions([]);
      onClose();
    }
  };



  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nuevo Rol"
      showButtonAction={true}
      labelActionButton="Crear Rol"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={(e) => handleSubmit(e, onSubmit)}
      onActionSecondButton={() => { if (!loading) handleClose(); }}
      disableActionButton={loading}
      loadingActionButton={loading}
    >
      <div className="space-y-4">
        {/* Nombre del Rol */}
        <Input
          error={errors.nombre}
          label="Nombre del Rol"
          placeholder="Ej: Administrador"
          name="nombre"
          disabled={loading}
          value={formData.nombre}
          onChange={handleChange}
          isRequired
        />

        {/* Descripción */}
        <Input
          error={errors.descripcion}
          label="Descripción"
          placeholder="Descripción del rol"
          name="descripcion"
          disabled={loading}
          value={formData.descripcion}
          onChange={handleChange}
          isRequired
          isTextarea
        />

        {/* Slug */}
        <Input
          error={errors.slug}
          label="Slug"
          placeholder="Ej: administrador (identificador único)"
          name="slug"
          disabled={loading}
          value={formData.slug}
          onChange={handleChange}
          isRequired
        />

        {/* Permisos */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Permisos
            <span className="text-gray-500 text-xs ml-2">
              ({selectedPermissions.length} seleccionado{selectedPermissions.length !== 1 ? 's' : ''})
            </span>
          </label>
          <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto bg-gray-50">
            {/* Listado de los recursos a los que se les puede asignar el rol */}
            {RESOURCES.map((resource) => {
              // Filtrar permisos por recurso
              const resourcePermissions = permissions.filter(
                (perm) => perm.entity === resource.value
              );

              if (resourcePermissions.length === 0) return null;
              console.log(`Permisos para el recurso ${resource.value}:`, resourcePermissions);

              return (
                <div key={resource.value}>
                  <h4 className="text-sm mb-2 text-blue-800 font-bold">{resource.label}</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {resourcePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`permission-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionToggle(permission.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`permission-${permission.id}`} className="text-sm uppercase text-gray-500 font-semibold">
                          {permission.action}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
          {selectedPermissions.length === 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Selecciona al menos un permiso para este rol
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NewRoleModal;
