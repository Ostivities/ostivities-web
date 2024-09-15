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
  UNLIMITED = "UNLIMITED",
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