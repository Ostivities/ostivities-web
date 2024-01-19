import { HTMLAttributes, ReactNode } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonCva } from "@/app/ui/styles/components";

export interface ButtonAttributes
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonCva> {
  label: string;
  disable?: boolean;

  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export interface H3Attributes extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}

//  <h3
//    className="w-full text-center lg:text-left xl:text-left
//         md:w-full md:text-center lg:w-3/4 xl:w-3/4"
//  >
//    Celebrate, Connect and Create Memories
//  </h3>;
