import { buttonCva } from "@/app/ui/styles/components";
import { VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  label: string;
  hasSorting?: boolean;
  hasFilter?: boolean;
};

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

export type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

export interface ButtonAttributes
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonCva> {
  label: string;
  disable?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export interface InputAttributes extends HTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  suffix: ReactNode;
  mxWt: string;
  border: string;
  labelAngle: "side" | "top";
  placeholder: string;
  extraInfo: {
    label: string;
    to?: string;
  };
}

export interface H3Attributes extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}

// components.ts
export interface ToggleSwitchAttributes {
  description?: string; // Make it optional if not always provided
  label: string;
  isActive: boolean;
  onToggle: (checked: boolean) => void; // Custom handler for toggle switch
}


