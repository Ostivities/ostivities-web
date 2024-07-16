"use client";
import UploadIcon from "@/public/UploadIcon.svg";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ className }: { className?: string }): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    debugger;
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 50000000,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps({ className: `${className}` })}
        style={{
          border: "1px solid #00000040",
          borderStyle: "dashed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input {...getInputProps()} />
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Image"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="mx-auto text-center">
            <Image
              src={UploadIcon}
              alt="upload_icon"
              className="mx-auto text-center"
            />
            {isDragActive ? (
              <p className="link link-secondary">Drag and drop files here</p>
            ) : (
              <h5 className="text-center click font-BricolageGrotesqueRegular font-normal text-white bg-OWANBE_PRY rounded-[20px] py-3 mt-4 w-40">
                Select File
              </h5>
            )}
          </div>
        )}
      </div>
      <span className="text-OWANBE_PRY font-normal text-xs font-BricolageGrotesqueLight">
        *Only JPEG & PNG Allowed & File size should not be more than 10MB
      </span>
    </div>
  );
}

export default Dropzone;
