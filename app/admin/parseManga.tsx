"use client";
import { fetchManga, saveManga } from "./parseMangaActions";
import { useState } from "react";

export const ParseManga = () => {
  const [response, setResponse] = useState<any>(null);
  const [imageUpload, setImageUpload] = useState(null);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetchManga(formData);
      setResponse(response);
    } catch (error) {
      console.error(error);
      // setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex w-full max-w-sm items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <input name="link" type="text" placeholder="link" />
        <button className="bg-slate-900 text-white" type="submit">
          Subscribe
        </button>
      </form>
      {response !== null && (
        <ResponseComponent
          responseTitle={response.title}
          responseChapter={response.chapter}
          responseImages={response.images}
        />
      )}
      {response !== null && (
        <button onClick={() => saveManga(response)}>Save</button>
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
      <div className="w-9/12">
        {/* <CarouselNext /> */}
        <div>
          {responseImages.map((image, index) => {
            return (
              <div key={index} className="basis-1/3">
                <picture>
                  <img src={image} />
                </picture>
              </div>
            );
          })}
        </div>
        {/* <CarouselPrevious /> */}
      </div>
    </div>
  );
};
