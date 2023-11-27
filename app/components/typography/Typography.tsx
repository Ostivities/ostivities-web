import { ITypography } from "@/app/utils/interface";

const Heading3 = ({ content, className }: ITypography) => {
  return (
    <h3
      className={`font-BricolageGrotesqueBold font-bold text-4xl text-black ${className}`}
    >
      {content}
    </h3>
  );
};

const Heading5 = ({ content, className }: ITypography) => {
  return (
    <h3
      className={`font-BricolageGrotesqueBold font-bold text-2xl text-black ${className}`}
    >
      {content}
    </h3>
  );
};

const Paragraph = ({ className, content }: ITypography) => {
  return (
    <p className={`${className} font-BricolageGrotesqueMedium font-medium`}>
      {content}
    </p>
  );
};

const Small = ({ className, content }: ITypography) => {
  return (
    <small className={`${className} font-BricolageGrotesqueMedium font-medium`}>
      {content}
    </small>
  );
};

export { Heading3, Heading5, Paragraph, Small };
