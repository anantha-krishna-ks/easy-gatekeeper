import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BookReader from "@/components/BookReader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, BookOpen, ClipboardList, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { id: "english", title: "English" },
  { id: "mathematics", title: "Mathematics" },
  { id: "science", title: "Science" },
  { id: "hindi", title: "Hindi" },
];

const BookReaderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject");
  const [activeMenu, setActiveMenu] = useState("ebooks");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");

  const subject = subjects.find((s) => s.id === subjectId);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "teacher" || role === "student") {
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else if (menu === "dashboard") {
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      } else if (userRole === "parent") {
        navigate("/parent-dashboard");
      }
    } else {
      setActiveMenu(menu);
    }
  };

  if (!subject) {
    navigate(-1);
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} role={userRole} />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden fixed top-16 left-4 z-50 bg-card border border-border shadow-md"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <nav className="flex flex-col p-4 space-y-2 mt-8">
              {[
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { id: "ebooks", label: "eBooks", icon: BookOpen },
                { id: "learning-resources", label: "Learning Resources", icon: ClipboardList },
                { id: "assessments", label: "Assessments", icon: FileText },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleMenuChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} role={userRole} />

        {/* Main Content */}
        <BookReader subject={subject.title} showNavigation={false} />
      </div>
    </div>
  );
};

export default BookReaderPage;
