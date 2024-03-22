"use client";

import { useEffect } from "react";
import { ParseManga } from "./parseManga";
import { UpdateSeriesImages } from "./updateSeriesImages";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   console.log(session);
  //   // @ts-ignore
  //   if (session?.user?.role !== "ADMIN" || session?.username) {
  //     router.push("/user/register");
  //   }
  // }, [session]);
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-20">
      <ParseManga />
      <div className="w-6/12 border border-solid border-accent"></div>
      <UpdateSeriesImages />
    </div>
  );
}
