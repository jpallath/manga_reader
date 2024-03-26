import { getSeriesDataByShortName } from "@/components/actions/series";
import Link from "next/link";
import { storage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { SeriesHeaderWithFileUpload } from "./seriesHeader";
import { ChapterButton } from "./chapterbutton";
import { AdminServicesAndChapters } from "./adminServicesAndChapters";

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
    <div className="flex flex-col gap-6 items-center relative">
      <SeriesHeaderWithFileUpload
        image={image}
        name={seriesData?.name}
        id={seriesData?.id}
      />
      <div>
        <h3 className="text-text font-bold text-center pb-2">Chapters</h3>
        <AdminServicesAndChapters
          chapters={seriesData?.Chapter}
          seriesTitle={seriesData?.name}
        />
      </div>
    </div>
  );
}
