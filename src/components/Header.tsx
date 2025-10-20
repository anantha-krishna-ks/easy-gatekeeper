import { BookOpen, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onLogout?: () => void;
  role?: "teacher" | "student";
}

const Header = ({ onLogout, role = "teacher" }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">
          <BookOpen className="header-logo-icon" />
        </div>
        <div>
          <h1 className="header-title">Ignite</h1>
          <p className="header-subtitle">{role === "teacher" ? "Teacher" : "Student"} Portal</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="header-user-trigger">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
            <AvatarFallback className="bg-primary text-primary-foreground">TC</AvatarFallback>
          </Avatar>
          <div className="header-user-info hidden md:block">
            <p className="header-user-name">Ms. Sarah Johnson</p>
            <p className="header-user-role">{role === "teacher" ? "Teacher" : "Class 6"}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted"
            onClick={() => navigate("/profile-settings")}
          >
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted text-destructive"
            onClick={onLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
export default Header;