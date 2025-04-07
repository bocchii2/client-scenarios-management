import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: {
    id: 1,
    name: "John Doe",
    lastname: "Doe",
    email: "johndoe@email.com",
    phone: "123456789",
    address: "123 Main St",
    role: "admin",
    loggedIn: true,
  },
  sayHello: (name) => console.log(`Hello, ${name}!`),
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  setName: (name) => set((state) => ({ user: { ...state.user, name } })),
  clearUser: () => set({ user: null }),
  isLoggedIn: () => get().user.loggedIn,
  getUser: () => get().user,
  updateUser: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  resetUser: () => set({ user: null }),
  services: [],
  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  removeService: (serviceId) =>
    set((state) => ({
      services: state.services.filter((service) => service.id !== serviceId),
    })),
}));

export default useUserStore;
