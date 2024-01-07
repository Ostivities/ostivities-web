import clsx from "clsx";
import { ButtonAttributes } from "@/app/utils/interface";

const Button = ({
  label,
  disable,
  maxWidth = "max-w-min",
  variant = "primary",
  prefixIcon,
  ...ref
}: ButtonAttributes) => {
  return (
    <button
      className={clsx(
        "py-3 px-[1.375rem] inline-flex justify-center items-center rounded-[1.25rem] gap-x-2 transition-all duration-300 w-full whitespace-nowrap",
        maxWidth,
        {
          "bg-OWANBE_PRY text-white font-BricolageGrotesqueSemiBold":
            variant === "primary",
          "bg-OWANBE_PRY text-white text-base py-2 px-6 font-BricolageGrotesqueRegular":
            variant === "primary-large",
          "font-BricolageGrotesqueRegular": variant === "text",
          //   "bg-OWANBE_PRY text-white": variant === "outline",
        }
        // disable ? "" : ""
      )}
      disabled={disable}
      {...ref}
    >
      {prefixIcon} {label || ""}
    </button>
  );
};

export default Button;
