import { Button } from "@/components/ui/button";
interface Chapter {
  id: string;
  series_id: string;
  chapter: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ChapterButtonProps {
  seriesTitle: string | undefined;
  chapter: Chapter;
}

export const ChapterButton: React.FC<ChapterButtonProps> = ({
  seriesTitle,
  chapter,
}) => {
  return (
    <div className="flex gap-2 h-fit">
      <h3 className="text-text bg-primary rounded-lg p-2.5 flex items-center justify-center border-secondary border-2">
        {seriesTitle} - {chapter.chapter}: {chapter.title}
      </h3>
      <div className="flex flex-col gap-2">
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
};
