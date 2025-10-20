import { FileText, ClipboardList, BookOpen, LayoutDashboard, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  role?: "student" | "teacher";
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "learning-resources", label: "Learning Resources", icon: BookOpen },
  { id: "assessments", label: "Assessments", icon: ClipboardList },
  { id: "lesson-plans", label: "Lesson Plans", icon: BookMarked },
  { id: "reports", label: "Reports", icon: FileText },
];

const Sidebar = ({ activeMenu, onMenuChange, role = "student" }: SidebarProps) => {
  const filteredMenuItems = role === "teacher" 
    ? menuItems 
    : menuItems.filter(item => item.id !== "lesson-plans");

  return (
    <aside className="hidden md:flex bg-card border-r border-border flex-col h-full w-20">
      <nav className="flex-1 px-2 py-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={cn(
                "w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium text-center leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
