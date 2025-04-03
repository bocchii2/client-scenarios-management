import React from "react";
import { FaX } from "react-icons/fa6";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-all p-3 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white rounded-lg min-w-auto w-full md:w-auto md:min-w-2xl md:shadow-lg transform transition-all max-h-[90vh] flex flex-col ${
          isOpen ? "translate-y-0" : "-translate-y-10"
        }`}
      >
        {/* Header fijo */}
        <div className="flex items-center justify-between border-b border-gray-300 p-4 flex-shrink-0">
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
        <div className="p-4 overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
