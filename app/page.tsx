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
      <div>
        <div className="carousel rounded-box p-4">
          {images.map((sery) => {
            return (
              <div
                key={sery.id}
                className="carousel-item basis-1/2 group relative"
              >
                <Link href={`series/${sery.shortName}`}>
                  <picture className="w-full h-full flex items-center justify-center ">
                    <img className="w-auto h-5/6" src={sery.image} />
                  </picture>
                </Link>
                <h3 className="group-hover:opacity-1 text-background opacity-0 absolute bottom-2">
                  {sery.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
      <RecentChapters />
    </div>
  );
}
