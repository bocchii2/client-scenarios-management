import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import Input from "../../../../../../components/ui/form/input/Input";
import useForm from "../../../../../core/hooks/useForm";
import CargoApiService from "../../../../intrastructure/services/CargoApiService";

const NewCargoModal = ({ isOpen, onClose }) => {
  const cargoApiService = React.useRef(new CargoApiService());
  const [cargos, setCargos] = React.useState([]);
  const { formData, handleChange, errors, handleSubmit, loading, setLoading, cleanErrors, cleanForm } = useForm({
    cargoName: "",
    cargoDescription: "",
  }, true); // todos los campos son requeridos

  React.useEffect(() => {
    const fetchCargos = async () => {
      try {
        const data = await cargoApiService.current.getCargos();
        setCargos(data);
      } catch (error) {
        console.error("Error al obtener los cargos:", error);
      }
    };
    if (isOpen) {
      fetchCargos();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        nombre_cargo: formData.cargoName,
        descripcion: formData.cargoDescription,
        activo: true
      };
      setLoading(true);

      console.log("Datos a enviar:", payload);
      // Llamar a la API
      await cargoApiService.current.createCargo(payload);
      onClose();
    } catch (error) {
      console.error("Error al crear el cargo:", error);
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
      title="Nuevo Cargo"
      showButtonAction={true}
      labelActionButton="Agregar Cargo"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionButton={(e) => handleSubmit(e, onSubmit)} // <-- conectar validación
      onActionSecondButton={() => { if (!loading) handleClose(); }}
      disableActionButton={loading}
      loadingActionButton={loading}
    >
      <div className="space-y-4">
        <Input
          error={errors.cargoName}
          label="Nombre del Cargo"
          placeholder="Ej: Gerente de Ventas"
          name="cargoName"
          disabled={loading}
          value={formData.cargoName}
          onChange={handleChange}
          isRequired
        />
        <Input
          error={errors.cargoDescription}
          label="Descripción"
          placeholder="Descripción del cargo"
          name="cargoDescription"
          disabled={loading}
          value={formData.cargoDescription}
          onChange={handleChange}
          isRequired
          isTextarea
        />
      </div>
    </Modal>
  );
};

export default NewCargoModal;