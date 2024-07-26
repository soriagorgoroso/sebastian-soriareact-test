import { create } from "zustand";
import { AuthState, User } from "../types/auth.types";
import { decryptData, encryptData } from "../utils/encryption";

const getDefaultUser = (): User => {
  const email = "test@dominio.com";
  const password = "Password123!";
  return { email, password: encryptData(password) };
};

const defaultUser = getDefaultUser();

const storedUser = localStorage.getItem("user");
const initialState: User | null = storedUser
  ? {
      ...JSON.parse(storedUser),
      password: decryptData(JSON.parse(storedUser).password),
    }
  : null;

export const useAuthStore = create<AuthState>((set) => {
  let timeout: ReturnType<typeof setTimeout>;

  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      set({ user: null });
      localStorage.removeItem("user");
      alert("Logged out due to inactivity");
    }, 5 * 60 * 1000);
  };

  const initializeActivityTimeout = () => {
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);
    resetTimeout();
  };

  return {
    user: initialState,
    login: (user: User) => {
      const storedPassword = defaultUser.password
        ? decryptData(defaultUser.password)
        : "";
      console.log("Stored Password:", storedPassword);
      console.log("Entered Password:", user.password);

      if (
        user.email === defaultUser.email &&
        user.password === storedPassword
      ) {
        const encryptedUser = { ...user, password: encryptData(user.password) };
        set({ user: encryptedUser });
        localStorage.setItem("user", JSON.stringify(encryptedUser));
        return true;
      } else {
        alert("Invalid email or password");
        return false;
      }
    },
    updateUser: (updatedUser: User) => {
      set((state) => ({
        user: { ...state.user, ...updatedUser },
      }));
    },
    logout: () => {
      set({ user: null });
      localStorage.removeItem("user");
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
    },

    initializeActivityTimeout,
    resetActivityTimeout: resetTimeout,
  };
});
