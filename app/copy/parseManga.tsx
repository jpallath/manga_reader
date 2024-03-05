"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchManga, saveManga } from "./parseMangaActions";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const ParseManga = () => {
  const [response, setResponse] = useState<any>(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetchManga(formData);
      setResponse(response);
    } catch (error) {
      console.log(error);
      // setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex w-full max-w-sm items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <Input name="link" type="text" placeholder="link" />
        <Button type="submit">Subscribe</Button>
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
    <div className="flex flex-col items-center justify-center">
      <h1>
        {responseTitle}: {responseChapter}
      </h1>
      <Carousel className="w-9/12">
        <CarouselNext />
        <CarouselContent>
          {responseImages.map((image, index) => {
            return (
              <CarouselItem key={index} className="basis-1/3">
                <picture>
                  <img src={image} />
                </picture>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};
