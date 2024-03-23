"use server";
import { prisma } from "@/lib/prisma";
export interface ChapterData {
  seriesId: string;
  chapter: number;
  images: string[];
}

export const getSeriesByChapterId = async (chapterId: string) => {
  try {
    return await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { series: true },
    });
  } catch (error) {
    throw error;
  }
};

export const getChapterByShortNameAndNumber = async (
  shortName: string,
  chapter: string
) => {
  try {
    const series = await prisma.series.findFirst({ where: { shortName } });
    return await prisma.chapter.findFirst({
      where: { series_id: series?.id, chapter: parseInt(chapter) },
      include: { series: true },
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchOrGenerateChapter = async (chapterData: ChapterData) => {
  try {
    let chapter = await prisma.chapter.findFirst({
      where: { series_id: chapterData.seriesId, chapter: chapterData.chapter },
    });
    if (!chapter) {
      // @ts-ignore
      chapter = await generateNewChapter(chapterData);
    }
    return chapter;
  } catch (err) {
    throw err;
  }
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
    throw err;
    return {
      series_id: "",
      id: "",
      chapter: 0,
    };
  }
};

export const deleteChapter = async (chapterId: string) => {
  try {
    return await prisma.chapter.delete({ where: { id: chapterId } });
  } catch (err) {
    throw err;
  }
};
