import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import { PLACES_DATA } from "../../../services/apiServices/PlacesData";

const TermsAndCoditionDialog = ({ isOpen, onClose, idScenario }) => {
  // use the service to get the place by id
  const scenario = PLACES_DATA.find(
    (place) => place.id === parseInt(idScenario)
  );
  const termsAndConditions = scenario.termsAndConditions;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Terminos y condiciones"}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Términos y condiciones</h2>
        <h3>
          {scenario.name} - {scenario.location}
        </h3>
        <p className="mb-4">
          Al utilizar este servicio, aceptas cumplir con los siguientes términos
          y condiciones:
        </p>
        <ul className="list-disc list-inside mb-4">
          {termsAndConditions.map((term, index) => (
            <li key={index} className="mb-2">
              {term}
            </li>
          ))}
        </ul>
        <p className="mb-4">
          Si no estás de acuerdo con estos términos, por favor no utilices el
          servicio.
        </p>
      </div>
      <div className="flex justify-end p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
};

export default TermsAndCoditionDialog;
