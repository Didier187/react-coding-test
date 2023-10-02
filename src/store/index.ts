import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { createFileSlice, FileSlice } from "./fileSlice";
import { ShortListSlice, createShortListSlice } from "./shortListSlice";
import { AssignmentSlice, createAssignmentSlice } from "./assignmentSlice";
import { persist } from "zustand/middleware";
export const useBoundStore = create<
  FileSlice & AuthSlice & ShortListSlice & AssignmentSlice
>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createFileSlice(...a),
      ...createShortListSlice(...a),
      ...createAssignmentSlice(...a),
    }),
    { name: "appState" }
  )
);
