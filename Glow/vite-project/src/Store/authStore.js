import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  jwt: localStorage.getItem("jwt") || null,

  login: (data) => {
    localStorage.setItem("jwt", data.jwt);
    set({ jwt: data.jwt, user: data.user });
  },

  logout: () => {
    localStorage.removeItem("jwt");
    set({ jwt: null, user: null });
  },
}));

export default useAuth;
