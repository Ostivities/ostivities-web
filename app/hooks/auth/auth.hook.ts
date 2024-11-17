import {
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD_TOKEN,
  USER_PROFILE,
  VERIFY_OTP,
  UPDATE_PROFILE,
  LOGOUT_USER,
} from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import {
  ILogin,
  IResetToken,
  IUser,
  IVerifyToken,
  IResetPassword,
  IUpdateUser,
} from "@/app/utils/interface";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";

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
        sessionStorage.setItem("tokenTimestamp", Date.now().toString());
        localStorage.setItem("token", accessToken);
        // localStorage.setItem()
        localStorage.setItem("tokenTimestamp", Date.now().toString());
      }
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { loginUser };
};

export const useLogout = () => {
  const logoutUser = useMutation({
    mutationFn: () => {
      return API_SERVICE._logoutUser()
    },
    mutationKey: [LOGOUT_USER],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data)
    },
    onError: (error: AxiosError) => {
      errorFormatter(error);
    }
  });
  return { logoutUser }
}

export const useVerifyOtp = () => {
  const verifyOtp = useMutation({
    mutationFn: (data: IVerifyToken) => {
      return API_SERVICE._verifyToken(data);
    },
    mutationKey: [LOGIN_USER],
    onSuccess: (data: AxiosResponse) => {
      // successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { verifyOtp };
};

export const useResetToken = () => {
  const resetToken = useMutation({
    mutationFn: (data: IResetToken) => {
      return API_SERVICE._resetToken(data);
    },
    mutationKey: [VERIFY_OTP],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { resetToken };
};

export const useResetPassword = () => {
  const resetPassword = useMutation({
    mutationFn: (data: IResetPassword) => {
      return API_SERVICE._resetPassword(data);
    },
    mutationKey: [RESET_PASSWORD_TOKEN],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { resetPassword };
};


export const useProfile = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Check for existing profile in localStorage
  const localProfile = typeof window !== "undefined" ? localStorage.getItem("profileData") : null;

  // Parse the stored profile if available
  const storedProfile = localProfile ? JSON.parse(localProfile) : null;

  const profile = useQuery<AxiosResponse, AxiosError>({
    queryKey: [USER_PROFILE],
    queryFn: () => API_SERVICE._userProfile(),
    enabled: !!token && !storedProfile, // Only enabled if token exists and profile isn't already in localStorage
    retry: false, // Optionally disable retries
  });

  useEffect(() => {
    if (profile?.isSuccess && profile?.data?.data) {
      // Save profile to localStorage
      localStorage.setItem("profileData", JSON.stringify(profile?.data?.data?.data));
    }
  }, [profile?.isSuccess, profile?.data]);

  return { profile: storedProfile || profile };
};

export const useUpdateProfile = () => {
  const updateProfile = useMutation({
    mutationFn: (data: IUpdateUser) => {
      return API_SERVICE._updateProfile(data);
    },
    mutationKey: [UPDATE_PROFILE],
    onSuccess: (data: AxiosResponse) => {
      // successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { updateProfile };
}