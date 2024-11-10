import { H3Attributes } from "@/app/lib/types/components";
import { cn } from "@/app/lib/utils";

const H4 = ({ className, content, ...props }: H3Attributes) => {
  return (
    <h4
      {...props}
      className={cn(
        "text-3xl text-black font-BricolageGrotesqueSemiBold",
        className
      )}
    >
      {content}
    </h4>
  );
};

export default H4;
