import { StateCreator } from "zustand";
import { QuestionProps } from "../Components/question/Questions";

export type AssignmentSlice = {
  questions: Array<QuestionProps>;
  addQuestion: (newQuestion: QuestionProps) => void;
  removeQuestion: (questionId: string) => void;
};

export const createAssignmentSlice: StateCreator<AssignmentSlice> = (
  set,
  get
) => ({
  questions: [],
  addQuestion: (question: QuestionProps) =>
    set({ questions: [...get().questions, question] }),
  removeQuestion: (questionId: string) =>
    set({
      questions: get().questions.filter((item) => item._id !== questionId),
    }),
});
