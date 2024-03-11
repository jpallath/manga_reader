"use client";
import { Button } from "@/components/ui/button";
import { fetchManga, saveManga } from "./parseMangaActions";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const ParseManga = () => {
  const [response, setResponse] = useState<any>(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [link, setLink] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetchManga(link);
      setResponse(response);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex gap-4 w-full max-w-sm items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="www..."
        />
        <Button variant="primary" type="submit">
          Subscribe
        </Button>
      </form>
      {response !== null && (
        <ResponseComponent
          responseTitle={response.title}
          responseChapter={response.chapter}
          responseImages={response.images}
        />
      )}
      {response !== null && (
        <Button onClick={() => saveManga(response)}>Save</Button>
      )}
    </div>
  );
};

interface ResponseComponentProps {
  responseTitle: string;
  responseChapter: string;
  responseImages: string[];
}

const ResponseComponent: React.FC<ResponseComponentProps> = ({
  responseTitle,
  responseChapter,
  responseImages,
}) => {
  return (
    <div>
      <h1>
        {responseTitle}: {responseChapter}
      </h1>
      <div className="carousel rounded-box">
        {responseImages.map((image, index) => {
          return (
            <div key={index} className="carousel-item basis-1/3">
              <picture>
                <img src={image} />
              </picture>
            </div>
          );
        })}
      </div>
    </div>
  );
};
