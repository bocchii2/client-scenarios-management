import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";


const CoreLayout = () => {

   /*  useEffect(() => {
    // scroll to top of the page when the component is mounted
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []); */
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CoreLayout;
