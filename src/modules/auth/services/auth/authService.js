// services/authService.ts

import useUserStore from "../../../../store/user";

export const login = async (email, password) => {
  // Simulamos una espera como si estuviéramos llamando a una API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Puedes agregar validación de usuario simulado
  if (email === "kokomitest@email.com" && password === "kokomisupremaci") {
    const fakeUser = {
      id: 2,
      name: "Kokomi",
      lastname: "Sangonomiya",
      email,
      phone: "987654321",
      address: "456 Another St, Watatsumi Island",
      role: "admin",
      loggedIn: true,
    };

    useUserStore.getState().setUser(fakeUser);
    return {
      success: true,
      user: fakeUser,
      userRole: useUserStore.getState().user.role,
    };
  } else {
    return { success: false, message: "Credenciales incorrectas" };
  }
};
