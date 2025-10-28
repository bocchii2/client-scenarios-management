import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import Input from "../../../../../components/ui/form/input/Input";
import SelectInput from "../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../components/ui/form/select/option/OptionInput";
import useForm from "../../../../core/hooks/useForm";

const NewPermissionModal = ({ isOpen, onClose }) => {
  const { formData, handleChange, errors, loading, setLoading, handleSubmit, cleanForm } = useForm(
    {
      name: "",
      description: "",
      resource: "",
      action: "",
      scope: "global",
      code: "",
    },
    true
  );

  // Generar código automáticamente al cambiar resource/action
  React.useEffect(() => {
    if (formData.resource && formData.action) {
      const autoCode = `${formData.resource.toUpperCase()}_${formData.action.toUpperCase()}`;
      handleChange({ target: { name: "code", value: autoCode } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.resource, formData.action]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Permiso a crear:", data);
      // POST /api/permissions
      await new Promise((resolve) => setTimeout(resolve, 2000));
      cleanForm();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      cleanForm();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear Permiso"
      showButtonAction={true}
      labelActionButton="Crear Permiso"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={(e) => handleSubmit(e, onSubmit)}
      onActionSecondButton={handleClose}
      disableActionButton={loading}
      loadingActionButton={loading}
    >
      <div className="space-y-4">
        <Input
          error={errors.name}
          label="Nombre del Permiso"
          placeholder="Ej: Crear Usuario"
          name="name"
          disabled={loading}
          value={formData.name}
          onChange={handleChange}
          isRequired
        />

        <Input
          error={errors.description}
          label="Descripción"
          placeholder="¿Qué permite hacer este permiso?"
          name="description"
          disabled={loading}
          value={formData.description}
          onChange={handleChange}
          isRequired
          isTextarea
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            error={errors.resource}
            label="Recurso"
            name="resource"
            disabled={loading}
            value={formData.resource}
            onChange={handleChange}
            placeholder="Selecciona un recurso"
            isRequired
          >
            <OptionInput value="users" label="Usuarios" />
            <OptionInput value="roles" label="Roles" />
            <OptionInput value="departments" label="Departamentos" />
            <OptionInput value="projects" label="Proyectos" />
            <OptionInput value="reports" label="Reportes" />
            <OptionInput value="documents" label="Documentos" />
          </SelectInput>

          <SelectInput
            error={errors.action}
            label="Acción"
            name="action"
            disabled={loading}
            value={formData.action}
            onChange={handleChange}
            placeholder="Selecciona una acción"
            isRequired
          >
            <OptionInput value="create" label="Crear" />
            <OptionInput value="read" label="Leer" />
            <OptionInput value="update" label="Actualizar" />
            <OptionInput value="delete" label="Eliminar" />
            <OptionInput value="approve" label="Aprobar" />
            <OptionInput value="export" label="Exportar" />
            <OptionInput value="manage" label="Gestionar" />
          </SelectInput>
        </div>

        <SelectInput
          error={errors.scope}
          label="Alcance"
          name="scope"
          disabled={loading}
          value={formData.scope}
          onChange={handleChange}
          isRequired
        >
          <OptionInput value="global" label="Global (Todos)" />
          <OptionInput value="department" label="Departamento" />
          <OptionInput value="team" label="Equipo" />
          <OptionInput value="own" label="Solo propios" />
        </SelectInput>

        <Input
          error={errors.code}
          label="Código del Permiso"
          placeholder="USERS_CREATE"
          name="code"
          disabled={loading}
          value={formData.code}
          onChange={handleChange}
          isRequired
        />
      </div>
    </Modal>
  );
};

export default NewPermissionModal;