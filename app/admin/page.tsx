import { ParseManga } from "./parseManga";
import { UpdateSeriesImages } from "./updateSeriesImages";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-20">
      <ParseManga />
      <div className="w-6/12 border border-solid border-accent"></div>
      <UpdateSeriesImages />
    </div>
  );
}
