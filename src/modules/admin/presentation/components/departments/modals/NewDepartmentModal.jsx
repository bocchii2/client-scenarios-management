import React from "react";
import Modal from "../../../../../../components/ui/Modal/Modal";
import Input from "../../../../../../components/ui/form/input/Input";
import useForm from "../../../../../core/hooks/useForm";
import DepartmentApiService from "../../../../intrastructure/services/DepartmentsApiService";
import DepartmentCategoryService from "../../../../intrastructure/services/DepartmentCategoryApiService";
import SelectInput from "../../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../../components/ui/form/select/option/OptionInput";
import SimpleDialog from "../../../../../../components/ui/dialog/SimpleDialog";

/**
 * Modal para crear Departamentos
 * Campos mínimos sugeridos: name, description, nomenclatura
 * - name: Nombre visible del departamento
 * - description: Descripción corta del departamento
 * - nomenclatura: Código corto (ej: MUS, VTA)
 */
const NewDepartmentModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = React.useState([]);
  const departmentApiServiceRef = React.useRef(new DepartmentApiService());
  const departmentCategoryServiceRef = React.useRef(new DepartmentCategoryService());
  const fetchDepartamentos = async () => {
    try {
      const response = await departmentApiServiceRef.current.getDepartments();
      setDepartamentos(response);
    } catch (error) {
      console.error("Error al obtener departamentos:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await departmentCategoryServiceRef.current.getDepartmentCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error al obtener categorías de departamentos:", error);
    }
  }
  // ejecutar fetchDepartamentos al abrir el modal
  React.useEffect(() => {
    if (isOpen) {
      fetchDepartamentos();
      fetchCategories();
    }
  }, [isOpen]);

  // Hook para manejar el formulario
  const {
    formData,
    handleChange,
    errors,
    loading,
    setLoading,
    cleanErrors,
    cleanForm,
    handleSubmit
  } = useForm(
    {
      departmentName: "",
      departmentNomenclature: "",
      departmentFather: "",
      departmentCategory: ""
    },
    false, // todos los campos son requeridos
    ["departmentName", "departmentNomenclature"]
  );
  const [departamentos, setDepartamentos] = React.useState([]);

  React.useEffect(() => {

    fetchDepartamentos();
  }, []);

  console.log("Departamentos disponibles para padre:", departamentos);
  const onSubmit = async () => {
    handleSubmit();
    try {
      setLoading(true);
      const payload = {
        nombre_departamento: formData.departmentName,
        nomenclatura: formData.departmentNomenclature,
        departamento_categoria_id: formData.departmentCategory || null,
        departamento_padre_id: formData.departmentFather || null,
        activo: true
      };
      console.log("Departamento a crear:", payload);
      await departmentApiServiceRef.current.createDepartment(payload);
      // Limpiar y cerrar

      cleanForm();
      cleanErrors();
      onClose();
    } catch (error) {
      console.error("Error al crear el departamento:", error);
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
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Nuevo Departamento"
        showButtonAction={true}
        labelActionButton="Crear Departamento"
        showSecondButton={true}
        labelSecondButton="Cancelar"
        onActionButton={(e) => handleSubmit(e, onSubmit)}
        onActionSecondButton={() => {
          if (!loading) handleClose();
        }}
        disableActionButton={loading}
        loadingActionButton={loading}
      >
        <div className="space-y-4">
          <Input
            error={errors.departmentName}
            label="Nombre del Departamento"
            placeholder="Ej: Música"
            name="departmentName"
            disabled={loading}
            value={formData.departmentName}
            onChange={handleChange}
            isRequired
          />

          <Input
            error={errors.departmentNomenclature}
            label="Nomenclatura"
            placeholder="Ej: MUS, VTA, ID"
            name="departmentNomenclature"
            disabled={loading}
            value={formData.departmentNomenclature}
            onChange={handleChange}
            isRequired
          />
          <SelectInput
            disabled={categories.length === 0}
            id="departmentCategory"
            name="departmentCategory"
            value={formData.departmentCategory}
            label={"Seleccionar la categoria del departamento"}
            placeholder={"Seleccionar..."}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <OptionInput
                label={cat.nombre}
                value={cat.id}
                key={cat.id}
              />
            ))}
          </SelectInput>
          <SelectInput
            disabled={departamentos.length === 0}
            id="departmentFather"
            name="departmentFather"
            value={formData.departmentFather}
            placeholder={"Seleccionar..."}
            onChange={handleChange}
            label={"Departamento al que pertenece (si aplica)"}
          >
            {departamentos.map((dept) => (
              <OptionInput
                label={`${dept.name} - (${dept.nomenclatura})`}
                value={dept.id}
                key={dept.id}
              />
            ))}
          </SelectInput>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default NewDepartmentModal;
