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
  validLogin: { name: string };
  changeToken: (newToken: string | null) => void;
  validateToken: () => Promise<void>;
  fetch: () => void;
  resetUser: () => void;
};

const URL = `${import.meta.env.VITE_SERVER_URL}/users/me`;
const ValidationUrl = `${import.meta.env.VITE_SERVER_URL}/auth/validate`;

const INITIAL_USER = {
  _id: "",
  name: "",
  email: "",
  isAdmin: false,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  token: null,
  currentUser: INITIAL_USER,
  validLogin: {
    name: "",
  },
  changeToken: (newToken: string | null) => set({ token: newToken }),
  validateToken: async () => {
    const response = await fetch(ValidationUrl, {
      method: "GET",
      headers: {
        "x-auth-token": get().token || null,
      } as CustomHeaders,
    });
    // result can be an object containing jwt expiration message or simply true
    set({
      validLogin: await response.json(),
    });
  },
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
