import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

interface PreferenceValues {
  theme: Theme;
}

interface PreferenceMethods {
  setTheme: (theme: Theme) => void;
}

const usePreferenceStore = create(
  persist<PreferenceValues & PreferenceMethods>(
    (set) => ({
      theme: Theme.Dark,

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "preference-store",
    }
  )
);

export default usePreferenceStore;
