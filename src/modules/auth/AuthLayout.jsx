import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../core/components/layout/Header";
import Footer from "../core/components/layout/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
