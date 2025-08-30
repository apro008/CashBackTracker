import { create } from 'zustand';

type TabBarState = {
  hidden: boolean;
  setHidden: (v: boolean) => void;
};

export const useTabBarStore = create<TabBarState>((set) => ({
  hidden: false,
  setHidden: (v) => set({ hidden: v }),
}));
