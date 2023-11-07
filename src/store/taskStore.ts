import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TaskStoreState {
  successfullyFetched: boolean;
  activeFile: string;
  setActiveFile: (file: string) => void;
  activeTask: number;
  setActiveTask: (task: number) => void;

  isFetching: boolean;
  error: string | null;
  fetch: (token: string | null) => Promise<void>;
  assignment: {
    _id: string;
    name: string;
    assignedBy: string;
    isArchived: boolean;
    email: string;
    isSubmitted: boolean;
    assignedQuestion: {
      _id: string;
      level: string;
      prompt: string;
      files: Record<string, { code: string; language: string }>;
    }[];
  } | null;
}

const useTaskStore = create<TaskStoreState>()(
  immer(
    persist(
      (set, get) => ({
        successfullyFetched: false,
        isFetching: false,
        assignment: null,
        error: null,
        activeTask: 0,
        activeFile: "",
        setActiveFile: (file: string) => {
          set({
            activeFile: file,
          });
        },
        setActiveTask: (task: number) => {
          set({
            activeTask: task,
          });
        },

        fetch: async (token: string | null) => {
          if (get().successfullyFetched) return;
          set({
            isFetching: true,
          });

          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/tasks?ttkn=${token}`
          );

          if (response.status === 401) {
            set({
              error: "Invalid token",
              successfullyFetched: false,
              isFetching: false,
            });
          }
          if (response.status === 404) {
            set({
              error: "No task found",
              successfullyFetched: false,
              isFetching: false,
            });
          }
          if (response.status === 500) {
            set({
              error: "Server error",
              successfullyFetched: false,
              isFetching: false,
            });
          }
          if (response.status === 400) {
            set({
              error: "This task have been submitted!",
              successfullyFetched: false,
              isFetching: false,
            });
          }
          if (response.status === 200) {
            set({
              assignment: await response.json(),
              error: null,
              successfullyFetched: true,
              isFetching: false,
            });
          }
        },
      }),
      {
        name: "taskStoreState",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useTaskStore;
