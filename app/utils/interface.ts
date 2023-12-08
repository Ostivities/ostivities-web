export interface INavLinks {
  link: string;
  name: string;
}

export interface ITypography {
  content?: string | React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
  htmlFor?: string;
}

export interface IFeatures {
  icon?: React.ReactNode | any;
  title?: string;
  content?: string | React.ReactNode;
}

export interface IAuthLayout {
  children?: React.ReactNode;
}

export interface IDashboard {
  children?: React.ReactNode;
  title?: string;
  tab?: React.ReactNode;
}

export interface IFormProps {
  formStep?: number;
  nextFormStep?: () => void;
  formData?: any;
}

export interface IFormInput {
  eventName: string;
  eventDetails: string;
  eventState: string;
  eventAddress: string;
  customURL: string;
  document: string;
  eventType: string;
  eventInfo: string;
  timeZone: string;
  startDateAndTime: any;
  endDateAndTime: any;
  eventFrequency?: string;
  eventImage?: string;
}
