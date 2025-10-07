import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubjectCard from "@/components/SubjectCard";
import { Card, CardContent } from "@/components/ui/card";
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
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
              {/* Animated background orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
              </div>

              <div className="relative z-10 container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in">
                  <div className="inline-block mb-6">
                    <div className="relative">
                      <img 
                        src={comingSoonImg} 
                        alt="Coming Soon" 
                        className="w-56 h-56 md:w-72 md:h-72 object-contain animate-float drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-2xl"></div>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    Progress Reports
                  </h1>
                  
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-lg font-semibold text-primary">Coming Soon</span>
                  </div>
                  
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
                    Get ready for comprehensive insights into your learning journey with beautiful visualizations and personalized analytics
                  </p>
                </div>

                {/* Feature Preview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in group hover:shadow-xl hover:scale-105" style={{ animationDelay: "0.8s" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Performance Tracking</h3>
                      <p className="text-muted-foreground">Monitor your scores, completion rates, and progress across all subjects</p>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-2 hover:border-secondary/50 transition-all duration-300 animate-fade-in group hover:shadow-xl hover:scale-105" style={{ animationDelay: "1s" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Layers className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Visual Analytics</h3>
                      <p className="text-muted-foreground">Beautiful charts and graphs to visualize your learning patterns</p>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 animate-fade-in group hover:shadow-xl hover:scale-105" style={{ animationDelay: "1.2s" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Personalized Insights</h3>
                      <p className="text-muted-foreground">Get tailored recommendations to improve your learning experience</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Coming Soon Timeline */}
                <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "1.4s" }}>
                  <div className="inline-block px-8 py-4 bg-card border-2 border-border rounded-2xl shadow-lg">
                    <p className="text-sm text-muted-foreground mb-2">Expected Launch</p>
                    <p className="text-2xl font-bold text-primary">Stay Tuned!</p>
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
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Available Assessments
                </h3>
                <div className="space-y-3">
                  {studentActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {activity.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Available Resources
                </h3>
                <div className="space-y-3">
                  {studentResources.map((resource) => {
                    const IconComponent = resource.icon;
                    return (
                      <Card key={resource.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {resource.name}
                              </p>
                              <p className="text-sm text-muted-foreground capitalize">
                                {resource.type}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
