import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: {
    id: 1,
    name: "Ellen Doe",
    lastname: "Doe",
    email: "johndoe@email.com",
    phone: "123456789",
    address: "123 Main St",
    role: "student",
    imgUrl: "/public/my_avatar.jpeg",
    loggedIn: false,
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  setName: (name) => set((state) => ({ user: { ...state.user, name } })),
  clearUser: () => set({ user: null }),
  isLoggedIn: () => get().user.loggedIn,
  getUser: () => get().user,
  updateUser: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  resetUser: () => set({ user: null }),
}));

export default useUserStore;
