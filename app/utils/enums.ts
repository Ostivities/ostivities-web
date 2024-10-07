export enum ACCOUNT_TYPE {
  PERSONAL = "PERSONAL",
  ORGANISATION = "ORGANISATION",
}

export enum EVENT_INFO {
  SINGLE_EVENT = "SINGLE",
  RECURRING_EVENT = "RECURRING",
  eventLocationType = "eventLocationType",
  FREQUENCIES = "FREQUENCIES",
  map = "map",
}

export enum TICKET_TYPE {
  PAID = "PAID",
  FREE = "FREE",
}

export enum TICKET_STOCK {
  UNLIMITED = "UN_LIMITED",
  LIMITED = "LIMITED",
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export enum EXHIBITION_SPACE {
  PAID = 'PAID',
  FREE = 'FREE',
}

export enum PUBLISH_TYPE {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED'
}

export enum EVENT_TYPE {
  WEDDING = 'Wedding',
  BIRTHDAY = 'Birthday',
  HANGOUT = 'Hangout',
  PAINT_AND_SIP = 'Paint & Sip',
  CONCERT = 'Concert',
  CONFERENCE = "Conference",
  SEMINAR = "Seminar",
  TECH_EVENT = "Tech Event",
  ART_EXHIBITION = "Art Exhibition",
  CARNIVAL = "Carnival",
  HOLIDAY_CAMP = "Holiday Camp",
  OTHERS = 'Others',
}


export enum DISCOUNT_TYPE {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export enum USAGE_LIMIT {
  ONCE = 'ONCE',
  MULTIPLE = 'MULTIPLE',
}