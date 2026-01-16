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

// Contexte d'authentification client
// Stocke l'utilisateur et le token JWT en mémoire côté client.
// Le refresh est appelé au premier rendu pour tenter de récupérer
// une session via le cookie de refresh (si le serveur en a un).
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

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setTimeout(() => {
        // Tentative de restauration de session au chargement (via cookie refresh)
        refresh().catch(() => {
          // Échec silencieux : utilisateur non connecté
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
