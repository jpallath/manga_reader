import { notFound } from "next/navigation";
import { getChapters } from "@/components/serverComponents/getChapters";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const seriesId = params.id;
  const chapters = await getChapters(seriesId);
  return (
    <main>
      {chapters.map((chapter) => {
        return (
          <Link href={`series/${seriesId}/chapter/${chapter.id}`}>
            Chapter {chapter.chapter}
          </Link>
        );
      })}
    </main>
  );
}
