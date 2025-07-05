import { create } from "zustand";

// Slice function for institution state
export const createInstitutionSlice = (set, get) => ({
  institution: {
    name: "uleam",
    carrer: "Ingeniería en Sistemas Computacionales",
    position: "Estudiante",
    shortFacultyName: "FCVT",
    faculty: "Facultad de Ciencias de la Vida y Tecnología",
  },
  setInstitutionName: (name) =>
    set((state) => ({ institution: { ...state.institution, name } })),
  setCarrer: (carrer) =>
    set((state) => ({ institution: { ...state.institution, carrer } })),
  setPosition: (position) =>
    set((state) => ({ institution: { ...state.institution, position } })),
  setFaculty: (faculty) =>
    set((state) => ({ institution: { ...state.institution, faculty } })),
  getInstitution: () => get().institution,
  updateInstitution: (newInstitution) =>
    set((state) => ({ institution: { ...state.institution, ...newInstitution } })),
});

// Standalone store for backward compatibility
export const useInstitutionStore = create(createInstitutionSlice);
