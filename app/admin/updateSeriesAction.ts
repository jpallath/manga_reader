"use server";

import { updateSeries } from "@/db/series";

interface UpdateSeriesImage {
  seriesId: string;
  imageUrl: string;
}

export const updateSeriesImage = async (
  updateSeriesImage: UpdateSeriesImage
) => {
  try {
    console.log("test");
    const { seriesId, imageUrl } = updateSeriesImage;

    await updateSeries({ id: seriesId, imageUrl });
  } catch (error) {
    throw error;
  }
};
