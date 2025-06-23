import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

import {
    // LayoutDashboard,
    // ClipboardList,
    Users,
    // ShieldCheck,
    LogOut,
    X,
    ChevronDown,
    // BarChart,
    // Use
    Circle,
    FilePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
    onClose: () => void;
}

interface SubMenuItem {
    name: string;
    href: string;
    icon: JSX.Element;
    role: string;
}

interface MenuItem {
    name: string;
    href?: string;
    icon: JSX.Element;
    subItems?: SubMenuItem[];
    role: string;
}

const Sidebar = ({ onClose }: SidebarProps) => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const navigation: MenuItem[] = [
        {
            name: "User Management",
            href: "/user",
            icon: <Users className="h-5 w-5" />,
            role: "admin",
            subItems: [
                {
                    name: "Customer",
                    href: "/customerlist",
                    icon: <Users className="h-4 w-4" />,
                    role: "admin",
                },

                {
                    name: "Partner",
                    href: "/partnerlist",
                    icon: <Users className="h-4 w-4" />,
                    role: "admin",
                },
            ],
        },
        {
            name: "Your Bookings",
            href: "/customer-booking",
            icon: <FilePlus className="h-4 w-4" />,
            role: "customer",
        },
        {
            name: "Create Booking",
            href: "/create-booking",
            icon: <FilePlus className="h-4 w-4" />,
            role: "customer",
        },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const toggleMenu = (menuName: string) => {
        setOpenMenus((prev) =>
            prev.includes(menuName)
                ? prev.filter((name) => name !== menuName)
                : [...prev, menuName]
        );
    };

    useEffect(() => {
        const updatedOpenMenus = openMenus.filter((menuName) => {
            const item = navigation.find((nav) => nav.name === menuName);
            if (item?.subItems) {
                return isSubActive(item.subItems);
            }
            return false;
        });

        if (updatedOpenMenus.length !== openMenus.length) {
            setOpenMenus(updatedOpenMenus);
        }
    }, [location.pathname]);

    const isMenuOpen = (menuName: string) => {
        return openMenus.includes(menuName);
    };
    const isSubActive = (subPaths: SubMenuItem[]) => {
        return subPaths.some((sub) => location.pathname.startsWith(sub.href));
    };

    const filteredNavigation = navigation.filter(
        (item, index) => item.role === user?.role
    );

    return (
        <div className="flex h-full flex-col overflow-y-auto border-r bg-black shadow-lg">
            <div className="flex items-center justify-between px-6 py-4">
                <Link
                    to="/dashboard"
                    className="flex items-center mx-auto space-x-2"
                >
                    <img
                        src="/bharatworker.jpeg"
                        alt="Logo"
                        className="h-24 w-24 rounded-full bg-blue-100"
                    />
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="lg:hidden text-blue-100"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="mt-6 space-y-1 px-3">
                {filteredNavigation.map((item) => (
                    <div key={item.name}>
                        {item.subItems ? (
                            <div className="space-y-1">
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium
                    ${
                        isMenuOpen(item.name)
                            ? "text-blue-300 bg-blue/10"
                            : "text-gray-100 hover:bg-blue/5 hover:text-blue-300"
                    }`}
                                >
                                    <div className="flex items-center">
                                        {item.icon}
                                        <span className="ml-2">
                                            {item.name}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                            isMenuOpen(item.name)
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>
                                {isMenuOpen(item.name) && (
                                    <div className="ml-4 space-y-1">
                                        {item.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                to={subItem.href}
                                                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium ${
                                                    isActive(subItem.href)
                                                        ? "bg-blue/10 text-blue-300"
                                                        : "text-blue-100 hover:bg-blue/5 hover:text-blue-300"
                                                }`}
                                            >
                                                {subItem.icon}
                                                <span>{subItem.name}</span>
                                                {isActive(subItem.href) && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="absolute right-0 h-5 w-1 rounded-l-full bg-blue"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                    />
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={item.href!}
                                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium ${
                                    isActive(item.href!)
                                        ? "bg-blue/10 text-blue-300"
                                        : "text-blue-100 hover:bg-blue/5 hover:text-blue-300"
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                                {isActive(item.href!) && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute right-0 h-5 w-1 rounded-l-full bg-blue"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-auto border-t border-blue/10 px-3 py-4 flex flex-col gap-3">
                <Button
                    size="icon"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    className="text-blue-100 hover:text-blue hover:bg-transparent w-full hover:border-blue-950 hover:border"
                    title="Logout"
                >
                    logout
                    <LogOut className="h-5 w-5 ml-3" />
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
