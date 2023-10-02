import { StateCreator } from "zustand";

type CustomHeaders = HeadersInit & { "x-auth-token": string };
interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}
export type AuthSlice = {
  token: string | null | CustomHeaders["x-auth-token"];
  currentUser: User;
  changeToken: (newToken: string | null) => void;
  fetch: () => void;
  resetUser: () => void;
};

const URL = `${import.meta.env.VITE_SERVER_URL}/users/me`;

const INITIAL_USER = {
  _id: "",
  name: "",
  email: "",
  isAdmin: false,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  token: null,
  currentUser: INITIAL_USER,
  changeToken: (newToken: string | null) => set({ token: newToken }),
  fetch: async () => {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "x-auth-token": get().token || null,
      } as CustomHeaders,
    });
    set({
      currentUser: await response.json(),
    });
  },
  resetUser: () =>
    set({
      token: null,
      currentUser: INITIAL_USER,
    }),
});
