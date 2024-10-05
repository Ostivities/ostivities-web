import React, { HTMLAttributeAnchorTarget } from "react";
import { EXHIBITION_SPACE, TICKET_STOCK } from "./enums";
export enum ACCOUNT_TYPE {
  PERSONAL = "PERSONAL",
  ORGANISATION = "ORGANISATION",
  HALLMANAGER = "HALL MANAGER",
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
  vendor_registration?: boolean;
  exhibitionspace?: boolean;
  exhibition_space_booking?: EXHIBITION_SPACE;
  space_available?: number;
  space_fee?: string;
}



export interface ICreateEvent
  extends Omit<
    IFormInput,
    | "eventDocument"
    | "eventDocumentName"
    | "twitterUrl"
    | "facebookUrl"
    | "instagramUrl"
    | "websiteUrl"
  > {
  socials?: Array<{
    name: string;
    url?: string;
  }>;
  supportingDocument: {
    fileName: string;
    fileUrl: string;
  };
  discover?: boolean;
}

export interface IEventDetails {
  _id: string;
  id?: string;
  key?: string;
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
  status?: string;
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
  vendor_registration?: boolean;
  exhibitionspace?: boolean;
  exhibition_space_booking?: EXHIBITION_SPACE;
  space_available?: number;
  space_fee?: string;
  mode?: string;
  eventMode?: string;
}

export interface IModal {
  id?: any;
  ticketEntity?: string;
  open?: boolean;
  onClose?: any;
  onCancel?: any;
  onOk?: any;
  actionType?: "delete" | "warning" | "detail";
  data?: any;
  selectedRowKeys?: string[];

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
  hallName: string;
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
  confirmPassword: string;
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

export interface IUpdateEvent extends Partial<ICreateEvent> {
  id?: string;
  eventImage?: string;
}

export interface ITicketData {
  user: string;
  event: string | number;
  ticketEntity: string | number;
  ticketType: string;
  ticketName: string;
  ticketStock: TICKET_STOCK;
  ticketQty: number;
  ticketPrice: number | string;
  ticketDescription: string;
  purchaseLimit?: number;
  groupPrice?: number;
  groupSize?: number ;
  guestAsChargeBearer: boolean;
  ticketQuestions?: {
    question: string;
    is_compulsory: boolean;
  }[];
}

export interface ITicketCreate extends Partial<ITicketData> {
  user?: string;
}
export interface ITicketUpdate extends Partial<ITicketData> {
  id: string;
}

export interface ITicketDetails {
  key?: string;
  id: string;
  purchaseLimit: number
  ticketDescription: string
  ticketEntity: string
  ticketName: string
  ticketQty: number
  ticketPrice?: number
  groupSize?: number
  groupPrice?: number
  ticketStock: string
  ticketType: string
  createdAt: string
  guestAsChargeBearer: boolean
  ticketQuestions?: {
    question?: string;
    is_compulsory?: boolean;
  }[];
  user?: {
    accountType: string
    createdAt: string
    email: string
    firstName: string
    hash: string
    id: string
    image: string
    is_active: true
    lastName: string
    phone_number: string
    terms_and_condition: boolean
    total_number_of_events: number
    total_number_of_tickets: number
  }
  event?: {
    address: string
    createdAt: string
    discover: boolean
    endDate: string
    eventDetails: string
    eventImage: string
    eventInfo: string
    eventMode: string
    eventName: string
    eventType: string
    eventURL: string
    id: string;
    socials?: Array<{
      name: string;
      url?: string;
    }>;
    startDate: string
    state: string;
    supportingDocument: {
      fileName: string;
      fileUrl: string;
    };
    ticketSold: number;
    timeZone: string;
    user: string;
  }
}

export interface ITicketQuestions {
  question: string;
  is_compulsory: boolean;
}