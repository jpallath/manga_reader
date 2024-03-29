"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const findUsername = async (username: string) => {
  try {
    const users = await prisma.user.findMany({ where: { username } });
    if (users.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUsername = async (username: string, email: string) => {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { username },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
