"use client";

import { ParseManga } from "./parseManga";
import { UpdateSeriesImages } from "./updateSeriesImages";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-20">
      <ParseManga />
      <div className="w-6/12 border border-solid border-accent"></div>
      <UpdateSeriesImages />
    </div>
  );
}
