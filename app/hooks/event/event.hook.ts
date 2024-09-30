import { CREATE_EVENT, DISCOVERY_EVENTS, GET_EVENT, UPDATE_EVENT, GET_ALL_USER_EVENTS } from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { ICreateEvent, IFormInput, IUpdateEvent } from "@/app/utils/interface";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
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

export const useGetAllUserEvents = () => {
  const getAllUserEvents = useQuery({
    queryKey: [GET_ALL_USER_EVENTS],
    queryFn: () => {
      return API_SERVICE._getAllUserEvents();
    },
  });
  return { getAllUserEvents };
}

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
    mutationFn: (data: { id: string; mode: string;}) => {
      return API_SERVICE._publishEvent(data);
    },
    onSuccess: (data: AxiosResponse) => {
      // successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { publishEvent };
};

export const useAddEventToDiscovery = () => {
  const addEventToDiscovery = useMutation({
    mutationFn: (data: { discover: boolean, id: string }) => {
      return API_SERVICE._addEventToDiscovery(data);
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

export const useGetDiscoveryEvents = () => {
  const getDiscoveryEvents = useQuery({
    queryKey: [DISCOVERY_EVENTS],
    queryFn: () => {
      return API_SERVICE._getDiscoveryEvents();
    },
  });
  return { getDiscoveryEvents };
}