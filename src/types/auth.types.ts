export interface User {
  email: string;
  password: string;
}
export interface AuthState {
  user: User | null;
  login: (user: User) => boolean;
  logout: () => void;
  initializeActivityTimeout: () => void;
  resetActivityTimeout: () => void;
  updateUser: (updatedUser: User) => void;
}
