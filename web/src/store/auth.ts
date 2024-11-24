import { User } from "@/types/api";
import { StateCreator } from "zustand";

export type AuthSlice = {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  onLogin: (payload) => {
    set(() => ({ user: { ...payload } }));
  },
  onLogout: () => {
    set(() => ({ user: null }));
  },
});
