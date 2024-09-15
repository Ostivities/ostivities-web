import { AxiosResponse } from "axios";
import { HttpMethod } from "./enums";
import { instance } from "./instance";
import { ILogin, IResetToken, IUser, IVerifyToken, IResetPassword, IUpdateUser, ICreateEvent, IFormInput, IUpdateEvent } from "./interface";

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
      data: {...rest},
    });
  }
}



