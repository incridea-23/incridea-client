import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  image?: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const ImageUpload = ({ image, setImage }: Props) => {
  const [highlighted, setHighlighted] = useState(false);

  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    setImage(files ? files[0] : null);
    setMediaPreview(files && files[0] ? URL.createObjectURL(files[0]) : null);
  };

  return (
    <>
      <input
        type="file"
        id="image"
        className="hidden"
        placeholder="Banner..."
        ref={inputRef}
        onChange={handleChange}
      />
      <div
        className={`min-h-[150px] bodyFont grow flex items-center justify-center cursor-pointer md:rounded-md rounded-b-md ${
          highlighted ? "ring-2 ring-blue-500 bg-blue/20" : "bg-black/20 "
        }`}
        onClick={() => {
          inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setHighlighted(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setHighlighted(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          const droppedFile = Array.from(e.dataTransfer.files);

          if (droppedFile[0]) {
            setImage(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }
        }}>
        {mediaPreview === null ? (
          <>
            <span>Upload image</span>
          </>
        ) : (
          <div className="rounded-sm">
            <Image
              width={1500}
              height={1500}
              className="object-contain h-64 "
              src={mediaPreview}
              alt="Clue Image"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
