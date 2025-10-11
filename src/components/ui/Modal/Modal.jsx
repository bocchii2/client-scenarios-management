import React from "react";
import { FaX } from "react-icons/fa6";
import Button from "../Button/Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showButtonAction = false,
  showSecondButton = false,
  labelActionButton = "Aceptar",
  labelSecondButton = "Cancelar",
  loadingActionButton = false,
  loadingSecondButton = false,
  disableActionButton = false,
  disableSecondButton = false,
  onActionButton = () => { },
  onActionSecondButton = () => { },
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-all p-3 z-50 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      <div
        className={`bg-white rounded-lg min-w-auto w-full md:w-auto md:min-w-2xl md:shadow-lg transform overflow-hidden transition-all max-h-[90vh] flex flex-col relative z-50 ${isOpen ? "translate-y-0" : "-translate-y-10"
          }`}
      >
        {/* Header fijo */}
        <div className="flex items-center justify-between border-b border-gray-300 p-4 flex-shrink-0 bg-white relative z-10">
          <h2 className="text-lg md:text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 border border-gray-300 rounded-full p-1 cursor-pointer
            hover:bg-gray-400 hover:text-white hover:border-gray-400 transition-colors duration-200 ease-in-out"
          >
            <FaX size={12} />
          </button>
        </div>

        {/* Cuerpo scrollable */}
        <div className="p-4 overflow-y-auto flex-grow bg-white relative">
          {children}
        </div>
        {(showButtonAction || showSecondButton) && (
          <div className="flex justify-end gap-2 border-t border-gray-300 p-4 flex-shrink-0 bg-white">
            {showSecondButton && (
              <Button
                disable={disableSecondButton}
                onClick={onActionSecondButton}
                loading={loadingSecondButton}
                variant="secondary"
                label={labelSecondButton}
                size="medium"
              />
            )}
            {showButtonAction && (
              <Button
                disable={disableActionButton}
                onClick={onActionButton}
                variant="primary"
                loading={loadingActionButton}
                label={labelActionButton}
                size="medium"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
