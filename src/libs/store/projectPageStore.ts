import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface StoreState {
  pageNumber: number;
  increasePage: () => void;
  decreasePage: () => void;
  resetPage: () => void;
}

const useProjectPageStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        pageNumber: 1,
        increasePage: () =>
          set((state) => ({ pageNumber: state.pageNumber + 1 })),
        decreasePage: () =>
          set((state) => ({ pageNumber: state.pageNumber - 1 })),
        resetPage: () => set(() => ({ pageNumber: 1 })),
      }),
      { name: 'project-page', storage: createJSONStorage(() => localStorage) }
    )
  )
);

export default useProjectPageStore;
