import { ITypography } from '@/app/utils/interface';

const Heading3 = ({ content, className, styles }: ITypography) => {
  let _styles: React.CSSProperties = styles || {};
  if (styles) {
    _styles = {
      ...styles,
    };
  }
  return (
    <h3
      className={`font-BricolageGrotesqueBold font-bold text-lg md:text-xl lg:text-4xl xl:text-4xl text-black ${className}`}
      style={_styles}
    >
      {content}
    </h3>
  );
};

const Heading5 = ({ content, className }: ITypography) => {
  return (
    <h5
      className={`font-BricolageGrotesqueMedium font-bold text-2xl text-OWANBE_H5 ${className}`}
    >
      {content}
    </h5>
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
    <small
      className={`${className} ${
        className !== '' ? className : 'font-BricolageGrotesqueMedium'
      } font-medium`}
    >
      {content}
    </small>
  );
};

const Label = ({ className, content }: ITypography) => {
  return (
    <label
      htmlFor=""
      className={`${className} font-BricolageGrotesqueRegular text-sm font-normal`}
    >
      {content}
    </label>
  );
};

export { Heading3, Heading5, Label, Paragraph, Small };
