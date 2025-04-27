import React from "react";
import useForm from "../../../../../core/hooks/useForm";
const RegisterForm = () => {
  const requiredFields = [];
  const {
    formData,
    setErrors,
    errors,
    cleanErrors,
    handleChange,
    submitForm,
    loading,
    validateRequiredFields,
  } = useForm({}, false, requiredFields);
  return <form></form>;
};

export default RegisterForm;
