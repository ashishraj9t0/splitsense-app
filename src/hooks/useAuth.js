// hooks/useAuth.js
import { useStore } from '../store/useStore';
import { api } from '../api/client';

export function useAuth() {
  const { token, setToken, clearAuth } = useStore();

  async function login(phone, password) {
    const { data } = await api.post('/auth/login', { phone, password });
    setToken(data.token); // in-memory only, NOT localStorage
  }

  async function logout() {
    await api.post('/auth/logout'); // clears httpOnly cookie
    clearAuth();
  }

  return { token, login, logout, isLoggedIn: !!token };
}