import React from "react";
import { Outlet } from "react-router-dom";
import LateralMenu from "./components/layout/lateralNavBar/LateralNavBar";
const AdminLayout = () => {
  return (
    <div className="flex">
      <LateralMenu />
      <Outlet />
      {/* Add your admin-specific components here */}
      {/* For example, a sidebar or admin navigation */}
    </div>
  );
};

export default AdminLayout;
