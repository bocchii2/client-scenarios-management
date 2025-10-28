import { useState } from "react";

const useForm = (initialState, allRequired = false, requiredFields = []) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(
    Object.keys(initialState).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {})
  );

  const cleanErrors = () => {
    setErrors(
      Object.keys(initialState).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {})
    );
  };

  const cleanForm = () => {
    setFormData(initialState);
    cleanErrors();
  };

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "select-multiple") {
      // recoge los valores seleccionados en un array
      newValue = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
    } else {
      // select-one y otros tipos usan value
      newValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // validar el formulario
  const validateRequiredFields = () => {
    const newErrors = {};

    if (allRequired) {
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          newErrors[key] = { message: "Campo requerido" };
        }
      });
    } else {
      requiredFields.forEach((key) => {
        if (!formData[key]) {
          newErrors[key] = { message: "Campo requerido" };
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true si está todo válido
  };

  // ejecutar validaciones y callback
  const handleSubmit = async (e, callback) => {
    if (e) e.preventDefault();

    cleanErrors(); // limpiar errores previos

    if (!validateRequiredFields()) {
      return; // si hay errores, detener
    }

    // si pasa validaciones, ejecutar callback con los datos
    if (callback && typeof callback === "function") {
      await callback(formData);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    cleanErrors,
    cleanForm,
    validateRequiredFields,
    setErrors,
    setLoading,
    loading,
    setFormData, // <-- exponer para inicializar valores externamente
  };
};

export default useForm;
