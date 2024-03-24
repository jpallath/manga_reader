import { getRecentChapters } from "../actions/chapters";
import Link from "next/link";

export const RecentChapters = async () => {
  const chapters = await getRecentChapters();
  return (
    <div className="flex items-center justify-center w-[100dvw]">
      <div className="border-t border-t-primary w-11/12 h-[400px] overflow-hidden ">
        <h3 className="text-text font-bold text-center pb-6">
          Recent Chapters
        </h3>
        <ul className="text-white w-full h-full overflow-y-scroll flex flex-col items-center">
          <ChaptersList chapters={chapters} />
        </ul>
      </div>
    </div>
  );
};

interface ChaptersListProps {
  chapters: any[];
}

export const ChaptersList: React.FC<ChaptersListProps> = ({ chapters }) => {
  return (
    <div className="flex flex-col gap-6 bg-transparent w-full pb-16">
      {chapters.map((chapter, index) => {
        return (
          <Link
            href={`series/${chapter.series.shortName}/chapters/${chapter.chapter}`}
            key={index}
            className="text-text bg-primary rounded-lg h-fit p-2.5"
          >
            {chapter.series.name} - {chapter.chapter} / {chapter.title}
          </Link>
        );
      })}
    </div>
  );
};
