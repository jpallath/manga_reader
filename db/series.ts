"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchOrGenerateSeries = async (title: string) => {
  try {
    let series = await prisma.series.findFirst({ where: { name: title } });
    if (!series) {
      series = await generateNewSeries(title);
    }
    return series;
  } catch (err) {
    console.log(err);
  }
};

const generateNewSeries = async (title: string) => {
  try {
    return await prisma.series.create({ data: { name: title } });
  } catch (err) {
    console.log(err);
    return { id: "", name: "" };
  }
};
