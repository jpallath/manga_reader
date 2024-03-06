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
    console.log("error at generate new page");
    console.log(err);
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
    console.log("error at updating each page");
    console.log(err);
    return { id: "", name: "" };
  }
};
