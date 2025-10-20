import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BreadcrumbProps {
  subject: string;
  userRole: "student" | "teacher";
}

const Breadcrumb = ({ subject, userRole }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (userRole === "student") {
      navigate("/student-dashboard");
    } else if (userRole === "teacher") {
      navigate("/teacher-dashboard");
    }
  };

  return (
    <nav className="back-navigation">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDashboardClick}
          className="h-8 px-2 hover:bg-muted"
        >
          <Home className="h-4 w-4 mr-1" />
          Dashboard
        </Button>
        <ChevronRight className="h-4 w-4" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDashboardClick}
          className="h-8 px-2 hover:bg-muted"
        >
          Learning Resources
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{subject}</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;
