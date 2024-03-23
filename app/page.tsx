import { getAllSeries } from "@/db/series";
import Link from "next/link";

import { storage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { RecentChapters } from "@/components/ui/recentChapters";

export default async function Home() {
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
    <div>
      <div className="px-8 md:height-[30rem] md:overflow-y-hidden">
        <div className="carousel rounded-box h-full">
          {images.map((sery) => {
            return (
              <div
                key={sery.id}
                className="carousel-item basis-1/2 md:basis-[24.33%] group relative"
              >
                <Link href={`series/${sery.shortName}`} className="relative">
                  <picture className="w-full h-full flex items-center justify-center">
                    <img className="w-auto h-5/6" src={sery.image} />
                  </picture>
                  <h3 className="text-primary absolute bottom-8 bg-background w-full text-center rounded-xl">
                    {sery.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <RecentChapters />
    </div>
  );
}
