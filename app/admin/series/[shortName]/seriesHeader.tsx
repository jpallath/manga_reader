"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { updateSeriesImage } from "../../updateSeriesAction";

export interface SeriesHeaderWithFileUpload {
  image: string;
  name: string | undefined;
  id: string | undefined;
}

export const SeriesHeaderWithFileUpload: React.FC<
  SeriesHeaderWithFileUpload
> = ({ image, name, id }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async () => {
    if (id && file) {
      try {
        setLoading(true);
        const seriesRef = ref(storage, `${id}/main`);
        const data = await uploadBytes(seriesRef, file);
        await updateSeriesImage({
          seriesId: id,
          imageUrl: data.metadata.fullPath,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className="flex flex-row overflow-hidden w-50 items-end gap-2">
      <img
        className="max-w-[15rem] rounded-xl border-primary border-2"
        src={`${preview ? preview : image}`}
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-text p-5 bg-primary w-full text-center rounded-xl">
          {name}
        </h3>
        {preview ? (
          <Button variant="secondary" loading={loading} onClick={handleSubmit}>
            Upload
          </Button>
        ) : (
          <div
            {...getRootProps({
              className:
                "text-text p-5 bg-primary w-full text-center rounded-xl",
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? <p>🖼️</p> : <p>Update Image</p>}
          </div>
        )}
      </div>
    </div>
  );
};
