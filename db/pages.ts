"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface PageData {
  id?: string;
  chapterId: string;
  page: number;
  url: string;
  nextPageId?: string;
}

export const generateNewPage = async (pageData: PageData) => {
  try {
    return await prisma.page.create({
      data: {
        chapter: { connect: { id: pageData.chapterId } },
        url: pageData.url,
        pageNumber: pageData.page,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      id: "",
      name: "",
      chapterId: "",
      page: "",
      url: "",
      pageNumber: 0,
    };
  }
};

export const updatePage = async (
  nextPageId: string,
  previousPageId: string
) => {
  try {
    return await prisma.page.update({
      where: { id: previousPageId },
      data: { nextPageId: nextPageId },
    });
  } catch (err) {
    console.error(err);
    return { id: "", name: "" };
  }
};

export const deletePage = async (pageId: string) => {
  try {
    return await prisma.page.delete({ where: { id: pageId } });
  } catch (err) {
    throw err;
  }
};

export const deleteManyPages = async (chapterId: string) => {
  try {
    return await prisma.page.deleteMany({ where: { chapter_id: chapterId } });
  } catch (err) {
    throw err;
  }
};
