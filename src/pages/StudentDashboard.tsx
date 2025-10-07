import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubjectCard from "@/components/SubjectCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, FileText, Layers, Download } from "lucide-react";
import scienceImg from "@/assets/science-subject.png";
import mathImg from "@/assets/mathematics-subject.png";
import englishImg from "@/assets/english-subject.png";
import hindiImg from "@/assets/hindi-subject.png";
import comingSoonImg from "@/assets/coming-soon.png";

const subjects = [
  { id: "science", title: "Science", image: scienceImg, color: "bg-blue-500" },
  { id: "mathematics", title: "Mathematics", image: mathImg, color: "bg-purple-500" },
  { id: "english", title: "English", image: englishImg, color: "bg-green-500" },
  { id: "hindi", title: "Hindi", image: hindiImg, color: "bg-orange-500" },
];

const studentClasses = [
  { value: "grade1", label: "Grade 1" },
  { value: "grade2", label: "Grade 2" },
  { value: "grade3", label: "Grade 3" },
  { value: "grade4", label: "Grade 4" },
];

const studentSubjects = [
  { value: "english", label: "English" },
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "hindi", label: "Hindi" },
];

const studentChapters = [
  { value: "chapter1", label: "Chapter 1: Introduction" },
  { value: "chapter2", label: "Chapter 2: Basics" },
  { value: "chapter3", label: "Chapter 3: Advanced" },
];

const studentResources = [
  { id: "1", name: "Introduction to Numbers", type: "video", icon: Video },
  { id: "2", name: "Basic Arithmetic Worksheet", type: "pdf", icon: FileText },
  { id: "3", name: "Math Games", type: "interactive", icon: Layers },
  { id: "4", name: "Science Experiments", type: "video", icon: Video },
  { id: "5", name: "English Grammar Guide", type: "pdf", icon: FileText },
  { id: "6", name: "Language Practice", type: "interactive", icon: Layers },
];

const studentActivities = [
  { id: "1", name: "Math Quiz - Addition & Subtraction", type: "Worksheet" },
  { id: "2", name: "Science Lab Activity", type: "Activity" },
  { id: "3", name: "English Comprehension Test", type: "Worksheet" },
  { id: "4", name: "Creative Writing Exercise", type: "Activity" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [resourceClass, setResourceClass] = useState("grade1");
  const [resourceSubject, setResourceSubject] = useState("english");
  const [resourceChapter, setResourceChapter] = useState("chapter1");
  const [assessmentClass, setAssessmentClass] = useState("grade1");
  const [assessmentSubject, setAssessmentSubject] = useState("english");

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
              <div className="flex flex-col items-center justify-center min-h-[70vh]">
                {/* Animated background gradient */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center space-y-8 animate-fade-in">
                  {/* Image with floating animation */}
                  <div className="relative">
                    <img 
                      src={comingSoonImg} 
                      alt="Coming Soon" 
                      className="w-48 h-48 md:w-64 md:h-64 object-contain animate-scale-in"
                      style={{ animation: "scale-in 0.6s ease-out, float 3s ease-in-out infinite" }}
                    />
                  </div>

                  {/* Text content */}
                  <div className="text-center space-y-4 max-w-lg px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      Progress Reports
                    </h2>
                    <div className="space-y-2">
                      <p className="text-xl md:text-2xl font-semibold text-primary animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        Coming Soon
                      </p>
                      <p className="text-base md:text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        Track your learning journey with detailed insights and personalized progress analytics
                      </p>
                    </div>
                  </div>

                  {/* Animated dots */}
                  <div className="flex gap-2 mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "assessments" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Assessments
              </h2>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
                  </label>
                  <Select value={assessmentClass} onValueChange={setAssessmentClass}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 z-50">
                      {studentClasses.map((cls) => (
                        <SelectItem key={cls.value} value={cls.value}>
                          {cls.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={assessmentSubject} onValueChange={setAssessmentSubject}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 z-50">
                      {studentSubjects.map((subj) => (
                        <SelectItem key={subj.value} value={subj.value}>
                          {subj.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Count Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">8</p>
                        <p className="text-sm text-muted-foreground">Worksheets</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Layers className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">5</p>
                        <p className="text-sm text-muted-foreground">Activities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activities List */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base block">
                              {activity.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {activity.type}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="shadow-sm hover:shadow transition-shadow w-full sm:w-auto"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeMenu === "learning-resources" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Learning Resources
              </h2>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
                  </label>
                  <Select value={resourceClass} onValueChange={setResourceClass}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 z-50">
                      {studentClasses.map((cls) => (
                        <SelectItem key={cls.value} value={cls.value}>
                          {cls.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={resourceSubject} onValueChange={setResourceSubject}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 z-50">
                      {studentSubjects.map((subj) => (
                        <SelectItem key={subj.value} value={subj.value}>
                          {subj.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Chapter
                  </label>
                  <Select value={resourceChapter} onValueChange={setResourceChapter}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 z-50">
                      {studentChapters.map((chap) => (
                        <SelectItem key={chap.value} value={chap.value}>
                          {chap.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Count Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-sm text-muted-foreground">Videos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">8</p>
                        <p className="text-sm text-muted-foreground">PDFs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Layers className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">6</p>
                        <p className="text-sm text-muted-foreground">Interactivities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Layers className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">26</p>
                        <p className="text-sm text-muted-foreground">Total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Resources List */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                  {studentResources.map((resource) => {
                    const IconComponent = resource.icon;
                    return (
                      <div
                        key={resource.id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                            {resource.name}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="shadow-sm hover:shadow transition-shadow w-full sm:w-auto"
                        >
                          Preview
                        </Button>
                      </div>
                    );
                  })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
