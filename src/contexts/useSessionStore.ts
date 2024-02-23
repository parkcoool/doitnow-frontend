import { create } from "zustand";

import type { User } from "user";

interface SessionValues {
  user: User | null;
}

interface SessionMethods {
  setUser: (user: User | null) => void;
}

const useSessionStore = create<SessionValues & SessionMethods>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
}));

export default useSessionStore;
