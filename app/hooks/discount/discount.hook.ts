import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { CREATE_DISCOUNT, GET_EVENT_DISCOUNT, GET_TICKET_DISCOUNT } from "@/app/utils/constants";
import { IDiscountCreate, IDiscountData } from "@/app/utils/interface";
import { AxiosError, AxiosResponse } from "axios";
import { errorFormatter, successFormatter } from "@/app/utils/helper";


export const useCreateDiscount = () => {
    const createDiscount = useMutation({
        mutationFn: (data: IDiscountCreate) => {
        return API_SERVICE._createDiscount(data);
        },
        mutationKey: [CREATE_DISCOUNT],
        onSuccess: (data: AxiosResponse) => {
        successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        },
    });
    return { createDiscount };
}

export const useGetEventDiscount = (id: string) => {
    const getEventDiscount = useQuery({
        queryKey: [GET_EVENT_DISCOUNT, id],
        queryFn: () => {
            if(id) {
                return API_SERVICE._getEventDiscount(id);
            }
        },
    });
    return { getEventDiscount };
}

export const useGetTicketDiscount = (id: string) => {
    const getTicketDiscount = useQuery({
        queryKey: [GET_TICKET_DISCOUNT, id],
        queryFn: () => {
        return API_SERVICE._getTicketDiscount(id);
        },
    });
    return { getTicketDiscount };
}

export const useDeleteDiscount = () => {
    const deleteDiscount = useMutation({
        mutationFn: (id: string) => {
        return API_SERVICE._deleteDiscount(id);
        },
        onSuccess: (data: AxiosResponse) => {
        successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        },
    });
    return { deleteDiscount };
}