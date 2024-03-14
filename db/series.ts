"use server";

import { prisma } from "@/lib/prisma";

export interface Series {
  id: string;
  name?: string;
  imageUrl?: string | null;
}

export const getAllSeries = async () => {
  try {
    return await prisma.series.findMany({});
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchOrGenerateSeries = async (
  title: string
): Promise<Series | null> => {
  try {
    let series: Series | null = await prisma.series.findFirst({
      where: { name: title },
    });
    if (!series) {
      series = await generateNewSeries(title);
    }
    return series as Series;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const generateNewSeries = async (title: string) => {
  try {
    return await prisma.series.create({ data: { name: title } });
  } catch (err) {
    console.error(err);
    return { id: "", name: "" };
  }
};

export const updateSeries = async (series: Series) => {
  try {
    const { id, ...data } = series;
    await prisma.series.update({
      where: { id: id },
      data: { ...data },
    });
  } catch (error) {
    throw error;
  }
};
