import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TCard } from "../types";

type TFilteredCardState = {
  cards: Array<TCard>;
  setCards: (values: Array<TCard>) => void;
  filteredCards: Array<TCard>;
  setFilteredCards: (values: Array<TCard>) => void;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useCardStore = create<TFilteredCardState>()(
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

type TFiltersState = {
  filters: Array<{ name: string; isSet: boolean }>;
  setFilters: (name: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useFilterStore = create<TFiltersState>()(
  persist(
    (set) => ({
      filters: [
        { name: "Common", isSet: false },
        { name: "Mythic", isSet: false },
        { name: "Rare", isSet: false },
        { name: "Uncommon", isSet: false },
      ],
      setFilters: (name) =>
        set((state) => ({
          filters: state.filters.map((f) =>
            f.name === name ? { ...f, isSet: !f.isSet } : f
          ),
        })),

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
