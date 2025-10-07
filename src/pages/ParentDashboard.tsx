import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Layers, BarChart3, User, LogOut, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock wards data
const wards = [
  { id: "1", name: "Rahul Kumar", class: "Grade 3", section: "A" },
  { id: "2", name: "Priya Kumar", class: "Grade 1", section: "B" },
];

// Resource tiles that link to student views
const resourceTiles = [
  { 
    id: "ebook", 
    label: "eBook", 
    icon: BookOpen, 
    color: "from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 border-blue-500/30",
    iconColor: "text-blue-600"
  },
  { 
    id: "learning-resources", 
    label: "Learning Resources", 
    icon: Layers, 
    color: "from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 border-green-500/30",
    iconColor: "text-green-600"
  },
  { 
    id: "assessments", 
    label: "Assessments", 
    icon: FileText, 
    color: "from-purple-500/10 to-purple-600/20 hover:from-purple-500/20 hover:to-purple-600/30 border-purple-500/30",
    iconColor: "text-purple-600"
  },
  { 
    id: "reports", 
    label: "Reports", 
    icon: BarChart3, 
    color: "from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 border-orange-500/30",
    iconColor: "text-orange-600"
  },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedWard, setSelectedWard] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "parent") {
      navigate("/parent-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/parent-login");
  };

  const handleResourceClick = (resourceId: string) => {
    // Store selected ward info for the student dashboard
    const ward = wards.find(w => w.id === selectedWard);
    if (ward) {
      localStorage.setItem("parentViewingWard", JSON.stringify(ward));
      localStorage.setItem("parentViewingResource", resourceId);
    }
    
    // Navigate to student dashboard with the resource pre-selected
    navigate(`/student-dashboard?view=${resourceId}&parent=true`);
  };

  const handleBackToWards = () => {
    setSelectedWard(null);
    localStorage.removeItem("parentViewingWard");
    localStorage.removeItem("parentViewingResource");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Parent Portal</h1>
              <p className="text-xs text-muted-foreground">Monitor your ward's progress</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {!selectedWard ? (
          // Ward Selection View
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Select Your Ward
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose a student to view their academic information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wards.map((ward) => (
                <Card
                  key={ward.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] border-2 hover:border-primary/50"
                  onClick={() => setSelectedWard(ward.id)}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {ward.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {ward.class}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm font-medium text-muted-foreground">
                            Section {ward.section}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWard(ward.id);
                        }}
                      >
                        View Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Resource Selection View
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToWards}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Wards
              </Button>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {wards.find((w) => w.id === selectedWard)?.name}
              </h2>
              <p className="text-muted-foreground text-lg">
                {wards.find((w) => w.id === selectedWard)?.class} • Section{" "}
                {wards.find((w) => w.id === selectedWard)?.section}
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="text-lg font-medium text-foreground mb-2">
                Select a Resource
              </p>
              <p className="text-muted-foreground">
                Access your ward's learning materials and progress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resourceTiles.map((resource) => {
                const Icon = resource.icon;
                return (
                  <Card
                    key={resource.id}
                    className={cn(
                      "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.03] border-2",
                      "bg-gradient-to-br",
                      resource.color
                    )}
                    onClick={() => handleResourceClick(resource.id)}
                  >
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
                      <div className="p-6 bg-background/80 backdrop-blur-sm rounded-full shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className={cn("h-12 w-12", resource.iconColor)} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {resource.label}
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        {resource.id === "ebook" && "Browse and read digital textbooks"}
                        {resource.id === "learning-resources" && "Access study materials and resources"}
                        {resource.id === "assessments" && "View assigned tests and worksheets"}
                        {resource.id === "reports" && "Track academic performance and progress"}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ParentDashboard;
