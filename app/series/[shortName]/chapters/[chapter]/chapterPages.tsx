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
export const ChapterPages: React.FC<ChapterPagesProps> = ({ pages }) => {
  return (
    <div className="p-5 md:p-0 md:flex flex-col md:items-center md:justify-center">
      <div className="carousel carousel-start rounded-box w-128 md:w-6/12">
        {pages.map((image, index) => {
          return (
            <div
              key={index}
              id={`item${index}`}
              className={`carousel-item w-full`}
            >
              <div>
                <picture>
                  <img src={image.imageUrl} alt={`Image ${index + 1}`} />
                </picture>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {pages.map((image, index) => {
          return (
            <a
              href={`#item${index}`}
              className="bg-accent text-text w-4 p-1 text-xs flex justify-center rounded-xl"
            >
              {index + 1}
            </a>
          );
        })}
      </div>
    </div>
  );
};
