import React from 'react'
import Modal from '../../../../../../components/ui/Modal/Modal'
import Input from '../../../../../../components/ui/form/input/Input';
import SelectInput from '../../../../../../components/ui/form/select/SelectInput';
import OptionInput from '../../../../../../components/ui/form/select/option/OptionInput';
import Avatar from '../../../../../../components/ui/avatar/Avatar';
import UserApiService from '../../../../intrastructure/services/UserApiService';
import CargoApiService from '../../../../intrastructure/services/CargoApiService';
import DepartmentsApiService from '../../../../intrastructure/services/DepartmentsApiService';
import RolesApiService from '../../../../intrastructure/services/RolesApiService';
import Separator from '../../../../../../components/ui/separator/Separator';
import useForm from '../../../../../core/hooks/useForm';
import { getStorageUrl } from '../../../../../../config/storage';

const EditUserModal = ({ isOpen, onClose, title, user }) => {
  // Servicios
  const userServiceRef = React.useRef(new UserApiService());
  const cargoServiceRef = React.useRef(new CargoApiService());
  const departmentServiceRef = React.useRef(new DepartmentsApiService());
  const roleServiceRef = React.useRef(new RolesApiService());

  // Opciones de selects
  const [identificacionOptions, setIdentificacionOptions] = React.useState([
    { value: 'Cédula', label: 'Cédula' },
    { value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Tarjeta de Identidad', label: 'Tarjeta de Identidad' },
  ]);
  const [departamentoOptions, setDepartamentoOptions] = React.useState([]);
  const [cargoOptions, setCargoOptions] = React.useState([]);
  const [roleOptions, setRoleOptions] = React.useState([]);

  const [avatarFile, setAvatarFile] = React.useState(null);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState(null);

  // Usar useForm con la estructura de datos
  const { formData, errors, handleChange, handleSubmit, loading, cleanErrors } = useForm(
    {
      nombres_completos: "",
      correo_electronico: "",
      identification: "",
      tipo_identificacion: "",
      departamento_id: "",
      cargos: [],
      roles: [],
      telefono: "",
    },
    false
  );

  // Cargar opciones de departamentos, cargos y roles cuando se abre el modal
  React.useEffect(() => {
    if (isOpen) {
      loadSelectOptions();
    }
  }, [isOpen]);

  const loadSelectOptions = async () => {
    try {
      // Cargar departamentos
      const depts = await departmentServiceRef.current.getDepartments();
      setDepartamentoOptions(
        depts.map(dept => ({
          value: dept.id,
          label: dept.name || dept.nombre_departamento
        }))
      );

      // Cargar cargos
      const cargos = await cargoServiceRef.current.getCargos();
      setCargoOptions(
        cargos.map(cargo => ({
          value: cargo.id,
          label: cargo.name || cargo.nombre_cargo
        }))
      );

      // Cargar roles
      const roles = await roleServiceRef.current.getAllRoles();
      setRoleOptions(
        roles.map(role => ({
          value: role.id,
          label: role.name || role.nombre
        }))
      );
    } catch (error) {
      console.error("Error cargando opciones:", error);
    }
  };

  // Inicializar formulario cuando se abre el modal con un usuario
  React.useEffect(() => {
    if (isOpen && user) {
      // Actualizar formData con los datos del usuario
      const cargoIds = user.cargos && user.cargos.length > 0
        ? user.cargos.map(c => c.id)
        : [];
      const roleIds = user.roles && user.roles.length > 0
        ? user.roles.map(r => r.id)
        : [];

      Object.keys(formData).forEach(key => {
        let value = "";

        if (key === "nombres_completos") value = user.fullName || "";
        else if (key === "correo_electronico") value = user.email || "";
        else if (key === "identification") value = user.identification || "";
        else if (key === "tipo_identificacion") value = user.identificationType || "";
        else if (key === "departamento_id") value = user.departamento?.id || "";
        else if (key === "cargos") value = cargoIds;
        else if (key === "roles") value = roleIds;
        else if (key === "telefono") value = user.phone || "";

        handleChange({
          target: {
            name: key,
            value: value,
            type: key === "cargos" || key === "roles" ? "array" : "text",
          }
        });
      });

      setAvatarFile(null);
    }
  }, [isOpen, user]);

  // Manejar cambios para arrays (cargos, roles)
  const handleArrayChange = React.useCallback((fieldName, value) => {
    handleChange({
      target: {
        name: fieldName,
        value: value,
        type: "array",
      }
    });
  }, [handleChange]);

  // Manejar actualización de avatar de forma independiente
  const handleAvatarChange = React.useCallback(async (file, previewUrl) => {
    if (!file || !user?.id) return;

    setAvatarFile(file);
    setUploadingAvatar(true);
    setAvatarError(null);

    try {
      await userServiceRef.current.updateProfilePicture(user.id, file);
      console.log("Foto de perfil actualizada exitosamente");
      // Aquí podrías disparar una notificación de éxito
    } catch (error) {
      console.error("Error al actualizar foto de perfil:", error);
      setAvatarError("Error al actualizar la foto de perfil");
      // Aquí podrías disparar una notificación de error
    } finally {
      setUploadingAvatar(false);
    }
  }, [user?.id]);

  const handleEditUser = async (e) => {
    e?.preventDefault();
    if (!user?.id) return;

    try {
      // Preparar payload con campos que no estén vacíos
      const payload = {
        nombres_completos: formData.nombres_completos,
        correo_electronico: formData.correo_electronico,
        tipo_identificacion: formData.tipo_identificacion,
        identificacion: formData.identification,
        telefono: formData.telefono,
      };

      // Solo agregar departamento_id si tiene valor
      if (formData.departamento_id) {
        payload.departamento_id = formData.departamento_id;
      }

      // Solo agregar cargos si es un array con valores
      if (Array.isArray(formData.cargos) && formData.cargos.length > 0) {
        payload.cargos = formData.cargos;
      }

      // Solo agregar roles si es un array con valores
      if (Array.isArray(formData.roles) && formData.roles.length > 0) {
        payload.roles = formData.roles;
      }

      console.log("ID de usuario a actualizar:", user.id);
      console.log("Payload a enviar:", payload);

      // Actualizar usuario
      await userServiceRef.current.updateUser(user.id, payload);
      console.log("Usuario actualizado exitosamente");

      onClose();
      // Aquí podrías disparar una notificación de éxito
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      // Aquí podrías disparar una notificación de error
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showButtonAction={true}
      labelActionButton={"Guardar Cambios"}
      showSecondButton={true}
      labelSecondButton={"Cancelar"}
      onActionButton={handleEditUser}
      onActionSecondButton={() => { if (!loading) onClose(); }}
      disableActionButton={loading || !user}
      loadingActionButton={loading}
    >
      {/* Avatar clickable con preview */}
      <div className='flex items-center gap-4 mb-6'>
        <div className="relative">
          <Avatar
            size="large"
            editable
            disabled={uploadingAvatar}
            accept="image/png,image/jpeg"
            src={getStorageUrl(user?.profileImage || user?.avatar || user?.imgUrl)}
            onChange={handleAvatarChange}
          />
          {uploadingAvatar && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600 flex-1">
          <p className="font-medium text-gray-800">Foto de perfil</p>
          <p className="text-gray-500">Haz clic para seleccionar una nueva imagen (PNG/JPG).</p>
          {avatarError && <p className="text-red-500 text-xs mt-1">{avatarError}</p>}
          {uploadingAvatar && <p className="text-blue-500 text-xs mt-1">Cargando imagen...</p>}
        </div>
      </div>

      <form onSubmit={handleEditUser}>
        {/* Sección de información personal */}
        <div className='space-y-4'>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Información Personal</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                label="Nombre Completo"
                id="nombres_completos"
                name="nombres_completos"
                placeholder="Ej: Juan Carlos Pérez"
                value={formData.nombres_completos}
                onChange={handleChange}
                required
              />
              <Input
                label="Correo Electrónico"
                id="correo_electronico"
                name="correo_electronico"
                type="email"
                placeholder="usuario@example.com"
                value={formData.correo_electronico}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Sección de identificación */}
          <Separator color={"gray"} height='2px' />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Identificación</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                label="Número de Identificación"
                id="identification"
                name="identification"
                placeholder="Ej: 1234567890"
                value={formData.identification}
                onChange={handleChange}
                required
              />
              <SelectInput
                label="Tipo de Identificación"
                id="tipo_identificacion"
                name="tipo_identificacion"
                placeholder="Selecciona un tipo"
                value={formData.tipo_identificacion}
                onChange={handleChange}
              >
                {identificacionOptions.map((option) => (
                  <OptionInput key={option.value} value={option.value} label={option.label} />
                ))}
              </SelectInput>
            </div>
          </div>

          {/* Sección de contacto */}
          <Separator color={"gray"} height='2px' />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contacto</h3>
            <Input
              label="Teléfono"
              id="telefono"
              name="telefono"
              placeholder="+56 9 1234 5678"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* Sección organizacional */}
          <Separator color={"gray"} height='2px' />
          <div className='w-full'>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Asignación Organizacional</h3>
            <div className=''>
              <SelectInput
                label="Departamento"
                id="departamento_id"
                name="departamento_id"
                placeholder="Selecciona un departamento"
                value={formData.departamento_id}
                onChange={handleChange}
              >
                <OptionInput value="" label="Sin departamento" />
                {departamentoOptions.map((option) => (
                  <OptionInput key={option.value} value={option.value} label={option.label} />
                ))}
              </SelectInput>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Cargos</label>
                <div className='bg-gray-200 border-gray-400 p-5 w-full border rounded'>
                  <h3 className='text-gray-500 font-bold'>Seleccionar los cargos a asignar</h3>
                  {/* Aquí iría la lógica para seleccionar múltiples cargos */}
                  {cargoOptions.length === 0 ? (
                    <p className='text-gray-400'>No hay cargos disponibles</p>
                  ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {cargoOptions.map((option) => (
                        <div key={option.value} className='flex items-center'>
                          <input
                            type="checkbox"
                            id={`cargo_${option.value}`}
                            name="cargos"
                            value={option.value}
                            checked={formData.cargos.includes(option.value)}
                            onChange={(e) => {
                              const newCargos = e.target.checked
                                ? [...formData.cargos, parseInt(option.value)]
                                : formData.cargos.filter(c => c !== parseInt(option.value));
                              handleArrayChange('cargos', newCargos);
                            }}
                            className='mr-2'
                          />
                          <label htmlFor={`cargo_${option.value}`} className='text-gray-700'>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Sección de permisos */}
          <Separator color={"gray"} height='2px' />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Rol del Sistema</h3>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Roles</label>
              <div className='bg-gray-200 border-gray-400 p-5 w-full border rounded'>
                <h3 className='text-gray-500 font-bold'>Seleccionar los roles a asignar</h3>
                {roleOptions.length === 0 ? (
                  <p className='text-gray-400'>No hay roles disponibles</p>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {roleOptions.map((option) => (
                      <div key={option.value} className='flex items-center'>
                        <input
                          type="checkbox"
                          id={`role_${option.value}`}
                          name="roles"
                          value={option.value}
                          checked={formData.roles.includes(option.value)}
                          onChange={(e) => {
                            const newRoles = e.target.checked
                              ? [...formData.roles, parseInt(option.value)]
                              : formData.roles.filter(r => r !== parseInt(option.value));
                            handleArrayChange('roles', newRoles);
                          }}
                          className='mr-2'
                        />
                        <label htmlFor={`role_${option.value}`} className='text-gray-700'>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditUserModal;