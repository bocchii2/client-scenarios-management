import React from "react";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <p>This is the admin layout.</p>
      <Outlet />
      {/* Add your admin-specific components here */}
      {/* For example, a sidebar or admin navigation */}
    </div>
  );
};

export default AdminLayout;
