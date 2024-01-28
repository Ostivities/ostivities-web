import { H3Attributes } from "@/app/lib/types/components";
import { cn } from "@/app/lib/utils";

const H3 = ({ className, content, ...props }: H3Attributes) => {
  return (
    <h3
      {...props}
      className={cn(
        "text-4xl text-black font-BricolageGrotesqueSemiBold",
        className
      )}
    >
      {content}
    </h3>
  );
};

export default H3;
