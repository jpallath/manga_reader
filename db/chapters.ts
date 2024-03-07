"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ChapterData {
  seriesId: string;
  chapter: number;
  images: string[];
}

export const fetchOrGenerateChapter = async (chapterData: ChapterData) => {
  try {
    let chapter = await prisma.chapter.findFirst({
      where: { series_id: chapterData.seriesId, chapter: chapterData.chapter },
    });
    if (!chapter) {
      chapter = await generateNewChapter(chapterData);
    }
    return chapter;
  } catch (err) {}
};

export const generateNewChapter = async (chapterData: ChapterData) => {
  try {
    return await prisma.chapter.create({
      data: {
        series: { connect: { id: chapterData.seriesId } },
        chapter: chapterData.chapter,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      series_id: "",
      id: "",
      chapter: 0,
    };
  }
};
