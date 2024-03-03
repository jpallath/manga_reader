"use server";
import fetch from "node-fetch";
const cheerio = require("cheerio");

interface MangaData {
  title: string;
  chapter: string;
  images: string[];
}

export const fetchManga = async (formData: FormData): Promise<MangaData> => {
  const link = formData.get("link");
  if (typeof link === "string") {
    try {
      const response = await fetch(link);
      const { title, chapter, images } = await parseManga(
        await response.text()
      );
      return { title, chapter, images };
    } catch (err) {
      console.error(err);
      return { title: "", chapter: "", images: [] };
    }
  } else {
    return { title: "", chapter: "", images: [] };
  }
};

export const saveManga = (mangaData: MangaData) => {
  // after the user determines he wants to save the chapter into the DB
  // first check if series exists in DB by verifying name
  // if series doesnt exist, add series to db (new function)
  // else, check if chapter exists
  // if chapter doesnt exist, add chapter and then add pages to db (new function)
  // else return error
};

const parseManga = async (text: string) => {
  const $ = cheerio.load(text);
  console.log($);
  const titleTag = $("title").text().split("|")[0];
  const title = titleTag.split(" Chapter ")[0];
  const chapter = titleTag.split(" Chapter ")[1];
  // const chapter = titleTag.split(" Chapter ")[1];
  const pictureTags = $("picture");
  const images = [];
  for (const pic of pictureTags) {
    const img = $(pic).find("img");
    const src = img.attr("src");
    images.push(src);
  }
  return { title, chapter, images };
};
