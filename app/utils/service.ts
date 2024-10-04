import { AxiosResponse } from "axios";
import { HttpMethod } from "./enums";
import { instance } from "./instance";
import {
  ICreateEvent,
  IFormInput,
  ILogin,
  IResetPassword,
  IResetToken,
  ITicketCreate,
  ITicketData,
  ITicketUpdate,
  IUpdateEvent,
  IUpdateUser,
  IUser,
  IVerifyToken,
} from "./interface";

export class API_SERVICE {
  static async _registerUser(data: IUser) {
    const { confirmPassword, ...rest } = data;
    return await instance({
      url: `/auth/register`,
      method: HttpMethod.POST,
      data: { ...rest },
    });
  }

  static async _loginUser(data: ILogin): Promise<AxiosResponse> {
    return await instance({
      url: `/auth/login`,
      method: HttpMethod.POST,
      data,
    });
  }

  static async _userProfile(): Promise<AxiosResponse> {
    return await instance({
      url: `/auth/profile`,
      method: HttpMethod.GET,
    });
  }

  static async _verifyToken(data: IVerifyToken): Promise<AxiosResponse> {
    return await instance({
      url: `/auth/verify_otp`,
      method: HttpMethod.POST,
      data,
    });
  }

  static async _resetToken(data: IResetToken): Promise<AxiosResponse> {
    return await instance({
      url: `/auth/reset_token`,
      method: HttpMethod.POST,
      data,
    });
  }

  static async _resetPassword(data: IResetPassword): Promise<AxiosResponse> {
    const { confirmPassword, ...rest } = data;
    return await instance({
      url: `/auth/reset_password`,
      method: HttpMethod.POST,
      data: { ...rest },
    });
  }

  static async _updateProfile(data: IUpdateUser): Promise<AxiosResponse> {
    const { id, ...rest } = data;
    return await instance({
      url: `/auth/user/${id}`,
      method: HttpMethod.PUT,
      data: { ...rest },
    });
  }

  static async _createEvent(data: ICreateEvent): Promise<AxiosResponse> {
    return await instance({
      url: `/events/create`,
      method: HttpMethod.POST,
      data,
    });
  }

  static async _deleteEvent(ids: string[]): Promise<AxiosResponse> {
    return await instance({
      url: `/events/delete_events`,
      method: HttpMethod.DELETE,
      data: { ids },
    });
  }

  static async _getAllUserEvents(page: number, limit: number, search?: string): Promise<AxiosResponse> {
    return await instance({
      url: `/events/get_user_events`,
      method: HttpMethod.GET,
      params: { page, limit, search: search ?? "" },
    });
  }

  static async _getUserEvent(id: string): Promise<AxiosResponse> {
    return await instance({
      url: `/events/get_user_event/${id}`,
      method: HttpMethod.GET,
    });
  }

  static async _updateEvent(data: IUpdateEvent): Promise<AxiosResponse> {
    const { id, ...rest } = data;
    return await instance({
      url: `/events/update_event/${id}`,
      method: HttpMethod.PUT,
      data: { ...rest },
    });
  }

  static async _publishEvent(data: { mode: string, id: string; } ): Promise<AxiosResponse> {
    const { id, mode } = data
    return await instance({
      url: `/events/update_event_mode/${id}`,
      method: HttpMethod.PUT,
      data: { mode },
    });
  }

  static async _addEventToDiscovery(data: { discover: boolean, id: string }): Promise<AxiosResponse> {
    const { id, discover } = data;
    return await instance({
      url: `/events/update_event_discovery/${id}`,
      method: HttpMethod.PUT,
      data: { discover }
    });
  }

  static async _getDiscoveryEvents(page: number, limit: number, search?: string): Promise<AxiosResponse> {
    return await instance({
      url: `/events/discovery`,
      method: HttpMethod.GET,
      params: { page, limit, search: search ?? "" },
    });
  }

  static async _createTicket(data: ITicketCreate): Promise<AxiosResponse> {
    return await instance({
      url: `/ticket/create_ticket`,
      method: HttpMethod.POST,
      data,
    });
  }

  static async _updateTicket(data: ITicketUpdate): Promise<AxiosResponse> {
    const { id, ...rest } = data;
    return await instance({
      url: `/ticket/update_ticket/${id}`,
      method: HttpMethod.PUT,
      data: { ...rest },
    });
  }

  static async _getAllEventTickets(id: string): Promise<AxiosResponse> {
    return await instance({
      url: `/ticket/get_event_ticket/${id}`,
      method: HttpMethod.GET,
    });
  }

  static async _getSingleTicket(id: string): Promise<AxiosResponse> {
    return await instance({
      url: `/ticket/get_ticket/${id}`,
      method: HttpMethod.GET,
    });
  }

  static async _deleteTicket(id: string): Promise<AxiosResponse> {
    return await instance({
      url: `/ticket/delete_ticket/${id}`,
      method: HttpMethod.DELETE,
    });
  }
}
