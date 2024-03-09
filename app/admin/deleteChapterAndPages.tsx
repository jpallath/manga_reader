"use client";
import { useState } from "react";

export interface Series {
  id: string;
  name?: string;
  imageUrl?: string | null;
}

export interface Chapter {
    id: string;
    
}

export const DeleteChapterAndPages = () => {
  const [series, setSeries] = useState<Series[]>();
  const [selectedSeries, setSelectedSeries] = useState<Series>();
  const [chapters, setChapters] = useState<Chapter>();
};
