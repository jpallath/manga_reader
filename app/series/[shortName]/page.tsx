import { notFound } from "next/navigation";
import { getChapters } from "@/components/actions/getChapters";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { shortName: string };
}) {
  const { shortName } = params;
  const chapters = await getChapters(shortName);
  return (
    <main className="flex flex-col">
      {chapters.map((chapter) => {
        return (
          <Link
            href={`/series/${shortName}/chapters/${chapter.chapter}`}
            key={chapter.id}
          >
            <p className="text-text">Chapter {chapter.chapter}</p>
          </Link>
        );
      })}
    </main>
  );
}
