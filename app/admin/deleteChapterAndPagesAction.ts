"use server";

import { deleteChapter } from "@/db/chapters";
import { deleteManyPages } from "@/db/pages";

export const deleteChapterAndPages = async (chapterId: string) => {
  try {
    await deleteManyPages(chapterId);
    await deleteChapter(chapterId);
  } catch (err) {
    throw err;
  }
};
