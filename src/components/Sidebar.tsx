import { FileText, ClipboardList, BookOpen, LayoutDashboard, BookMarked } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    <aside className="hidden md:flex bg-card border-r border-border flex-col h-full w-16">
      <TooltipProvider delayDuration={0}>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onMenuChange(item.id)}
                    className={cn(
                      "w-full flex items-center justify-center p-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
