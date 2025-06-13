import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  ShieldCheck,
  LogOut,
  X,
  ChevronDown,
  BarChart,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  onClose: () => void;
}

interface SubMenuItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

interface MenuItem {
  name: string;
  href?: string;
  icon: JSX.Element;
  subItems?: SubMenuItem[];
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const navigation: MenuItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },

    {
      name: "Admin",
      href: "/admins",
      icon: <Users className="h-5 w-5" />,
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

  const isMenuOpen = (menuName: string) => {
    return openMenus.includes(menuName);
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-black shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="flex items-center mx-auto space-x-2">
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
        {navigation.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium
                    ${
                      isMenuOpen(item.name)
                        ? "text-blue bg-blue/10"
                        : "text-gray-100 hover:bg-blue/5 hover:text-blue-300"
                    }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMenuOpen(item.name) ? "rotate-180" : ""
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
                            ? "bg-blue/10"
                            : "hover:bg-blue/5 hover:text-gray-300"
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
                            transition={{ duration: 0.2 }}
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
