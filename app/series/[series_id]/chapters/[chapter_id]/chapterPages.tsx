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
    <div className="p-5 md:p-0 md:flex md:items-center md:justify-center">
      <div className="carousel rounded-box w-128 md:w-6/12">
        {pages.map((image, index) => {
          return (
            <div key={index} className="carousel-item w-full">
              <div className="">
                <picture>
                  <img src={image.imageUrl} alt={`Image ${index + 1}`} />
                </picture>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
