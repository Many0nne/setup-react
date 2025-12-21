import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { User } from "../types/auth";
import * as api from "../api/auth";

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const login = useCallback(async (email: string, password: string) => {
    const { token: tkn, user: usr } = await api.login(email, password);
    setToken(tkn);
    setUser(usr);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const { token: tkn, user: usr } = await api.register(email, password);
    setToken(tkn);
    setUser(usr);
  }, []);

  const logout = useCallback(() => {
    api.logout().catch(() => void 0);
    setToken(null);
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    const { token: tkn, user: usr } = await api.refresh();
    setToken(tkn);
    setUser(usr);
  }, []);

  // Restore session on page load using HttpOnly refresh cookie
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      // Use setTimeout to avoid setState in effect warning
      setTimeout(() => {
        refresh().catch(() => {
          // ignore failures; user remains logged out
        });
      }, 0);
    }
  }, [refresh]);

  const value = useMemo(
    () => ({ user, token, login, register, logout, refresh }),
    [user, token, login, register, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
