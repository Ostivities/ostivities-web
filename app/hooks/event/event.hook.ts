import { CREATE_EVENT, DISCOVERY_EVENTS, GET_CHECK_IN_SUMMARY, GET_EVENT, UPDATE_EVENT, GET_ALL_USER_EVENTS, GET_EVENT_BY_UNIQUE_KEY } from "@/app/utils/constants";
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

export const useDeleteEvent = () => {
  const deleteEvent = useMutation({
    mutationFn: (data: string[]) => {
      return API_SERVICE._deleteEvent(data);
    },
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { deleteEvent };
}

export const useGetAllUserEvents = (page: number, limit: number, search?: string) => {
  const getAllUserEvents = useQuery({
    queryKey: [GET_ALL_USER_EVENTS, page, limit, search],
    queryFn: () => {
      return API_SERVICE._getAllUserEvents(page, limit, search);
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

export const useGetUserEventByUniqueKey = (id: string) => {
  const getUserEventByUniqueKey = useQuery({
    queryKey: [GET_EVENT_BY_UNIQUE_KEY, id],
    queryFn: () => {
      return API_SERVICE._getUserEventByUniqueKey(id)
    }
  })
  return { getUserEventByUniqueKey }
}

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
    mutationFn: (data: { ids: string[]; mode: string;}) => {
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
    mutationFn: (data: { discover: boolean, ids: string[] }) => {
      return API_SERVICE._addEventToDiscovery(data);
    },
    onSuccess: (data: AxiosResponse) => {
      // successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { addEventToDiscovery };
}

export const useGetDiscoveryEvents = (page: number, pageSize: number, eventName?: string, state?: string, eventCat?: string) => {
  const getDiscoveryEvents = useQuery({
    queryKey: [DISCOVERY_EVENTS, page, pageSize, eventName, state, eventCat],
    queryFn: () => {
      return API_SERVICE._getDiscoveryEvents(page, pageSize, eventName, state, eventCat);
    },
  });
  return { getDiscoveryEvents };
}



export const useEnableEventRegistration = () => {
  const enableEventRegistration = useMutation({
    mutationFn: (data: { id: string, enable_registration: boolean}) => {
      return API_SERVICE._getUpdateEventRegistration(data);
    },
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  })
  return { enableEventRegistration };

}

export const useGetCheckInSummary = (event_id: string, page: number, limit: number, search?: string) => {
  const getCheckInSummary = useQuery({
    queryKey: [GET_CHECK_IN_SUMMARY, event_id, page, limit, search],
    queryFn: () => {
      return API_SERVICE._getCheckInSummary(event_id, page, limit, search);
    },
  });
  return { getCheckInSummary };
}