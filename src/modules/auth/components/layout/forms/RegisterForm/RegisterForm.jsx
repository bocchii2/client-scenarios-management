import React from "react";
import useForm from "../../../../../core/hooks/useForm";
import Input from "../../../../../../components/ui/form/input/Input";
import SelectInput from "../../../../../../components/ui/form/select/SelectInput";
import OptionInput from "../../../../../../components/ui/form/select/option/OptionInput";
import Checkbox from "../../../../../../components/ui/form/checkbox/Checkbox";
import Button from "../../../../../../components/ui/Button/Button";

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
    loading,
    validateRequiredFields,
  } = useForm(initialFormState, false, requiredFields);

  const validatePasswords = () => {
    const newErrors = {};
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmarPassword) {
      newErrors.confirmarPassword = { message: "Las contraseñas no coinciden" };
    }
    
    // Validar longitud mínima de contraseña
    if (formData.password && formData.password.length < 6) {
      newErrors.password = { message: "La contraseña debe tener al menos 6 caracteres" };
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = { message: "Por favor ingrese un email válido" };
    }
    
    return newErrors;
  };

  const customSubmit = async (e) => {
    e.preventDefault();
    cleanErrors(); // Limpia errores anteriores antes de validar
    
    // Validar campos requeridos
    const isRequiredFieldsValid = validateRequiredFields();
    
    // Validar contraseñas y otros campos personalizados
    const customErrors = validatePasswords();
    
    if (Object.keys(customErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...customErrors }));
      return;
    }
    
    if (!isRequiredFieldsValid) {
      return;
    }
    
    // Si todo está válido, proceder con el registro
    console.log("Datos del formulario:", formData);
    // Aquí iría la lógica para enviar los datos al servidor
    // Por ejemplo: await registerUser(formData);
  };
  return (
    <form onSubmit={customSubmit} className="space-y-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Documento
          </label>
          <SelectInput
            name="tipoDocumento"
            onChange={handleChange}
            value={formData.tipoDocumento}
            disabled={loading}
          >
            <OptionInput value="" label="Seleccione tipo de documento" />
            <OptionInput value="cedula" label="Cédula de Ciudadanía" />
            <OptionInput value="pasaporte" label="Pasaporte" />
            <OptionInput value="cedula_extranjeria" label="Cédula de Extranjería" />
          </SelectInput>
          {errors.tipoDocumento && (
            <span className="text-red-500 text-sm">{errors.tipoDocumento.message}</span>
          )}
        </div>
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
          type="email"
          label="Email"
          placeholder="Ingrese su email"
          error={errors.email}
          disabled={loading}
        />
        <Input
          value={formData.telefono}
          onChange={handleChange}
          name="telefono"
          type="tel"
          label="Teléfono"
          placeholder="Ingrese su teléfono"
          error={errors.telefono}
          disabled={loading}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          error={errors.password}
          disabled={loading}
        />
        <Input
          value={formData.confirmarPassword}
          onChange={handleChange}
          name="confirmarPassword"
          type="password"
          label="Confirmar Contraseña"
          placeholder="Confirme su contraseña"
          error={errors.confirmarPassword}
          disabled={loading}
        />
      </div>
      
      <div className="flex flex-col space-y-4">
        <Checkbox
          id="terminos"
          name="terminos"
          checked={formData.terminos}
          onChange={handleChange}
          label="Acepto los términos y condiciones y la política de privacidad"
          error={errors.terminos}
          disabled={loading}
        />
        
        <Button
          type="submit"
          variant="primary"
          label="Registrarse"
          loading={loading}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
