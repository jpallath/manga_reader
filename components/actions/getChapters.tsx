import { prisma } from "@/lib/prisma";

export const getChapters = async (series_id: string) => {
  try {
    return await prisma.chapter.findMany({
      where: { series_id },
      orderBy: { chapter: "desc" },
    });
  } catch (error) {
    throw error;
  }
};
