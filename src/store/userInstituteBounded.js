import { create } from "zustand";
import { createUserSlice } from "./userSlice";
import { createInstitutionSlice } from "./institutionSlice";

// Combined store using slice pattern
export const useCombinedStore = create((set, get) => ({
  ...createUserSlice(set, get),
  ...createInstitutionSlice(set, get),

  // Additional combined methods
  getAllData: () => ({
    user: get().user,
    institution: get().institution,
  }),

  resetAll: () => {
    set({ user: null });
    set((state) => ({
      institution: {
        name: "uleam",
        carrer: "Ingeniería en Sistemas Computacionales",
        position: "Estudiante",
        faculty: "Facultad de Ciencias de la Vida Y Tecnología",
      }
    }));
  },

  // Check if user is logged in and has institution data
  isProfileComplete: () => {
    const state = get();
    return state.user?.loggedIn &&
      state.institution?.name &&
      state.institution?.carrer;
  },
}));