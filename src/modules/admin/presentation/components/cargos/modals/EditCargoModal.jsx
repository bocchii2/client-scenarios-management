import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import Input from "../../../../../../components/ui/form/input/Input";
import useForm from "../../../../../core/hooks/useForm";
import CargoDIContainer from "../../../../intrastructure/di/CargoDIContainer";
const EditCargoModal = ({ isOpen, onClose, cargoId, onSave, getCargoByIdUseCase = null, updateCargoUseCase = null }) => {
  // ✅ Inyección de dependencias
  const getByIdUseCase = getCargoByIdUseCase || CargoDIContainer.getInstance().getGetCargoByIdUseCase();
  const updateUseCase = updateCargoUseCase || CargoDIContainer.getInstance().getUpdateCargoUseCase();

  const { formData, handleChange, errors, handleSubmit, loading, setLoading, cleanErrors, cleanForm, setFormData } = useForm(
    {
      nombre: "",
      descripcion: "",
    },
    true
  );

  // Cargar datos del cargo
  React.useEffect(() => {
    const loadCargo = async () => {
      if (!isOpen || !cargoId) return;

      setLoading(true);
      try {
        const cargo = await getByIdUseCase.execute(cargoId);
        setFormData({
          nombre: cargo.nombre,
          descripcion: cargo.descripcion,
        });
      } catch (error) {
        console.error("Error cargando cargo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCargo();
  }, [isOpen, cargoId]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateUseCase.execute(cargoId, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
      });
      cleanForm();
      cleanErrors();
      onSave && onSave();
    } catch (error) {
      console.error("Error actualizando cargo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      cleanForm();
      cleanErrors();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Editar Cargo"
      showButtonAction={true}
      labelActionButton="Guardar Cambios"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={(e) => handleSubmit(e, onSubmit)}
      onActionSecondButton={handleClose}
      disableActionButton={loading}
      loadingActionButton={loading}
    >
      <div className="space-y-4">
        <Input
          error={errors.nombre}
          label="Nombre del Cargo"
          placeholder="Ej: Gerente de Ventas"
          name="nombre"
          disabled={loading}
          value={formData.nombre}
          onChange={handleChange}
          isRequired
        />
        <Input
          error={errors.descripcion}
          label="Descripción"
          placeholder="Descripción del cargo"
          name="descripcion"
          disabled={loading}
          value={formData.descripcion}
          onChange={handleChange}
          isRequired
          isTextarea
        />
      </div>
    </Modal>
  );
};

export default EditCargoModal;