import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./modules/auth/AuthLayout";
import Login from "./modules/auth/pages/Login";
import Signup from "./modules/auth/pages/Signup";
import CoreLayout from "./modules/core/CoreLayout";
import UleamView from "./modules/core/pages/UleamView";
import ScenarioView from "./modules/core/pages/ScenarioView";
import CotizacionesView from "./modules/core/pages/CotizacionesView";
import ServiciosView from "./modules/core/pages/ServiciosView";
import HomeView from "./modules/core/pages/HomeView";
import { NotificationProvider } from "./modules/core/providers/NotificationProvider";

const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="404" element={<div>Not Found</div>} />
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
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
