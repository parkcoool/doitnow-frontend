import { create } from "zustand";

import type { User } from "user";

interface SessionValues {
  user: User | null;
  accessToken: string | null;
}

interface SessionMethods {
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string | null) => void;
}

const useSessionStore = create<SessionValues & SessionMethods>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useSessionStore;
