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
import DepartamentosView from "./modules/admin/pages/DepartamentsView";
import CargosView from "./modules/admin/pages/CargosView";
import SchedulesAndTaxes from "./modules/admin/pages/SchedulesAndTaxesView";
import SpacesView from "./modules/admin/pages/SpacesView";
import SchedulesView from "./modules/admin/pages/SchedulesView";
import InternalEventsView from "./modules/admin/pages/InternalEventsView";
import ServicesView from "./modules/admin/pages/ServicesView";
import EquipmentView from "./modules/admin/pages/EquipmentView";
import RequestsView from "./modules/admin/pages/RequestsView";

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
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="overview" element={<AdminOverviewView />} />
            <Route path="places" element={<SpacesView />} />
            <Route path="users" element={<UsersView />} />
            <Route path="roles" element={<RolesView />} />
            <Route path="permissions" element={<PermissionsView />} />
            <Route path="cargos" element={<CargosView />} />
            <Route path="departments" element={<DepartamentosView />} />
            <Route path="events" element={<InternalEventsView />} />
            <Route path="services" element={<ServicesView />} />
            <Route path="notifications" element={<div>Notifications</div>} />
            <Route path="schedules" element={<SchedulesView />} />
            <Route path="equipment" element={<EquipmentView />} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="requests" element={<RequestsView />} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          <Route element={<CoreLayout />}>
            <Route path="" element={<HomeView />} />
            <Route path="uleam">
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
