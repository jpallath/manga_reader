import { getAllSeries } from "@/db/series";
import Link from "next/link";

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
    <div>
      <div>
        <div className="carousel rounded-box">
          {images.map((sery) => {
            return (
              <div key={sery.id} className="carousel-item basis-1/2">
                <Link href={`series/${sery.id}`}>
                  <picture className="w-full h-full flex items-center justify-center p-5">
                    <img className="w-auto h-full" src={sery.image} />
                  </picture>
                  <h1 className="text-text">{sery.name}</h1>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
