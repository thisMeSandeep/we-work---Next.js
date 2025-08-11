import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "UserStore" } // This name will appear in Redux DevTools
  )
);
