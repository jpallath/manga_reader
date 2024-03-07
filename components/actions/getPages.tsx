"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getChapterPages = async (chapter_id: string) => {
  return await prisma.page.findMany({
    where: { chapter_id },
    orderBy: { pageNumber: "asc" },
  });
};
