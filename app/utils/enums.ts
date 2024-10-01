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
}

export enum EVENT_TYPE {
  WEDDING = 'Wedding',
  BIRTHDAY_PARTY = 'Birthday party',
  HANGOUT = 'Hangout',
  PAINT_AND_SIP = 'Paint & Sip',
  MUSIC_SHOW = 'Music Show',
  HANGOUTS = 'Hangouts',
  OTHERS = 'Others',
}