import { LOGIN_USER, REGISTER_USER } from "@/app/utils/constants";
import { ILogin, IUser } from "@/app/utils/interface";
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
      message.success(data?.data?.message);
    },
    onError: (error: AxiosError | any) => {
      const errorMessage = error?.response?.data?.message;
      typeof errorMessage === "string"
        ? message.error(error?.response?.data?.message)
        : message.error(error?.response?.data?.message[0]);
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
      const accessToken = data?.data?.data?.accessToken;
      sessionStorage.setItem("token", accessToken);
      message.success(data?.data?.message);
    },
    onError: (error: AxiosError | any) => {
      const errorMessage = error?.response?.data?.message;
      typeof errorMessage === "string"
        ? message.error(error?.response?.data?.message)
        : message.error(error?.response?.data?.message[0]);
    },
  });
  return { loginUser };
};
