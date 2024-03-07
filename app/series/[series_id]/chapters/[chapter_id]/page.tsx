import { getChapterPages } from "@/components/actions/getPages";
import { ChapterPages } from "./chapterPages";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";

export default async function Page({
  params,
}: {
  params: { chapter_id: string };
}) {
  try {
    const { chapter_id } = params;
    const pages = await getChapterPages(chapter_id);

    const imagesPromises = pages.map(async (page) => {
      const imageRef = ref(storage, page.url);
      const imageUrl = await getDownloadURL(imageRef);
      return { ...page, imageUrl };
    });

    const images = await Promise.all(imagesPromises);
    return <ChapterPages pages={images} />;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
