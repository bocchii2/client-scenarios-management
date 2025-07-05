// services/authService.js

import { useCombinedStore } from "../../../../store/userInstituteBounded";

export const login = async (email, password) => {
  // Simulamos una espera como si estuviéramos llamando a una API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Puedes agregar validación de usuario simulado
  if (email === "halleyscomet@email.com" && password === "password123") {
    const fakeUser = {
      id: 2,
      name: "Billie Eilish",
      lastname: "Pirate O'Connell",
      email,
      phone: "987654321",
      address: "456 Another St, Watatsumi Island",
      role: "admin",
      loggedIn: true,
    };

    // Actualizamos el estado del usuario en el store
    useCombinedStore.setState({ user: fakeUser });

    return {
      success: true,
      user: fakeUser,
      userRole: fakeUser.role,
    };

  } else {
    return { success: false, message: "Credenciales incorrectas" };
  }
};
