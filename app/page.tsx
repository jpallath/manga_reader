import { getSeries } from "@/components/actions/getSeries";
import Link from "next/link";

export default async function Home() {
  const series = await getSeries();
  return (
    <ul>
      {series.map((series) => {
        return (
          <Link key={series.id} href={`series/${series.id}`}>
            {series.name}
          </Link>
        );
      })}
    </ul>
  );
}
