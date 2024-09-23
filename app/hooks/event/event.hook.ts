import { CREATE_EVENT, GET_EVENT, UPDATE_EVENT } from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { ICreateEvent, IFormInput, IUpdateEvent } from "@/app/utils/interface";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";

export const useCreateEvent = () => {
  const createEvent = useMutation({
    mutationFn: (data: ICreateEvent) => {
      return API_SERVICE._createEvent(data);
    },
    mutationKey: [CREATE_EVENT],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { createEvent };
};

export const useGetUserEvent = (id: string) => {
  const getUserEvent = useQuery({
    queryKey: [GET_EVENT, id],
    queryFn: () => {
      return API_SERVICE._getUserEvent(id);
    },
  });
  return { getUserEvent };
};

export const useUpdateEvent = () => {
  const updateEvent = useMutation({
    mutationFn: (data: IUpdateEvent) => {
      return API_SERVICE._updateEvent(data);
    },
    mutationKey: [UPDATE_EVENT],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { updateEvent };
};

export const usePublishEvent = () => {
  const publishEvent = useMutation({
    mutationFn: (id: string) => {
      return API_SERVICE._publishEvent(id);
    },
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { publishEvent };
};

export const useAddEventToDiscovery = () => {
  const addEventToDiscovery = useMutation({
    mutationFn: (id: string) => {
      return API_SERVICE._addEventToDiscovery(id);
    },
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { addEventToDiscovery };
}