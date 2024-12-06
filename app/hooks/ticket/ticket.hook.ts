import { CREATE_TICKET, GET_EVENT_TICKETS, GET_SINGLE_TICKET, GET_EVENT_TICKETS_BY_UNIQUE_KEY, UPDATE_TICKET } from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { ITicketCreate, ITicketUpdate } from "@/app/utils/interface";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";

export const useCreateTicket = () => {
  const createTicket = useMutation({
    mutationFn: (data: ITicketCreate) => {
      return API_SERVICE._createTicket(data);
    },
    mutationKey: [CREATE_TICKET],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { createTicket };
};

export const useUpdateTicket = () => {
  const updateTicket = useMutation({
    mutationFn: (data: ITicketUpdate) => {
      return API_SERVICE._updateTicket(data);
    },
    mutationKey: [UPDATE_TICKET],
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { updateTicket };
};

export const useGetEventTickets = (id: string) => {
  const getTickets = useQuery({
    queryKey: [GET_EVENT_TICKETS, id],
    queryFn: () => {
      return API_SERVICE._getAllEventTickets(id);
    },
    enabled: !!id,

  });
  return { getTickets };
}

export const useGetEventTicketsByUniqueKey = (event_unique_key: string) => {
  const getTicketsByUniqueKey = useQuery({
    queryKey: [GET_EVENT_TICKETS_BY_UNIQUE_KEY, event_unique_key],
    queryFn: () => {
      return API_SERVICE._getAllEventTicketsByUniqueKey(event_unique_key)
    },
    enabled: !!event_unique_key,
  })
  return { getTicketsByUniqueKey }
}

export const useGetSingleTicket = (id: string) => {
  const getSingleTicket = useQuery({
    queryKey: [GET_SINGLE_TICKET, id],
    queryFn: () => API_SERVICE._getSingleTicket(id),
  });
  return { getSingleTicket };
}

export const useDeleteTicket = () => {
  const deleteTicket = useMutation({
    mutationFn: (id: string) => API_SERVICE._deleteTicket(id),
    onSuccess: (data: AxiosResponse) => {
      successFormatter(data);
    },
    onError: (error: AxiosError | any) => {
      errorFormatter(error);
    },
  });
  return { deleteTicket };
}