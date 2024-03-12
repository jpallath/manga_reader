import { getChapterPages } from "@/components/actions/getPages";
import { ChapterPages } from "./chapterPages";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
import { getSeriesByChapterId } from "@/db/chapters";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default async function Page({
  params,
}: {
  params: { chapter_id: string };
}) {
  try {
    const { chapter_id } = params;
    const chapterData = await getSeriesByChapterId(chapter_id);
    const seriesName = chapterData?.series?.name || "";
    const seriesId = chapterData?.series?.id;
    const chapterNumber = chapterData?.chapter || "";
    const crumbs = [
      { text: seriesName, link: `/series/${seriesId}` },
      {
        text: `Chapter ${chapterNumber}`,
        link: `/series/${seriesId}/chapter/${chapterData?.id}`,
      },
    ];
    const pages = await getChapterPages(chapter_id);
    const imagesPromises = pages.map(async (page) => {
      const imageRef = ref(storage, page.url);
      const imageUrl = await getDownloadURL(imageRef);
      return { ...page, imageUrl };
    });

    const images = await Promise.all(imagesPromises);
    return (
      <div>
        <Breadcrumbs crumbs={crumbs} />
        <ChapterPages pages={images} />
      </div>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}
