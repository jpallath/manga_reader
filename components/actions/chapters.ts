"use server";
import { prisma } from "@/lib/prisma";

export const getChapters = async (shortName: string) => {
  try {
    const series = await prisma.series.findFirst({ where: { shortName } });
    const chapters = await prisma.chapter.findMany({
      where: { series_id: series?.id },
      orderBy: { chapter: "desc" },
    });
    return chapters.map((chapter) => {
      return { ...chapter, shortName };
    });
  } catch (error) {
    throw error;
  }
};

export const getRecentChapters = async () => {
  try {
    return await prisma.chapter.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { series: true },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
