"use client";
import { getAllSeries } from "@/db/series";
import { useEffect, useState } from "react";
import { updateSeriesImage } from "./updateSeriesAction";
import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { Button } from "@/components/ui/button";

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
  }, []);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (sery && file) {
      try {
        const seriesRef = ref(storage, `${sery.id}/main`);
        const data = await uploadBytes(seriesRef, file);
        console.log(sery, seriesRef);
        await updateSeriesImage({
          seriesId: sery.id,
          imageUrl: data.metadata.fullPath,
        });
      } catch (error) {
        throw error;
      }
    }
  };
  const updateSery = (e: any) => {
    const sery = series.find((sery) => sery.id === e.target.value);
    if (sery) setSery(sery);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const newFile = event.target.files?.[0];
    setFile(newFile);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="file"
        className="file-input w-full max-w-xs border-primary bg-primary text-text"
        onChange={handleChange}
      />

      <select
        className="select select-primary border-primary bg-background text-text w-full max-w-xs"
        onChange={(e) => updateSery(e)}
      >
        <option value="">{"Select a series"}</option>

        {series.map((sery) => {
          return (
            <option key={sery.id} value={sery.id}>
              {sery.name}
            </option>
          );
        })}
      </select>

      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};
