export interface INavLinks {
  link: string;
  name: string;
}

export interface ITypography {
  content?: string | React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
}

export interface IFeatures {
  icon?: React.ReactNode | any;
  title?: string;
  content?: string | React.ReactNode;
}

export interface IAuthLayout {
  children?: React.ReactNode;
}
