import { PreviewWindow } from "@/components/ui/previewWindow";

type Page = {
  id: string;
  url: string;
  chapter_id: string;
  pageNumber: number;
  nextPageId: string | null;
  imageUrl: string;
};

type ChapterPagesProps = {
  pages: Page[];
};
export const NewAndImprovedChapterPage: React.FC<ChapterPagesProps> = ({
  pages,
}) => {
  return (
    <div className="p-5 flex-col items-center justify-center relative">
      <div className="carousel carousel-start rounded-box overflow-y-hidden w-[22rem] md:w-[30rem]">
        {pages.map((image, index) => {
          return (
            <div
              key={index}
              id={`item${index}`}
              className={`carousel-item w-full`}
            >
              <PreviewWindow src={image.imageUrl} width={"100%"} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between w-full py-6 px-6 gap-2">
        {pages.map((image, index) => {
          if (index == 0 || index == pages.length - 1) {
            return (
              <a
                key={index}
                href={`#item${index}`}
                className="bg-secondary text-text w-8 p-1 text-xs flex justify-center rounded-xl"
              >
                {index + 1}
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export const ChapterPages: React.FC<ChapterPagesProps> = ({ pages }) => {
  return (
    <div className="w-full h-full bg-bavkground flex justify-center items-center">
      <div className="carousel carousel-start">
        {pages.map((image, index) => {
          return (
            <div key={index} id={`item${index}`} className={`carousel-item`}>
              <PreviewWindow src={image.imageUrl} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
