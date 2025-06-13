import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthService } from "@/services/auth.service";
import { LoginResponse } from "@/shared/types";
import { Constants } from "@/shared/constants";

interface AuthContextType {
  user: LoginResponse | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(Constants.LocalStorageSessionKey);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem(Constants.LocalStorageSessionKey);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const loginResponse = await AuthService.login({ email, password });
      if (loginResponse && loginResponse.success) {
        const userData = loginResponse.data;

        localStorage.setItem(
          Constants.LocalStorageSessionKey,
          JSON.stringify(userData)
        );
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };


  const logout = () => {
    localStorage.removeItem(Constants.LocalStorageSessionKey);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
