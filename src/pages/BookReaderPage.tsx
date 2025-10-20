import { useNavigate, useSearchParams } from "react-router-dom";
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

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    navigate(-1);
    return null;
  }

  return (
    <BookReader
      subject={subject.title}
      onClose={() => navigate(-1)}
    />
  );
};

export default BookReaderPage;
