"use client";
import UploadIcon from "@/public/UploadIcon.svg";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ className }: { className?: string }): JSX.Element {
  const onDrop = useCallback(() => {}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 50000000,
    accept: {
      "image/png*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps({ className: `${className}` })}
        style={{
          height: "400px",
          border: "1px solid #00000040",
          borderStyle: "dashed",
        }}
      >
        <input {...getInputProps()} />
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
      </div>
      <span className="text-OWANBE_DEEP_RED font-normal text-xs font-BricolageGrotesqueLight">
        *Only JPEG & PNG Allowed & File size should not be more than 10MB{" "}
      </span>
    </div>
  );
}

export default Dropzone;
