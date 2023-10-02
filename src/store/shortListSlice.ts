import { StateCreator } from "zustand";
import { QuestionProps } from "../Components/Questions";

export interface ShortListSlice {
  shortList: QuestionProps[];
  addToShortList: (question: QuestionProps) => void;
  removeFromShortList: (question: QuestionProps) => void;
}

export const createShortListSlice: StateCreator<ShortListSlice> = (
  set,
  get
) => ({
  shortList: [],
  addToShortList: (question: QuestionProps) =>
    set({ shortList: [...get().shortList, question] }),
  removeFromShortList: (question: QuestionProps) =>
    set({
      shortList: get().shortList.filter((item) => item._id !== question._id),
    }),
});
