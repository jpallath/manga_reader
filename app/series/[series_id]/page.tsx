import { notFound } from "next/navigation";
import { getChapters } from "@/components/actions/getChapters";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { series_id: string };
}) {
  const { series_id } = params;
  const chapters = await getChapters(series_id);
  return (
    <main className="flex flex-col">
      {chapters.map((chapter) => {
        return (
          <Link
            href={`/series/${series_id}/chapters/${chapter.id}`}
            key={chapter.id}
          >
            Chapter {chapter.chapter}
          </Link>
        );
      })}
    </main>
  );
}
