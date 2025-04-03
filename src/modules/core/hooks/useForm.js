import { useState } from "react";
import { useNotification } from "../../../hooks/useNotificaction";

const useForm = (initialState, allRequired) => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(
    Object.keys(initialState).reduce((acc, key) => {
      acc[key] = null; // Inicializa todos los errores como null
      return acc;
    }, {})
  );

  const cleanErrors = () => {
    setErrors(
      Object.keys(initialState).reduce((acc, key) => {
        acc[key] = null; // Inicializa todos los errores como null
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (allRequired) {
      //validar que cada campo tenga un valor
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          newErrors[key] = { message: "Campo requerido" };
        }
      });
      setErrors(newErrors);
    }

    // Si hay errores, no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    // simular delay de 3 segundos para mostrar la notificacion
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNotification("Formulario enviado", "info");
      console.log("Formulario enviado", formData);
    }, 3000);
    // Aquí puedes agregar la lógica de validación y envío del formulario
  };

  return {
    formData, // datos del formulario
    errors, // errores del formulario
    handleChange, // función para manejar cambios en los inputs
    handleSubmit, // función para manejar el envío del formulario
    cleanErrors, // función para limpiar los errores
    cleanForm, // función para limpiar el formulario
    loading, // estado de carga
  };
};

export default useForm;
