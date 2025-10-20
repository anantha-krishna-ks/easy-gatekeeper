import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  title: string;
  image: string;
  color: string;
  onClick: () => void;
}

const SubjectCard = ({ title, image, color, onClick }: SubjectCardProps) => {
  return (
    <Card onClick={onClick} className="subject-card">
      <CardContent className="subject-card-content">
        <div className={cn("subject-card-icon-wrapper", color)}>
          <img 
            src={image} 
            alt={title}
            className="subject-card-icon"
          />
        </div>
        <h3 className="subject-card-title">{title}</h3>
        <p className="subject-card-subtitle">Click to open</p>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
