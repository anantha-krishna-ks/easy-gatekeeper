import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SubjectCard from "@/components/SubjectCard";
import BookReader from "@/components/BookReader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Activity, Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import scienceImg from "@/assets/science-subject.png";
import mathImg from "@/assets/mathematics-subject.png";
import englishImg from "@/assets/english-subject.png";
import hindiImg from "@/assets/hindi-subject.png";

const classes = [
  { id: "class-1", name: "Class 1" },
  { id: "class-2", name: "Class 2" },
  { id: "class-3", name: "Class 3" },
  { id: "class-4", name: "Class 4" },
];

const subjects = [
  { id: "english", title: "English", image: englishImg, color: "bg-green-500" },
  { id: "mathematics", title: "Mathematics", image: mathImg, color: "bg-purple-500" },
  { id: "science", title: "Science", image: scienceImg, color: "bg-blue-500" },
  { id: "hindi", title: "Hindi", image: hindiImg, color: "bg-orange-500" },
];

const assessmentClasses = [
  { id: "class-1", name: "Class 1" },
  { id: "class-2", name: "Class 2" },
  { id: "class-3", name: "Class 3" },
  { id: "class-4", name: "Class 4" },
];

const activities = [
  { id: 1, name: "Activity on Prepositions" },
  { id: 2, name: "Activity on Verbs" },
  { id: 3, name: "Activity on Adjectives" },
  { id: 4, name: "Activity on Nouns" },
  { id: 5, name: "Activity on Sentence Formation" },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("class-1");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [assessmentClass, setAssessmentClass] = useState("class-1");
  const [assessmentSubject, setAssessmentSubject] = useState("english");
  const [lessonPlanDialog, setLessonPlanDialog] = useState(false);
  const [selectedLessonPlan, setSelectedLessonPlan] = useState<{ subject: string; number: string } | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "teacher") {
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
      <Header onLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} role="teacher" />

        <main className="flex-1 overflow-y-auto">
          {activeMenu === "dashboard" && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Welcome Back, Teacher
                </h2>
                <p className="text-muted-foreground">
                  Select a class and subject to begin your teaching session
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Reports</h2>
              <p className="text-muted-foreground">
                View and generate reports for student performance and class analytics.
              </p>
            </div>
          )}

          {activeMenu === "assessments" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Assessments
              </h2>

              {/* Dropdowns */}
              <div className="flex gap-4 mb-8">
                <div className="w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
                  </label>
                  <Select value={assessmentClass} onValueChange={setAssessmentClass}>
                    <SelectTrigger className="bg-white dark:bg-white text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      {assessmentClasses.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={assessmentSubject} onValueChange={setAssessmentSubject}>
                    <SelectTrigger className="bg-white dark:bg-white text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Work Sheets</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Available resources</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Activities</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activities.length}</div>
                    <p className="text-xs text-muted-foreground">Interactive exercises</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{12 + activities.length}</div>
                    <p className="text-xs text-muted-foreground">Total resources</p>
                  </CardContent>
                </Card>
              </div>

              {/* Activities List */}
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                      >
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{activity.name}</span>
                        <Button size="sm" variant="outline" className="shadow-sm hover:shadow transition-shadow">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeMenu === "lesson-plans" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Lesson Plans
              </h2>

              {/* Dropdowns */}
              <div className="flex gap-4 mb-8">
                <div className="w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Class
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

                <div className="w-48">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Select value={assessmentSubject} onValueChange={setAssessmentSubject}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Total Lesson Plans Widget */}
              <Card className="mb-8 max-w-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Lesson Plans</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">Available for {classes.find((c) => c.id === selectedClass)?.name}</p>
                </CardContent>
              </Card>

              {/* Lesson Plans List */}
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subjects.map((subject) => (
                      <>
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={`${subject.id}-${num}`}
                            className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-background via-background to-muted/20 border border-border shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                          >
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {subject.title} - Lesson Plan 1.{num}
                            </span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="shadow-sm hover:shadow transition-shadow"
                              onClick={() => {
                                setSelectedLessonPlan({ subject: subject.title, number: `1.${num}` });
                                setLessonPlanDialog(true);
                              }}
                            >
                              Preview
                            </Button>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Lesson Plan Preview Dialog */}
      <Dialog open={lessonPlanDialog} onOpenChange={setLessonPlanDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedLessonPlan?.subject} - Lesson Plan {selectedLessonPlan?.number}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Objective</h3>
              <p className="text-muted-foreground">
                Students will be able to understand and apply key concepts related to {selectedLessonPlan?.subject}.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Duration</h3>
              <p className="text-muted-foreground">45 minutes</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Materials Needed</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Textbook</li>
                <li>Worksheets</li>
                <li>Whiteboard and markers</li>
                <li>Interactive activities</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Lesson Flow</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Introduction (10 minutes)</h4>
                  <p className="text-muted-foreground">
                    Begin with a warm-up activity to engage students and introduce the topic.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Main Activity (25 minutes)</h4>
                  <p className="text-muted-foreground">
                    Interactive lesson with examples, guided practice, and student participation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Conclusion (10 minutes)</h4>
                  <p className="text-muted-foreground">
                    Review key concepts, answer questions, and assign homework.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Assessment</h3>
              <p className="text-muted-foreground">
                Monitor student participation and understanding through questioning and observation.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
