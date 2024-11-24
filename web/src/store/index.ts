import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./auth";

const storeName = "NGADUIT_STORAGE";

export const useStore = create<AuthSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: storeName,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
