import { getSeries } from "@/components/serverComponents/getSeries";
import Link from "next/link";

export default async function Home() {
  const series = await getSeries();
  return (
    <ul>
      {series.map((series) => {
        return <Link href={`series/${series.id}`}>{series.name}</Link>;
      })}
    </ul>
  );
}
