export const SideMenuOptions = [
  {
    category: "Panel Principal",
    items: [
      { label: "Información", isSelect: true, alert: false, route: "overview" },
      { label: "Solicitudes", isSelect: false, alert: true, route: "requests" },
      {
        label: "Historial de solicitudes",
        isSelect: false,
        alert: true,
        route: "history",
      },
    ],
  },
  {
    category: "Gestión",
    items: [
      { label: "Usuarios", isSelect: false, alert: true, route: "users" },
      { label: "Roles", isSelect: false, alert: false, route: "roles" },
      {
        label: "Permisos",
        isSelect: false,
        alert: false,
        route: "permissions",
      },
    ],
  },
  {
    category: "Organización",
    items: [
      {
        label: "Departamentos",
        isSelect: false,
        alert: false,
        route: "departments",
      },
      {
        label: "Cargos",
        isSelect: false,
        alert: false,
        route: "cargos",
      },
    ],
  },
  {
    category: "Recursos",
    items: [
      { label: "Espacios", isSelect: false, alert: false, route: "places" },
      {
        label: "Horarios y Tarifas",
        isSelect: false,
        alert: false,
        route: "schedules",
      },
      {
        label: "Eventos internos",
        isSelect: false,
        alert: false,
        route: "events",
      },
      { label: "Servicios", isSelect: false, alert: false, route: "services" },
      {
        label: "Equipamiento",
        isSelect: false,
        alert: false,
        route: "equipment",
      },
    ],
  },
  {
    category: "Sistema",
    items: [
      {
        label: "Configuración",
        isSelect: false,
        alert: false,
        route: "settings",
      },
    ],
  },
  {
    category: "Navegación",
    items: [
      { label: "Página de cliente", isSelect: false, alert: false, route: "/" },
    ],
  },
];
