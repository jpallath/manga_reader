"use server";
import { fetchOrGenerateChapter } from "@/db/chapters";
import { fetchOrGenerateSeries } from "@/db/series";
import fetch from "node-fetch";
import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { generateNewPage, updatePage } from "@/db/pages";
const cheerio = require("cheerio");

interface MangaData {
  title: string;
  chapter: number;
  images: string[];
}

export const fetchManga = async (link: string): Promise<MangaData> => {
  if (typeof link === "string") {
    try {
      const response = await fetch(link);
      const { title, chapter, images } = await parseManga(
        await response.text()
      );
      return { title, chapter, images };
    } catch (err) {
      console.error(err);
      return { title: "", chapter: 0, images: [] };
    }
  } else {
    return { title: "", chapter: 0, images: [] };
  }
};

export const saveManga = async (mangaData: MangaData) => {
  const series = await fetchOrGenerateSeries(mangaData.title);
  if (series) {
    const chapter = await fetchOrGenerateChapter({
      seriesId: series.id,
      chapter: mangaData.chapter,
      images: mangaData.images,
    });
    let lastImage = "";
    if (chapter) {
      let previousPage: string | null = null;
      const { images } = mangaData;
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        try {
          const response = await fetch(image);
          const arrayBuffer = await response.arrayBuffer();
          const fileBlob = new Blob([arrayBuffer], {
            type: "image/jpeg",
          });
          const imageRef = ref(
            storage,
            `${series.id}/chapter${mangaData.chapter}/p${index}`
          );
          const data = await uploadBytes(imageRef, fileBlob);
          const page = await generateNewPage({
            chapterId: chapter.id,
            page: index,
            url: data.metadata.fullPath,
          });
          if (page) {
            if (previousPage) {
              await updatePage(page.id, previousPage);
            }
          }
          previousPage = page.id;
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};

const parseManga = async (text: string) => {
  const $ = cheerio.load(text);
  const titleTag = $("title").text().split("|")[0];
  const title = titleTag.split(" Chapter ")[0].trim();
  const chapter = parseInt(titleTag.split(" Chapter ")[1]);
  const pictureTags = $("picture");
  const images = [];
  for (const pic of pictureTags) {
    const img = $(pic).find("img");
    const src = img.attr("src");
    images.push(src);
  }
  return { title, chapter, images };
};
