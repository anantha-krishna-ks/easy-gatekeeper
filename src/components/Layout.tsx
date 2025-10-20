import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  role: "student" | "teacher" | "parent";
}

const Layout = ({ children, role }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active menu based on current route
  const getActiveMenu = () => {
    if (location.pathname.includes("profile")) return "profile";
    return "dashboard";
  };

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else {
      // Navigate back to respective dashboard
      if (role === "teacher") navigate("/teacher-dashboard");
      else if (role === "student") navigate("/student-dashboard");
      else if (role === "parent") navigate("/parent-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} />
      <div className="flex h-[calc(100vh-4rem)]">
        {role !== "parent" && (
          <Sidebar
            activeMenu={getActiveMenu()}
            onMenuChange={handleMenuChange}
            role={role}
          />
        )}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
