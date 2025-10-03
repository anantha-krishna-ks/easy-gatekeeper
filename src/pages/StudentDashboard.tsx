import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubjectCard from "@/components/SubjectCard";
import BookReader from "@/components/BookReader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import scienceImg from "@/assets/science-subject.png";
import mathImg from "@/assets/mathematics-subject.png";
import englishImg from "@/assets/english-subject.png";
import hindiImg from "@/assets/hindi-subject.png";

const classes = [
  { id: "class-6", name: "Class 6" },
  { id: "class-7", name: "Class 7" },
  { id: "class-8", name: "Class 8" },
  { id: "class-9", name: "Class 9" },
  { id: "class-10", name: "Class 10" },
];

const subjects = [
  { id: "science", title: "Science", image: scienceImg, color: "bg-blue-500" },
  { id: "mathematics", title: "Mathematics", image: mathImg, color: "bg-purple-500" },
  { id: "english", title: "English", image: englishImg, color: "bg-green-500" },
  { id: "hindi", title: "Hindi", image: hindiImg, color: "bg-orange-500" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("class-6");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "student") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  if (selectedSubject) {
    const subject = subjects.find((s) => s.id === selectedSubject);
    return (
      <BookReader
        subject={subject?.title || ""}
        onClose={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} role="student" />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        <main className="flex-1 overflow-y-auto">
          {activeMenu === "dashboard" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back, Student
                </h2>
                <p className="text-muted-foreground">
                  Select your class and subject to start learning
                </p>
              </div>

              <div className="mb-8 max-w-sm">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Subjects for {classes.find((c) => c.id === selectedClass)?.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      title={subject.title}
                      image={subject.image}
                      color={subject.color}
                      onClick={() => setSelectedSubject(subject.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "reports" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">My Progress</h2>
              <p className="text-muted-foreground">
                View your learning progress and performance reports.
              </p>
            </div>
          )}

          {activeMenu === "assessments" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Assessments
              </h2>
              <p className="text-muted-foreground">
                Take tests and view your assessment results.
              </p>
            </div>
          )}

          {activeMenu === "learning-resources" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Learning Resources
              </h2>
              <p className="text-muted-foreground">
                Access study materials and learning resources.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
