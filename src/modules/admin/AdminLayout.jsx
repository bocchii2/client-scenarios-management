import React from "react";
import { Outlet } from "react-router-dom";
import LateralMenu from "./components/layout/lateralNavBar/LateralNavBar";
const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex-shrink-0 h-full">
        <LateralMenu />
      </div>
      <div className="flex-grow bg-gray-50 h-full p-6 overflow-y-auto">
        <Outlet />
      </div>
      {/* Add your admin-specific components here */}
      {/* For example, a sidebar or admin navigation */}
    </div>
  );
};

export default AdminLayout;
