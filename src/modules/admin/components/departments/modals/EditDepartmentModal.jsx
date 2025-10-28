import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import Input from "../../../../../components/ui/form/input/Input";
import useForm from "../../../../core/hooks/useForm";
import SelectInput from "../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../components/ui/form/select/option/OptionInput";
import DepartmentApiService from "../../../services/DepartmentsApiService";

const EditDepartmentModal = ({ isOpen, onClose, departmentId }) => {
  const [allDepartments, setAllDepartments] = React.useState([]);
  const [departamento, setDepartamento] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const departmentApiServiceRef = React.useRef(new DepartmentApiService());
  React.useEffect(() => {
    // Solo hacer fetch si el modal está abierto Y hay un departmentId válido
    if (!isOpen || !departmentId) {
      return;
    }

    const fetchDepartamento = async () => {
      try {
        setError(null);
        setLoading(true);
        const fetchedDepartamento = await departmentApiServiceRef.current.getDepartmentById(departmentId);
        const departmentsList = await departmentApiServiceRef.current.getDepartments();
        setDepartamento(fetchedDepartamento);
        setAllDepartments(departmentsList);

        // inicializar formData con los valores del departamento para que inputs y select sean controlados
        if (fetchedDepartamento) {
          setFormData({
            name: fetchedDepartamento.name || "",
            nomenclatura: fetchedDepartamento.nomenclatura || "",
            // normalizar id a string para que el select compare correctamente con option.value
            departmentFather: fetchedDepartamento.departament_father ? String(fetchedDepartamento.departament_father.id) : "",
          });
        }
      } catch (error) {
        console.error("Error al obtener el departamento:", error);
        setError("Error al obtener el departamento");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartamento();
  }, [isOpen, departmentId]);
  const {
    formData,
    handleChange,
    errors,
    loading: formLoading,
    setLoading: setFormLoading,
    cleanErrors,
    cleanForm,
    handleSubmit,
    setFormData,
  } = useForm({
    name: "",
    nomenclatura: "",
    departmentFather: "",
  }, false, ['name', 'nomenclatura']); // solo estos campos son requeridos

  const onSubmit = async () => {
    // handleSubmit();
    try {
      cleanErrors();
      setFormLoading(true);
      const payload = {
        nombre_departamento: formData.name,
        nomenclatura: formData.nomenclatura,
        departamento_padre_id: formData.departmentFather || null,
        activo: true
      };
      await departmentApiServiceRef.current.updateDepartment(departmentId, payload);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      setError("Error al actualizar el departamento");
    } finally {
      setFormLoading(false);
      cleanErrors();
      cleanForm();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Departamento"
      showButtonAction={true}
      labelActionButton="Guardar Cambios"
      showSecondButton={true}
      labelSecondButton="Cancelar"
      loadingActionButton={loading}
      onActionSecondButton={onClose}
      onActionButton={(e) => handleSubmit(e, onSubmit)}

    >
      {loading && <p className="text-sm text-gray-600">Cargando información del departamento...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {departamento && (
        <React.Fragment>
          <Input
            label="Nombre"
            name="name"                        // <- nombre del campo
            value={formData.name}              // <- controlado por formData
            onChange={handleChange}
            error={errors.name}
            disabled={loading}
          />
          <Input
            label={"Nomenclatura"}
            name="nomenclatura"                // <- nombre del campo
            value={formData.nomenclatura}     // <- controlado por formData
            onChange={handleChange}
            error={errors.nomenclatura}
            disabled={loading}
          />
          <SelectInput
            placeholder={"No seleccionado"}
            name="departmentFather"            // <- name string para handleChange
            label={"Departamento al que pertenece"}
            onChange={handleChange}
            value={formData.departmentFather}  // <- controlado por formData
            error={errors.departmentFather}
            disabled={loading}
          >
            {allDepartments.map((dept) => (
              <OptionInput
                key={dept.id}
                value={String(dept.id)}        // <- normalizar a string
                label={dept.name}
              />
            ))}
          </SelectInput>
        </React.Fragment>
      )}
    </Modal>
  )
};

export default EditDepartmentModal;