import { create } from "zustand";

import type { User } from "user";
import type { Token } from "auth";

export interface SessionValues {
  user: User | null;
  accessToken: Token | null;
}

export interface SessionMethods {
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: Token | null) => void;
}

const useSessionStore = create<SessionValues & SessionMethods>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useSessionStore;
