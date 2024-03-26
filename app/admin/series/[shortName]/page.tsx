import { getSeriesDataByShortName } from "@/components/actions/series";
import Link from "next/link";
import { storage } from "@/lib/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { SeriesHeaderWithFileUpload } from "./seriesHeader";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-6">
      <SeriesHeaderWithFileUpload
        image={image}
        name={seriesData?.name}
        id={seriesData?.id}
      />
      <div>
        <h3 className="text-text font-bold text-center pb-2">Chapters</h3>
        {seriesData?.Chapter.map((chapter, index) => {
          return (
            <ChapterButton
              key={index}
              seriesTitle={seriesData?.name}
              chapter={chapter}
            />
          );
        })}
      </div>
    </div>
  );
}

interface Chapter {
  id: string;
  series_id: string;
  chapter: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ChapterButtonProps {
  seriesTitle: string | undefined;
  chapter: Chapter;
}

export const ChapterButton: React.FC<ChapterButtonProps> = ({
  seriesTitle,
  chapter,
}) => {
  return (
    <div className="flex gap-2 h-fit">
      <h3 className="text-text bg-primary rounded-lg p-2.5 flex items-center justify-center border-secondary border-2">
        {seriesTitle} - {chapter.chapter}: {chapter.title}
      </h3>
      <div className="flex flex-col gap-2">
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
};
