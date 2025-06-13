import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/dashboard")) {
      setPageTitle("Dashboard");
    } else if (path.includes("/responses/rccs")) {
      if (path.includes("/responses/rccs/")) {
        setPageTitle("Response Details");
      } else {
        setPageTitle("RCCS Responses");
      }
    } else if (path.includes("/surveyers")) {
      setPageTitle("Surveyer Management");
    } else if (path.includes("/admins")) {
      setPageTitle("Admin Management");
    } else if (path.includes("/profile")) {
      setPageTitle("Profile Settings");
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 flex h-16 items-center justify-between border-b transition-colors duration-200 ${
        isScrolled
          ? "border-blue/10 bg-wheat/80 backdrop-blur-md"
          : "border-transparent bg-wheat"
      }`}
    >
      <div className="flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-4 text-primary hover:bg-blue/10 hover:text-blue"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-primary">
          <motion.span
            key={pageTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {pageTitle}
          </motion.span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
