import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useNotes = create(
  persist(
    (set) => ({
      data: [],
      push: (value) => set((state) => ({ data: [value, ...state.data] })),
      update: (id, value) =>
        set((state) => ({
          data: state.data.map((item) => {
            if (item.id === id) {
              item = Object.assign(item, value);
            }
            return item;
          }),
        })),
      delete: (id) => set((state) => ({ data: state.data.filter((item) => item.id !== id) })),
      clear: () => set({ bears: [] }),
    }),
    {
      name: "app.notes",
      storage: createJSONStorage(() => localStorage)
    },
  ),
);

export default useNotes;