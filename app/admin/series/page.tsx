import { LinkButton } from "@/components/ui/linkButton";
import { getAllSeries } from "@/db/series";

export default async function AdminSeriesPage() {
  // this should eventually be a table with search
  const allSeries = await getAllSeries();
  return (
    <div className="w-screen flex flex-col">
      {allSeries.map((series, idx) => {
        return (
          <LinkButton
            key={series.id}
            text={series.name}
            link={`series/${series.shortName}`}
          ></LinkButton>
        );
      })}
    </div>
  );
}
