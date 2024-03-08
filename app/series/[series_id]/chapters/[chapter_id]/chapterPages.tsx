import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <Carousel className="">
        <CarouselNext />
        <CarouselContent>
          {pages.map((image, index) => {
            return (
              <CarouselItem key={index} className="">
                <div className="">
                  <picture>
                    <img src={image.imageUrl} alt={`Image ${index + 1}`} />
                  </picture>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};
