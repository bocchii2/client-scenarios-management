import { create } from "zustand";

// Slice function for user state
export const createUserSlice = (set, get) => ({
  user: {
    id: 1,
    name: "Billie Eilish",
    lastname: "Pirate O'Connell",
    email: "halleyscomet@email.com",
    phone: "123456789",
    address: "123 Main St",
    role: "student",
    imgUrl: "/public/waifu.jpg",
    loggedIn: false,
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  setName: (name) => set((state) => ({ user: { ...state.user, name } })),
  clearUser: () => set({ user: null }),
  isLoggedIn: () => get().user?.loggedIn || false,
  logout: () =>
    set((state) => ({
      user: { ...state.user, loggedIn: false },
    })),
  getUser: () => get().user,
  updateUser: (newUser) =>
    set((state) => ({ user: { ...state.user, ...newUser } })),
  resetUser: () => set({ user: null }),
});

// Standalone store for backward compatibility
export const useUserStore = create(createUserSlice);
