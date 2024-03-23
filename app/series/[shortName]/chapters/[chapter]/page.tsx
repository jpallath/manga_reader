import { getChapterPages } from "@/components/actions/getPages";
import { ChapterPages } from "./chapterPages";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
import {
  getSeriesByChapterId,
  getChapterByShortNameAndNumber,
} from "@/db/chapters";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default async function Page({
  params,
}: {
  params: { shortName: string; chapter: string };
}) {
  try {
    const { shortName, chapter } = params;
    const chapterData = await getChapterByShortNameAndNumber(
      shortName,
      chapter
    );
    const seriesName = chapterData?.series?.name || "";
    const chapterNumber = chapterData?.chapter || "";
    const crumbs = [
      { text: seriesName, link: `/series/${chapterData?.series.shortName}` },
      {
        text: `Chapter ${chapterNumber}`,
        link: `/series/${chapterData?.series.shortName}/chapter/${chapterData?.chapter}`,
      },
    ];
    if (chapterData) {
      const pages = await getChapterPages(chapterData.id);
      const imagesPromises = pages.map(async (page) => {
        const imageRef = ref(storage, page.url);
        const imageUrl = await getDownloadURL(imageRef);
        return { ...page, imageUrl };
      });

      const images = await Promise.all(imagesPromises);

      return (
        <div className="h-[100dvh] overflow-hidden place-content-center md:flex md:flex-row">
          <Breadcrumbs crumbs={crumbs} />
          <ChapterPages pages={images} />
        </div>
      );
    } else {
      return <></>;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
