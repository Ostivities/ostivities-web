import {
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD_TOKEN,
} from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import {
  ILogin,
  IResetToken,
  IUser,
  IVerifyToken,
} from "@/app/utils/interface";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";

export const useRegister = () => {
  const registerUser = useMutation({
    mutationFn: (data: IUser) => {
      return API_SERVICE._registerUser(data);
    },
    mutationKey: [REGISTER_USER],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { registerUser };
};

export const useLogin = () => {
  const loginUser = useMutation({
    mutationFn: (data: ILogin) => {
      return API_SERVICE._loginUser(data);
    },
    mutationKey: [LOGIN_USER],
    onSuccess: (data: AxiosResponse) => {
      if (data) {
        const accessToken = data?.data?.data?.accessToken;
        sessionStorage.setItem("token", accessToken);
        successFormatter(data);
      }
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { loginUser };
};

export const useVerifyOtp = () => {
  const verifyOtp = useMutation({
    mutationFn: (data: IVerifyToken) => {
      return API_SERVICE._verifyToken(data);
    },
    mutationKey: [LOGIN_USER],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { verifyOtp };
};

export const useRsetToken = () => {
  const loginUser = useMutation({
    mutationFn: (data: IResetToken) => {
      return API_SERVICE._resetToken(data);
    },
    mutationKey: [RESET_PASSWORD_TOKEN],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { loginUser };
};
