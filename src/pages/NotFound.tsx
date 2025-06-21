import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const NotFound = () => {
    const { token, user } = useAuth();
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-wheat">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="text-[150px] font-bold text-black/5">
                            404
                        </div>
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-primary">
                            Page Not Found
                        </div>
                    </div>
                </div>
                <p className="mb-8 text-muted-foreground">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Button variant="blue" asChild>
                    <Link
                        to={
                            token && user?.role === "admin"
                                ? "/customerlist"
                                : token && user?.role === "customer"
                                ? "/create-service"
                                : token && user?.role === "partner"
                                ? "/view-jobs"
                                : "/login"
                        }
                    >
                        Back to {token ? "Dashboard" : "Login"}
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
};

export default NotFound;
