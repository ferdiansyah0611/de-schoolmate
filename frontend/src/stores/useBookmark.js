import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const data = [
  maker("Google", "https://google.com"),
  maker("Facebook", "https://facebook.com"),
  maker("Instagram", "https://instagram.com"),
  maker("Linkedin", "https://linkedin.com"),
  maker("Pinterest", "https://pinterest.com"),
]

function maker(title, url) {
  return { id: crypto.randomUUID(), title, url };
}

const useBookmark = create(
  (set) => ({
    folder: [
      {
        id: crypto.randomUUID(),
        name: "My Bookmarks",
        data
      },
      {
        id: crypto.randomUUID(),
        name: "Social Media",
        data
      },
    ],
    /*folder*/
    pushFolder: (value) => set((state) => ({ folder: [value, ...state.folder] })),
    updateFolder: (id, value) =>
      set((state) => ({
        folder: state.folder.map((item) => {
          if (item.id === id) {
            item = Object.assign(item, value);
          }
          return item;
        }),
      })),
    deleteFolder: (id) => set((state) => ({ folder: state.folder.filter((item) => item.id !== id) })),
    /*bookmark*/
    pushBookmark: (folderId, value) => set((state) => ({
      folder: state.folder.map((folder) => {
        if (folder.id === folderId) {
          folder.data = [value, ...folder.data]
        }
        return folder;
      })
    })),
    updateBookmark: (folderId, id, value) => set((state) => ({
      folder: state.folder.map((folder) => {
        if (folder.id === folderId) {
          folder.data = folder.data.map((data) => {
            if (data.id === id) {
              data = Object.assign(value);
            }
            return data;
          })
        }
        return folder;
      })
    })),
    deleteBookmark: (folderId, id) => set((state) => ({
      folder: state.folder.map((folder) => {
        if (folder.id === folderId) {
          folder.data = folder.data.filter((data) => data.id !== id)
        }
        return folder;
      })
    })),
  })
);

export default useBookmark;