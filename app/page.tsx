import { Series, getAllSeries } from "@/db/series";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { storage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export default async function Home() {
  const series = await getAllSeries();
  const imagesPromises = series.map(async (sery) => {
    if (sery.imageUrl) {
      const imageRef = ref(storage, sery.imageUrl);
      const imageUrl = await getDownloadURL(imageRef);
      return { ...sery, image: imageUrl };
    }
    return {
      ...sery,
      image: "https://www.mydavinci.com/slide/rp1203-m/500/203877/large.jpg",
    };
  });
  const images = await Promise.all(imagesPromises);

  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <Carousel className="flex items-center justify-center">
        <CarouselNext />
        <CarouselContent>
          {images.map((sery) => {
            return (
              <CarouselItem
                key={sery.id}
                className="w-full h-full flex items-center justify-center basis-2/3"
              >
                <Link href={`series/${sery.id}`}>
                  <picture>
                    <img src={sery.image} />
                  </picture>
                  <h1>{sery.name}</h1>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}
