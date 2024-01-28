"use client";

import { InputAttributes } from "@/app/lib/types/components";
import { cn } from "@/app/lib/utils";
import { ViewPasswordIcon, HidePasswordIcon } from "@/public/svgs";

import Link from "next/link";
import { useState } from "react";

const Input = ({
  name,
  label,
  type,
  suffix,
  extraInfo,
  ...rest
}: InputAttributes) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleHidePassword = () => setShowPassword((prev) => !prev);

  const handleFocus = () => setIsFocused((prev) => !prev);

  const handleBlur = () => setIsFocused((prev) => !prev);

  return (
    <div className="flex-grow flex flex-col gap-y-1">
      {label ? (
        <label htmlFor={name} className="text-base text-twikkl-main">
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          "flex flex-1 bg-white pl-[1.0625rem] pr-4 py-[0.625rem] rounded-[0.9375rem] items-center gap-x-1 transition-all duration-200 border border-[#d1d3d6]"
          //   isFocused ? "border-twikkl-primary" : "border-twikkl-inactive"
        )}
      >
        <input
          className="flex-1 bg-transparent text-twikkl-main font-light placeholder:font-light placeholder:text-[0.9375rem] focus:outline-none"
          type={
            type === "password" && showPassword ? "password" : "text" || type
          }
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={name}
          {...rest}
        />
        {suffix ? (
          suffix
        ) : type === "password" ? (
          <div>
            {showPassword ? (
              <span onClick={handleShowPassword}>
                <ViewPasswordIcon />
              </span>
            ) : (
              <span onClick={handleHidePassword}>
                <HidePasswordIcon />
              </span>
            )}
          </div>
        ) : null}
      </div>
      {extraInfo?.to ? (
        <Link
          href={extraInfo.to || "#"}
          className="self-end text-twikkl-primary text-sm mt-2 underline"
        >
          {extraInfo?.label}
        </Link>
      ) : null}
    </div>
  );
};

export default Input;
