import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import Button from "../../../../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";

const NoLoginDialog = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/auth/login");
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Iniciar sesión">
      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Debes iniciar sesión para poder crear una solicitud
        </h1>
        <p className="text-sm text-center">
          Por favor inicia sesión o crea una cuenta para continuar.
        </p>
        <Button
          label={"Iniciar sesión"}
          onClick={handleLogin}
          variant="primary"
          size="medium"
        />
      </div>
    </Modal>
  );
};

export default NoLoginDialog;
