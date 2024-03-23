import { create } from "zustand";

export interface NotificationValues {
  count: number;
}

export interface NotificationMethods {
  setCount: (count: number | ((state: number) => number)) => void;
}

const useNotificationStore = create<NotificationValues & NotificationMethods>((set) => ({
  count: 0,

  setCount: (count) => {
    if (typeof count === "function") set((prev) => ({ count: count(prev.count) }));
    else set({ count });
  },
}));

export default useNotificationStore;
