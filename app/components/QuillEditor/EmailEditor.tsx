"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface EditoProps {
  initialValue: string;
  onChange: any;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EmailEditor = ({
  initialValue = "",
  onChange,
}: EditoProps): JSX.Element => {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState(initialValue);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
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
