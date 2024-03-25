"use server";
import { prisma } from "@/lib/prisma";

export const getSeriesDataByShortName = async (shortName: string) => {
  try {
    return await prisma.series.findFirst({
      where: { shortName },
      include: { Chapter: { orderBy: { chapter: "desc" } } },
    });
  } catch (error) {
    console.log(error);
    return { id: "", name: "", shortName: "", imageUrl: "", Chapter: [] };
  }
};
