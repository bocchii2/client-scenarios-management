import React from "react";
import technicalSupportGif from "../../../../../public/apoyo-tecnico.gif";
import { FaWhatsapp } from "react-icons/fa";
import Button from "../../../../components/ui/Button/Button";
import UNIVERSITY_COLORS from "../../../../constants/colors";

const ContactUs = () => {
  return (
    <div className="py-4 w-full">
      <h1 className="my-8 font-bold text-4xl border-b-2 w-full text-start p-2" 
        style={{ 
          color: UNIVERSITY_COLORS.secondary,
          borderColor: UNIVERSITY_COLORS.primary 
        }}
      ></h1>
      <div className="bg-[rgb(217,217,217)] rounded p-5 w-auto h-[200px]] flex justify-around items-center gap-2 flex-col md:flex-row">
        <img
          src={technicalSupportGif}
          alt="technical support"
          className="w-[200px] h-auto rounded-[50%] p-5"
        />
        <h2 className="text-4xl font-bold" style={{ color: UNIVERSITY_COLORS.secondary }}>
          ¿Necesitas asesoría?
        </h2>
        <div>
          <Button
            label={"Contáctanos"}
            onClick={() => console.log("Contactanos")}
            type="success"
            icon={<FaWhatsapp />}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
