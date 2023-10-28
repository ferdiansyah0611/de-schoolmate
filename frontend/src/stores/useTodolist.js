import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const tmp = [
  {
    id: "section-1",
    title: "Task",
    items: [
      { id: "item-1", label: "Task 1" },
      { id: "item-2", label: "Task 2" },
      { id: "item-3", label: "Task 3" },
      { id: "item-4", label: "Task 4" },
      { id: "item-5", label: "Task 5" },
      { id: "item-6", label: "Task 6" },
      { id: "item-7", label: "Task 7" },
      { id: "item-8", label: "Task 8" },
      { id: "item-9", label: "Task 9" },
    ],
  },
  {
    id: "section-2",
    title: "Progress",
    items: [
      { id: "item-40", label: "Progress 1" },
      { id: "item-50", label: "Progress 2" },
    ],
  },
  {
    id: "section-3",
    title: "Done",
    items: [
      { id: "item-60", label: "Done 1" },
      { id: "item-70", label: "Done 2" },
      { id: "item-80", label: "Done 3" },
    ],
  },
];
const useTodolist = create((set) => ({
  data: tmp,
  push: (nextGroup, value) => set((state) => {
    const updatedSections = state.data.map((section) => {
      if (section.title === nextGroup) {
        section.items = [ { id: crypto.randomUUID(), label: value } , ...section.items ];
      }
      return section
    });
    return { data: updatedSections };
  }),
  update: (sectionId, id, value) =>
    set((state) => ({
      data: state.data.map((section) => {
        if (section.id === sectionId) {
          section.items = section.items.map((item) => {
            if (item.id === id) {
              item.label = value;
            }
            return item;
          });
        }
        return section;
      }),
    })),
  delete: (sectionId, id) => set((state) => {
    const updatedSections = state.data.map((section) => {
      if (section.id === sectionId) {
        section.items = section.items.filter((item) => item.id !== id);
      }
      return section;
    })
    return { data: updatedSections };
  }),
  clear: () => set({ bears: [] }),
  setValue: (value) => set({ data: value }),
}));

export default useTodolist;