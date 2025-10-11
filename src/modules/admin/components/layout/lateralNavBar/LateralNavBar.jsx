import React from "react";
import Logo from "../../../../../components/ui/Logo/Logo";
import { CiLogout } from "react-icons/ci";
import SideMenuElement from "./SideMenuElement";
import CategorySection from "./CategorySection";
import { SideMenuOptions } from "../../../constants/SideMenuOptions";
import useRedirection from "../../../../core/hooks/useRedirection";
import useAuthGuard from "../../../../../hooks/useAuthGuard";
const LateralMenu = () => {
  const { logout } = useAuthGuard();
  const [selected, setSelected] = React.useState("Información");
  const { redirectTo } = useRedirection();
  const handleSelect = (label, route) => {
    setSelected(label);
    redirectTo(route);
  };

  const handleLogout = () => {
    // eliminar el estado del usuario logueado
    logout();
  };

  return (
    <div className="p-1 w-[300px] h-screen flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-center mb-6 gap-2 p-3">
        <Logo size="medium" color="gray-800" />
      </div>
      <div className="flex flex-col justify-start items-center w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        {SideMenuOptions.map((section) => (
          <CategorySection key={section.category} title={section.category}>
            {section.items.map((option) => (
              <SideMenuElement
                key={option.label}
                isSelect={option.label === selected}
                alert={option.alert}
                label={option.label}
                onClick={() => handleSelect(option.label, option.route)}
              />
            ))}
          </CategorySection>
        ))}
      </div>
      <div className="mt-auto px-5 py-4 text-start w-full cursor-pointer hover:bg-gray-200 transition-colors">
        <div
          className="flex items-center justify-between"
          onClick={handleLogout}
        >
          <span>Cerrar Sesion</span>
          <CiLogout size={20} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default LateralMenu;
