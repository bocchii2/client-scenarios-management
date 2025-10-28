import React from "react";
import useForm from "../../../hooks/useForm";
import Input from "../../../../../components/ui/form/input/Input";
import Button from "../../../../../components/ui/Button/Button";
import Modal from "../../../../../components/ui/Modal/Modal";
import Separator from "../../../../../components/ui/separator/Separator";
import Checkbox from "../../../../../components/ui/form/checkbox/Checkbox";
import { Link } from "react-router-dom";
import { FaCalendar, FaFile } from "react-icons/fa6";
import TermsAndCoditionDialog from "./TermsAndCoditionDialog";
import useModal from "../../../hooks/useModal";
// ...reemplazo: usar el store de auth como fuente única de verdad
import { useAuthStore } from "../../../../../store/useStore";

const RequesRentalForm = ({ isOpen, closeModal, title, scenario }) => {
  const [scenarioDetails, setScenarioDetails] = React.useState(scenario || {});
  const DISABLED_STUDENT_AND_PLACE_DATA = true;
  const {
    closeModal: closeTermsAndCoditionModal,
    isOpen: isOpenTermsAndCoditionModal,
    openModal: openTermsAndCoditionModal,
  } = useModal();

  console.log("Escenario recibido en el formulario:", scenario);

  // usar el auth store (fuente única) para obtener el usuario logueado
  const user = useAuthStore((s) => s.user) || {};
  console.log("Usuario desde el store de auth:", user);

  const { formData, errors, handleChange, handleSubmit, loading, cleanErrors } =
    useForm(
      {
        userData: {
          userId: user.id || "",
          name: user.nombres_completos,
          email: user.email || user.correo_electronico || "",
          phone: user.phone || user.telefono || "",
          address: user.direccion || "",
        },
        scenarioData: {
          scenarioId: scenarioDetails.id,
          scenarioName: scenarioDetails.name,
        },
        eventTitle: "",
        eventType: "",
        descriptionEvent: "",
        numberOfAttendees: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        estimatedDuration: "",
        requerePrevMontage: false,
        dateToMontage: "", // si se requiere montaje previo, este campo se utiliza si requiere montaje
        timeToMontage: "", // hora de montaje, si aplica, este campo se utiliza si requiere montaje
        termsAndConditions: false,
      },
      true
    );
  const handleCloseModal = () => {
    cleanErrors();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} title={title}>
      <div>
        <h2 className="text-sm font-bold text-gray-700">
          Datos de solicitante
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-1">
            <Input
              value={formData.userData.name}
              onChange={handleChange}
              name="name"
              label="Nombre completo"
              placeholder="Nombre completo"
              id="name"
              error={errors.name}
              disabled={DISABLED_STUDENT_AND_PLACE_DATA}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-1">
            <Input
              value={formData.userData.email}
              onChange={handleChange}
              name="email"
              label="Email"
              placeholder="Email"
              id={"email"}
              error={errors.email}
              isRequired={true}
              disabled={DISABLED_STUDENT_AND_PLACE_DATA}
            />
            <Input
              value={formData.userData.phone}
              onChange={handleChange}
              name="phone"
              label="Telefono"
              placeholder="Telefono"
              id={"phone"}
              error={errors.phone}
              isRequired={true}
              disabled={DISABLED_STUDENT_AND_PLACE_DATA}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-1">


          </div>
          <Separator color={"gray"} />
          <div>
            <h2 className="text-sm font-bold text-gray-700 pb-5">
              Datos del espacio
            </h2>
            <Input
              value={formData.scenarioData.scenarioName}
              onChange={handleChange}
              name="scenarioName"
              label="Nombre del Espacio"
              placeholder="Nombre del espacio"
              id={"scenarioName"}
              error={errors.scenarioName}
              disabled={DISABLED_STUDENT_AND_PLACE_DATA}
            />
            <div>
              <h2 className="text-sm font-light text-gray-700 pb-5">
                Prestaciones del espacio:
              </h2>
              <div className="p-4">
              </div>
            </div>
          </div>
          <Separator color={"gray"} />
          <div>
            <h2 className="text-sm font-bold text-gray-700 pb-5">
              Datos del evento
            </h2>
            <Input
              value={formData.eventTitle}
              onChange={handleChange}
              name="eventTitle"
              label="Nombre del evento"
              placeholder="Nombre del evento"
              id={"eventTitle"}
              error={errors.eventTitle}
            />
            <Input
              value={formData.descriptionEvent}
              onChange={handleChange}
              name="descriptionEvent"
              label="Descripcion del evento"
              placeholder="Descripcion del evento"
              id={"descriptionEvent"}
              error={errors.descriptionEvent}
            />
            <Input
              value={formData.eventPropose}
              onChange={handleChange}
              name={"eventPropose"}
              label={"Proposito del evento"}
              placeholder={"Proposito del evento"}
              id={"eventPropose"}
              error={errors.eventPropose}
            />
          </div>
          <div>
            <Input
              type="date"
              label={"Fecha de inicio"}
              onChange={handleChange}
              name={"startDate"}
              id={"startDate"}
              error={errors.startDate}
            />
            <Input
              type="date"
              label={"Fecha de fin"}
              onChange={handleChange}
              name={"endDate"}
              id={"endDate"}
              error={errors.endDate}
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-700 pb-5">
              Terminos y condiciones
            </h2>
            <div>
              <Checkbox
                label={`Estoy de acuerdo con los terminos y condiciones de uso del escenario`}
                onChange={handleChange}
                name={"termsAndConditions"}
                id={"termsAndConditions"}
                error={errors.termsAndConditions}
              />

              <Button
                label="Ver terminos y condiciones"
                variant="info"
                type="button"
                size="small"
                icon={<FaFile />}
                onClick={openTermsAndCoditionModal}
              />
            </div>
            <TermsAndCoditionDialog
              idScenario={scenario.id}
              isOpen={isOpenTermsAndCoditionModal}
              onClose={closeTermsAndCoditionModal}
            />
          </div>
          <div className="flex gap-2 justify-end mt-5">
            <Button
              onClick={handleCloseModal}
              label="Cancelar"
              variant="secondary"
              size="small"
              disabled={loading}
            />
            <Button
              onClick={handleSubmit}
              label="Enviar solicitud"
              variant="primary"
              size="small"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RequesRentalForm;
