import { getSeriesDataByShortName } from "@/components/actions/series";
import Link from "next/link";
import { storage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { SeriesHeaderWithFileUpload } from "./seriesHeader";

export default async function AdminSeriesIndividualPage({
  params,
}: {
  params: { shortName: string };
}) {
  const { shortName } = params;
  const seriesData = await getSeriesDataByShortName(shortName);
  let image = "";
  if (seriesData?.imageUrl) {
    try {
      const imageRef = ref(storage, seriesData.imageUrl);
      const imageUrl = await getDownloadURL(imageRef);
      image = imageUrl;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {/* <div className="flex flex-row overflow-hidden w-50 items-end gap-2">
        <img className="max-w-[15rem]" src={image} />
        <div className="flex flex-col gap-2">
          <h3 className="text-text p-5 bg-primary w-full text-center rounded-xl">
            {seriesData?.name}
          </h3>
          <h3 className="text-text p-5 bg-primary w-full text-center rounded-xl">
            Update Image
          </h3>
        </div>
      </div>
      <div> */}
      <SeriesHeaderWithFileUpload
        image={image}
        name={seriesData?.name}
        id={seriesData?.id}
      />
      <h3 className="text-text font-bold text-center pb-6">Chapters</h3>
      {seriesData?.Chapter.map((chapter, index) => {
        return (
          <h3
            key={index}
            className="text-text bg-primary rounded-lg h-fit p-2.5"
          >
            {seriesData?.name} - {chapter.chapter}: {chapter.title}
          </h3>
        );
      })}
    </div>
  );
}
