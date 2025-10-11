import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoreLayout from "./modules/core/CoreLayout";
import UleamView from "./modules/core/pages/UleamView";
import ScenarioView from "./modules/core/pages/ScenarioView";
import CotizacionesView from "./modules/core/pages/CotizacionesView";
import ServiciosView from "./modules/core/pages/ServiciosView";
import HomeView from "./modules/core/pages/HomeView";
import { NotificationProvider } from "./providers/NotificationProvider";
import LoginView from "./modules/auth/pages/LoginView";
import RegisterView from "./modules/auth/pages/RegisterView";
import AuthLayout from "./modules/auth/AuthLayout";
import AdminOverviewView from "./modules/admin/pages/AdminOverviewView";
import AdminLayout from "./modules/admin/AdminLayout";
import UsersView from "./modules/admin/pages/UsersView";
import RolesView from "./modules/admin/pages/RolesView";
import PermissionsView from "./modules/admin/pages/PermissionsView";

const App = () => {
  /*   // Lazy load the components
  const AuthLayout = lazy(() => import("./modules/auth/AuthLayout"));
  const CoreLayout = lazy(() => import("./modules/core/CoreLayout"));
 */
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="overview" element={<AdminOverviewView />} />
            <Route path="places" element={<div>Places</div>} />
            <Route path="users" element={<UsersView />} />
            <Route path="roles" element={<RolesView />} />
            <Route path="permissions" element={<PermissionsView />} />
            <Route path="cargos" element={<div>Cargos</div>} />
            <Route path="departments" element={<div>Departments</div>} />
            <Route path="events" element={<div>Events</div>} />
            <Route path="services" element={<div>Services</div>} />
            <Route path="schedules" element={<div>Schedules</div>} />
            <Route path="equipment" element={<div>Equipment</div>} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="requests" element={<div>Requests</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          <Route element={<CoreLayout />}>
            <Route path="" element={<HomeView />} />
            <Route path="/uleam">
              <Route path="" element={<UleamView />} />
              <Route path=":idScenario" element={<ScenarioView />} />
              <Route path="cotizaciones" element={<CotizacionesView />} />
              <Route path="servicios" element={<ServiciosView />} />
              <Route path="user">
                <Route path="profile" element={<div>Profile</div>} />
                <Route path="settings" element={<div>Settings</div>} />
                <Route path="my-requests" element={<div>My Requests</div>}>
                  <Route
                    path=":idRequest"
                    element={<div>Request Detail</div>}
                  />
                  <Route
                    path=":idRequest/overview"
                    element={<div>overview request</div>}
                  />
                </Route>
                <Route path="invitations" element={<div>invitations</div>} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter >
  );
};

export default App;
