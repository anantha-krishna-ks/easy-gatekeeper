import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BookReader from "@/components/BookReader";

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
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");

  const subject = subjects.find((s) => s.id === subjectId);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "teacher" || role === "student") {
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleMenuChange = (menu: string) => {
    if (menu === "profile") {
      navigate("/profile-settings");
    } else if (menu === "dashboard") {
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      } else if (userRole === "parent") {
        navigate("/parent-dashboard");
      }
    } else if (menu === "learning-resources") {
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      }
    } else if (menu === "assessments") {
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      }
    } else if (menu === "reports") {
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      }
    }
  };

  if (!subject) {
    navigate(-1);
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onLogout={handleLogout} role={userRole} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar activeMenu={activeMenu} onMenuChange={handleMenuChange} role={userRole} />

        {/* Main Content */}
        <BookReader subject={subject.title} showNavigation={false} />
      </div>
    </div>
  );
};

export default BookReaderPage;
