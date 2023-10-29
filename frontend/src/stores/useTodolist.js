import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const section = [
  {
    id: "section-1",
    projectId: "task-1",
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
    projectId: "task-1",
    title: "Progress",
    items: [
      { id: "item-40", label: "Progress 1" },
      { id: "item-50", label: "Progress 2" },
    ],
  },
  {
    id: "section-3",
    projectId: "task-1",
    title: "Done",
    items: [
      { id: "item-60", label: "Done 1" },
      { id: "item-70", label: "Done 2" },
      { id: "item-80", label: "Done 3" },
    ],
  },
];

const project = [
  {
    id: "task-1",
    title: 'Create Real Estate Application',
  },
  {
    id: "task-2",
    title: 'Create SAAS Application',
  },
];

const useTodolist = create((set) => ({
  project,
  section,
  /**
   * project
   */
  pushProject: (title) => set((state) => ({
    project: [
      {
        title,
        id: crypto.randomUUID(),
        sections: []
      },
      ...state.project
    ]
  })),
  deleteProject: (projectId) => set((state) => ({
    project: state.project.filter((project) => project.id !== projectId)
  })),
  /**
   * section
   */
  pushSection: (projectId, title) => set((state) => ({
    section: [
      {
        id: crypto.randomUUID(),
        title, projectId,
        items: [{ id: crypto.randomUUID(), label: "Task" }]
      },
      ...state.section
    ]
  })),
  updateSection: (projectId, sectionId, value) => set((state) => ({
    section: state.section.map(section => {
      if (projectId === section.projectId && sectionId === section.id) {
        if (value.title) section.title = value.title;
      }
      return section;
    })
  })),
  deleteSection: (projectId, sectionId) => set((state) => ({
    section: state.section.filter(section => section.projectId === projectId && section.id !== sectionId)
  })),
  /**
   * items of section
   */
  pushItems: (projectId, nextGroup, value) => set((state) => {
    const updatedSections = state.section.map((section) => {
      if (section.projectId === projectId && section.id === nextGroup) {
        section.items = [ { id: crypto.randomUUID(), label: value } , ...section.items ];
      }
      return section
    });
    return { section: updatedSections };
  }),
  updateItems: (projectId, sectionId, id, value) =>
    set((state) => ({
      section: state.section.map((section) => {
        if (section.projectId === projectId && section.id === sectionId) {
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
  deleteItems: (projectId, sectionId, id) => set((state) => {
    const updatedSections = state.section.map((section) => {
      if (section.projectId === projectId && section.id === sectionId) {
        section.items = section.items.filter((item) => item.id !== id);
      }
      return section;
    })
    return { section: updatedSections };
  }),

  setSection: (value) => set({ section: value }),
}));

export default useTodolist;