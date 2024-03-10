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
    <div className="p-5">
      <div className="">
        {/* <CarouselNext /> */}
        <div>
          {pages.map((image, index) => {
            return (
              <div key={index} className="">
                <div className="">
                  <picture>
                    <img src={image.imageUrl} alt={`Image ${index + 1}`} />
                  </picture>
                </div>
              </div>
            );
          })}
        </div>
        {/* <CarouselPrevious /> */}
      </div>
    </div>
  );
};
