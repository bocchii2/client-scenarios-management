import React from 'react'
import Modal from '../../../../../components/ui/Modal/Modal'
import Input from '../../../../../components/ui/form/input/Input';
import SelectInput from '../../../../../components/ui/form/select/SelectInput';
import OptionInput from '../../../../../components/ui/form/select/option/OptionInput';
import Avatar from '../../../../../components/ui/avatar/Avatar';


const EditUserModal = ({ isOpen, onClose, title, user }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    identificacion: "",
    tipoIdentificacion: "",
    departamento: "",
    cargo: "",
    role: "",
    imgUrl: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [identificacionOptions, setIdentificacionOptions] = React.useState([
    { value: '1', label: 'Cédula de Ciudadanía' },
    { value: '2', label: 'Cédula de Extranjería' },
    { value: '3', label: 'Tarjeta de Identidad' },
  ]);
  const [departamentoOptions, setDepartamentoOptions] = React.useState([
    { value: 'hr', label: 'Recursos Humanos' },
    { value: 'it', label: 'Tecnologías de la Información' },
    { value: 'fin', label: 'Finanzas' },
  ]);
  // Cuando se abre el modal, inicializa el formulario con los datos del usuario
  const [cargoOptions, setCargoOptions] = React.useState([
    { value: 'manager', label: 'Gerente' },
    { value: 'developer', label: 'Desarrollador' },
    { value: 'designer', label: 'Diseñador' },
  ]);




  React.useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name ?? "",
        email: user.email ?? "",
        identificacion: user.identificacion ?? "",
        tipoIdentificacion: user.tipoIdentificacion ?? "",
        imgUrl: user.imgUrl ?? "",
      });
      setAvatarFile(null);
    }
  }, [isOpen, user]);

  // Maneja eventos de input/select y también actualizaciones directas: handleChange("campo", valor)
  const handleChange = React.useCallback((eOrName, maybeValue) => {
    if (typeof eOrName === "string") {
      const name = eOrName;
      const value = maybeValue;
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    const e = eOrName;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEditUser = React.useCallback(async (id) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const payload = new FormData();
      Object.entries({
        name: formData.name ?? "",
        email: formData.email ?? "",
        identificacion: formData.identificacion ?? "",
        tipoIdentificacion: formData.tipoIdentificacion ?? "",
      }).forEach(([k, v]) => payload.append(k, v));

      if (avatarFile) {
        payload.append("avatar", avatarFile);
      } else if (formData.imgUrl) {
        payload.append("imgUrl", formData.imgUrl);
      }

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData, avatarFile, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showButtonAction={true}
      labelActionButton={"Guardar Cambios"}
      showSecondButton={true}
      labelSecondButton={"Cancelar"}
      onActionButton={() => handleEditUser(user?.id)}
      onActionSecondButton={() => { if (!isLoading) onClose(); }}
      disableActionButton={isLoading || !user}
      loadingActionButton={isLoading}
    >
      {/* Avatar clickable con preview */}
      <div className='flex items-center gap-4 mb-4'>
        <Avatar
          size="large"
          editable
          accept="image/png,image/jpeg"
          src={formData.imgUrl || user?.imgUrl}
          onChange={(file, previewUrl) => {
            setAvatarFile(file);              // File para enviar
            handleChange("imgUrl", previewUrl); // Preview en el formulario
          }}
        />
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-800">Foto de perfil</p>
          <p>Haz clic para seleccionar una nueva imagen (PNG/JPG).</p>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            label="Nombre"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Correo Electrónico"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            label="Identificación"
            id="identificacion"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
          />
          <SelectInput
            label="Tipo de Identificación"
            id="tipoIdentificacion"
            name="tipoIdentificacion"
            placeholder="Selecciona un tipo"
            value={formData.tipoIdentificacion}
            onChange={handleChange}
          >
            {identificacionOptions.map((option) => (
              <OptionInput key={option.value} value={option.value} label={option.label} />
            ))}
          </SelectInput>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <SelectInput
            label="Departamento"
            id="departamento"
            name="departamento"
            placeholder="Selecciona un departamento"
            value={formData.departamento}
            onChange={handleChange}
          >
            {departamentoOptions.map((option) => (
              <OptionInput key={option.value} value={option.value} label={option.label} />
            ))}
          </SelectInput>
          <SelectInput
            label="Cargo"
            id="cargo"
            name="cargo"
            placeholder="Selecciona un cargo"
            value={formData.cargo}
            onChange={handleChange}
          >
            {cargoOptions.map((option) => (
              <OptionInput key={option.value} value={option.value} label={option.label} />
            ))}
          </SelectInput>
        </div>
      </div>
    </Modal>
  );
}

export default EditUserModal;