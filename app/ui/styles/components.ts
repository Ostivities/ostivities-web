import { cva } from "class-variance-authority";

export const buttonCva = cva(
  "inline-flex items-center justify-center rounded-full gap-x-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 w-full max-w-min whitespace-nowrap border-none",
  {
    variants: {
      variant: {
        primary: "bg-OWANBE_PRY text-white",
        secondary: "bg-OWANBE_SECONDARY text-white",
        outline: "ring-black ring-1",
        text: "font-BricolageGrotesqueRegular",
      },
      size: {
        default: "py-2 px-6 font-BricolageGrotesqueRegular text-base",
        primary: "font-BricolageGrotesqueSemiBold py-2 px-7 text-[1.125rem]",
        sm: "text-sm font-BricolageGrotesqueSemiBold py-[0.25rem] px-5",
        lg: "text-base py-2 px-6 font-BricolageGrotesqueRegular",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
