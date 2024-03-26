"use server";
import { prisma } from "@/lib/prisma";

export const getChapterPages = async (chapter_id: string) => {
  return await prisma.page.findMany({
    where: { chapter_id },
    orderBy: { pageNumber: "asc" },
  });
};
