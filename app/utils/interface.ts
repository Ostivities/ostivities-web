import React, { HTMLAttributeAnchorTarget } from "react";

export enum ACCOUNT_TYPE {
  PERSONAL = "PERSONAL",
  ORGANISATION = "ORGANISATION",
}

export interface INavLinks {
  target: HTMLAttributeAnchorTarget | undefined;
  rel: string | undefined;
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
  title?: string | React.ReactNode;
  tab?: React.ReactNode;
  steppers?: React.ReactNode;
  extraComponents?: React.ReactNode;
  isLoggedIn?: Boolean | React.ReactNode;
}

export interface IHeader {
  isLoggedIn?: Boolean | React.ReactNode;
}
export interface IFormProps {
  formStep?: number;
  nextFormStep?: () => void;
  formData?: any;
}

export interface IFormInput {
  eventName: string;
  eventDetails: string;
  state: string;
  address: string;
  eventURL: string;
  eventDocument: string;
  eventDocumentName?: string;
  eventType: string;
  eventInfo: string;
  timeZone: string;
  startDate: any;
  endDate: any;
  frequency?: string;
  eventImage?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  vendorregistration?: boolean;
  exhibitionspace?: boolean;
  spaceType?: string;
  spaceAvailable?: number;
  spaceFee?: string;
}

export interface ICreateEvent extends Omit<IFormInput, "eventDocument" | "eventDocumentName" | "twitterUrl" | "facebookUrl" | "instagramUrl" | "websiteUrl"> {
  socials?: Array<{
    name: string;
    url?: string; 
  }>;
  supportingDocument: {
    fileName: string;
    fileUrl: string;
  };
}

export interface IEventDetails {
  _id: string;
  eventName: string;
  eventDetails: string;
  state: string;
  address: string;
  eventURL: string;
  supportingDocument: {
    fileName: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  eventType: string;
  timeZone: string;
  frequency: string;
  startDate: string;
  endDate: string;
  socials: {
    name: string;
    url: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  user: string;
  ticketSold: number;
  eventInfo: string;
  discover: boolean;
  createdAt: string;
  updatedAt: string;
  eventImage: string;
}



export interface IModal {
  open?: boolean;
  onClose?: any;
  onCancel?: any;
  onOk?: any;
  actionType?: "delete" | "warning" | "detail";
  data?: any;
  selectedRowKeys?: string | number;
}

export type FieldType = {
  ticketType?: string;
  ticketName?: string;
  ticketStock?: number;
  ticketPrice?: number;
  ticketDescription?: string;
  purchaseLimit?: number | any;
};

export interface FormContextProps {
  formState: FormState;
  setFormStage: (stage: number) => void;
}

export interface FormState {
  stages: any;
  stage: number | any;
}

export interface FormProviderProps {
  children: React.ReactNode;
}

export interface DataType {
  key: React.Key;
  eventName: string;
  eventType: string;
  ticketSold: number;
  type?: string; // Optional, since it's not used in the data generation
  sold?: number; // Optional, since it's not used in the data generation
  dateCreated: string | number | Date;
  status: "Active" | "Closed" | "Pending";
  name?: string; // Optional, since it's not used in the data generation
  age?: number | any; // Optional, since it's not used in the data generation
  address?: string; // Optional, since it's not used in the data generation
  id?: string; // Optional, since it's not used in the data generation
}

export interface SalesDataType {
  eventType: any;
  dateCreated: any;
  key: React.Key;
  eventName: string;
  ticketSold: number;
  sold?: number; // Optional, since it's not used in the data generation
  name?: string; // Optional, since it's not used in the data generation
  age?: number | any; // Optional, since it's not used in the data generation
  address?: string; // Optional, since it's not used in the data generation
  id?: string; // Optional, since it's not used in the data generation
  revenue?: number; // Optional, since it's not used in the data generation
  fees?: number; // Optional, since it's not used in the data generation
  sales?: number; // Optional, since it
}

export interface ExhibitionDataType {
  dateCreated: any;
  key: React.Key;
  eventName: string;
  spaceBooked: number;
  sold?: number; // Optional, since it's not used in the data generation
  name?: string; // Optional, since it's not used in the data generation
  age?: number | any; // Optional, since it's not used in the data generation
  address?: string; // Optional, since it's not used in the data generation
  id?: string; // Optional, since it's not used in the data generation
  revenue?: number; // Optional, since it's not used in the data generation
  fees?: number; // Optional, since it's not used in the data generation
  sales?: number; // Optional, since it
}


export interface VendorDataType {
  key: string;
  vendorName: string;
  category: string;
  dateApplied: any;
  status: "Approved" | "Declined" | "Pending";
  id: string;
  websiteUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface CoordinatorsDataType {
  key: string;
  id: string; // Unique identifier for the coordinator
  coordinatorsName: string;
  coordinatorsEmail: string;
  coordinatorsRole: string;
  coordinatorsphoneNumber: string;
  dateAdded: string;
  sold?: number; // Optional, since it's not used in the data generation
  name?: string; // Optional, since it's not used in the data generation
  age?: number | any; // Optional, since it's not used in the data generation
  address?: string; // Optional, since it's not used in the data generation
  revenue?: number; // Optional, since it's not used in the data generation
  fees?: number; // Optional, since it's not used in the data generation
  sales?: number; // Optional, since it
}

export interface SummaryDataType {
  key: string;
  buyerName: string;
  ticketName: string;
  checkedInBy: string;
  discountCode?: string; // optional if they can be null or undefined
  uses?: number;
  dateEnding?: string;
}

export interface PaymentDataType {
  key: string;
  recipient: string;
  bankAccount: string;
  transferFee: number;
  payout: number;
  paymentDate: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: ACCOUNT_TYPE;
  confirmPassword: string;
  terms_and_condition: boolean;
  businessName: string;
  phonenumber: string;
  feedback: string;
}

export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IResetToken {
  email: string;
}

export interface DiscountDataType {
  key: string;
  discountCode: string;
  uses: string;
  dateEnding: string;
}

export interface IVerifyToken {
  email: string;
  otp: number | string;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string
  token: string | number;
}

export interface TabProps {
  tabs: string[];
  currentTab: string;
  handleCurrentTab: (tab: string) => void;
  style?: React.CSSProperties; // Add this line to include the style prop
}

export interface IUpdateUser {
  id?: string;
  phone_number?: string;
  image?: string;
}

export interface IUpdateEvent extends Partial<ICreateEvent>{
  id?: string;
  eventImage?: string; 
}


export interface ITicketData{
  event: string,
  ticketEntity: string | number,
  ticketType: string,
  ticketName: string,
  ticketStock: string,
  ticketQty: number | string,
  ticketPrice: number | string,
  ticketDescription: string,
  purchaseLimit: number | string,
  groupPrice?: number | string,
  groupSize?: number | string,
  guestAsChargeBearer: boolean,
  ticketQuestions?: [
    {
      question: string,
      isCompulsory: boolean
    }
  ]
}

export interface ITicketUpdate extends Partial<ITicketData>{
  id: string,

}
