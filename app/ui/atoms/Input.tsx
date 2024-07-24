"use client";

import { InputAttributes } from "@/app/lib/types/components";
import { cn } from "@/app/lib/utils";
import { ViewPasswordIcon, HidePasswordIcon } from "@/public/svgs";

import Link from "next/link";
import { useState } from "react";

interface InputProps extends Partial<InputAttributes> {
  disabled?: boolean;
}

const Input = ({
  name,
  label,
  type,
  suffix,
  extraInfo,
  labelAngle,
  className,
  disabled,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleHidePassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className={cn(
        "flex flex-grow",
        labelAngle === "top" ? "flex-col gap-y-1" : "items-center"
      )}
    >
      {label ? (
        <label htmlFor={name} className="text-base">
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          "flex flex-1 bg-white pl-[1.0625rem] pr-4 py-[0.625rem] rounded-2xl items-center gap-x-1 transition-all duration-200 border border-[#d1d3d6] ml-3",
          className
        )}
      >
        <input
          className="flex-1 bg-transparent font-light placeholder:font-light placeholder:text-[0.9375rem] focus:outline-none"
          type={
            type === "password" && showPassword ? "password" : "text" || type
          }
          name={name}
          id={name}
          disabled={disabled} // Apply disabled prop here
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

