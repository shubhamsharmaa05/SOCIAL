import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem('auth') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,

  socialLogin: (provider, userData = null) => {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('provider', provider);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    set({ isAuthenticated: true, user: userData });
    return true;
  },
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('provider');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  }
}));
