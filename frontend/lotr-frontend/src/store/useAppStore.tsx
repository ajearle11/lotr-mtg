import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TCard } from "../types";

type IFilteredCardState = {
  cards: Array<TCard>;
  setCards: (values: Array<TCard>) => void;
  filteredCards: Array<TCard>;
  setFilteredCards: (values: Array<TCard>) => void;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useCardStore = create<IFilteredCardState>()(
  persist(
    (set) => ({
      cards: [],
      setCards: (values) => set(() => ({ cards: [...values] })),
      filteredCards: [],
      setFilteredCards: (values) => set(() => ({ filteredCards: [...values] })),
      _hasHydrated: false,
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "filtered-card-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);


