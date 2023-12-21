import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { createFileSlice, FileSlice } from "./fileSlice";
import { AssignmentSlice, createAssignmentSlice } from "./assignmentSlice";
import { persist } from "zustand/middleware";
export const useBoundStore = create<FileSlice & AuthSlice & AssignmentSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createFileSlice(...a),
      ...createAssignmentSlice(...a),
    }),
    { name: "appState" }
  )
);
