"use server";
import fetch from "node-fetch";
const cheerio = require("cheerio");

interface MangaData {
  title: string;
  images: string[];
}

export const fetchManga = async (formData: FormData): Promise<MangaData> => {
  const link = formData.get("link");
  if (typeof link === "string") {
    try {
      const response = await fetch(link);
      const { title, images } = await parseManga(await response.text());
      return { title, images };
    } catch (err) {
      return { title: "", images: [] };
      console.error(err);
    }
  } else {
    return { title: "", images: [] };
  }
};

const parseManga = async (text: string) => {
  const $ = cheerio.load(text);
  const title = $("title");
  const pictureTags = $("picture");
  const images = [];
  for (const pic of pictureTags) {
    const img = $(pic).find("img");
    const src = img.attr("src");
    images.push(src);
  }
  return { title: title.text().split("|")[0], images };
};
