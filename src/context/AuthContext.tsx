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
    user: LoginResponse["user"] | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<LoginResponse["user"] | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const parsedToken = JSON.parse(storedToken);

                setUser(parsedUser);
                setToken(parsedToken);
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

                localStorage.setItem("token", JSON.stringify(userData.token));
                localStorage.setItem("user", JSON.stringify(userData.user));

                setUser(userData.user);
                setToken(userData.token);

                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, token }}>
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
