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
    const { seriesId, imageUrl } = updateSeriesImage;

    await updateSeries({ id: seriesId, imageUrl });
  } catch (error) {
    throw error;
  }
};
