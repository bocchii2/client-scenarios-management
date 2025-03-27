import React, { useEffect } from "react";
import { FaX } from "react-icons/fa6";

const SimpleNotification = ({
  message,
  type = "info",
  isOpen,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  // Colores según el tipo de notificación
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between transition-transform duration-300 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      } ${typeStyles[type]}`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white text-lg cursor-pointer"
        onClick={onClose}
      >
        <FaX size={15} />
      </button>
    </div>
  );
};

export default SimpleNotification;
