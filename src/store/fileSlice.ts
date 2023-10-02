import { StateCreator } from "zustand";

export type FileSlice = {
  currentEditableFile: string;
  changeCurrentEditableFile: (newFile: string) => void;
};

export const createFileSlice: StateCreator<FileSlice> = (set) => ({
  currentEditableFile: "src/App.tsx",
  changeCurrentEditableFile: (newFile: string) =>
    set({ currentEditableFile: newFile }),
});
