import React from "react";
import {
  MdInfo,
  MdCheckCircle,
  MdWarning,
  MdError,
  MdClose,
} from "react-icons/md";

const SimpleInfoCard = ({
  variant = "info",
  title,
  message,
  icon,
  onClose,
  showCloseButton = true,
  className = "",
}) => {
  // Configuración de estilos por variante
  const variantConfig = {
    primary: {
      container: "bg-blue-50 border border-blue-200",
      title: "text-blue-900",
      message: "text-blue-700",
      icon: "text-blue-600",
      closeButton: "hover:bg-blue-100 text-blue-600",
      defaultIcon: <MdInfo className="w-5 h-5" />,
    },
    secondary: {
      container: "bg-gray-50 border border-gray-200",
      title: "text-gray-900",
      message: "text-gray-700",
      icon: "text-gray-600",
      closeButton: "hover:bg-gray-100 text-gray-600",
      defaultIcon: <MdInfo className="w-5 h-5" />,
    },
    success: {
      container: "bg-green-50 border border-green-200",
      title: "text-green-900",
      message: "text-green-700",
      icon: "text-green-600",
      closeButton: "hover:bg-green-100 text-green-600",
      defaultIcon: <MdCheckCircle className="w-5 h-5" />,
    },
    alert: {
      container: "bg-yellow-50 border border-yellow-200",
      title: "text-yellow-900",
      message: "text-yellow-700",
      icon: "text-yellow-600",
      closeButton: "hover:bg-yellow-100 text-yellow-600",
      defaultIcon: <MdWarning className="w-5 h-5" />,
    },
    info: {
      container: "bg-cyan-50 border border-cyan-200",
      title: "text-cyan-900",
      message: "text-cyan-700",
      icon: "text-cyan-600",
      closeButton: "hover:bg-cyan-100 text-cyan-600",
      defaultIcon: <MdInfo className="w-5 h-5" />,
    },
    warning: {
      container: "bg-orange-50 border border-orange-200",
      title: "text-orange-900",
      message: "text-orange-700",
      icon: "text-orange-600",
      closeButton: "hover:bg-orange-100 text-orange-600",
      defaultIcon: <MdWarning className="w-5 h-5" />,
    },
    error: {
      container: "bg-red-50 border border-red-200",
      title: "text-red-900",
      message: "text-red-700",
      icon: "text-red-600",
      closeButton: "hover:bg-red-100 text-red-600",
      defaultIcon: <MdError className="w-5 h-5" />,
    },
  };

  const config = variantConfig[variant] || variantConfig.info;

  return (
    <div
      className={`rounded-lg p-4 flex gap-3 items-start ${config.container} ${className}`}
      role="alert"
    >
      {/* Icono */}
      <div className={`flex-shrink-0 ${config.icon}`}>
        {icon || config.defaultIcon}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        {title && <h3 className={`font-semibold text-sm ${config.title}`}>{title}</h3>}
        {message && <p className={`text-sm ${title ? "mt-1" : ""} ${config.message}`}>{message}</p>}
      </div>

      {/* Botón cerrar */}
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ml-2 p-1 rounded transition-colors ${config.closeButton}`}
          aria-label="Cerrar notificación"
          type="button"
        >
          <MdClose className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SimpleInfoCard;