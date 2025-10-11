import React from "react";

const Logo = ({ size = "medium", color = "gray-700", className = "" }) => {
  // Mapeo de colores para evitar problemas con Tailwind dinámico
  const colorMap = {
    "white": "text-white",
    "gray-500": "text-gray-500",
    "gray-700": "text-gray-700",
    "gray-800": "text-gray-800",
    "blue-600": "text-blue-600",
    "blue-500": "text-blue-500",
    "black": "text-black"
  };

  const getLogoStyles = () => {
    const textColor = colorMap[color] || `text-${color}`;

    switch (size) {
      case "large":
        return {
          container: "flex flex-col items-center justify-center gap-4 p-6 max-w-xs",
          image: "h-20 w-20 rounded-full border-2 border-gray-200",
          text: `text-4xl font-bold ${textColor}`,
          showText: true
        };
      case "medium":
        return {
          container: "flex flex-row items-center justify-start gap-3 p-2",
          image: "h-12 w-12 rounded-full border border-gray-200",
          text: `text-2xl font-semibold ${textColor}`,
          showText: true
        };
      case "small":
        return {
          container: "flex items-center justify-center p-1",
          image: "h-8 w-8 rounded-full border border-gray-100",
          text: "",
          showText: false
        };
      default:
        return {
          container: "flex flex-row items-center justify-start gap-3 p-2",
          image: "h-12 w-12 rounded-full border border-gray-200",
          text: `text-2xl font-semibold ${textColor}`,
          showText: true
        };
    }
  };

  const styles = getLogoStyles();

  return (
    <div className={`${styles.container} ${className} rounded-lg`}>
      <div className="relative">
        <img
          src="/mambo.png"
          alt="Mambo Logo"
          className={`${styles.image} object-cover shadow-sm transition-transform `}
        />
      </div>
      {styles.showText && (
        <div className={size === "large" ? "text-center" : ""}>
          <h2 className={`${styles.text} select-none tracking-tight text-gray-700`}>
            Mambo
          </h2>
          {size === "large" && (
            <p className={`text-sm ${colorMap[color] || `text-${color}`} opacity-75 mt-1`}>
              Gestión de Escenarios
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default Logo;
