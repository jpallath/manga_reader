import { Button } from "@/components/ui/button";
import { Chapter } from "./adminServicesAndChapters";

interface ChapterButtonProps {
  seriesTitle: string | undefined;
  chapter: Chapter;
  selectCard: (value: string, action: string) => void;
}

export const ChapterButton: React.FC<ChapterButtonProps> = ({
  seriesTitle,
  chapter,
  selectCard,
}) => {
  const handleEditClick = () => {
    selectCard(chapter.id, "edit");
  };
  const handleDeleteClick = () => {
    selectCard(chapter.id, "delete");
  };
  return (
    <div className="flex gap-2 h-fit">
      <h3 className="text-text bg-primary rounded-lg p-2.5 flex items-center justify-center border-secondary border-2">
        {seriesTitle} - {chapter.chapter}: {chapter.title}
      </h3>
      <div className="flex flex-col gap-2">
        <Button variant="primary" onClick={handleEditClick}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
    </div>
  );
};
