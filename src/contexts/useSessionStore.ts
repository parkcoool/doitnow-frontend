import { create } from "zustand";

import type { FullProfile } from "user";

interface Token {
  token: string;
  expiresIn: number;
}

export interface SessionValues {
  user: FullProfile | null;
  accessToken: Token | null;
}

export interface SessionMethods {
  setUser: (user: FullProfile | null) => void;
  setAccessToken: (accessToken: Token | null) => void;
}

const useSessionStore = create<SessionValues & SessionMethods>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useSessionStore;
