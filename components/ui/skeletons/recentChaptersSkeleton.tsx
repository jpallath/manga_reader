export const RecentChaptersSkeleton = async () => {
  return (
    <div className="flex items-center justify-center w-[100dvw]">
      <div className="border-t border-t-primary w-11/12 h-[400px] overflow-hidden ">
        <h3 className="text-text font-bold text-center pb-6">
          Recent Chapters
        </h3>
        <ul className="text-white w-full h-full overflow-y-scroll flex flex-col items-center">
          <ChaptersListSkeleton />
        </ul>
      </div>
    </div>
  );
};

interface ChaptersListProps {
  chapters: any[];
}

export const ChaptersListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 bg-transparent w-full pb-16">
      <div className="text-text bg-primary rounded-lg h-8 p-2.5"></div>
      <div className="text-text bg-primary rounded-lg h-8 p-2.5"></div>
      <div className="text-text bg-primary rounded-lg h-8 p-2.5"></div>
      <div className="text-text bg-primary rounded-lg h-8 p-2.5"></div>
      <div className="text-text bg-primary rounded-lg h-8 p-2.5"></div>
    </div>
  );
};
