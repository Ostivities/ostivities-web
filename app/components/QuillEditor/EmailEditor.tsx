"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface EditoProps {
  onChange: any;
  initialValue: string;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EmailEditor = ({
  onChange,
  initialValue,
}: EditoProps): JSX.Element => {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState(initialValue);
  // "image", "video", "formula", "link", "code-block", "clean", "table"



  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["blockquote"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const handleChange = (content: React.SetStateAction<string>) => {
    setValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <React.Fragment>
      {isClient && (
        <ReactQuill 
          placeholder="Enter details!"
          theme="snow"
          value={value}
          onChange={handleChange}
          className="rounded-br-lg rounded-bl-lg h-60"
          style={{
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
          modules={modules}
        />
      )}
    </React.Fragment>
  );
};

export default EmailEditor;
