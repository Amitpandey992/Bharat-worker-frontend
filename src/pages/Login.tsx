import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                toast({
                    title: "Login successful",
                    description: "Welcome to the admin panel!",
                });
                if (user?.role === "admin") {
                    navigate("/customerlist");
                } else if (user?.role === "customer") {
                    navigate("/bookingList");
                } else if (user?.role === "partner") {
                    navigate("/view-jobs");
                }
            } else if (result.deactivated) {
                toast({
                    title: "Your Account is deactivated. Please contact admin.",
                    variant: "destructive",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Login failed",
                    description: "Invalid email or password. Please try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login error",
                description: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-wheat">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
            >
                <div className="mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/bharatworker.jpeg"
                            alt="Logo"
                            className="h-24 w-24 rounded-full"
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                            className="focus-visible:ring-blue/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="focus-visible:ring-blue/50"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="blue"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
