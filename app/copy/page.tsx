import { ParseManga } from "./parseManga";

export default async function Page() {
  return (
    <div className="flex items-center justify-center h-full">
      <ParseManga />
    </div>
  );
}
