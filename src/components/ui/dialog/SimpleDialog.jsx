import React, { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai';
import { MdWarningAmber } from 'react-icons/md';

const SimpleDialog = ({ 
  titulo = "Error", 
  tipo = "error", 
  mensaje = "Ha ocurrido un error inesperado", 
  mostrarBotonAceptar = true, 
  onAceptar = () => {}, 
  isOpen = false, 
  onClose = () => {} 
}) => {
  // Configuración de iconos y colores según el tipo
  const tipoConfig = {
    error: {
      icon: AiOutlineCloseCircle,
      colorIcon: "text-red-500",
      colorFondo: "bg-red-50",
      colorBorde: "border-red-200"
    },
    warning: {
      icon: MdWarningAmber,
      colorIcon: "text-yellow-500",
      colorFondo: "bg-yellow-50",
      colorBorde: "border-yellow-200"
    },
    info: {
      icon: AiOutlineInfoCircle,
      colorIcon: "text-blue-500",
      colorFondo: "bg-blue-50",
      colorBorde: "border-blue-200"
    },
    success: {
      icon: AiOutlineCheckCircle,
      colorIcon: "text-green-500",
      colorFondo: "bg-green-50",
      colorBorde: "border-green-200"
    }
  };

  const config = tipoConfig[tipo] || tipoConfig.error;
  const IconComponent = config.icon;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className={`${config.colorFondo} ${config.colorBorde} border-b px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className={`w-6 h-6 ${config.colorIcon}`} />
              <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <AiOutlineClose size={5}/>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-gray-700 leading-relaxed">{mensaje}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancelar
          </button>
          {mostrarBotonAceptar && (
            <button
              onClick={() => {
                onAceptar();
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleDialog;
