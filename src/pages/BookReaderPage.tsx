import { useNavigate, useSearchParams } from "react-router-dom";
import BookReader from "@/components/BookReader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const subjects = [
  { id: "english", title: "English" },
  { id: "mathematics", title: "Mathematics" },
  { id: "science", title: "Science" },
  { id: "hindi", title: "Hindi" },
];

const BookReaderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject");
  const userRole = localStorage.getItem("userRole") as "student" | "teacher" | null;

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    navigate(-1);
    return null;
  }

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else if (menu === "dashboard") {
      if (userRole === "teacher") navigate("/teacher-dashboard");
      else if (userRole === "student") navigate("/student-dashboard");
      else navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header onLogout={handleLogout} role={userRole || "student"} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeMenu="learning-resources"
          onMenuChange={handleMenuChange}
          role={userRole === "teacher" ? "teacher" : "student"}
        />
        <div className="flex-1 flex flex-col">
          <BookReader
            subject={subject.title}
            onClose={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookReaderPage;
