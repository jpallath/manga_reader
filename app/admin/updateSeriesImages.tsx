"use client";
import { Button } from "@/components/ui/button";
import { getAllSeries } from "@/db/series";
import { useEffect, useState } from "react";
import { updateSeriesImage } from "./updateSeriesAction";
import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

interface Series {
  id: string;
  name: string;
}

export const UpdateSeriesImages = () => {
  const [sery, setSery] = useState<Series>({ id: "", name: "" });
  const [series, setSeries] = useState<Series[]>([]);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const getSeries = async () => {
      setSeries(await getAllSeries());
    };
    getSeries();
  });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (sery && file) {
      try {
        const seriesRef = ref(storage, `${sery.id}/main`);
        const data = await uploadBytes(seriesRef, file);
        await updateSeriesImage({
          seriesId: sery.id,
          imageUrl: data.metadata.fullPath,
        });
      } catch (error) {
        throw error;
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
    setFile(newFile);
  };
  return (
    <form onSubmit={handleSubmit}>
      <select
        onChange={(e) => {
          const selectedSeries = series.find((s) => s.id === e.target.value);
          if (selectedSeries) setSery(selectedSeries);
        }}
      >
        <option value="">Select a series</option>
        {series.map((sery) => {
          return (
            <option key={sery.id} value={sery.id}>
              {sery.name}
            </option>
          );
        })}
      </select>
      <p>{sery.name}</p>
      <input type="file" onChange={handleChange} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
