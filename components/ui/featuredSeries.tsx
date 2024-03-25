import Link from "next/link";
import { getAllSeries } from "@/db/series";
import { storage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export const FeaturedSeries = async () => {
  const series = await getAllSeries();
  const imagesPromises = series.map(async (sery) => {
    if (sery.imageUrl) {
      try {
        const imageRef = ref(storage, sery.imageUrl);
        const imageUrl = await getDownloadURL(imageRef);
        return { ...sery, image: imageUrl };
      } catch (error) {
        console.log(error);
      }
    }
    return {
      ...sery,
      image: "https://www.mydavinci.com/slide/rp1203-m/500/203877/large.jpg",
    };
  });
  const images = await Promise.all(imagesPromises);
  return (
    <div className="px-8 md:height-[30rem] md:overflow-y-hidden">
      <div className="carousel rounded-box h-full">
        {images.map((sery) => {
          return (
            <div
              key={sery.id}
              className="carousel-item basis-1/2 md:basis-[24.33%] xl:basis-[22%] xl:px-[1.5rem] 2xl:basis-[10%] 2xl:px-[6rem] group relative"
            >
              <Link href={`series/${sery.shortName}`} className="relative">
                <picture className="w-full h-full flex items-center justify-center rounded-xl">
                  <img
                    alt={sery.name}
                    className="w-auto h-5/6 rounded-xl"
                    src={sery.image}
                  />
                </picture>
                <h3 className="text-text absolute bottom-8 bg-primary w-full text-center rounded-xl">
                  {sery.name}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
