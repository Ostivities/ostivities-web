import React, { HTMLAttributeAnchorTarget, Key } from "react";
import { EXHIBITION_SPACE, GUEST_CATEGORY, TICKET_STOCK, USAGE_LIMIT, DISCOUNT_TYPE, PAYMENT_METHODS, STAFF_ROLE } from "./enums";
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
  start_date_time?: any;
  end_date_time?: any;
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
  space_fee?: number;
  unique_key: string;
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
  event_coordinates: string;
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
  enable_registration?: boolean;
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
  user: {
    firstName: string;
    id: string;
    lastName: string;
  };
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
  space_fee?: number;
  mode?: string;
  total_ticket_sold?: number;
  total_sales_revenue?: number;
  eventMode?: string;
  unique_key: string
}

export interface IModal {
  id?: any;
  ticketEntity?: string;
  open?: boolean;
  onClose?: any;
  onCancel?: any;
  visible?: any;
  onOk?: any;
  actionType?: "delete" | "warning" | "detail";
  data?: any;
  selectedRowKeys?: string[];
  dataToDelete?: any;
}

export interface downloadDataItem {
 downloadDetails?: {
  order_number: string,
  order_date: string,
  event_date_time: string,
  event_address: string,
  buyer_name: string,
  ticket_name: string,
  ticket_type: string,
  event_name: string,
  qr_code?: string,
  ostivities_logo?: string,
  ticket_banner?: string
 }[];
 open?: boolean;
 onClose?: any;
}

export interface IModal2 {
  id?: any;
  ticketEntity?: string;
  open?: boolean;
  onClose?: any;
  onCancel?: any;
  onOk?: any;
  actionType?: "delete" | "warning" | "detail";
  ticketName: string[];
  ticketSold: number[];
  dateCreated: string;
  fees: number;
  revenue: number;
  sales: number;
  additionalInfo?: {
    question: string;
    answer: string;
  };
  email: string;
  phone: string;
  selectedRowKeys?: string[];
  eachTicketQuantity?: number[];
  totalAmountPaid?: number;
  orderDate: string;
  total_purchased: number;
  orderNumber: string;
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
  chargeBearer: any;
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
  chargeBearer: any;
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
  ticketType: any;
  key: string;
  guestName: string;
  ticketName: string;
  checkedInBy: string;
  checkedInTime: string;
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
  status?: string;
  paymentDate: string;
}

export interface ProductDataType {
  key: string;
  product: string;
  inStock: number;
  price: number;
  status: string;
}

export interface OrderDataType {
  key: string;
  orderId: string;
  productName: string;
  total: number;
  orderStatus: "Completed" | "Cancelled" | "Processing";
  payment: string;
  shipping: "Delivered" | "Shipped" | "Returned";
  date: string;
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
  ticket_fee: number;
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
  ticket_sold: number;
  ticket_net_sales_revenue: number;
  ticket_sales_revenue: number;
  ticket_fee: number;
  status: string;
  ticketPrice?: number;
  cummulative_ticket_fee?: number;
  ticketSold: number
  groupSize?: number
  groupPrice?: number
  ticketStock: string
  ticketType: string
  revenue: string;
  createdAt: string;
  ticket_available: number;
  discount?: {
    createdAt: string
    discountCode: string 
    discountType: DISCOUNT_TYPE 
    discount_value: number 
    endDateAndTime: string 
    event: string 
    id: string 
    startDateAndTime: string
    ticket: any
  }
  discountCode: string 
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

export interface IDiscountData {
  key?: string;
  id: string;
  discountCode: string;
  discountType: DISCOUNT_TYPE;
  discount_value?: number;
  uses?: string;
  ticket: string[];  // Array of strings
  usageLimit: USAGE_LIMIT;  // Assuming usage can be "ONCE" or "MULTIPLE"
  startDateAndTime: string;  // Assuming it's an ISO string date, but consider using `Date` if you want stricter typing
  endDateAndTime: string;    // Same as above
  ticketApplicable: string;  // Assuming it's a string, but consider using a more specific type
  event: string;
}

export interface IDiscountCreate extends Partial<IDiscountData> {
  // event: string;
  eventId: string;
  user: string;
}

export interface InfoNeeded {
  ticketDetails?: {
    ticketName: string;
    ticketId: string;
    ticketPrice: number;
    ticketFee: number;
    ticketNumber: number;
    groupSize: number;
    subTotal: number;
    ticketEntity: string;
    additionalInformation?: {
      question: string;
      is_compulsory: boolean;
    }[];
  }[];
}


export interface IGuestData {
  ticketQuantity: string;
  key: Key;
  event?: string,
  event_unique_code?: string,
  ticket_information?:{
    ticket_id: string,
    ticket_name: string,
    quantity: number,
    order_number: string,
    total_amount: number
  }[],
  personal_information?: {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
  },
  attendees_information?: {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string
  }[],
  additional_information?:{
    question: string,
    answer: string
  }[],
  fees?: number,
  total_amount_paid?: number,
  discountCode?: string,
  total_purchased?: number,
  payment_method?: PAYMENT_METHODS,
  order_number?: string;
  createdAt: string;
  id?: string;
  record: any;
  ticketSold?: number[];
  dateCreated?: string;
  ticketName?: string[];
  revenue?: number;
  sales?: number;
  email?: string;
  phone?: string;
  orderNumber?: string;
  eachTicketQuantity?: number[];
  guestName?: string;
}


export interface IGuestCreate  {
  event_unique_code: string;
  ticket_information: {
    ticket_id: string;
    ticket_name: string;
    quantity: number;
    total_amount: number;
    ticket_price: number;
    ticket_type: string;
    ticket_stock: string;
    order_number: string;
    discount: number;
    discountCode?: string;  
  }[];
  personal_information: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  attendees_information: {
    event_unique_code: string;
    ticket_information: {
      ticket_id: string;
      ticket_name: string;
      quantity: number;
      total_amount: number;
      ticket_price: number;
      ticket_type: string;
      ticket_stock: string;
      order_number: string;
      discountCode?: string;    
    };
    personal_information: {
      firstName: string;
      lastName: string;
      email: string;
    };
    guest_category: GUEST_CATEGORY;
    total_purchased: number;
    payment_method?: PAYMENT_METHODS;
    total_amount_paid: number;
    fees: number;
    discount: number;
  }[];
  additional_information: {
    question: string;
    answer: string;
  }[];
  guest_category: GUEST_CATEGORY;
  fees: number;
  total_amount_paid: number;
  total_purchased: number;
  payment_method: PAYMENT_METHODS;  
  eventId: string;
}

export interface IBulkMailData {
  event_id: string
  sender_name: string,
  sender_email: string,
  reply_to: string,
  recipients: [
    {
      name: string,
      email: string
    }
  ],
  subject: string,
  message: string,
  email_attachment: [
    {
      name: string,
      content: string,
      url: string
    }
  ]
}


export interface ISettlementData {
  user: string,
  account_name: string,
  account_number: string,
  bank_code: string,
  bank_name: string
}

export interface IVerifyBankAccount {
  account_number: string,
  bank_code: string
}

export interface ICoordinatorCreate {
  staff_email: string;
  staff_name: string;
  staff_role: STAFF_ROLE;
  staff_phone_number: string;
  password: string;
  eventId: string;
}

export interface ICoordinatorData {
  staff_email: string;
  staff_name: string;
  staff_role: STAFF_ROLE;
  staff_phone_number: string;
  password_text: string;
  eventId: string;
  id: string;
  key: string;
  createdAt: string;
}
export interface ICheckInSummary {
  key?: string;
  ticket_information: {
    ticket_id: string;
    ticket_name: string;
    quantity: number;
    total_amount: number;
    createdAt: string;
    id: string;
  }[];
  personal_information: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    id: string;
  };
  check_in_date_time: string;
  check_in_by: string;
  event: string;
  createdAt: string;
  id: string;
}

export interface IPaymentInitialise {
  amount: string,
  email: string,
  event_unique_key: string,
}


