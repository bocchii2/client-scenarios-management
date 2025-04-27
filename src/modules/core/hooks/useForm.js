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
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
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

  // enviar el formulario a la API
  /* const submitForm = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotification("Formulario enviado", "info");
      console.log("Formulario enviado", formData);
    }, 3000);
  }; */

  // ejecutar validaciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... extends with other validations
    // validation 1
    // validation 2
    // validation 3
    // ...
    // do this at the final
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit, // ejecutar validaciones
    cleanErrors,
    cleanForm,
    validateRequiredFields, // ahora disponible para validaciones personalizadas
    //submitForm, // ahora disponible para ejecuciones controladas, enviar el formulario a la API
    setErrors,
    setLoading,
    loading,
  };
};

export default useForm;
