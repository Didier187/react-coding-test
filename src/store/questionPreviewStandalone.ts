import { create } from "zustand";
interface QuestionPreviewStandaloneState {
  currentFilePreviewPath: string;
  currentFileContents: string;
  setCurrentFilePreviewPath: (path: string) => void;
setCurrentFileContents: (contents: string) => void;
}

const useQuestionPreviewStandalone = create<QuestionPreviewStandaloneState>(
  (set) => ({
    currentFilePreviewPath: "",
    currentFileContents: "",
    setCurrentFilePreviewPath: (path: string) =>
      set(() => ({ currentFilePreviewPath: path })),
    setCurrentFileContents: (contents: string) =>
        set(() => ({ currentFileContents: contents })),
            
  })
);

export default useQuestionPreviewStandalone;
