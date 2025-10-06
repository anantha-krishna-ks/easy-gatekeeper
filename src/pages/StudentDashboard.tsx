import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubjectCard from "@/components/SubjectCard";
import scienceImg from "@/assets/science-subject.png";
import mathImg from "@/assets/mathematics-subject.png";
import englishImg from "@/assets/english-subject.png";
import hindiImg from "@/assets/hindi-subject.png";

const subjects = [
  { id: "science", title: "Science", image: scienceImg, color: "bg-blue-500" },
  { id: "mathematics", title: "Mathematics", image: mathImg, color: "bg-purple-500" },
  { id: "english", title: "English", image: englishImg, color: "bg-green-500" },
  { id: "hindi", title: "Hindi", image: hindiImg, color: "bg-orange-500" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
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

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} role="student" />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} role="student" />

        <main className="flex-1 overflow-y-auto">
          {activeMenu === "dashboard" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back, Student
                </h2>
                <p className="text-muted-foreground">
                  Select a subject to start learning
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Your Subjects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      title={subject.title}
                      image={subject.image}
                      color={subject.color}
                      onClick={() => handleSubjectClick(subject.id)}
                    />
                  ))}
                </div>
              </div>

              {selectedSubject && (
                <div className="mt-8 p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {subjects.find((s) => s.id === selectedSubject)?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    Content for {subjects.find((s) => s.id === selectedSubject)?.title} will be displayed here.
                  </p>
                </div>
              )}
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
