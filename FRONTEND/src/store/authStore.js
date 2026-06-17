import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem('auth') === 'true',
  login: (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true');
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  socialLogin: (provider) => {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('provider', provider);
    set({ isAuthenticated: true });
    return true;
  },
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('provider');
    set({ isAuthenticated: false });
  }
}));
