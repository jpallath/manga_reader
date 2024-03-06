import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getChapters = async (series_id: string) => {
  try {
    return await prisma.chapter.findMany({ where: { series_id } });
  } catch (error) {
    throw error;
  }
};
