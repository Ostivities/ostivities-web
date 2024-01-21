import { cn } from "@/app/lib/utils";
import { buttonCva } from "../styles/components";
import { ButtonAttributes } from "@/app/lib/types/components";

const Button = ({
  label,
  disable,
  variant,
  size,
  className,
  prefixIcon,
  suffixIcon,
  ...props
}: ButtonAttributes) => {
  return (
    <button
      className={cn(buttonCva({ variant, size, className }))}
      disabled={disable}
      {...props}
    >
      {prefixIcon} {label || ""} {suffixIcon}
    </button>
  );
};

export default Button;
