import React from "react";
import useForm from "../../../../../core/hooks/useForm";
import Input from "../../../../../../components/ui/form/input/Input";
const RegisterForm = () => {
  const requiredFields = [
    "nombres", "apellidos", "email", "tipoDocumento", "numeroDocumento", "telefono", "password", "confirmarPassword", "terminos"
  ];
  const initialFormState = {
    nombres: "",
    apellidos: "",
    email: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
    activo: true,
    rol: 1, // usuario
    terminos: false,

  }
  const {
    formData,
    setErrors,
    errors,
    cleanErrors,
    handleChange,
    submitForm,
    loading,
    validateRequiredFields,
  } = useForm(initialFormState, false, requiredFields);
  const customSubmit = async (e) => {
    e.preventDefault();
    cleanErrors(); // Limpia errores anteriores antes de validar
  };
  return <form onSubmit={customSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        value={formData.nombres}
        onChange={handleChange}
        name="nombres"
        label="Nombres"
        placeholder="Ingrese sus nombres"
        error={errors.nombres}
        disabled={loading}
      />
      <Input
        value={formData.apellidos}
        onChange={handleChange}
        name="apellidos"
        label="Apellidos"
        placeholder="Ingrese sus apellidos"
        error={errors.apellidos}
        disabled={loading}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        value={formData.tipoDocumento}
        onChange={handleChange}
        name="tipoDocumento"
        label="Tipo de Documento"
        placeholder="Ingrese su tipo de documento"
        error={errors.tipoDocumento}
        disabled={loading}
      />
      <Input
        value={formData.numeroDocumento}
        onChange={handleChange}
        name="numeroDocumento"
        label="Número de Documento"
        placeholder="Ingrese su número de documento"
        error={errors.numeroDocumento}
        disabled={loading}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        value={formData.email}
        onChange={handleChange}
        name="email"
        label="Email"
        placeholder="Ingrese su email"
        error={errors.email}
        disabled={loading}
      />
      <Input
        value={formData.telefono}
        onChange={handleChange}
        name="telefono"
        label="Teléfono"
        placeholder="Ingrese su teléfono"
        error={errors.telefono}
        disabled={loading}
      />
    </div>

  </form>;
};

export default RegisterForm;
