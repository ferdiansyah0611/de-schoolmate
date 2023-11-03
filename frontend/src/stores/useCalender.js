import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const data = [
  maker("Add 1", "lorem", Date.now() - 10000, "event"),
  maker("Add 2", "lorem", Date.now() - 10000, "event"),
  maker("Add 3", "lorem", Date.now() - 10000, "event"),
  maker("Add 4", "lorem", Date.now() - 10000, "event"),
  maker("Add 5", "lorem", Date.now() - 10000, "event"),
]

function maker(title, description, date, type) {
  return { id: crypto.randomUUID(), title, description, date, type };
}

const useCalender = create(
  (set) => ({
    data: data,
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
    clear: () => set({ data: [] }),
  })
);

export default useCalender;