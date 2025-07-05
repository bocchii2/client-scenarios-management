import React from "react";
import Logo from "../../../../../components/ui/Logo/Logo";
import { IoCloseOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import SideMenuElement from "./SideMenuElement";
import { SideMenuOptions } from "../../../constants/SideMenuOptions";
import useRedirection from "../../../../core/hooks/useRedirection";

const LateralMenu = () => {
  const [selected, setSelected] = React.useState("Tablero");
  const { redirectTo } = useRedirection();
  const handleSelect = (label, route) => {
    setSelected(label);
    redirectTo(route);
  };
  return (
    <div className="p-4 w-auto max-w-xs bg-white h-screen flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-center mb-6 gap-2 p-3">
        <Logo size="medium" color="gray-500" />
        <IoCloseOutline size={35} className="text-white" />
      </div>
      <div className="flex flex-col justify-start items-center">
        {SideMenuOptions.map((option) => (
          <SideMenuElement
            key={option.label}
            isSelect={option.label === selected}
            alert={option.alert}
            label={option.label}
            onClick={() => handleSelect(option.label, option.route)}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-4 text-start w-full cursor-pointer hover:bg-gray-200 transition-colors">
        <div className="flex items-center justify-between">
          <span>Cerrar Sesion</span>
          <CiLogout size={20} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default LateralMenu;
