import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

interface PreferenceValues {
  themeMode: ThemeMode;
}

interface PreferenceMethods {
  setTheme: (theme: ThemeMode) => void;
}

const usePreferenceStore = create(
  persist<PreferenceValues & PreferenceMethods>(
    (set) => ({
      themeMode: ThemeMode.Light,

      setTheme: (theme) => set({ themeMode: theme }),
    }),
    {
      name: "preference-store",
    }
  )
);

export default usePreferenceStore;
