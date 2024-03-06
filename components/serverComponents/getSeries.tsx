"use server";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export const getSeries = async () => await prisma.series.findMany({});
