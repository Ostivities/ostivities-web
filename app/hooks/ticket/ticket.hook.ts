import { CREATE_TICKET, UPDATE_TICKET } from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { ITicketData, ITicketUpdate } from "@/app/utils/interface";



export const useCreateTicket = () => {
  const createTicket = useMutation({
    mutationFn: (data: ITicketData) => {
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