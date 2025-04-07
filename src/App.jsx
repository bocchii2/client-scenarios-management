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

const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
          </Route>
          <Route element={<CoreLayout />}>
            <Route path="" element={<HomeView />} />
            <Route path="/uleam">
              <Route path="" element={<UleamView />} />
              <Route path=":idScenario" element={<ScenarioView />} />
              <Route path="cotizaciones" element={<CotizacionesView />} />
              <Route path="servicios" element={<ServiciosView />} />
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
